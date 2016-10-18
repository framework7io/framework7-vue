import Framework7 from 'framework7';
import Vue from 'vue';
import VueFramework7 from './vue-framework7.js';

Vue.use(VueFramework7);

new Vue({
    el: '#app',
    framework7: {
        root: '#app',
    },
    methods: {
        swipeoutDeleted: function (el){
            console.log('swipeoutDeleted');
        },
        onSort: function (e, el) {
            console.log('sort');
        },
        onFocus: function () {
            console.log('focus');
        },
        onChange: function () {
            console.log('change');
        },
        onRefresh: function (e, done) {
            console.log('refresh');
            setTimeout(function () {
                done();
            }, 2000);
        },
        onInfinite: function (e) {
            console.log('infinite');
        },
        onClick: function (e) {
            console.log('click');
        },
        onF7Init: function () {
            console.log('f7-init');
        }
    }
});

