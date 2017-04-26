<template>
    <div class="account-setting col-md-8">
        <h3>Profile</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="username">Username</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="username" v-model="user.username" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="email">Email</label>
                <div class="col-md-8">
                    <input type="email" class="form-control" id="email" placeholder="" v-model="userInfo.email">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">Telephone</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="telephone" placeholder="" v-model="userInfo.phone">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone">Register Date</label>
                <div class="col-md-8">{{user.registerTime | dateFilter}}</div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <input type="button" class="btn btn-fill" @click="submitInfo" value="Submit">
                    <input type="button" class="btn btn-outline" @click="resetInfo" value="Reset">
                </div>
            </div>
        </form>
        <h3>Change password</h3>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-4" for="old_password">Old password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" id="old_password" placeholder="" v-model="userPassword.pwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="new_passwrd">New password</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="new_passwrd" placeholder="" v-model="userPassword.newPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="confirm_password">Confirm new password</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" id="confirm_password" placeholder="" v-model="userPassword.confirmPwd">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4" for="telephone"></label>
                <div class="col-md-8">
                    <input type="button" class="btn btn-fill" @click="changePassword" value="Submit">
                </div>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    name: 'Setting',
    mounted() {
        this.$store.dispatch('user/checkLoggedIn')
        .then(() => {
            this.user = this.$store.getters['user/user'];
            this.userInfo.email = this.user.email;
            this.userInfo.phone = this.user.phone;
        }).catch(err => {
            this.$store.commit('openModal', 'Please Sign In!');
            this.$router.push('/'); 
        });
    },
    data() {
        return {
            user: {},
            userInfo: {
                email: '',
                phone: ''
            },
            userPassword: {
                pwd: '',
                newPwd: '',
                confirmPwd: ''
            }
        }
    },
    methods: {
        resetInfo() {
            this.userInfo.email = this.user.email;
            this.userInfo.phone = this.user.phone;
        },
        submitInfo() {
            this.$store.dispatch('user/update', this.userInfo)
            .then(() => {
                this.$store.commit('openModal', 'Success!');
            });
        },
        changePassword() {
            if(this.userPassword.newPwd !== this.userPassword.confirmPwd) {
				this.$store.commit('openModal', 'Password not match confirmation.');
                return;
			}
            this.$store.dispatch('user/changePassword', this.userPassword)
            .then(() => {
                this.$store.commit('openModal', 'Change Password Success.');
                this.clearPasswordInput();
            }).catch(err => this.$store.commit('openModal', err.body.msg));
        },
        clearPasswordInput() {
            this.userPassword.pwd = '';
            this.userPassword.newPwd = '';
            this.userPassword.confirmPwd = '';
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
.account-setting .btn {
    border-radius: 0;
    margin-right: 2rem;
    width: 7rem;
}
hr {
    border-top: 2px solid rgba(0, 0, 0, .1);
}
</style>