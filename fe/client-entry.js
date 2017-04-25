import './style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { app, store } from './app';

if(window.__INITIAL_STATE__){
	store.replaceState(window.__INITIAL_STATE__);
}

app.$mount('#app');
