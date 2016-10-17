import Framework7 from 'framework7';
import Vue from 'vue';
import VueFramework7 from './vue-framework7.js';

Vue.use(VueFramework7);

new Vue({
    el: '#app',
    mounted: function () {

    },
    framework7: {
    },
    data: {
        items: [
            {
                title: 1,
            },
            {
                title: 2
            }
        ]
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
        onRefresh: function (e) {
            console.log('refresh');
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

