/* eslint no-param-reassign: "off" */
import Utils from './utils/utils';
import Directives from './utils/directives';
import VueRouter from './utils/vue-router';

// eslint-disable-next-line
IMPORT_COMPONENTS_BUNDLE

export default {
  install(Vue, Framework7) {
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

    // Init F7
    function initFramework7(rootEl, params, routes) {
      const f7Params = Utils.extend({}, (params || {}), { root: rootEl });
      if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

      f7Instance = new Framework7(f7Params);
      f7Ready = true;
      eventHub.$emit('f7Ready', f7Instance);
    }

    // Extend Router
    Framework7.Router.use(VueRouter);

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
          }
          parent = parent.$parent;
        }

        self.$f7route = $route;
        self.$f7router = $router;
      },
      mounted() {
        const self = this;
        if (self === self.$root) {
          initFramework7(self.$root.$el, self.$options.framework7, self.$options.routes);
        }
        if (!self.onF7Ready) return;
        if (f7Ready) self.onF7Ready(f7Instance);
        else {
          eventHub.$on('f7Ready', (f7) => {
            self.onF7Ready(f7);
          });
        }
      },
    });
  },
};
