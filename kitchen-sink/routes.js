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
import TabsSwipeable from './pages/tabs-swipeable.vue';
import Bars from './pages/bars.vue';
import BarsHide from './pages/bars-hide.vue';
import BarsSubnavbar from './pages/bars-subnavbar.vue';
import BarsTabbar from './pages/bars-tabbar.vue';
import BarsTabbarLabels from './pages/bars-tabbar-labels.vue';
import Fab from './pages/fab.vue';
import FabDial from './pages/fab-dial.vue';
import LoginScreen from './pages/login-screen.vue';
import VirtualList from './pages/virtual-list.vue';
import PhotoBrowser from './pages/photo-browser.vue';
import Modals from './pages/modals.vue';
import TimelineVertical from './pages/timeline-vertical.vue';
import TimelineHorizontal from './pages/timeline-horizontal.vue';
import TimelineCalendar from './pages/timeline-calendar.vue';

import DynamicRoute from './pages/dynamic-route.vue';
import DataBinding from './pages/data-binding.vue';
import DataBindingEdit from './pages/data-binding-edit.vue';

import NestedRoutes from './pages/nested-routes.vue';
import NestedRoutesTabs from'./pages/nested-routes-tabs.vue';
import NestedRoutesTabbar from'./pages/nested-routes-tabbar.vue';
import Tab1 from './pages/nested-routes/tabs/tab1.vue'
import Tab2 from './pages/nested-routes/tabs/tab2.vue'
import Tab3 from './pages/nested-routes/tabs/tab3.vue'
import Tab3AlternateContent from './pages/nested-routes/tabs/tab3-alternate-content.vue'
import TabbarTab1 from './pages/nested-routes/tabs/tabbar-tab1.vue'
import TabbarTab2 from './pages/nested-routes/tabs/tabbar-tab2.vue'
import TabbarTab3 from './pages/nested-routes/tabs/tabbar-tab3.vue'
import TabbarTab3AlternateContent from './pages/nested-routes/tabs/tabbar-tab3-alternate-content.vue'

export default [
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
    path: '/tabs-swipeable/',
    component: TabsSwipeable
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
    path: '/fab/',
    component: Fab
  },
  {
    path: '/fab-dial/',
    component: FabDial
  },
  {
    path: '/login-screen/',
    component: LoginScreen
  },
  {
    path: '/virtual-list/',
    component: VirtualList
  },
  {
    path: '/photo-browser/',
    component: PhotoBrowser
  },
  {
    path: '/modals/',
    component: Modals
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
  },
  {
    path: '/timeline-vertical/',
    component: TimelineVertical
  },
  {
    path: '/timeline-horizontal/',
    component: TimelineHorizontal
  },
  {
    path: '/timeline-calendar/',
    component: TimelineCalendar
  },
  {
    path: '/nested-routes/',
    component: NestedRoutes
  },
  {
    path: '/nested-routes/tabs/',
    component: NestedRoutesTabs,
    tabs: [
      {
        path: '/',
        tabId: 'tab1',
        component: Tab1
      },
      {
        path: '/tab-2/',
        tabId: 'tab2',
        component: Tab2
      },
      {
        path: '/tab-3/',
        tabId: 'tab3',
        routes: [
          {
            path: '/',
            component: Tab3            
          },
          {
            path: '/alternate-content/',
            component: Tab3AlternateContent
          }
        ]
      }
    ]
  },
  {
    path: '/nested-routes/tabbar/',
    component: NestedRoutesTabbar,
    tabs: [
      {
        path: '/',
        tabId: 'tab1',
        component: TabbarTab1
      },
      {
        path: '/tab-2/',
        tabId: 'tab2',
        component: TabbarTab2
      },
      {
        path: '/tab-3/',
        tabId: 'tab3',
        routes: [
          {
            path: '/',
            component: TabbarTab3
          },
          {
            path: '/alternate-content/',
            component: TabbarTab3AlternateContent
          }
        ]
      }
    ]
  }    
];