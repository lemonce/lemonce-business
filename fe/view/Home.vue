<template>
<div class="home">
    <div class="section main-bg-color" v-if="!isLoggedIn">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>用户登录</h1>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 login">
                    <form>
                        <div class="form-group">
                            <label for="usernameInput">用户名</label>
                            <input type="text" class="form-control" id="usernameInput" placeholder="用户名" v-model="username">
                        </div>
                        <div class="form-group">
                            <label for="passwordInput">密码</label>
                            <input type="password" class="form-control" id="passwordInput" placeholder="密码" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-default" @click="login">登录</button>
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
            password: '',
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
                }
            })
        }
    }
}
</script>
<style lang="postcss" scoped>
.login form {
    padding-left: 50px;
    padding-right: 50px;
}
.login input {
    border-radius: 0;
    border: 2px solid #71c3c3;;
}
.login button {
    background-color: transparent;
    color: white;
    border-radius: 0;
    border: 2px solid white;
}
.login button:hover {
    background-color: white;
    color: #4eb4b4;
}

</style>