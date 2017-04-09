<template>
    <div>
        <div class="page-head main-bg-color">
            <div class="container">
                <h1>我的账户</h1>
            </div>
        </div>
        <div class="page-content">
            <div class="row">
                <div class="container">
                    <side-bar :sidelist="sidelist"></side-bar>
                    <router-view></router-view>
                </div>
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
        if(!this.user) {
            this.$router.push('/');
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    data () {
        return {
            sidelist: [
                {link: '/account/manage', text: '产品管理'},
                {link: '/account/setting', text: '账户设置'}
            ]
        }
    },
    methods: {

    }
}
</script>
<style lang="postcss" scoped>

</style>