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
import LoginScreen from './components/login-screen.vue';
import LoginScreenTitle from './components/login-screen-title.vue';
import PhotoBrowser from './components/photo-browser.vue';

import Template7Template from './components/template7-template.vue';

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

    // Detect and load Theme
    if (parameters.theme === 'auto') {
      if (window && window.navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) {
        parameters.theme = 'material';
      }
      else {
        parameters.theme = 'ios';
      }
    }
    if (parameters.theme === 'material') {
      parameters.ios = false;
      parameters.material = true;
      Vue.prototype.$ios = false;
      Vue.prototype.$material = true;
    }
    else if (parameters.theme === 'ios') {
      parameters.ios = true;
      parameters.material = false;
      Vue.prototype.$ios = false;
      Vue.prototype.$material = true;
    }
    if (parameters.theme && parameters[parameters.theme + 'Styles']) {
      parameters[parameters.theme + 'Styles'].forEach(function (stylesheet) {
        $$('head').append('<link rel="stylesheet" href="' +stylesheet+ '">');
      });
    }

    // Parse Route
    function parseRoute(str) {
      var parts = [];
      str.split('/').forEach(function (part) {
        if (part !== '') {
          if (part.indexOf(':') === 0) {
            parts.push({name: part.replace(':', '')});
          }
          else parts.push(part);
        }
      });
      return parts;
    }
    // Routes Matching
    function findMatchingRoute(url, routes) {
      var matchingRoute;
      if (!url) return matchingRoute;

      var query = $$.parseUrlQuery(url);
      var hash = url.split('#')[1];
      var params = {};
      var path = url.split('#')[0].split('?')[0];
      var urlParts = path.split('/').filter(function (part) {
        if (part !== '') return part;
      });

      var i, j, k;
      for (i = 0; i < routes.length; i++) {
        if (matchingRoute) continue;
        var route = routes[i];
        var parsedRoute = parseRoute(route.path);
        if (parsedRoute.length !== urlParts.length) continue;
        var matchedParts = 0;
        for (j = 0; j < parsedRoute.length; j++) {
            if (typeof parsedRoute[j] === 'string' && urlParts[j] === parsedRoute[j]) matchedParts ++;
            if (typeof parsedRoute[j] === 'object') {
              params[parsedRoute[j].name] = urlParts[j];
              matchedParts ++;
            }
        }
        if (matchedParts === urlParts.length) {
          matchingRoute = {
            query: query,
            hash: hash,
            params: params,
            url: url,
            path: path,
            route: route
          };
        }
      }
      return matchingRoute;
    }

    // Preroute
    function preroute(view, params, routes) {
      var url = params.url;
      var pageElement = params.pageElement;

      if (url && pageElement || !url || url === '#') {
        return true;
      }
      var matchingRoute = findMatchingRoute(url, routes);
      if (!matchingRoute) return true;
      var pagesVue = view.pagesContainer.__vue__;
      if (!pagesVue) return true;

      var id = new Date().getTime();
      Vue.set(pagesVue.pages, id, {component: matchingRoute.route.component});
      view.container.__vue__.$route = {
        route: matchingRoute.route.path,
        query: matchingRoute.query,
        hash: matchingRoute.hash,
        params: matchingRoute.params,
        url: matchingRoute.url,
        path: matchingRoute.path
      };
      Vue.nextTick(function () {
          var newPage = view.pagesContainer.querySelector('.page:last-child');
          pagesVue.pages[id].pageElement = newPage;
          params.pageElement = newPage;
          if (params.isBack) {
            view.router.back(params);
          }
          else {
            view.router.load(params);
          }
      });

      return false;
    }

    // Init Framework7
    var f7Ready = false,
        f7Instance;

    function initFramework7(f7Params) {
      if (!window.Framework7) return;
      f7Params = f7Params || {};

      // Add Panel Overlay
      if ($$('.panel').length > 0 && $$('.panel-overlay').length === 0) {
        if ($$('.statusbar-overlay').length > 0) {
          $$('<div class="panel-overlay"></div>').insertAfter('.statusbar-overlay');
        }
        else $$(f7Params.root).prepend('<div class="panel-overlay"></div>');
      }

      // Material
      if (typeof f7Params.material === 'undefined' && Vue.prototype.$material) {
        f7Params.material = true;
      }
      // Modify Parameters
      f7Params.routerRemoveTimeout = true;

      // Correct Prerouting
      f7Params.routes = f7Params.routes || [];

      var initialPreroute = f7Params.preroute;
      f7Params.preroute = function (view, params) {
        var passToVueRouter = true;
        if (initialPreroute) {
          passToVueRouter = initialPreroute(view, params);
        }
        if (passToVueRouter) return preroute(view, params, f7Params.routes);
        else return false;
      };

      // Init
      f7Instance = Vue.prototype.$f7 = window.f7 = new window.Framework7(f7Params);

      // Set Flag
      f7Ready = true;

      // Emit event
      eventHub.$emit('f7init', f7Instance);
    }

    // Mixins
    Vue.mixin({
      beforeCreate: function () {
        var self = this;
        if (self.$parent && self.$parent.$parent && self.$parent.$parent.$route) self.$route = self.$parent.$parent.$route;
        if (typeof self.$material === 'undefined') {
          Vue.prototype.$material = (self.$root.$options.framework7 && self.$root.$options.framework7.material) || (self.$f7 && self.$f7.params.material) || parameters.material;
          Vue.prototype.$ios = !Vue.prototype.$material;
        }
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
        'f7-photo-browser': PhotoBrowser,
        't7-template': Template7Template,
      }
    });
  }
};