import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import elementLocale from 'element-ui/lib/locale';
import elementEn from 'element-ui/lib/locale/lang/en';
import elementTW from 'element-ui/lib/locale/lang/zh-TW';

import 'bootstrap';
import './validate';
import i18n from './i18n';
import router from './router';
import App from './App.vue';

// element language
const local = localStorage.getItem('local') || 'zhTW';
if (local === 'zhTW') {
  elementLocale.use(elementTW);
} else {
  elementLocale.use(elementEn);
}

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  i18n,
}).$mount('#app');
