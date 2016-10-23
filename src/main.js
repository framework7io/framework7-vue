// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7Vue from './framework7-vue.js';

// Pages
import ContentBlock from './pages/content-block.vue';
import Cards from './pages/cards.vue';
import Lists from './pages/lists.vue';
import Contacts from './pages/contacts.vue';
import Sortable from './pages/sortable.vue';
import Swipeout from './pages/swipeout.vue';
import Accordion from './pages/accordion.vue';
import Grid from './pages/grid.vue';
import Forms from './pages/forms.vue';
import SmartSelect from './pages/smart-select.vue';
import Chips from './pages/chips.vue';
import Preloader from './pages/preloader.vue';
import Progressbar from './pages/progressbar.vue';
import PullToRefresh from './pages/pull-refresh.vue';
import InfiniteScroll from './pages/infinite.vue';
import Swiper from './pages/swiper.vue';
import Messages from './pages/messages.vue';
import Searchbar from './pages/searchbar.vue';
import Tabs from './pages/tabs.vue';
import Bars from './pages/bars.vue';
import BarsHide from './pages/bars-hide.vue';
import BarsSubnavbar from './pages/bars-subnavbar.vue';
import BarsTabbar from './pages/bars-tabbar.vue';
import BarsTabbarLabels from './pages/bars-tabbar-labels.vue';

import DynamicRoute from './pages/dynamic-route.vue';
import DataBinding from './pages/data-binding.vue';
import DataBindingEdit from './pages/data-binding-edit.vue';

Vue.use(Framework7Vue);

window.app = new Vue({
    el: '#app',
    data: function () {
      return {
        user: {
          name: 'Vladimir',
          lastName: 'Kharlampidi',
          age: 30
        }
      };
    },
    framework7: {
      root: '#app',
      animateNavBackIcon: true,
      routes: [
        {
          path: '/content-block/',
          component: ContentBlock
        },
        {
          path: '/cards/',
          component: Cards
        },
        {
          path: '/lists/',
          component: Lists
        },
        {
          path: '/contacts/',
          component: Contacts
        },
        {
          path: '/sortable/',
          component: Sortable
        },
        {
          path: '/swipeout/',
          component: Swipeout
        },
        {
          path: '/accordion/',
          component: Accordion
        },
        {
          path: '/grid/',
          component: Grid
        },
        {
          path: '/forms/',
          component: Forms
        },
        {
          path: '/smart-select/',
          component: SmartSelect
        },
        {
          path: '/chips/',
          component: Chips
        },
        {
          path: '/progressbar/',
          component: Progressbar
        },
        {
          path: '/preloader/',
          component: Preloader
        },
        {
          path: '/pull-to-refresh/',
          component: PullToRefresh
        },
        {
          path: '/infinite/',
          component: InfiniteScroll
        },
        {
          path: '/swiper/',
          component: Swiper
        },
        {
          path: '/messages/',
          component: Messages
        },
        {
          path: '/searchbar/',
          component: Searchbar
        },
        {
          path: '/tabs/',
          component: Tabs
        },
        {
          path: '/bars/',
          component: Bars
        },
        {
          path: '/bars-hide/',
          component: BarsHide
        },
        {
          path: '/bars-subnavbar/',
          component: BarsSubnavbar
        },
        {
          path: '/bars-tabbar/',
          component: BarsTabbar
        },
        {
          path: '/bars-tabbar-labels/',
          component: BarsTabbarLabels
        },
        {
          path: '/user/:id/posts/:post_id/',
          component: DynamicRoute
        },
        {
          path: '/data-binding/',
          component: DataBinding
        },
        {
          path: '/data-binding-edit/',
          component: DataBindingEdit
        }
      ],
    },
    methods: {
      onF7Init: function () {
        console.log('f7-init');
      }
    }
});

