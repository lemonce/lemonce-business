<template>
<div class="page-content">
    <div class="row">
        <div class="container">
            <side-bar :sidelist="sidelist"></side-bar>
            <div class="col-md-10">
                <div class="alert alert-warning alert-dismissible" role="alert" v-show="user.emailVerified==0">
                    <strong>Warning!</strong> Your email address hasn't been verified. Please check the mail in your email box.</br> 
                    <a @click="sendVerifyEmail" class="alert-link">Haven't receive a verification mail? Click here to send another one.</a> <span>{{helpMessage}}</span>
                </div>
            </div>
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
            // this.$store.commit('openModal', 'Please Sign In!');
            this.$router.push('/');
        });
    },
    data () {
        return {
            sidelist: [
                {link: '/account/manage', text: 'Product'},
                {link: '/account/setting', text: 'Setting'},
                {link: '/account/profile', text: 'Profile'}
            ],
            helpMessage: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user'];
        }
    },
    methods: {
        sendVerifyEmail() {
            this.$store.dispatch('user/sendVerifyEmail').then(() => {
                this.helpMessage = "Verification Email has been sent";
            }).catch(err => {
                this.helpMessage = "Fail to send verification email, please click the link to send again";
            });
        }
    }
}
</script>
<style lang="postcss" scoped>

</style>