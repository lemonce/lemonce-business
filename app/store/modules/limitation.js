import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		limitation: {
			info: null,
			bindList: []
		},
	},
	getters: {
		bindList(state) {
			return state.limitation.bindList;
		},
		limitationInfo(state) {
			return state.limitation.info;
		}
	},
	actions: {
		bind({commit, dispatch}, machineCode) {
			return Vue.http.post('limitation/bind', {
				machineCode
			}).then(response => {
				if(response.ok) {
					dispatch('updateState');
				}
			});
		},
		unbind({commit, dispatch}, licenseId) {
			return Vue.http.delete(`limitation/bind/${licenseId}`)
			.then(response => {
				if(response.ok) {
					dispatch('updateState');
				}
			});
		},
		updateState({commit}) {
			return Vue.http.get('limitation/summary').then(response => {
				if(response.ok) {
					commit('updateLimitationInfo', response.body);
					return Vue.http.get('limitation/bind');
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
			state.limitation.bindList = list;
		},
		updateLimitationInfo(state, info) {
			state.limitation.info = info;
		}
	}
};