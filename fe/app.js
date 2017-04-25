import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './view/App';
import routes from './routes';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
	routes
});

const app = new Vue({
	router,
	store,
	...App
});

export { app, store };