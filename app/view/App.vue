<template>
<div @click="hideNavBar">
    <nav-bar></nav-bar>
    <div id="main-container" class="container-fluid">
        <router-view></router-view>
    </div>
    <foot-bar id="app-footer"></foot-bar>
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
    methods: {
        hideNavBar() {
            this.$store.commit('hideNavList');
        }
    }
}
</script>
<style lang="postcss" scoped>
#main-container {
    min-height: 500px;
    min-height: calc(100vh - 109px);
    background-color: #f8f8f8;
}
#app-footer {
    border-radius: 0;
    color: #9d9d9d;
    text-align: center;
    margin-bottom: 0;
}
</style>