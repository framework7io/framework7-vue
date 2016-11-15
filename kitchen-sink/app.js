// Import Vue
import Vue from 'vue';

// Import Framework7 Vue Plugin
import Framework7Vue from '../src/framework7-vue.js';

// Import Routes
import Routes from './routes.js';

// Install Plugin
Vue.use(Framework7Vue);

// Init Vue App
var app = new Vue({
    // Root Element
    el: '#app',
    // Framework7 Parameters
    framework7: {
      root: '#app', //Should be same as app el
      animateNavBackIcon: true,
      routes: Routes,
    },
    // Custom App Data
    data: function () {
      return {
        user: {
          name: 'Vladimir',
          lastName: 'Kharlampidi',
          age: 30
        },
        popupOpened: false,
        loginScreenOpened: false,
        pickerOpened: false,
        actionsOpened: false
      };
    },
    // Custom App Methods
    methods: {
      onF7Init: function () {
        console.log('f7-init');
      }
    }
});