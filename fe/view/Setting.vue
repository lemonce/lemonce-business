<template>
    <div class="account-setting col-md-8">
        <h3>Profile</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="username">Username</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="username" placeholder="6-12" v-model="user.username" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="email">Email</label>
                <div class="col-md-8">
                    <input type="email" class="form-control" id="email" placeholder="" v-model="email">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">Telephone</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="telephone" placeholder="" v-model="phone">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">Register Date</label>
                <div class="col-md-8">{{user.registerTime | dateFilter}}</div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <button type="submit" class="btn btn-fill" @click="submitInfo">Submit</button>
                    <button type="submit" class="btn btn-outline" @click="resetInfo">Reset</button>
                </div>
            </div>
        </form>
        <h3>Change password</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="old_password">Old password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" id="old_password" placeholder="" v-model="pwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="new_passwrd">New password</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="new_passwrd" placeholder="" v-model="newPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="confirm_password">Confirm new password</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="confirm_password" placeholder="" v-model="confirmPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <button type="submit" class="btn btn-fill" @click="changePassword">Submit</button>
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
                    this.$store.commit('openModal', 'Success!');
                    this.$store.commit('updateUser', response.body);
                }
            });
        },
        changePassword() {
            if(this.newPwd !== this.confirmPwd) {
                this.$store.commit('openModal', 'Password not match confirmation.')
                return;
            }
            this.$http.post('user/changepwd', {
                password: this.pwd,
                newpassword: this.newPwd
            }).then(response => {
                if(response.ok) {
                    this.$store.commit('openModal', 'Change Password Success.');
                    this.pwd = '';
                    this.newPwd = '';
                    this.confirmPwd = '';
                }
            }).catch(err => this.$store.commit('openModal', err.body.msg));
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