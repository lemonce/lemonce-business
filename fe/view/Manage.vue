<template>
<div class="col-md-10">
    <div class="manage-container">
        <div class="row">
            <div class="manage-bind col-md-9 col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>
                            Bind
                            <small v-if="bindIndex">index: {{bindIndex}}</small>
                            <small v-if="bindVersion">version: {{bindVersion}}</small>
                        </h3>
                        <hr>
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label class="control-label col-sm-2 col-xs-3" for="machine_code">Machine Code</label>
                                <div class="col-sm-4 col-xs-9">
                                    <input type="text" class="form-control" id="machine_code" placeholder="" v-model="bindMachineCode">
                                </div>
                                <div class="col-sm-4 col-xs-4">
                                    <button type="submit" class="btn btn-fill" @click="bindLimit">Bind</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="panel panel-default product-panel col-md-3 col-sm-12">
                <div class="panel-body">
                    <h3>Product</h3>
                    <div class="panel-label"><label for="">Total:</label> {{totalCnt}}</div>
                    <div class="panel-label"><label for="">Binded:</label> {{bindedCnt}}</div>
                    <div class="panel-label"><label for="">Unbinded:</label> {{unbindedCnt}}</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h3>Bind List</h3>
                <hr>
                <table class="table table-hover bind-table">
                    <thead>
                        <tr>
                            <!--<th></th>-->
                            <th>#</th>
                            <th>version</th>
                            <!--<th>绑定次数</th>-->
                            <th>Bind Date</th>
                            <th>Machine Code</th>
                            <th>Active Code</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(limit,index) in limitList" @click="chooseLimit(index)" v-if="limit.machineCode">
                            <!--<td><input type="checkbox"></td>-->
                            <td>{{index+1}}</td>
                            <td>{{limit.version}}</td>
                            <!--<td>{{limit.bindCnt}}</td>-->
                            <td class="break-line">{{limit.bindDate | dateFilter}}</td>
                            <td class="break-line">
                                <span v-if="limit.machineCode">{{limit.machineCode}}</span>
                                <small v-else>none</small>
                            </td>
                            <td class="break-line">
                                <span v-if="limit.activateCode">{{limit.activateCode}}</span>
                                <small v-else>none</small>
                            </td>
                            <td><span class="label label-info label-unbind" @click="unbindLimit(index)">Unbind</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Product',
    mounted() {
        this.updateLimitList();
    },
    data() {
        return {
            bindIndex: '',
            bindVersion: '',
            bindMachineCode: ''
        }
    },
    computed: {
        limitList() {
            return this.$store.getters.limitList;
        },
        totalCnt() {
            return this.$store.getters.totalLimitCnt;
        },
        bindedCnt() {
            return this.$store.getters.bindedLimitCnt;
        },
        unbindedCnt() {
            return this.$store.getters.unbindedLimitCnt;
        }
    },
    methods: {
        bindLimit() {
            const bindDate = this.getDate();
            this.$http.post(`limit/bind`, {
                bindDate,
                machineCode: this.bindMachineCode
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Bind Success!');
                    this.updateLimitList();
                    this.clearBindInfo();
                }
            }).catch(err => this.$store.commit('openModal', err.body.msg));
        },
        clearBindInfo() {
            this.bindIndex = '',
            this.bindVersion = '',
            this.bindMachineCode = ''
        },
        unbindLimit(index) {
            const limitId = this.limitList[index].limitId;
            this.$http.get(`limit/unbind/${limitId}`).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Success!');
                    this.updateLimitList();
                }
            }).catch(err => this.$store.commit('openModal', err.body.msg));
        },
        chooseLimit(index) {
            const limit = this.limitList[index];
            if(limit.machineCode) return;
            this.bindIndex = index+1;
            this.bindVersion = limit.version;
        },
        getDate() {
            const curDate = new Date();
            curDate.setHours(curDate.getHours() + 8);
            return curDate.toISOString().slice(0, 19).replace('T', ' ');
        },
        updateLimitList() {
            return this.$http.get('limit/list').then(response => {
                if(response.ok) {
                    this.$store.commit('updateLimitList', response.body);
                }
            });
        }
    },
    filters: {
        dateFilter(date) {
            return date && date.slice(0, 19).replace('T', ' ');
        }
    }
}
</script>
<style lang="postcss" scoped>
.manage-bind {
    margin-left: 0;
}

.panel-body h3 {
    margin-left: 3rem;
    margin-top: 0.5rem;
}
.btn-fill {
    border: 2px solid #4eb4b4;
    border-radius: 0;
}
.panel-label {
    margin-left: 3rem;
    margin-right: 3rem;
}
.bind-table td,.bind-table th{
    padding: 1rem 1.5rem;
}
.manage-bind input {
    border-radius: 0;
    width: 13rem;
}
.product-panel {
    border: 0;
    background-color: #f7f7f7;
    padding-right: 2rem;
}
.label {
    border-radius: 0;
}
.break-line {
    font-style: italic;
    color: #777777;
}
.label-unbind {
    cursor: pointer;
    background-color: #4eb4b4; 
    border: 2px solid #4eb4b4;
}
.label-unbind:hover {
    background-color: #6dc7cf;
    border: 2px solid #6dc7cf;
}
small {
    font-style: italic;
    color: #777777;
    margin-left: 5rem;
}
</style>