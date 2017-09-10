/* eslint import/no-extraneous-dependencies: "off" */
import Vue from 'vue';
import { Framework7Vue } from '../src/framework7-vue';
import App from './app.vue';

import AboutPage from './pages/about.vue';
import AboutNews from './pages/about-news.vue';
import AboutServices from './pages/about-services.vue';
import AboutContacts from './pages/about-contacts.vue';

// Install Plugin
Vue.use(Framework7Vue);

// Init Vue App
new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: {
    App,
  },
  routes: [
    {
      path: '/about/',
      component: AboutPage,
    },
    {
      path: '/about-news/',
      component: AboutNews,
    },
    {
      path: '/about-services/:prop1/:prop2/',
      component: AboutServices,
    },
    {
      path: '/about-contacts/',
      component: AboutContacts,
    },
  ],
});
