<template>
<div>
    <nav-bar></nav-bar>
    <router-view id="main"></router-view>
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
    components: {NavBar, FootBar, Modal}
}
</script>
<style lang="postcss" scoped>
#main {
    min-height: 500px;
    padding-bottom: 100px;
}
</style>