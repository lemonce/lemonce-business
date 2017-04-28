import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';

import user from './modules/user';
import limitation from './modules/limitation';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		modalShow: false,
		modalMessage: '操作成功!',
		showNavList: false
	},
	mutations,
	getters,
	modules: {
		user, limitation
	}
});

export default store;
