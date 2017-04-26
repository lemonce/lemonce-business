<template>
<div class="register-page common-background">
    <div class="container register-container">
        <div class="panel panel-default">
            <div class="login panel-pre">Already have account？<router-link to="/">Sign in</router-link></div>
            <div class="panel-header">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                Sign up
            </div>
            <div class="panel-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-md-3" for="username">Username</label>
                        <div class="col-md-7">
                            <input type="text" class="form-control" id="username" placeholder="6-20 characters" v-model="username" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="password">Password</label>
                        <div class="col-md-7">
                            <input type="password" class="form-control" id="password" placeholder="6-20 characters" v-model="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="confirmPassword">Confirm Password</label>
                        <div class="col-md-7">
                            <input type="password" class="form-control" id="confirmPassword" placeholder="confirm password" v-model="confirmPassword">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="email">Email</label>
                        <div class="col-md-7">
                            <input type="email" class="form-control" id="email" placeholder="your email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="phone">Telephone</label>
                        <div class="col-md-7">
                            <input type="text" class="form-control" id="phone" placeholder="your telephone" v-model="phone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="phone">Captcha</label>
                        <div class="col-md-3">
                            <input type="text" class="form-control captcha" placeholder="" v-model="captcha">
                        </div>
                        <div v-html="captchaSvg" class="col-md-3"></div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for=""></label>
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-fill" @click="register">Register</button>
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
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            captcha: '',
            captchaSvg: ''
        }
    },
    created() {
        this.$http.get('user/captcha').then(response => {
            if(response.ok) {
                this.captchaSvg = response.body;
            }
        });
    },
    methods: {
        register() {
            if(this.password !== this.confirmPassword) {
                this.$store.commit('openModal', 'Password not match confirmation!');
                return;
            }
            this.$http.post('user/add',{
                username: this.username,
                password: this.password,
                email: this.email,
                phone: this.phone,
                captcha: this.captcha
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Registe Success.');
                    this.$store.commit('updateUser', response.body)
                    this.$router.push('/account/manage');
                }
            }).catch(err => {
                this.$store.commit('openModal', err.body.msg);
            })
        }
    }
}
</script>
<style scoped>
    @import '../style/home.css';
</style>