<template>
<div class="page-content">
    <div class="row">
        <div class="container">
            <side-bar :sidelist="sidelist"></side-bar>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
<script>
import SideBar from '../component/SideBar';

export default {
    name: 'Account',
    components: {SideBar},
    mounted() {
        this.$store.dispatch('user/checkLoggedIn').catch(err => {
            this.$store.commit('openModal', 'Please Sign In!');
            this.$router.push('/');
        });
    },
    data () {
        return {
            sidelist: [
                {link: '/account/manage', text: 'Product'},
                {link: '/account/setting', text: 'Account'}
            ]
        }
    },
    methods: {

    }
}
</script>
<style lang="postcss" scoped>

</style>