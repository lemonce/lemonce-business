<template>
    <div>
        <div class="page-head main-bg-color">
            <div class="container">
                <h1>产品购买</h1>
            </div>
        </div>
        <div class="page-content">
            <div class="row">
                <div class="container">
                    <price-panel class="col-sm-3" v-for="item in pricelist"
                            :price="item.price" :key="item.id"
                            :number="item.number"
                            :version="item.version"></price-panel>
                </div>
            </div>
            <div class="row">
                <div class="container">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h1>购买产品</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PricePanel from  '../component/PricePanel.vue'
export default {
    name: 'Product',
    components: {PricePanel},
    data() {
        return {
            pricelist: [
                {id: 1, price: '25.00', number: 10, version: 'v1.2.3'},
                {id: 2, price: '50.00', number: 20, version: 'v1.2.3'},
                {id: 3, price: '100.00', number: 30, version: 'v1.2.3'},
                {id: 4, price: '150.00', number: 50, version: 'v1.2.3'},
            ]
        };
    }
}
</script>
<style lang="postcss" scoped>
.panel {
    border-radius: 0;
    border: 0;
    font-size: 1.2em;
    color: #505050;
    background-color: #f7f7f7;
}
.panel h1 {
    margin-bottom: 0.1rem;
}
</style>