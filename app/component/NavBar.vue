<template>
<div>
    <nav class="navbar navbar-inverse">
    <div class="container">
            <div class="container-fluid">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">Lemonce</a>
            </div>
            <ul class="nav navbar-nav">
                <li class=""><router-link to="/">Home</router-link></li>
                <!--<li class=""><router-link to="/product">购买套餐</router-link></li>-->
                <li class=""><router-link to="account/manage">Management</router-link></li>
            </ul>
            <div v-if="isLoggedIn">
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a href="#" class="current-user">User: {{user.username}}</a></li>
                    <li class=""><a href="#" @click="logout">Sign out</a></li>
                </ul>
            </div>
            <div v-else>
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><router-link to="/register">Sign up</router-link></li>
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
            return this.$store.getters['user/isLoggedIn'];
        },
        user() {
            return this.$store.getters['user/user'];
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/signOut');
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