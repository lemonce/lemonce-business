<template>
<div>
    <div class="page-head main-bg-color">
        <div class="container">
            <h1>用户注册</h1>
        </div>
    </div>
    <div class="container register-container">
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-md-3" for="username">用户名</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="username" placeholder="" v-model="username" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="password">密码</label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" id="password" placeholder="" v-model="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="email">邮箱</label>
                        <div class="col-md-6">
                            <input type="email" class="form-control" id="email" placeholder="" v-model="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for="phone">电话</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="phone" placeholder="" v-model="phone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3" for=""></label>
                        <div class="col-md-8">
                            <button type="submit" class="btn btn-outline" @click="register">注册</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            email: '',
            phone: ''
        }
    },
    methods: {
        register() {
            this.$http.post('user/add',{
                username: this.username,
                password: this.password,
                email: this.email,
                phone: this.phone
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', '注册成功!');
                    this.$store.commit('updateUser', response.body)
                    this.$router.push('/product');
                }
            }).catch(err => {
                this.$store.commit('openModal', err.body.msg);
            })
        }
    }
}
</script>
<style lang="postcss" scoped>
.register-container {
    margin-top: 2rem;
}
.register-container .panel {
    border: 0;
    background-color: #f7f7f7;
}
form input {
    border-radius: 0;
}
form button {
    border-radius: 0;
}

</style>