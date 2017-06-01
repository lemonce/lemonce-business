import Vue from 'vue';

function compare(key) {
	return function(a,b){
		const value1 = a[key];
		const value2 = b[key];
		return value1 - value2;
	};
}

export default {
	namespaced: true,
	state: {
		productList: []
	},
	getters: {
		productList(state) {
			return state.productList.filter(product => product.public === 1).sort(compare('price'));
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