import Vue from 'vue';
import {
  ValidationProvider, ValidationObserver, extend, configure, localize,
} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import en from 'vee-validate/dist/locale/en.json';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';

localize({
  en: {
    names: {
      email: 'E-mail Address',
      password: 'Password',
    },
  },
  zhTW: {
    names: {
      email: '電子信箱',
      password: '登入密碼',
    },
  },
});
localize({
  en,
  zhTW,
});
const lang = localStorage.getItem('local') || 'zhTW';
localize(lang);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

extend('email', {
  ...email,
  // message: '請輸入完整的電子信箱格式',
});
extend('required', {
  ...required,
  // message: '這是必填欄位',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
