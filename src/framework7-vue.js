/* Components */
import StatusBar from './components/statusbar.vue';
import Panel from './components/panel.vue';
import Views from './components/views.vue';
import View from './components/view.vue';
import Pages from './components/pages.vue';
import Page from './components/page.vue';
import PageContent from './components/page-content.vue';
import Navbar from './components/navbar.vue';
import NavCenter from './components/nav-center.vue';
import NavLeft from './components/nav-left.vue';
import NavRight from './components/nav-right.vue';
import Subnavbar from './components/subnavbar.vue';
import Toolbar from './components/toolbar.vue';
import Card from './components/card.vue';
import CardHeader from './components/card-header.vue';
import CardFooter from './components/card-footer.vue';
import CardContent from './components/card-content.vue';
import ContentBlock from './components/content-block.vue';
import ContentBlockTitle from './components/content-block-title.vue';
import Badge from './components/badge.vue';
import Icon from './components/icon.vue';
import List from './components/list.vue';
import ListGroup from './components/list-group.vue';
import ListItem from './components/list-item.vue';
import ListItemContent from './components/list-item-content.vue';
import ListItemSwipeoutActions from './components/list-item-swipeout-actions.vue';
import ListItemSwipeoutButton from './components/list-item-swipeout-button.vue';
import ListButton from './components/list-button.vue';
import ListLabel from './components/list-label.vue';
import Accordion from './components/accordion.vue';
import AccordionItem from './components/accordion-item.vue';
import AccordionToggle from './components/accordion-toggle.vue';
import AccordionContent from './components/accordion-content.vue';
import ButtonsSegmented from './components/buttons-segmented.vue';
import Link from './components/link.vue';
import Button from './components/button.vue';
import GridRow from './components/grid-row.vue';
import GridCol from './components/grid-col.vue';
import Preloader from './components/preloader.vue';
import Progressbar from './components/progressbar.vue';
import FormLabel from './components/form-label.vue';
import FormInput from './components/form-input.vue';
import FormSwitch from './components/form-switch.vue';
import FormRange from './components/form-range.vue';
import Chip from './components/chip.vue';
import Fab from './components/fab.vue';
import FabSpeedDial from './components/fab-speed-dial.vue';
import FabActions from './components/fab-speed-dial-actions.vue';
import FabAction from './components/fab-speed-dial-action.vue';
import Swiper from './components/swiper.vue';
import SwiperSlide from './components/swiper-slide.vue';
import Messages from './components/messages.vue';
import Message from './components/message.vue';
import Messagebar from './components/messagebar.vue';
import Searchbar from './components/searchbar.vue';
import Tabs from './components/tabs.vue';
import Tab from './components/tab.vue';
import Popover from './components/popover.vue';
import Popup from './components/popup.vue';
import PickerModal from './components/picker-modal.vue';
import LoginScreen from './components/login-screen.vue';
import LoginScreenTitle from './components/login-screen-title.vue';
import Actions from './components/actions.vue';
import ActionsGroup from './components/actions-group.vue';
import ActionsButton from './components/actions-button.vue';
import ActionsLabel from './components/actions-label.vue';
import PhotoBrowser from './components/photo-browser.vue';
import Timeline from './components/timeline.vue';
import TimelineItem from './components/timeline-item.vue';
import TimelineItemChild from './components/timeline-item-child.vue';
import TimelineYear from './components/timeline-year.vue';
import TimelineMonth from './components/timeline-month.vue';

import Template7Template from './components/template7-template.vue';

import Framework7Router from './utils/router';

/* Plugin */
export default {
  install: function (Vue, parameters) {
    // Parameters
    parameters = parameters || {};

    // Hub
    var eventHub = new Vue();

    // Protos
    var $$ = window.Dom7;
    Vue.prototype.Dom7 = $$;
    Vue.prototype.$$ = $$;
    Vue.prototype.Template7 = window.Template7;
    Vue.prototype.$t7 = window.Template7;
    Vue.prototype.$device = window.Framework7.prototype.device;

    // Theme
    var theme = {
      ios: false,
      material: false
    };

    Vue.prototype.$theme = theme;

    if (parameters.theme === 'auto') {
      if (window && window.navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) {
        theme.material = true;
      }
      else {
        theme.ios = true;
      }
    }
    if (parameters.theme === 'material') {
      theme.ios = false;
      theme.material = true;
    }
    else if (parameters.theme === 'ios') {
      theme.ios = true;
      theme.material = false;
    }

    // Init Framework7
    var f7Ready = false,
        f7Instance,
        currentRoute,
        f7Router,
        router;

    function initFramework7(f7Params) {
      if (!window.Framework7) return;
      f7Params = f7Params || {};

      // Material
      if (typeof f7Params.material === 'undefined' && Vue.prototype.$theme.material) {
        f7Params.material = true;
      }      

      // Init
      f7Instance = Vue.prototype.$f7 = window.f7 = new window.Framework7(f7Params);

      router = new Framework7Router(f7Params.routes, f7Instance, $$);      

      router.setRouteChangeHandler(route => {
        currentRoute = route;
        f7Router = route.view.router;
        eventHub.$emit('route-change', route);

        var pagesVue = route.view.pagesContainer.__vue__;
        if (!pagesVue) return true;

        return false;
      });

      // Set Flag
      f7Ready = true;

      // Emit event
      eventHub.$emit('f7init', f7Instance);
    }

    // Mixins
    Vue.mixin({
      beforeCreate: function () {
        var self = this;

        // Route
        Object.defineProperty(self, '$route', {
          get: () => currentRoute,
          enumerable: true,
          configurable: true
        });

        Object.defineProperty(self, '$router', {
          get: () => router,
          enumerable: true,
          configurable: true
        });

        // Theme
        if (theme.ios === false && theme.material === false) {
          if ((self.$root.$options.framework7 && self.$root.$options.framework7.material) || (self.$f7 && self.$f7.params.material) || parameters.theme === 'material') {
            theme.material = true;
          }
          else {
            theme.ios = true;
          }
        }

        eventHub.$on('route-change', function (event) {
          if (self.onRouteChange) self.onRouteChange(event);
        });        
      },
      mounted: function () {
        var self = this;
        if (f7Ready) {
          if (self.onF7Init) self.onF7Init(f7Instance);
          return;
        }
        eventHub.$on('f7init', function (f7Instance) {
          if (self.onF7Init) self.onF7Init(f7Instance);
        });
        if (self === self.$root) {
          initFramework7(self.$options.framework7);
        }
      },
      components: {
        'f7-statusbar': StatusBar,
        'f7-views': Views,
        'f7-panel': Panel,
        'f7-view': View,
        'f7-pages': Pages,
        'f7-page': Page,
        'f7-page-content': PageContent,
        'f7-navbar': Navbar,
        'f7-nav-left': NavLeft,
        'f7-nav-center': NavCenter,
        'f7-nav-right': NavRight,
        'f7-subnavbar': Subnavbar,
        'f7-toolbar': Toolbar,
        'f7-block-title': ContentBlockTitle,
        'f7-content-block-title': ContentBlockTitle,
        'f7-list-block-title': ContentBlockTitle,
        'f7-content-block': ContentBlock,
        'f7-block': ContentBlock,
        'f7-card': Card,
        'f7-card-header': CardHeader,
        'f7-card-footer': CardFooter,
        'f7-card-content': CardContent,
        'f7-list': List,
        'f7-list-group': ListGroup,
        'f7-list-item': ListItem,
        'f7-list-item-content': ListItemContent,
        'f7-list-button': ListButton,
        'f7-list-label': ListLabel,
        'f7-swipeout-actions': ListItemSwipeoutActions,
        'f7-swipeout-button': ListItemSwipeoutButton,
        'f7-accordion': Accordion,
        'f7-accordion-item': AccordionItem,
        'f7-accordion-toggle': AccordionToggle,
        'f7-accordion-content': AccordionContent,
        'f7-badge': Badge,
        'f7-icon': Icon,
        'f7-link': Link,
        'f7-buttons': ButtonsSegmented,
        'f7-segmented': ButtonsSegmented,
        'f7-button': Button,
        'f7-grid': GridRow,
        'f7-col': GridCol,
        'f7-preloader': Preloader,
        'f7-progressbar': Progressbar,
        'f7-label': FormLabel,
        'f7-input': FormInput,
        'f7-switch': FormSwitch,
        'f7-range': FormRange,
        'f7-chip': Chip,
        'f7-fab': Fab,
        'f7-fab-speed-dial': FabSpeedDial,
        'f7-fab-action': FabAction,
        'f7-fab-actions': FabActions,
        'f7-swiper': Swiper,
        'f7-swiper-slide': SwiperSlide,
        'f7-messages': Messages,
        'f7-message': Message,
        'f7-messagebar': Messagebar,
        'f7-searchbar': Searchbar,
        'f7-tabs': Tabs,
        'f7-tab': Tab,
        'f7-popover': Popover,
        'f7-popup': Popup,
        'f7-login-screen': LoginScreen,
        'f7-login-screen-title': LoginScreenTitle,
        'f7-picker-modal': PickerModal,
        'f7-actions': Actions,
        'f7-actions-group': ActionsGroup,
        'f7-actions-label': ActionsLabel,
        'f7-actions-button': ActionsButton,
        'f7-photo-browser': PhotoBrowser,
        'f7-timeline': Timeline,
        'f7-timeline-item': TimelineItem,
        'f7-timeline-item-child': TimelineItemChild,
        'f7-timeline-year': TimelineYear,
        'f7-timeline-month': TimelineMonth,
        't7-template': Template7Template,
      }
    });
  }
};