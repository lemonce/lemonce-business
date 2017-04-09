import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './view/App';
import routes from './routes';
import store from './store';
import './style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = '/business';
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
	routes
});

new Vue({   
	el: '#app',
	router,
	store,
	render: renderHtml => renderHtml(App)
});