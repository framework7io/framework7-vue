/* eslint no-param-reassign: "off" */
import Utils from './utils/utils';
import Directives from './utils/directives';
import VueRouter from './utils/vue-router';

// eslint-disable-next-line
IMPORT_COMPONENTS_BUNDLE

export default {
  install(Vue, Framework7 = window.Framework7) {
    // Check for F7
    if (typeof Framework7 === 'undefined') {
      throw new Error('Framework7 is undefined, make sure you have passed it as an argument: Vue.use(Framework7Vue, Framework7)');
    }
    // Event Hub
    const eventHub = new Vue();

    // Flags
    let f7Ready = false;
    let f7Instance;

    // Define protos
    Object.defineProperty(Vue.prototype, '$f7', {
      get() {
        return f7Instance;
      },
    });

    const $theme = {};
    Object.defineProperty(Vue.prototype, '$theme', {
      get() {
        return {
          ios: f7Instance ? f7Instance.theme === 'ios' : $theme.ios,
          md: f7Instance ? f7Instance.theme === 'md' : $theme.md,
        };
      },
    });
    Vue.prototype.Dom7 = Framework7.$;
    Vue.prototype.$$ = Framework7.$;
    Vue.prototype.$device = Framework7.device;
    Vue.prototype.$request = Framework7.request;
    Vue.prototype.$utils = Framework7.utils;

    // Init F7
    function initFramework7(rootEl, params, routes) {
      const f7Params = Utils.extend({}, (params || {}), { root: rootEl });
      if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

      f7Instance = new Framework7(f7Params);
      f7Ready = true;
      eventHub.$emit('f7Ready', f7Instance);
    }

    // Extend F7 Router
    Framework7.Router
      .use(VueRouter)
      .use({
        on: {
          routeChange(to, from, router) {
            eventHub.$emit('f7RouteChange', to, from, router);
          },
          routeChanged(to, from, router) {
            eventHub.$emit('f7RouteChanged', to, from, router);
          },
        },
      });

    // Mixin
    Vue.mixin({
      directives: Directives,
      components: {
        // eslint-disable-next-line
        REGISTER_COMPONENTS_BUNDLE
      },
      beforeCreate() {
        const self = this;
        if (self === self.$root) {
          const { theme } = (self.$options.framework7 || {});
          if (theme === 'md') $theme.md = true;
          if (theme === 'ios') $theme.ios = true;
          if (!theme || theme === 'auto') {
            $theme.ios = !!(Framework7.Device || Framework7.device).ios;
            $theme.md = !(Framework7.Device || Framework7.device).ios;
          }
        }

        let $route;
        let $router;
        let parent = self;
        while (parent && !$router && !$route) {
          if (parent.$f7route) $route = parent.$f7route;
          if (parent.$f7router) $router = parent.$f7router;
          else if (parent.f7View) {
            $router = parent.f7View.router;
          } else if (parent.$el && parent.$el.f7View) {
            $router = parent.$el.f7View.router;
          }
          parent = parent.$parent;
        }
        if ($route && $router) {
          self.$f7route = $route;
          self.$f7router = $router;
          self.$f7Route = $route;
          self.$f7Router = $router;
        }
      },
      beforeDestroy() {
        const self = this;
        if (self.$f7RouteChangeCallback) eventHub.$off('f7RouteChange', self.$f7RouteChangeCallback);
        if (self.$f7RouteChangedCallback) eventHub.$off('f7RouteChanged', self.$f7RouteChangedCallback);
      },
      created() {
        const self = this;

        const routeChangeCallback = self.onF7RouteChange || self.F7RouteChange || self.f7RouteChange || self.f7routeChange;
        const routeChangedCallback = self.onF7RouteChanged || self.F7RouteChanged || self.f7RouteChanged || self.f7routeChanged;
        if (!routeChangeCallback && !routeChangedCallback) return;

        function hasRouter(router) {
          return (self.$f7router && router === self.$f7router) ||
                 (!self.$f7router && self.$f7 && self.$f7.router);
        }

        function addRoutesCallbacks() {
          if (routeChangeCallback) {
            self.$f7RouteChangeCallback = function onRouteChange(to, from, router) {
              if (hasRouter(router)) {
                routeChangeCallback(to, from, router);
              }
            };
            eventHub.$on('f7RouteChange', self.$f7RouteChangeCallback);
          }
          if (routeChangedCallback) {
            self.$f7RouteChangedCallback = function onRouteChanged(to, from, router) {
              if (hasRouter(router)) {
                routeChangedCallback(to, from, router);
              }
            };
            eventHub.$on('f7RouteChanged', self.$f7RouteChangedCallback);
          }
        }

        if (!self.$f7) eventHub.$once('f7Ready', addRoutesCallbacks);
        else addRoutesCallbacks();
      },
      mounted() {
        const self = this;
        if (self === self.$root) {
          initFramework7(self.$root.$el, self.$options.framework7, self.$options.routes);
        }
        const callback = self.onF7Ready || self.onF7ready || self.onF7Init || self.onF7init || self.f7Ready || self.f7Init || self.f7ready || self.f7init;
        if (!callback) return;
        if (f7Ready) callback(f7Instance);
        else {
          eventHub.$once('f7Ready', (f7) => {
            callback(f7);
          });
        }
      },
    });
  },
};
