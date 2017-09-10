/* eslint no-underscore-dangle: "off" */
import Utils from './utils';

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = router.$el[0];
      const vueRouter = el.__vue__;
      if (!vueRouter || !vueRouter.pages) {
        reject();
      }
      const id = Utils.now();
      const pageData = {
        component,
        id,
        params: Utils.extend({}, options.route.params),
        route: Utils.extend({}, options.route),
      };
      vueRouter.$route = options.route;
      vueRouter.pages.push(pageData);
      vueRouter.$nextTick(() => {
        const pageEl = el.childNodes[el.childNodes.length - 1];
        pageData.el = pageEl;
        resolve(pageEl);
      });
    },
    removePage($pageEl) {
      if (!$pageEl) return;
      const router = this;
      const vueRouter = router.$el[0].__vue__;

      let pageEl;
      if ('length' in $pageEl) {
        // Dom7
        if ($pageEl.length === 0) return;
        pageEl = $pageEl[0];
      } else {
        pageEl = $pageEl;
      }

      if ($pageEl.length === 0) return;

      vueRouter.pages.forEach((page, index) => {
        if (page.el === pageEl) {
          vueRouter.pages.splice(index, 1);
        }
      });
    },
  },
};
