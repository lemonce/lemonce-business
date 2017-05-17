<template>
<div class="common-panel container">
    <div class="panel col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3">
        <div class="register panel-pre"><router-link to="/register">Sign up</router-link></div>
        <div class="panel-header">
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            Sign in
        </div>
        
        <div class="panel-body">
            <form>
                <div class="form-group">
                    <label for="username">Username or Email Address</label>
                    <input type="text" class="form-control" placeholder="Username" v-model="username" id="username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="pull-right panel-pre">
                        <router-link to="/reset_password">Forget Password?</router-link>
                    </div>
                    <input type="password" class="form-control" placeholder="Password" v-model="password" id="password">
                    <span id="helpBlock" :class="helpMessage.style" class="help-text">{{helpMessage.content}}</span>
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-fill" @click="login" value="Sign in" id="loginBtn">
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Home',
    mounted() {
        if(this.$store.getters['user/isLoggedIn']) {
            this.$router.push('/account/manage');
        }
    },
    data() {
        return {
            username: '',
            password: '',
            helpMessage: {
                style: '',
                content: ''
            }
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn'];
        }
    },
    methods: {
        login() {
            this.$store
            .dispatch('user/signIn', {
                username: this.username,
                password: this.password
            }).then(() => {
                this.$router.push('/account/manage');
            }).catch(err => {
                // this.$store.commit('openModal', err.body.msg)
                this.showHelpMessage('text-danger', err.body.msg);
            });
        },
        showHelpMessage(style, content) {
            this.helpMessage.style = style;
            this.helpMessage.content = content;
        }
    }
}
</script>
<style scoped>
    @import '../style/index.css';
    @import '../style/home.css';
</style>