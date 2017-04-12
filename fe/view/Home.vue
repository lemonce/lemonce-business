<template>
<div class="home">
    <div class="container">
            <div class="login">
                <div class="panel">
                    <div class="register"><router-link to="/register">Sign up</router-link></div>
                    <div class="panel-header">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        Sign in
                    </div>
                    
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Username" v-model="username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" v-model="password">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-fill" @click="login">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>

        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        login() {
            this.$http.post('user/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('updateUser', response.body);
                    this.$router.push('/account/manage');
                }
            }).catch(err => this.$store.commit('openModal', err.body.msg));
        }
    }
}
</script>
<style lang="postcss" scoped>
.home {
    background-color: #f8f8f8;
    height: auto;
    position: absolute;
    bottom: 0;
    top: 50px;
    width: 100%;
}
.login {
    padding-top: 60px;
    width: 480px;
    height: 350px;
    margin: 0 auto;
}
.login .panel {
    padding: 14px 30px;
    border-radius: 4px;
    border: 1px solid #E3E9ED;
}
.login .panel-header {
    margin-bottom: 20px;
    font-size: 2rem;
}
.login .register{
    float: right;
}
.register a {
    color: #4eb4b4;
    cursor: pointer;
}
.login form {
    padding: 0 60px;
}
.login input {
    height: 40px;
    margin: 0 0 1rem;
    border-radius: 0;
    border: 1px solid #71c3c3;
}
.login .captcha {
    width: 50%;
}
.login button {
    width: 100%;
    border-radius: 0;
    border: 2px solid white;
}


</style>