import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(ArcoVue);
  document.getElementsByTagName('body')[0].setAttribute('arco-theme', 'dark');
});
