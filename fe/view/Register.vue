<template>
<div class="register-page">
    <div class="container register-container">
        <div class="panel panel-default">
            <div class="login">Already have account？<router-link to="/">Sign in</router-link></div>
            <div class="panel-header">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                Sign up
            </div>
            <div class="panel-body">
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
                        <div class="col-md-3">
                            <input type="text" class="form-control captcha" id="captcha" placeholder="" v-model="user.captcha">
                        </div>
                        <div v-html="captchaSvg" class="col-md-3" @click="updateCaptcha"></div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for=""></label>
                        <div class="col-md-6">
                            <input type="button" class="btn btn-fill" @click="register" value="Register">
                        </div>
                    </div>
                </form>
            </div>
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
            captchaSvg: ''
        }
    },
    created() {
        this.updateCaptcha();
    },
    methods: {
        register() {
            if(this.user.password !== this.user.confirmPassword) {
                this.$store.commit('openModal', 'Password not match confirmation!');
                return;
            }
            this.$store.dispatch('user/create', this.user).then(() => {
                this.$store.commit('openModal', 'Registe Success.');
                this.$router.push('/account/manage');
            }).catch(err => {
                this.$store.commit('openModal', err.body.msg);
            });
        },
        updateCaptcha() {
            this.$http.get('user/captcha').then(response => {
                if(response.ok) {
                    this.captchaSvg = response.body;
                }
            });
        }
    }
}
</script>
<style lang="postcss" scoped>
.register-page {
    background-color: #f8f8f8;
    height: auto;
    position: absolute;
    bottom: 0;
    top: 50px;
    width: 100%;
}
.register-container {
    padding-top: 60px;
    width: 600px;
    margin: 0 auto;
}
.register-container .panel-header {
    margin-bottom: 20px;
    font-size: 2rem;
}
.register-container .login{
    float: right;
}
.register-container .login a {
    color: #4eb4b4;
    cursor: pointer;
}
.register-container .panel {
    padding: 14px 30px;
    border-radius: 4px;
    border: 1px solid #E3E9ED;
}
.register-container .panel-header {
    margin-bottom: 20px;
    font-size: 2rem;
}
form input {
    height: 40px;
    margin: 0 0 1rem;
    border-radius: 0;
    border: 1px solid #71c3c3;
}
form .btn {
    width: 100%;
    border-radius: 0;
    border: 2px solid white;
}

@media (max-width: 732px) {
    .register-container{
        width:280px;
    }
    .register-container .panel-body{
        padding: 0;
    }
}
</style>