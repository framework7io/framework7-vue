/* eslint no-underscore-dangle: "off" */
import Utils from './utils';

let routerComponentIdCounter = 0;

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = router.$el[0];
      let routerVue;
      function findRouterVue(vueComponent) {
        if (routerVue) return;
        if (
          vueComponent.$vnode &&
          vueComponent.$vnode.tag &&
          vueComponent.$vnode.tag.indexOf('f7-view') >= 0 &&
          vueComponent.pages
        ) {
          routerVue = vueComponent;
          return;
        }
        if (!vueComponent.$children || vueComponent.$children.length === 0) return;
        vueComponent.$children.forEach((childComponent) => {
          findRouterVue(childComponent);
        });
      }

      findRouterVue(el.__vue__);

      if (!routerVue || !routerVue.pages) {
        reject();
        return;
      }
      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
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

        let pageEvents;
        if (component.on) {
          let pageVueFound;
          let pageVue = pageEl.__vue__;
          while (pageVue.$parent && !pageVueFound) {
            if (pageVue.$parent.$el === pageEl) {
              pageVue = pageVue.$parent;
            } else {
              pageVueFound = true;
            }
          }
          if (pageVue) {
            pageEvents = Utils.extend({}, component.on);
            Object.keys(pageEvents).forEach((pageEvent) => {
              pageEvents[pageEvent] = pageEvents[pageEvent].bind(pageVue);
            });
          }
        }

        resolve(pageEl, { on: pageEvents });
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
      let pageVueFound;
      routerVue.pages.forEach((page, index) => {
        if (page.el === pageEl) {
          pageVueFound = true;
          routerVue.pages.splice(index, 1);
        }
      });
      if (!pageVueFound) {
        pageEl.parentNode.removeChild(pageEl);
      }
    },
    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      if (!tabEl) reject();

      const tabVue = tabEl.__vue__;
      if (!tabVue) reject();

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      tabVue.$set(tabVue, 'tabContent', {
        id,
        component,
        params: Utils.extend({}, options.route.params),
      });

      let pageEvents;
      if (component.on) {
        pageEvents = Utils.extend({}, component.on);
        Object.keys(pageEvents).forEach((pageEvent) => {
          pageEvents[pageEvent] = pageEvents[pageEvent].bind(tabVue);
        });
      }

      tabVue.$nextTick(() => {
        const tabContentEl = tabEl.children[0];
        resolve(tabContentEl, { on: pageEvents });
      });
    },
    removeTabContent(tabEl) {
      if (!tabEl) return;

      const tabVue = tabEl.__vue__;
      if (!tabVue) {
        tabEl.innerHTML = ''; // eslint-disable-line
        return;
      }

      tabVue.$set(tabVue, 'tabContent', null);
    },
    modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const modalsEl = document.querySelector('.framework7-modals');
      if (!modalsEl) {
        reject();
        return;
      }

      const modalsVue = modalsEl.__vue__;
      if (!modalsVue) {
        reject();
        return;
      }

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      const modalData = {
        component,
        id,
        params: Utils.extend({}, options.route.params),
      };
      modalsVue.$f7route = options.route;
      modalsVue.modals.push(modalData);

      modalsVue.$nextTick(() => {
        const modalEl = modalsEl.children[modalsEl.children.length - 1];
        modalData.el = modalEl;

        let modalEvents;
        let modalVueFound;
        let modalVue = modalEl.__vue__;
        while (modalVue.$parent && !modalVueFound) {
          if (modalVue.$parent.$el === modalEl) {
            modalVue = modalVue.$parent;
          } else {
            modalVueFound = true;
          }
        }
        if (component.on && modalVue) {
          modalEvents = Utils.extend({}, component.on);
          Object.keys(modalEvents).forEach((pageEvent) => {
            modalEvents[pageEvent] = modalEvents[pageEvent].bind(modalVue);
          });
        }

        modalEl.addEventListener('modal:closed', () => {
          modalsVue.$nextTick(() => {
            router.removeModal(modalEl, modalVue);
          });
        });

        resolve(modalEl, { on: modalEvents });
      });
    },
    removeModal(modalEl, modalVue) {
      if (!modalVue) return;

      const modalsEl = document.querySelector('.framework7-modals');
      if (!modalsEl) return;

      const modalsVue = modalsEl.__vue__;
      if (!modalsVue) return;

      let modalVueFound;
      modalsVue.modals.forEach((modal, index) => {
        if (modal.el === modalEl) {
          modalVueFound = true;
          modalsVue.modals.splice(index, 1);
        }
      });

      if (!modalVueFound) {
        modalEl.parentNode.removeChild(modalEl);
      }
    },
  },
};
