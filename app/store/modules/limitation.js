import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		limit: {
			info: null,
			bindList: []
		},
	},
	getters: {
		bindList(state) {
			return state.limit.bindList;
		},
		limitInfo(state) {
			return state.limit.info;
		}
	},
	actions: {
		bind({commit, dispatch}, machineCode) {
			return Vue.http.post('limit/bind', {
				machineCode
			}).then(response => {
				if(response.ok) {
					dispatch('updateState');
				}
			});
		},
		unbind({commit, dispatch}, licenseId) {
			return Vue.http.delete(`limit/bind/${licenseId}`)
			.then(response => {
				if(response.ok) {
					dispatch('updateState');
				}
			});
		},
		updateState({commit}) {
			return Vue.http.get('limit/summary').then(response => {
				if(response.ok) {
					commit('updateLimitInfo', response.body);
					return Vue.http.get('limit/bind');
				}
			}).then(response => {
				if(response.ok) {
					commit('updateBindList', response.body);
				}
			});
		}
	},
	mutations: {
		updateBindList(state, list) {
			state.limit.bindList = list;
		},
		updateLimitInfo(state, info) {
			state.limit.info = info;
		}
	}
};