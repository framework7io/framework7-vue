/* eslint no-param-reassign: "off" */
import Utils from './utils';
import VueRouter from './vue-router';

export default {
  install(Vue, Framework7) {
    // Event Hub
    const eventHub = new Vue();

    // Flags
    let f7Ready = false;
    let f7Instance;

    // Define protos
    const $theme = { ios: false, md: false };
    Vue.prototype.$f7 = undefined;
    Vue.prototype.Dom7 = Framework7.$;
    Vue.prototype.$$ = Framework7.$;
    Vue.prototype.$device = (Framework7.Device || Framework7.device);
    Vue.prototype.$theme = $theme;

    // Init F7
    function initFramework7(rootEl, params = {}, routes) {
      const f7Params = Utils.extend({}, params, { root: rootEl });
      if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

      f7Instance = new Framework7(f7Params);
      Vue.prototype.$f7 = f7Instance;
      $theme.ios = f7Instance.theme === 'ios';
      $theme.md = f7Instance.theme === 'md';
      f7Ready = true;
      eventHub.$emit('f7init', f7Instance);
    }

    // Extend Router
    Framework7.Router.use(VueRouter);

    // Mixin
    Vue.mixin({
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
          if (parent.$route) $route = parent.$route;
          if (parent.$router) $router = parent.$router;
          else if (parent.f7View) {
            $router = parent.f7View.router;
          }
          parent = parent.$parent;
        }

        self.$route = $route;
        self.$router = $router;
      },
      mounted() {
        const self = this;
        if (self === self.$root) {
          initFramework7(self.$root.$el, self.$options.framework7, self.$options.routes);
        }
        if (!self.onF7Init) return;
        if (f7Ready) self.onF7Init(f7Instance);
        else {
          eventHub.$on('f7init', (f7) => {
            self.onF7Init(f7);
          });
        }
      },
    });
  },
};
