<template>
    <div class="account-setting">
        <h3>个人信息</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="username">用户名</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="username" placeholder="" v-model="user.username" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="email">邮箱</label>
                <div class="col-md-8">
                    <input type="email" class="form-control" id="email" placeholder="" v-model="email">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">电话</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="telephone" placeholder="" v-model="phone">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">注册时间</label>
                <div class="col-md-8">{{user.registerTime | dateFilter}}</div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <button type="submit" class="btn btn-fill" @click="submitInfo">修改</button>
                    <button type="submit" class="btn btn-outline" @click="resetInfo">重置</button>
                </div>
            </div>
        </form>
        <h3>密码更改</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="old_password">旧密码</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" id="old_password" placeholder="" v-model="pwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="new_passwrd">新密码</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="new_passwrd" placeholder="" v-model="newPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="confirm_password">重复密码</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="confirm_password" placeholder="" v-model="confirmPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <button type="submit" class="btn btn-fill" @click="changePassword">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    name: 'Setting',
    mounted() {
        this.email = this.user.email;
        this.phone = this.user.phone;
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    data() {
        return {
            email: '',
            phone: '',
            pwd: '',
            newPwd: '',
            confirmPwd: ''
        }
    },
    methods: {
        resetInfo() {
            this.email = this.user.email;
            this.phone = this.user.phone;
        },
        submitInfo() {
            this.$http.post(`user/update/${this.user.userId}`, {
                email: this.email,
                phone: this.phone
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', '修改成功!');
                    this.$store.commit('updateUser', response.body);
                }
            });
        },
        changePassword() {
            if(this.newPwd !== this.confirmPwd) {
                this.openModal('两次密码不一致!');
                return;
            }
            this.$http.post('user/changepwd', {
                password: this.pwd,
                newpassword: this.newPwd
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', '修改密码成功!');
                }
            })
        },
        openModal(message) {
            this.message = message;
            this.showModal = true;
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
.account-setting {
    float: left;
}
.account-setting input {
    border-radius: 0;
    width: 25rem;
}
.account-setting button {
    border-radius: 0;
    margin-right: 2rem;
    width: 7rem;
}
hr {
    border-top: 2px solid rgba(0, 0, 0, .1);
}
</style>