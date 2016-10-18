import Framework7 from 'framework7';
import Vue from 'vue';
import VueFramework7 from './vue-framework7.js';

import About from './pages/about.vue';
import Contacts from './pages/contacts.vue';

Vue.use(VueFramework7);

window.app = new Vue({
    el: '#app',
    mounted: function () {
        var $$ = window.Dom7;
        var self = this;
        var routes = self.$options.framework7.routes;
        self.f7.params.preroute = function (view, params) {
            var url = params.url;
            var pageName = params.pageName;
            if (url && pageName) {
                return true;
            }
            var matchingRoute = false;
            for (var i = 0; i < this.routes.length; i++) {
                var route = this.routes[i];
                if (url === route.path) matchingRoute = route;
            }
            if (matchingRoute) {
                var pagesVue = view.pagesContainer.__vue__;
                pagesVue.pages.push(matchingRoute.component);
                Vue.nextTick(function () {
                    var newPageName = $$(view.pagesContainer).find('.page.cached:last-child').attr('data-page');
                    view.router.load({
                        pageName: newPageName,
                        url: url
                    });
                });
                return false;
            }
            return true;
        };
    },
    framework7: {
        root: '#app',
        material: true,
        routes: [
            {
                path: '/about/',
                component: About
            },
            {
                path: '/contacts/',
                component: Contacts
            }
        ],
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
        onChipDelete: function (e) {
            console.log('chip-delete');
        },
        onF7Init: function () {
            console.log('f7-init');
        }
    }
});

