<template>
    <div class="col-md-3 col-sm-6">
        <div class="panel panel-default text-center">
            <div class="panel-heading">
                <h4>User Quantity: {{number}}</h4>
            </div>
            <div class="panel-body">
                <h2>{{currencySymbol}} {{price}}</h2>
                <i>{{description}}</i>
                <br><br>
                <div class="row">
                    <div class="col-xs-6 col-xs-offset-3">
                        <a type="button" class="btn btn-fill" target="__blank" :href="url">Buy</a>
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
        'currency',
        'description',
        'url'
    ],
    computed: {
        currencySymbol() {
            const currencyMap = {
                'CNY': '¥',
                'USD': '$',
                'JPY': '¥',
                'EUR': '€',
                'GBP': '£'
            };
            return currencyMap[this.currency];
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