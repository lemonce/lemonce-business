<template>
<div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <foot-bar></foot-bar>
    <modal></modal>
</div>
</template>
<script>
import NavBar from '../component/NavBar';
import FootBar from '../component/FootBar';
import Modal from '../component/Modal';
export default {
    name: 'Business',
    components: {NavBar, FootBar, Modal},
    mounted() {
        this.$http.get('user/info').then(response => {
            if(response.ok) {
                this.$store.commit('updateUser', response.body);
            }
        })
    }
}
</script>
<style lang="postcss" scoped>
    
</style>