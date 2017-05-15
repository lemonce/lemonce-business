<template>
    <div class="account-setting col-md-8">
        <h3>Profile</h3>
        <hr>
        <form class="col-md-10">
            <div class="form-group">
                <label class="control-label" for="username">Username</label>
                <div>
                    <input type="text" class="form-control" id="username" v-model="user.username" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="email">Email</label>
                <div>
                    <input type="email" class="form-control" id="email" placeholder="" v-model="userInfo.email" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="telephone">Telephone</label>
                <div>
                    <input type="text" class="form-control" id="telephone" placeholder="" v-model="userInfo.phone">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="telephone">Register Date</label>
                <div id="registerDate">{{user.registerTime | dateFilter}}</div>
                <span id="helpBlock" :class="profileMessage.style" class="help-text">{{profileMessage.content}} &nbsp;</span>
            </div>
            <div class="form-group row">
                <div class="col-md-3">
                    <input type="button" class="btn btn-fill" @click="submitInfo" value="Submit" id="submitBtn">
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-outline" @click="resetInfo" value="Reset" id="resetBtn">    
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
            // this.$store.commit('openModal', 'Please Sign In!');
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
            profileMessage: {
                style: '',
                content: ''
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
                this.showProfileMessage('text-success', 'Update profile success.');
            }).catch(err => {
                this.showProfileMessage('text-danger', 'Update failed, please try again.');
            });
        },
        clearProfileMessage() {
            this.profileMessage.style = '';
            this.profileMessage.content = ''
        },
        showProfileMessage(style, content) {
            this.profileMessage.style = style;
            this.profileMessage.content = content;
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
.account-setting form {
    padding-left: 0;
}
.account-setting input {
    border-radius: 0;
}
hr {
    border-top: 2px solid rgba(0, 0, 0, .1);
}
</style>