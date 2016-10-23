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
        $$('head').append('<link rel="stylesheet" href="' +stylesheet+ '">')
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

      var id = new Date().getTime();
      Vue.set(pagesVue.pages, id, {component: matchingRoute.route.component});
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
        'f7-statusbar': require('./components/statusbar.vue'),
        'f7-views': require('./components/views.vue'),
        'f7-panel': require('./components/panel.vue'),
        'f7-view': require('./components/view.vue'),
        'f7-pages': require('./components/pages.vue'),
        'f7-page': require('./components/page.vue'),
        'f7-navbar': require('./components/navbar.vue'),
        'f7-nav-left': require('./components/nav-left.vue'),
        'f7-nav-center': require('./components/nav-center.vue'),
        'f7-nav-right': require('./components/nav-right.vue'),
        'f7-subnavbar': require('./components/subnavbar.vue'),
        'f7-toolbar': require('./components/toolbar.vue'),
        'f7-block-title': require('./components/block-title.vue'),
        'f7-block': require('./components/block.vue'),
        'f7-card': require('./components/card.vue'),
        'f7-card-header': require('./components/card-header.vue'),
        'f7-card-footer': require('./components/card-footer.vue'),
        'f7-card-content': require('./components/card-content.vue'),
        'f7-list': require('./components/list.vue'),
        'f7-list-group': require('./components/list-group.vue'),
        'f7-list-item': require('./components/list-item.vue'),
        'f7-list-item-content': require('./components/list-item-content.vue'),
        'f7-list-button': require('./components/list-button.vue'),
        'f7-list-label': require('./components/list-label.vue'),
        'f7-swipeout-actions': require('./components/list-item-swipeout-actions.vue'),
        'f7-swipeout-button': require('./components/list-item-swipeout-button.vue'),
        'f7-accordion-item': require('./components/accordion-item.vue'),
        'f7-accordion-toggle': require('./components/accordion-toggle.vue'),
        'f7-accordion-content': require('./components/accordion-content.vue'),
        'f7-badge': require('./components/badge.vue'),
        'f7-icon': require('./components/icon.vue'),
        'f7-link': require('./components/link.vue'),
        'f7-buttons': require('./components/buttons-segmented.vue'),
        'f7-button': require('./components/button.vue'),
        'f7-grid': require('./components/grid-row.vue'),
        'f7-col': require('./components/grid-col.vue'),
        'f7-preloader': require('./components/preloader.vue'),
        'f7-progressbar': require('./components/progressbar.vue'),
        'f7-label': require('./components/form-label.vue'),
        'f7-input': require('./components/form-input.vue'),
        'f7-switch': require('./components/form-switch.vue'),
        'f7-range': require('./components/form-range.vue'),
        'f7-chip': require('./components/chip.vue'),
        'f7-fab': require('./components/fab.vue'),
        'f7-fab-speed-dial': require('./components/fab-speed-dial.vue'),
        'f7-fab-actions': require('./components/fab-speed-dial-actions.vue'),
        'f7-fab-action': require('./components/fab-speed-dial-action.vue'),
        'f7-swiper': require('./components/swiper.vue'),
        'f7-swiper-slide': require('./components/swiper-slide.vue'),
        'f7-messages': require('./components/messages.vue'),
        'f7-message': require('./components/message.vue'),
        'f7-messagebar': require('./components/messagebar.vue'),
        'f7-searchbar': require('./components/searchbar.vue'),
        'f7-tabs': require('./components/tabs.vue'),
        'f7-tab': require('./components/tab.vue'),
        'f7-popover': require('./components/popover.vue'),
        'f7-popup': require('./components/popup.vue'),
        'f7-login-screen': require('./components/login-screen.vue'),
        'f7-login-screen-title': require('./components/login-screen-title.vue'),
      }
    });
  }
};