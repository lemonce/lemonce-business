<template>
    <div class="container">
        <div class="page-head">
            <h2>产品购买</h2>
        </div>
        <div class="row">
            <price-panel v-for="item in productList"
                    :price="item.price" 
                    :key="item.productId"
                    :number="item.increment">
            </price-panel>
        </div>
    </div>
</template>
<script>
import PricePanel from  '../component/PricePanel.vue'
export default {
    name: 'Product',
    components: {PricePanel},
    mounted() {
        this.$store.dispatch('product/updateState');
    },
    computed: {
        productList() {
            console.log(this.$store.getters['product/productList']);
            return this.$store.getters['product/productList'];
        }
    }
}
</script>
<style lang="postcss" scoped></style>