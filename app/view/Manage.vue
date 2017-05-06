<template>
<div class="col-md-10">
    <div class="manage-container">
        <div class="row">
            <div class="manage-bind col-md-9 col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>
                            Bind
                            <small><span :class="helpMessage.style">{{helpMessage.content}}</span></small>
                        </h3>
                        <hr>
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label class="control-label col-sm-2 col-xs-3" for="machine_code">Machine Code</label>
                                <div class="col-sm-4 col-xs-9">
                                    <input type="text" class="form-control" id="machine_code" placeholder="" v-model="bindMachineCode">
                                </div>
                                <div class="col-sm-4 col-xs-9 col-xs-offset-3 col-sm-offset-0">
                                    <input type="button" class="btn btn-fill" @click="bindLimitation" value="Bind">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="panel panel-default product-panel col-md-3 col-sm-12" v-if="limitationInfo">
                <div class="panel-body">
                    <h3>Product</h3>
                    <div class="panel-label"><label for="">Version:</label> {{limitationInfo.version}}</div>
                    <div class="panel-label"><label for="">Total:</label> {{limitationInfo.limitationNumber}}</div>
                    <div class="panel-label"><label for="">Binded:</label> {{limitationInfo.bindNumber}}</div>
                    <div class="panel-label"><label for="">Unbinded:</label> {{unbindNumber}}</div>
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
                            <!--<td>{{limitationInfo.bindCount}}</td>-->
                            <td class="break-line">{{bind.createTime | dateFilter}}</td>
                            <td class="break-line">
                                <span v-if="bind.machineCode">{{bind.machineCode}}</span>
                                <small v-else>none</small>
                            </td>
                            <td class="break-line">
                                <span v-if="bind.activeCode">{{bind.activeCode}}</span>
                                <small v-else>none</small>
                            </td>
                            <td><span class="label label-info label-unbind" @click="unbindLimitation(index)">Unbind</span></td>
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
        this.$store.dispatch('limitation/updateState');
    },
    data() {
        return {
            bindMachineCode: '',
            helpMessage: {
                style: '',
                content: ''
            }
        }
    },
    computed: {
        bindList() {
            return this.$store.getters['limitation/bindList'];
        },
        limitationInfo() {
            return this.$store.getters['limitation/limitationInfo'];
        },
        unbindNumber() {
            return this.limitationInfo.limitationNumber - this.limitationInfo.bindNumber;
        }
    },
    methods: {
        bindLimitation() {
            this.$store.dispatch('limitation/bind', this.bindMachineCode)
            .then(() => {
                this.clearBindInfo();
                this.clearHelpMessage();
                // this.$store.commit('openModal', 'Bind Success');
            }).catch(err => {
                // this.$store.commit('openModal', err.body.msg)
                this.showHelpMessage('text-danger', err.body.msg)
            });
        },
        clearBindInfo() {
            this.bindMachineCode = ''
        },
        unbindLimitation(index) {
            const licenseId = this.bindList[index].id;
            this.$store.dispatch('limitation/unbind', licenseId)
            .then(() => {
                this.clearHelpMessage();
                // this.$store.commit('openModal', 'Success!');)
            }).catch(err => {
                // this.$store.commit('openModal', err.body.msg)
                this.showHelpMessage('text-danger', err.body.msg)
            });
        },
        clearHelpMessage() {
            this.helpMessage.style = '';
            this.helpMessage.content = '';
        },
        showHelpMessage(style, content) {
            this.helpMessage.style = style;
            this.helpMessage.content = content;
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