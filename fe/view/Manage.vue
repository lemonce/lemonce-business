<template>
<div>
    <div class="row">
    <div class="manage-container">
        <div class="row">
            <div class="manage-bind">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>
                            添加绑定
                            <small v-if="bindIndex">序号: {{bindIndex}}</small>
                            <small v-if="bindVersion">版本: {{bindVersion}}</small>
                        </h3>
                        <hr>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label col-md-2" for="machine_code">机器码</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="machine_code" placeholder="" v-model="bindMachineCode">
                                </div>
                                <div class="col-md-4">
                                    <button type="submit" class="btn btn-fill" @click="bindLimit">绑定</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <h3>绑定列表</h3>
        <hr>
        <table class="table table-hover bind-table">
            <thead>
                <tr>
                    <!--<th></th>-->
                    <th>#</th>
                    <th>版本号</th>
                    <th>绑定次数</th>
                    <th>上次绑定时间</th>
                    <th>机器码</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(limit,index) in limitList" @click="chooseLimit(index)">
                    <!--<td><input type="checkbox"></td>-->
                    <td>{{index+1}}</td>
                    <td>{{limit.version}}</td>
                    <td>{{limit.bindCnt}}</td>
                    <td class="break-line">{{limit.bindDate | dateFilter}}</td>
                    <td class="break-line">
                        <span v-if="limit.machineCode">{{limit.machineCode}}</span>
                        <small v-else>无</small>
                    </td>
                    <td v-if="limit.machineCode"><span class="label label-info label-unbind" @click="unbindLimit(index)">解绑</span></td>
                    <td v-else><span class="label label-default">未绑定</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="panel panel-default product-panel">
        <div class="panel-body">
            <h3>已购产品</h3>
            <div class="panel-label"><label for="">已购数量:</label>{{totalCnt}}</div>
            <div class="panel-label"><label for="">已绑定:</label>{{bindedCnt}}</div>
            <div class="panel-label"><label for="">未绑定:</label>{{unbindedCnt}}</div>
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
            const limit = this.limitList[this.bindIndex-1];
            const bindDate = this.getDate();
            this.$http.post(`limit/bind/${limit.limitId}`, {
                bindDate,
                machineCode: this.bindMachineCode
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', '绑定成功!');
                    this.updateLimitList();
                    this.clearBindInfo();
                }
            })
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
                    this.$store.commit('openModal', '解除绑定成功!');
                    this.updateLimitList();
                }
            });
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
            })
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
.manage-container {
    float: left;
    margin-left: -2rem;
}
.product-panel {
    float: left;
}
.manage-bind {
    float: left;
    margin-left: 0;
    width: 55rem;
}

.panel-body h3 {
    margin-left: 3rem;
    margin-top: 0.5rem;
}
.btn-fill {
    border: 2px solid #6dc7cf;
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
    margin-left: 5rem;
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
    border: 2px solid #6dc7cf;
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