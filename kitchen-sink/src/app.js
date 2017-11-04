/* eslint import/no-extraneous-dependencies: "off" */
import Vue from 'vue';
import Framework7 from 'framework7/dist/js/framework7.esm.bundle';
import { Framework7Vue } from 'framework7-vue'; // eslint-disable-line
import app from './app.vue';
import routes from './routes';

// Install Plugin
Vue.use(Framework7Vue, Framework7);

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: {
    app,
  },
  routes,
});
