import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		productList: []
	},
	getters: {
		productList(state) {
			return state.productList.filter(product => product.public === 1);
		}
	},
	actions: {
		updateState({commit}) {
			return Vue.http.get('product').then(response => {
				if(response.ok) {
					commit('updateProductList', response.body);
					return true;
				} else {
					throw new Error();
				}
			});
		}
	},
	mutations: {
		updateProductList(state, list) {
			state.productList = list;
		},
	}
};