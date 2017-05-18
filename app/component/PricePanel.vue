<template>
    <div class="col-md-3 col-sm-6">
        <div class="panel panel-default text-center">
            <div class="panel-heading">
                <h4>Lemonce</h4>
            </div>
            <div class="panel-body">
                <h2>Price: ${{price}}</h2>
                <i>Limitation Number: {{number}}</i>
                <br><br>
                <div class="row">
                    <div class="col-xs-6 col-xs-offset-3">
                        <input type="button" class="btn btn-fill" @click="buyProduct(productId)" value="Buy">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PricePanel',
    props: [
        'price',
        'number',
        'productId',
    ],
    computed: {

    },
    methods: {
        buyProduct(productId) {
            
        }
    }
}
</script>
<style lang="postcss" scoped>
.panel .panel-heading {
    background-color: #505050;
    color: white;
}
@import '../style/index.css';
</style>