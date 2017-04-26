<template>
    <div>
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
        this.$http.get('user/info').then(response => {
            if(response.ok && response.body) {
                this.$store.commit('updateUser', response.body);
                return;
            } else {
                throw new Error();
            }
        }).catch(err => {
            this.$store.commit('openModal', 'Please Sign In!');
            this.$router.push('/');
        })
        
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