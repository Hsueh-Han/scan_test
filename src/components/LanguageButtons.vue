<template>
  <div>
    <button class="btn btn-sm mr-2"
    :class="{'btn-outline-info': currentLan === 'zhTW', 'btn-light': currentLan !== 'zhTW'}"
    @click="switchLang('zhTW')">中文</button>
    <button class="btn btn-sm"
    :class="{'btn-outline-info': currentLan === 'en', 'btn-light': currentLan !== 'en'}"
    @click="switchLang('en')">English</button>
  </div>
</template>

<script>
import { localize } from 'vee-validate';
import elementLocale from 'element-ui/lib/locale';
import elementEn from 'element-ui/lib/locale/lang/en';
import elementTW from 'element-ui/lib/locale/lang/zh-TW';
import i18n from '../i18n';

export default {
  data() {
    return {
      currentLan: localStorage.getItem('local') || 'zhTW',
    };
  },
  methods: {
    switchLang(lang) {
      localize(lang);
      i18n.locale = lang;
      localStorage.setItem('local', lang);
      this.currentLan = lang;
      if (lang === 'zhTW') {
        elementLocale.use(elementTW);
      } else {
        elementLocale.use(elementEn);
      }
    },
  },
};
</script>
