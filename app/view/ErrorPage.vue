<template>
<div class="common-panel container">
    <div class="panel col-sm-6 col-sm-offset-3">
        <div class="panel-body">
            <div v-if="show">
                <h4>Thank You For Your Registration.</h4>
                <h5>Your account has been actevated successfully.</h5>
                <h5>This page will jump to home page in {{countDown}} seconds.</h5>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'ErrorPage',
    data() {
    },
    mounted() {
        this.$store.dispatch('user/verifyEmail', this.$route.query.eid)
        .then(() => {
            this.show = true;
            let time = setInterval(() => {
                this.countDown--;
                if(this.countDown <= 0) {
                    clearInterval(time);
                    this.$router.push('/');
                }
            }, 1000);
        }).catch(err => this.$store.commit('openModal', 'Email Verification Failed!'))
    }
}
</script>
<style scoped>
    @import '../style/index.css';
</style>