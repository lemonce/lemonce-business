<template>
<div class="common-panel container">
    <div class="panel col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
        <div class="login panel-pre hidden-xs">Already have account？<router-link to="/">Sign in</router-link></div>
        <div class="panel-header">
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            Sign up
        </div>
        <div class="panel-body">
            <div class="alert alert-dismissible" role="alert" v-show="helpMessage.content" :class="helpMessage.style">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeHelpMessage"><span aria-hidden="true">&times;</span></button>
                {{helpMessage.content}}
            </div>
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-md-3" for="username">Username</label>
                    <div class="col-md-7">
                        <input type="text" class="form-control" id="username" placeholder="6-20 characters" v-model="user.username" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for="password">Password</label>
                    <div class="col-md-7">
                        <input type="password" class="form-control" id="password" placeholder="6-20 characters" v-model="user.password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for="confirmPassword">Confirm Password</label>
                    <div class="col-md-7">
                        <input type="password" class="form-control" id="confirmPassword" placeholder="confirm password" v-model="user.confirmPassword">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for="email">Email</label>
                    <div class="col-md-7">
                        <input type="email" class="form-control" id="email" placeholder="your email" v-model="user.email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for="phone">Telephone</label>
                    <div class="col-md-7">
                        <input type="text" class="form-control" id="phone" placeholder="your telephone" v-model="user.phone">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for="captcha">Captcha</label>
                    <div class="row">
                                        <div class="col-md-3">
                        <input type="text" class="form-control captcha" id="captcha" placeholder="" v-model="user.captcha">
                    </div>
                    <div v-html="captchaSvg" class="col-md-3" @click="updateCaptcha"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3" for=""></label>
                    <div class="col-md-6">
                        <input type="button" class="btn btn-fill" @click="register" value="Register" id="registerBtn">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                captcha: ''
            },
            captchaSvg: '',
            helpMessage: {
                style: '',
                content: ''
            }
        }
    },
    created() {
        if(this.$store.getters['user/isLoggedIn']) {
            this.$router.push('/account/manage');
        }
        this.updateCaptcha();
    },
    methods: {
        register() {
            if(this.user.password !== this.user.confirmPassword) {
                this.showHelpMessage('alert-danger', 'Password not match confirmation!');
                this.updateCaptcha();
                return;
            }
            this.$store.dispatch('user/create', this.user).then(() => {
                this.$router.push('/');
            }).catch(err => {
                this.showHelpMessage('alert-danger', err.body.msg);
                this.updateCaptcha();
            });
        },
        updateCaptcha() {
            this.$http.get('user/captcha').then(response => {
                if(response.ok) {
                    this.captchaSvg = response.body;
                }
            });
        },
        showHelpMessage(style, content) {
            this.helpMessage.style = style;
            this.helpMessage.content = content;
        },
        closeHelpMessage() {
            this.helpMessage.style = '';
            this.helpMessage.content = '';
        }
    }
}
</script>
<style scoped>
    @import '../style/home.css';
    .container form {
        padding: 0 10px;
    }
</style>