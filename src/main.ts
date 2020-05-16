import Vue from 'vue';

import Cookies from 'js-cookie';
import 'normalize.css'; // a modern alternative to CSS resets
import Element from 'element-ui';
import '@/styles/element-variables.scss';
import '@/styles/index.scss'; // global css
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import '@/icons';
import '@/permission';

Vue.config.productionTip = false;
Vue.use(Element, {
    // set element-ui default size
    size: Cookies.get('size') || 'medium'
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
