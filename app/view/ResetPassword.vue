<template>
<div class="common-panel container">
    <div class="panel-header text-center">
        <h3>
            <div v-if="token">
                Change Password for user
            </div>
            <div v-else>
                Reset your password
            </div>
        </h3>
    </div>

    <div class="panel col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3">
        <div class="register panel-pre"><router-link to="/">Sign in</router-link></div><br>
        <div class="panel-body">
            <form>
                <div v-if="token">
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm password</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                        <span id="helpBlock" :class="helpMessage.style" class="help-text">{{helpMessage.content}} &nbsp;</span>
                    </div>
                    <div class="form-group">
                        <input type="button" class="btn btn-fill" @click="changePassword" value="Change Password" id="changePasswordBtn">
                    </div>
                </div>
                <div v-else>
                    <div v-if="emailSent">
                        <div class="form-group">
                            <p>
                                Check your email for a link to reset your password. 
                                If it doesn't appear within a few minutes, check your spam folder.
                            </p>
                            <input type="button" class="btn btn-fill" @click="returnToSignIn" value="Return to sign in" id="returnBtn">
                        </div>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label for="email">Enter your email address and we will send you a link to reset your password</label>
                            <input type="text" class="form-control" placeholder="email address" id="email" v-model="email">
                            <span id="helpBlock" :class="helpMessage.style" class="help-text">{{helpMessage.content}} &nbsp;</span>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-fill" @click="sendEmail" value="Send password reset email" id="sendEmailBtn">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'ResetPassword',
    mounted() {

    },
    data() {
        return {
            email: '',
            emailSent: false,
            token: this.$route.params.token,
            helpMessage: {
                style: '',
                content: ''
            },
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
    },
    methods: {
        sendEmail() {
            this.clearHelpMessage();
            this.$store.dispatch('user/sendResetEmail', this.email).then(() => {
                this.emailSent = true;
            }).catch(err => {
                this.showHelpMessage('text-danger', err.body.msg);
            })
        },
        changePassword() {
            this.clearHelpMessage();
            if(this.password !== this.confirmPassword) {
                this.showHelpMessage('text-danger', 'Password not match confirmation.');
                return;
			}
            this.$store.dispatch('user/resetPassword', {
                token: this.token,
                password: this.password
            }).then(() => {
                this.showHelpMessage('text-success', 'Your password has been reset successfully.');
            }).catch(err => {
                this.showHelpMessage('text-danger', err.body.msg);
            });
        },
        returnToSignIn() {
            this.$router.push('/');
        },
        showHelpMessage(style, content) {
            this.helpMessage.style = style;
            this.helpMessage.content = content;
        },
        clearHelpMessage() {
            this.helpMessage.style = '';
            this.helpMessage.content = '';
        }
    }
}
</script>
<style scoped>
    @import '../style/index.css';
    @import '../style/home.css';
</style>