<template>
<div>
    <nav class="navbar navbar-inverse">
    <div class="container">
            <div class="container-fluid">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">Lemonce</a>
            </div>
            <ul class="nav navbar-nav">
                <li class=""><router-link to="/">首页</router-link></li>
                <li class=""><router-link to="/product">购买套餐</router-link></li>
                <li class=""><router-link to="/account/manage">我的账户</router-link></li>
            </ul>
            <div v-if="isLoggedIn">
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a href="#" class="current-user">当前用户: {{user.username}}</a></li>
                    <li class=""><a href="#" @click="logout">注销</a></li>
                </ul>
            </div>
            <div v-else>
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><router-link to="/register">注册</router-link></li>
                </ul>
            </div>

        </div>
    </div>
    </nav>
</div>
</template>
<script>
export default {
    name: 'NavBar',
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        logout() {
            this.$http.get('user/logout').then(response => {
                if(response.ok) {
                    this.$store.commit('logout');
                    this.$store.commit('openModal', '注销成功!');
                }
            });
        }
    }
}
</script>
<style lang="postcss" scoped>
    .navbar {
        border-radius: 0;
        margin-bottom: 0;
    }
    .current-user {
        cursor: default;
    }
</style>