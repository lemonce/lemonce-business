import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        limitList: [],
        modalShow: false,
        modalMessage: '操作成功!'
    },
    mutations,
    getters
});

export default store;
