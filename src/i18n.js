import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/lang/en';
import zhTW from '@/lang/tw';

Vue.use(VueI18n);

const locale = localStorage.getItem('local') || 'zhTW';
const i18n = new VueI18n({
  locale,
  messages: {
    en,
    zhTW,
  },
});

export default i18n;
