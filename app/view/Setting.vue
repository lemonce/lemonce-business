<template>
    <div class="account-setting col-md-8">
        <h3>
            Change password 
        </h3>
        <hr>
        <form class="col-md-10">
            <div class="form-group">
                <label class="control-label" for="old_password">Old password</label>
                <div>
                    <input type="password" class="form-control" id="old_password" placeholder="" v-model="userPassword.pwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="new_passwrd">New password</label>
                <div>
                    <input type="password" class="form-control" id="new_passwrd" placeholder="" v-model="userPassword.newPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="confirm_password">Confirm new password</label>
                <div>
                    <input type="password" class="form-control" id="confirm_password" placeholder="" v-model="userPassword.confirmPwd">
                </div>
                <span id="helpBlock" :class="passwordMessage.style" class="help-text">{{passwordMessage.content}} &nbsp;</span>
            </div>
            <div class="form-group row">
                <div class="col-md-4">
                    <input type="button" class="btn btn-fill" @click="changePassword" value="Update Password" id="passwordBtn">
                </div>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    name: 'Setting',
    mounted() {
        this.$store.dispatch('user/checkLoggedIn')
        .catch(err => {
            // this.$store.commit('openModal', 'Please Sign In!');
            this.$router.push('/'); 
        });
    },
    data() {
        return {
            userPassword: {
                pwd: '',
                newPwd: '',
                confirmPwd: ''
            },
            passwordMessage: {
                style: '',
                content: ''
            }
        }
    },
    methods: {
        changePassword() {
            if(this.userPassword.newPwd !== this.userPassword.confirmPwd) {
				// this.$store.commit('openModal', 'Password not match confirmation.');
                this.showPasswordMessage('text-danger', 'Password not match confirmation.');
                return;
			}
            this.$store.dispatch('user/changePassword', this.userPassword)
            .then(() => {
                this.$store.dispatch('user/signOut').then(() => {
                    this.$router.push('/');
                });
            }).catch(err => {
                this.showPasswordMessage('text-danger', err.body.msg);
            });
        },
        clearPasswordInput() {
            this.userPassword.pwd = '';
            this.userPassword.newPwd = '';
            this.userPassword.confirmPwd = '';
            this.clearPasswordMessage();
        },
        clearPasswordMessage() {
            this.passwordMessage.style = '';
            this.passwordMessage.content = ''
        },
        showPasswordMessage(style, content) {
            this.passwordMessage.style = style;
            this.passwordMessage.content = content;
        }
    }
}
</script>
<style lang="postcss" scoped>
.account-setting {
    float: left;
}
.account-setting form {
    padding-left: 0;
}
.account-setting input {
    border-radius: 0;
}
hr {
    border-top: 2px solid rgba(0, 0, 0, .1);
}
</style>