/* eslint import/no-extraneous-dependencies: "off" */
import Vue from 'vue';
import Framework7 from 'framework7';
import { Framework7Vue } from 'framework7-vue'; // eslint-disable-line
import App from './app.vue';

import About from './pages/about.vue';
import AboutTab1 from './pages/about-tab-1.vue';
import AboutTab2 from './pages/about-tab-2.vue';
import AboutTab3 from './pages/about-tab-3.vue';

// Install Plugin
Vue.use(Framework7Vue, Framework7);

// Init Vue App
window.app = new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: {
    App,
  },
  routes: [
    {
      path: '/about/',
      component: About,
      tabs: [
        {
          id: 'tab-1',
          path: '/',
          component: AboutTab1,
        },
        {
          id: 'tab-2',
          path: '/tab-2/',
          component: AboutTab2,
        },
        {
          id: 'tab-3',
          path: '/tab-3/',
          component: AboutTab3,
        },
      ],
    },
  ],
});
