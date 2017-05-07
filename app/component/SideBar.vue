<template>
    <div class="col-md-2">
        <div class="list-group side-bar">
            <router-link  v-for="item in sidelist" class="list-group-item" :to="item.link" :key="item.text">
                {{item.text}}
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SideBar',
    props: ['sidelist']
}
</script>
<style lang="postcss" scoped>
.side-bar .list-group-item {
    border-radius: 0;
    border: 0;
    font-size: 1.2em;
    padding: 1rem 3rem;
    margin-bottom: 1rem;
    color: black;
    background-color: #f5f5f5;
    text-align: center;
}
.side-bar .list-group-item:hover {
    background-color: #efefef;
}
</style>