import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		user: null
	},
	getters: {
		isLoggedIn(state) {
			return Boolean(state.user);
		},
		user(state) {
			return state.user;
		}
	},
	actions: {
		signIn({commit}, {username, password}) {
			return Vue.http.post('user/login', {
				username, password
			}).then(response => {
				if(response.ok) {
					commit('updateUser', response.body);
				}
			});
		},
		signOut({commit}) {
			return Vue.http.get('user/logout').then(response => {
				if(response.ok) {
					commit('logout');
				}
			});
		},
		create({commit}, user) {
			return Vue.http.post('user', user)
			.then(response => {
				if(response.ok) {
					return true;
				}
			});
		},
		update({commit, state}, userInfo) {
			return Vue.http.put(`user/${state.user.userId}`, userInfo).then(response => {
				if(response.ok) {
					commit('updateUser', response.body);
				}
			});
		},
		changePassword({commit}, userPassword) {
			return Vue.http.patch('user/changepwd', {
				oldpassword: userPassword.pwd,
				password: userPassword.newPwd
			}).then(response => {
				if(response.ok) {
					return true;
				} else {
					throw new Error();
				}
			});
		},
		checkLoggedIn({commit}) {
			return Vue.http.get('user/info').then(response => {
				if(response.ok && response.body) {
					commit('updateUser', response.body);
				}
			});
		},
		getDetail({commit}) {
			return Vue.http.get('user/detail').then(response => {
				if(response.ok && response.body) {
					commit('updateUserDetail', response.body);
				}
			});
		},
		verifyEmail({commit}, eid) {
			return Vue.http.patch('user/verify', {
				eid
			}).then(response => {
				if(response.ok) {
					return true;
				} else {
					throw new Error();
				}
			});
		},
		sendVerifyEmail() {
			return Vue.http.get('user/send').then(response => {
				if(response.ok) {
					return true;
				} else {
					throw new Error();
				}
			});
		},
		sendResetEmail({commit}, email) {
			return Vue.http.post('user/sendreset', {
				email
			}).then(response => {
				if(response.ok) {
					return true;
				} else {
					throw new Error();
				}
			});
		},
		resetPassword({commit}, {token, password}) {
			return Vue.http.post('user/resetpwd',{token, password}).then(response => {
				if(response.ok) {
					return true;
				} else {
					throw new Error();
				}
			});
		}
	},
	mutations: {
		updateUser(state, user) {
			state.user = user;
		},
		logout(state) {
			state.user = null;
		},
		updateUserDetail(state, detail) {
			Object.assign(state.user, detail);
		}
	}
};