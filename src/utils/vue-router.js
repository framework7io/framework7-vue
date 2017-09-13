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
      };
      routerVue.$f7route = options.route;
      routerVue.pages.push(pageData);
      routerVue.$nextTick(() => {
        const pageEl = el.children[el.children.length - 1];
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
      if (!pageEl) return;

      routerVue.pages.forEach((page, index) => {
        if (page.el === pageEl) {
          routerVue.pages.splice(index, 1);
        }
      });
    },
    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      if (!tabEl) reject();

      const tabVue = tabEl.__vue__;
      if (!tabVue) reject();

      const id = Utils.now();
      tabVue.$set(tabVue, 'tabContent', {
        id,
        component,
        params: Utils.extend({}, options.route.params),
      });
      tabVue.$nextTick(() => {
        const tabContentEl = tabEl.children[0];
        resolve(tabContentEl);
      });
    },
    removeTabContent(tabEl) {
      if (!tabEl) return;

      const tabVue = tabEl.__vue__;
      if (!tabVue) return;

      tabVue.tabContent = null;
    },
  },
};
