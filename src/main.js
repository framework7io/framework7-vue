// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7Vue from './framework7-vue.js';

// Pages
import ContentBlock from './pages/content-block.vue';
// import Cards from './pages/cards.vue';
// import List from './pages/lists.vue';
// import Accordion from './pages/accordion.vue';
// import Grid from './pages/grid.vue';
// import Preloader from './pages/preloader.vue';
// import Progressbar from './pages/progressbar.vue';
// import Chips from './pages/chips.vue';
// import Swiper from './pages/swiper.vue';
// import Form from './pages/form.vue';

Vue.use(Framework7Vue);

window.app = new Vue({
    el: '#app',
    mounted: function () {

    },
    data: function () {
        return {
            items: [1,2,3]
        };
    },
    framework7: {
        root: '#app',
        routes: [
            {
                path: '/content-block/',
                component: ContentBlock
            },
            {
                path: '/about/',
                component: ContentBlock
            },
            {
                path: 'user/:id/posts/:postId/',
                component: ContentBlock
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

