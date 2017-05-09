<template>
<nav class="navbar navbar-inverse">
    <div class="container">
        <div class="row">
            <h5>©2014-{{currentYear}} or-change, Co., Ltd. All rights reserved. JIN-ICP14003159-2</h5>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    name: 'FootBar',
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
}
</script>

<style lang="postcss" scoped>
h5 {
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>