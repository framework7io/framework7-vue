/* eslint no-underscore-dangle: "off" */
import Utils from './utils';

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = router.$el[0];
      const routerVue = el.__vue__;
      if (!routerVue || !routerVue.pages) {
        reject();
      }
      const id = Utils.now();
      const pageData = {
        component,
        id,
        params: Utils.extend({}, options.route.params),
        route: Utils.extend({}, options.route),
      };
      routerVue.$route = options.route;
      routerVue.pages.push(pageData);
      routerVue.$nextTick(() => {
        const pageEl = el.childNodes[el.childNodes.length - 1];
        pageData.el = pageEl;
        resolve(pageEl);
      });
    },
    removePage($pageEl) {
      if (!$pageEl) return;
      const router = this;
      const routerVue = router.$el[0].__vue__;

      let pageEl;
      if ('length' in $pageEl) {
        // Dom7
        if ($pageEl.length === 0) return;
        pageEl = $pageEl[0];
      } else {
        pageEl = $pageEl;
      }

      if ($pageEl.length === 0) return;

      routerVue.pages.forEach((page, index) => {
        if (page.el === pageEl) {
          routerVue.pages.splice(index, 1);
        }
      });
    },
  },
};
