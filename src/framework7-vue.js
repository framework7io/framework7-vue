import StatusBar from './components/statusbar.vue';
import Panel from './components/panel.vue';
import Views from './components/views.vue';
import View from './components/view.vue';
import Pages from './components/pages.vue';
import Page from './components/page.vue';
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
import Link from './components/link.vue';

export default {
  install: function (Vue, parameters) {
    // Hub
    var eventHub = new Vue();

    // Protos
    var $$ = window.Dom7;
    Vue.prototype.Dom7 = $$;
    Vue.prototype.$$ = $$;
    Vue.prototype.Template7 = window.Template7;

    /**
     * From Vue Router
     * https://github.com/vuejs/vue-router
     * By Evan You
     */
    var PATH_REGEXP = new RegExp([
      '(\\\\.)',
      '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
    ].join('|'), 'g')

    function escapeGroup(group) {
      return group.replace(/([=!:$\/()])/g, '\\$1')
    }
    function parseRoute(str) {
      var tokens = []
      var key = 0
      var index = 0
      var path = ''
      var res

      while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0]
        var escaped = res[1]
        var offset = res.index
        path += str.slice(index, offset)
        index = offset + m.length

        // Ignore already escaped sequences.
        if (escaped) {
          path += escaped[1]
          continue
        }

        var next = str[index]
        var prefix = res[2]
        var name = res[3]
        var capture = res[4]
        var group = res[5]
        var modifier = res[6]
        var asterisk = res[7]

        // Push the current path onto the tokens.
        if (path) {
          path = path.split('/').filter(function (el) {
            if (el !== '') tokens.push(el);
          });
          path = ''
        }

        var partial = prefix != null && next != null && next !== prefix
        var repeat = modifier === '+' || modifier === '*'
        var optional = modifier === '?' || modifier === '*'
        var delimiter = res[2] || '/'
        var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

        tokens.push({
          name: name || key++,
          prefix: prefix || '',
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          partial: partial,
          asterisk: !!asterisk,
          pattern: escapeGroup(pattern)
        })
      }

      // Match any characters still remaining.
      if (index < str.length) {
        path += str.substr(index)
      }

      // If the path exists, push it onto the end.
      if (path && path !== '/') {
        path.split('/').filter(function (el) {
          if (el !== '') tokens.push(el)
        });
      }

      return tokens
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
          for (k = 0; k < urlParts.length; k++) {
            if (typeof parsedRoute[j] === 'string' && urlParts[k] === parsedRoute[j]) matchedParts ++;
            if (typeof parsedRoute[j] === 'object') {
              params[parsedRoute[j].name] = urlParts[k];
              matchedParts ++;
            }
          }
        }
        if (matchedParts === urlParts.length) matchingRoute = {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path,
          route: route
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

      pagesVue.pages.push({component: matchingRoute.route.component});
      view.container.__vue__.$route = {
        route: matchingRoute.route.path,
        query: matchingRoute.query,
        hash: matchingRoute.hash,
        params: matchingRoute.params,
        url: matchingRoute.url,
        path: matchingRoute.path
      }
      Vue.nextTick(function () {
          var newPage = view.pagesContainer.querySelector('.page:last-child');
          pagesVue.pages[pagesVue.pages.length - 1].pageElement = newPage;
          params.pageElement = newPage;
          view.router.load(params);
      });
      return false;
    }

    // Init Framework7
    var f7Ready = false,
        f7Instance;

    function initFramework7(f7Params) {
      // Modify Parameters
      f7Params.routerRemoveTimeout = true;

      // Correct Prerouting
      f7Params.routes = f7Params.routes || [];
      f7Params.preroute = function (view, params) {
        return preroute(view, params, f7Params.routes);
      };

      // Init
      f7Instance = Vue.prototype.$f7 = window.f7 = window.$f7 = new window.Framework7(f7Params);

      // Set Flag
      f7Ready = true;

      // Emit event
      eventHub.$emit('f7init', f7Instance);
    }

    // Mixins
    Vue.mixin({
      beforeCreate: function () {
        if (this.$parent && this.$parent.$parent && this.$parent.$parent.$route) this.$route = this.$parent.$parent.$route;
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
        'f7-link': Link,
      }
    });
  }
};