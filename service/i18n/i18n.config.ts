import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


export default new VueI18n({
  locale: 'de', 
  fallbackLocale: 'de',
  messages: {
    en: require('../../locales/en.json'),
    de: require('../../locales/de.json'),
    sk: require('../../locales/sk.json'),
  },
});
