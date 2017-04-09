<template>
    <div>
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
.side-bar {
    float: left;
    margin-right: 5rem;
}
.side-bar .list-group-item {
    border-radius: 0;
    border: 0;
    font-size: 1.2em;
    padding: 1rem 5rem;
    margin-bottom: 1rem;
    color: black;
    background-color: #f7f7f7;
}
.side-bar .list-group-item:hover {
    background-color: #efefef;
}
</style>