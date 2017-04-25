<template>
<div class="col-md-10">
    <div class="manage-container">
        <div class="row">
            <div class="manage-bind col-md-9 col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>
                            Bind
                        </h3>
                        <hr>
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label class="control-label col-sm-2 col-xs-3" for="machine_code">Machine Code</label>
                                <div class="col-sm-4 col-xs-9">
                                    <input type="text" class="form-control" id="machine_code" placeholder="" v-model="bindMachineCode">
                                </div>
                                <div class="col-sm-4 col-xs-4">
                                    <input type="button" class="btn btn-fill" @click="bindLimit" value="Bind">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="panel panel-default product-panel col-md-3 col-sm-12" v-if="limitInfo">
                <div class="panel-body">
                    <h3>Product</h3>
                    <div class="panel-label"><label for="">Version:</label> {{limitInfo.version}}</div>
                    <div class="panel-label"><label for="">Total:</label> {{limitInfo.limitCount}}</div>
                    <div class="panel-label"><label for="">Binded:</label> {{limitInfo.bindCount}}</div>
                    <div class="panel-label"><label for="">Unbinded:</label> {{unbindCount}}</div>
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
                            <!--<th>绑定次数</th>-->
                            <th>Bind Date</th>
                            <th>Machine Code</th>
                            <th>Active Code</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(bind,index) in bindList">
                            <!--<td><input type="checkbox"></td>-->
                            <td>{{index+1}}</td>
                            <!--<td>{{limit.bindCnt}}</td>-->
                            <td class="break-line">{{bind.createTime | dateFilter}}</td>
                            <td class="break-line">
                                <span v-if="bind.machineCode">{{bind.machineCode}}</span>
                                <small v-else>none</small>
                            </td>
                            <td class="break-line">
                                <span v-if="bind.activeCode">{{bind.activeCode}}</span>
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
        this.updateLimit();
    },
    data() {
        return {
            bindIndex: '',
            bindMachineCode: ''
        }
    },
    computed: {
        bindList() {
            return this.$store.getters.bindList;
        },
        limitInfo() {
            console.log(this.$store.getters.limitInfo);
            return this.$store.getters.limitInfo;
        },
        unbindCount() {
            return this.limitInfo.limitCount - this.limitInfo.bindCount;
        }
    },
    methods: {
        bindLimit() {
            const bindDate = this.getDate();
            this.$http.post(`limit/bind`, {
                machineCode: this.bindMachineCode
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Bind Success!');
                    this.updateLimit();
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
            const licenseId = this.bindList[index].id;
            this.$http.delete(`limit/bind/${licenseId}`).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Success!');
                    this.updateLimit();
                }
            }).catch(err => this.$store.commit('openModal', err.body.msg));
        },
        chooseLimit(index) {
            const limit = this.bindList[index];
            if(limit.machineCode) return;
            this.bindIndex = index+1;
        },
        getDate() {
            const curDate = new Date();
            curDate.setHours(curDate.getHours() + 8);
            return curDate.toISOString().slice(0, 19).replace('T', ' ');
        },
        updateLimit() {
            this.$http.get('limit/summary').then(response => {
                if(response.ok) {
                    this.$store.commit('updateLimitInfo', response.body);
                }
            });
            this.$http.get('limit/bind').then(response => {
                if(response.ok) {
                    this.$store.commit('updateBindList', response.body);
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