<template>
<nav class="navbar navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <button type="button"
                class="navbar-toggle collapsed"
                @click.stop="toggleNav">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="#" class="navbar-brand">Lemonce</a>
        </div>
        <div class="hidden-xs">
            <ul class="nav navbar-nav">
                <li class=""><router-link to="/">Home</router-link></li>
                <!--<li class=""><router-link to="/product">购买套餐</router-link></li>-->
                <li class=""><router-link to="/account/manage">Management</router-link></li>
            </ul>
            <div v-if="isLoggedIn">
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a class="current-user">User: {{user.username}}</a></li>
                    <li class=""><a @click="logout">Sign out</a></li>
                </ul>
            </div>
            <div v-else>
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><router-link to="/register">Sign up</router-link></li>
                </ul>
            </div>
        </div>
        <div class="mobile-nav" v-show="showNavList">
            <ul class="nav navbar-nav">
                <li class=""><router-link to="/">Home</router-link></li>
                <!--<li class=""><router-link to="/product">购买套餐</router-link></li>-->
                <li class=""><router-link to="/account/manage">Management</router-link></li>
            </ul>
            <div v-if="isLoggedIn">
                <ul class="nav navbar-nav navbar-right">
                    <li class=""><a class="current-user">User: {{user.username}}</a></li>
                    <li class=""><a @click="logout">Sign out</a></li>
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
        },
        showNavList() {
            return this.$store.getters.showNavList;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/signOut').then(() => {
                this.$router.push('/');
            });
        },
        toggleNav() {
            this.$store.commit('toggleNavList');
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
    a {
        cursor: pointer;
    }
    .navbar-toggle {
        width: auto;
    }
    @media (max-width: 767px)
    .mobile-nav {
        display: block;
    }
</style>