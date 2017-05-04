<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">
                Lemonce {{version}}
            </div>
            <div class="panel-body">
                <h1>￥{{price}}</h1>
                <i>数量: {{number}}</i>
                <br>
                <input type="button" class="btn btn-fill" @click="buyProduct(version, number)" value="立即购买">
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
        'version',
    ],
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        buyProduct(version, number) {
            if(!this.user) {
                //alert login
                this.$store.commit('openModal', 'Please Sign In!');
                return;
            }
            // TODO pay
            // If pay success
            this.addLimitation(version, number);
        },
        addLimitation(version, limitationCount) {
            const purchaseDate = this.getDate();
            this.$http.post(`purchase/add`, {
                purchaseDate, version, limitationCount
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', '购买成功!');
                }
            });
        },
        getDate() {
            const curDate = new Date();
            curDate.setHours(curDate.getHours() + 8);
            return curDate.toISOString().slice(0, 19).replace('T', ' ');
        }
    }
}
</script>
<style lang="postcss" scoped>
.panel {
    border-radius: 0;
    border: 0;
    font-size: 1.2em;
    text-align: center;
    color: #505050;
    background-color: #f7f7f7;
}
.panel .panel-heading {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #505050;
    border: 0;
    color: white;
}
.panel h1 {
    margin-bottom: 0.1rem;
}
.btn {
    border-radius: 0;
    margin-top: 2rem;
    border: 2px solid #6dc7cf;
}
</style>