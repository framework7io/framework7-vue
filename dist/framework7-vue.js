/**
 * Framework7 Vue 2.3.0
 * Build full featured iOS & Android apps using Framework7 & Vue
 * http://framework7.io/vue/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 27, 2018
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Framework7Vue = factory());
}(this, (function () { 'use strict';

  var Utils = {
    isTrueProp: function isTrueProp(val) {
      return val === true || val === '';
    },
    isStringProp: function isStringProp(val) {
      return typeof val === 'string' && val !== '';
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    now: function now() {
      return Date.now();
    },
    extend: function extend() {
      var assign, assign$1;

      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];
      var deep = true;
      var to;
      var from;
      if (typeof args[0] === 'boolean') {
        (assign = args, deep = assign[0], to = assign[1]);
        args.splice(0, 2);
        from = args;
      } else {
        (assign$1 = args, to = assign$1[0]);
        args.splice(0, 1);
        from = args;
      }
      for (var i = 0; i < from.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (!deep) {
                to[nextKey] = nextSource[nextKey];
              } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Directives = {};
  ['color', 'color-theme', 'text-color', 'bg-color', 'border-color', 'ripple-color'].forEach(function (name) {
    Directives[("f7-" + name)] = function f7ColorDirective(el, binding) {
      var value = binding.value;
      var oldValue = binding.oldValue;
      if (value === oldValue) { return; }
      if (!value && !oldValue) { return; }
      if (oldValue) {
        el.classList.remove((name + "-" + oldValue));
      }
      if (value) {
        el.classList.add((name + "-" + value));
      }
    };
  });

  /* eslint no-underscore-dangle: "off" */

  var routerComponentIdCounter = 0;

  var VueRouter = {
    proto: {
      pageComponentLoader: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var el = router.$el[0];
        var routerVue;
        function findRouterVue(vueComponent) {
          if (routerVue) { return; }
          if (
            vueComponent.$vnode &&
            vueComponent.$vnode.tag &&
            vueComponent.$vnode.tag.indexOf('f7-view') >= 0 &&
            vueComponent.pages
          ) {
            routerVue = vueComponent;
            return;
          }
          if (!vueComponent.$children || vueComponent.$children.length === 0) { return; }
          vueComponent.$children.forEach(function (childComponent) {
            findRouterVue(childComponent);
          });
        }

        findRouterVue(el.__vue__);

        if (!routerVue || !routerVue.pages) {
          reject();
          return;
        }
        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var pageData = {
          component: component,
          id: id,
          params: Utils.extend({}, options.route.params),
        };
        routerVue.$f7route = options.route;
        routerVue.pages.push(pageData);
        routerVue.$nextTick(function () {
          var pageEl = el.children[el.children.length - 1];
          pageData.el = pageEl;

          var pageEvents;
          if (component.on) {
            var pageVueFound;
            var pageVue = pageEl.__vue__;
            while (pageVue.$parent && !pageVueFound) {
              if (pageVue.$parent.$el === pageEl) {
                pageVue = pageVue.$parent;
              } else {
                pageVueFound = true;
              }
            }
            if (pageVue) {
              pageEvents = Utils.extend({}, component.on);
              Object.keys(pageEvents).forEach(function (pageEvent) {
                pageEvents[pageEvent] = pageEvents[pageEvent].bind(pageVue);
              });
            }
          }

          resolve(pageEl, { on: pageEvents });
        });
      },
      removePage: function removePage($pageEl) {
        if (!$pageEl) { return; }
        var router = this;
        var routerVue = router.$el[0].__vue__;

        var pageEl;
        if ('length' in $pageEl) {
          // Dom7
          if ($pageEl.length === 0) { return; }
          pageEl = $pageEl[0];
        } else {
          pageEl = $pageEl;
        }
        if (!pageEl) { return; }
        var pageVueFound;
        routerVue.pages.forEach(function (page, index) {
          if (page.el === pageEl) {
            pageVueFound = true;
            routerVue.pages.splice(index, 1);
          }
        });
        if (!pageVueFound) {
          pageEl.parentNode.removeChild(pageEl);
        }
      },
      tabComponentLoader: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
        if (!tabEl) { reject(); }

        var tabVue = tabEl.__vue__;
        if (!tabVue) { reject(); }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        tabVue.$set(tabVue, 'tabContent', {
          id: id,
          component: component,
          params: Utils.extend({}, options.route.params),
        });

        var pageEvents;
        if (component.on) {
          pageEvents = Utils.extend({}, component.on);
          Object.keys(pageEvents).forEach(function (pageEvent) {
            pageEvents[pageEvent] = pageEvents[pageEvent].bind(tabVue);
          });
        }

        tabVue.$nextTick(function () {
          var tabContentEl = tabEl.children[0];
          resolve(tabContentEl, { on: pageEvents });
        });
      },
      removeTabContent: function removeTabContent(tabEl) {
        if (!tabEl) { return; }

        var tabVue = tabEl.__vue__;
        if (!tabVue) {
          tabEl.innerHTML = ''; // eslint-disable-line
          return;
        }

        tabVue.$set(tabVue, 'tabContent', null);
      },
      modalComponentLoader: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var modalsEl = document.querySelector('.framework7-modals');
        if (!modalsEl) {
          reject();
          return;
        }

        var modalsVue = modalsEl.__vue__;
        if (!modalsVue) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var modalData = {
          component: component,
          id: id,
          params: Utils.extend({}, options.route.params),
        };
        modalsVue.$f7route = options.route;
        modalsVue.modals.push(modalData);

        modalsVue.$nextTick(function () {
          var modalEl = modalsEl.children[modalsEl.children.length - 1];
          modalData.el = modalEl;

          var modalEvents;
          var modalVueFound;
          var modalVue = modalEl.__vue__;
          while (modalVue.$parent && !modalVueFound) {
            if (modalVue.$parent.$el === modalEl) {
              modalVue = modalVue.$parent;
            } else {
              modalVueFound = true;
            }
          }
          if (component.on && modalVue) {
            modalEvents = Utils.extend({}, component.on);
            Object.keys(modalEvents).forEach(function (pageEvent) {
              modalEvents[pageEvent] = modalEvents[pageEvent].bind(modalVue);
            });
          }

          modalEl.addEventListener('modal:closed', function () {
            modalsVue.$nextTick(function () {
              router.removeModal(modalEl, modalVue);
            });
          });

          resolve(modalEl, { on: modalEvents });
        });
      },
      removeModal: function removeModal(modalEl, modalVue) {
        if (!modalVue) { return; }

        var modalsEl = document.querySelector('.framework7-modals');
        if (!modalsEl) { return; }

        var modalsVue = modalsEl.__vue__;
        if (!modalsVue) { return; }

        var modalVueFound;
        modalsVue.modals.forEach(function (modal, index) {
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

  var Mixins = {
    colorProps: {
      color: String,
      colorTheme: String,
      textColor: String,
      bgColor: String,
      borderColor: String,
      rippleColor: String,
      themeDark: Boolean,
    },
    colorClasses: function colorClasses(self) {
      var obj;

      var color = self.color;
      var colorTheme = self.colorTheme;
      var textColor = self.textColor;
      var bgColor = self.bgColor;
      var borderColor = self.borderColor;
      var rippleColor = self.rippleColor;
      var themeDark = self.themeDark;

      return ( obj = {
        'theme-dark': themeDark
      }, obj[("color-" + color)] = color, obj[("color-theme-" + colorTheme)] = colorTheme, obj[("text-color-" + textColor)] = textColor, obj[("bg-color-" + bgColor)] = bgColor, obj[("border-color-" + borderColor)] = borderColor, obj[("ripple-color-" + rippleColor)] = rippleColor, obj );
    },
    linkIconProps: {
      icon: String,
      iconMaterial: String,
      iconIon: String,
      iconFa: String,
      iconF7: String,
      iconIfMd: String,
      iconIfIos: String,
      iconColor: String,
      iconSize: [String, Number],
    },
    linkRouterProps: {
      back: Boolean,
      external: Boolean,
      force: Boolean,
      animate: Boolean,
      ignoreCache: Boolean,
      pageName: String,
      reloadCurrent: Boolean,
      reloadAll: Boolean,
      reloadPrevious: Boolean,
      routeTabId: String,
      view: String,
    },
    linkRouterAttrs: function linkRouterAttrs(self) {
      var force = self.force;
      var reloadCurrent = self.reloadCurrent;
      var reloadPrevious = self.reloadPrevious;
      var reloadAll = self.reloadAll;
      var animate = self.animate;
      var ignoreCache = self.ignoreCache;
      var routeTabId = self.routeTabId;
      var view = self.view;

      return {
        'data-force': force,
        'data-reload-current': reloadCurrent,
        'data-reload-all': reloadAll,
        'data-reload-previous': reloadPrevious,
        'data-animate': ('animate' in self.$options.propsData) ? animate.toString() : undefined,
        'data-ignore-cache': ignoreCache,
        'data-route-tab-id': routeTabId,
        'data-view': Utils.isStringProp(view) ? view : false,
      };
    },
    linkRouterClasses: function linkRouterClasses(self) {
      var back = self.back;
      var linkBack = self.linkBack;
      var external = self.external;

      return {
        back: back || linkBack,
        external: external,
      };
    },
    linkActionsProps: {
      // Panel
      panelOpen: [Boolean, String],
      panelClose: [Boolean, String],

      // Popup
      popupOpen: [Boolean, String],
      popupClose: [Boolean, String],

      // Actions
      actionsOpen: [Boolean, String],
      actionsClose: [Boolean, String],

      // Popover
      popoverOpen: [Boolean, String],
      popoverClose: [Boolean, String],

      // Login Screen
      loginScreenOpen: [Boolean, String],
      loginScreenClose: [Boolean, String],

      // Picker
      sheetOpen: [Boolean, String],
      sheetClose: [Boolean, String],

      // Sortable
      sortableEnable: [Boolean, String],
      sortableDisable: [Boolean, String],
      sortableToggle: [Boolean, String],
    },
    linkActionsAttrs: function linkActionsAttrs(self) {
      var panelOpen = self.panelOpen;
      var panelClose = self.panelClose;
      var popupOpen = self.popupOpen;
      var popupClose = self.popupClose;
      var actionsOpen = self.actionsOpen;
      var actionsClose = self.actionsClose;
      var popoverOpen = self.popoverOpen;
      var popoverClose = self.popoverClose;
      var loginScreenOpen = self.loginScreenOpen;
      var loginScreenClose = self.loginScreenClose;
      var sheetOpen = self.sheetOpen;
      var sheetClose = self.sheetClose;
      var sortableEnable = self.sortableEnable;
      var sortableDisable = self.sortableDisable;
      var sortableToggle = self.sortableToggle;

      return {
        'data-panel': (Utils.isStringProp(panelOpen) && panelOpen) ||
                      (Utils.isStringProp(panelClose) && panelClose),
        'data-popup': (Utils.isStringProp(popupOpen) && popupOpen) ||
                      (Utils.isStringProp(popupClose) && popupClose),
        'data-actions': (Utils.isStringProp(actionsOpen) && actionsOpen) ||
                      (Utils.isStringProp(actionsClose) && actionsClose),
        'data-popover': (Utils.isStringProp(popoverOpen) && popoverOpen) ||
                        (Utils.isStringProp(popoverClose) && popoverClose),
        'data-sheet': (Utils.isStringProp(sheetOpen) && sheetOpen) ||
                      (Utils.isStringProp(sheetClose) && sheetClose),
        'data-login-screen': (Utils.isStringProp(loginScreenOpen) && loginScreenOpen) ||
                             (Utils.isStringProp(loginScreenClose) && loginScreenClose),
        'data-sortable': (Utils.isStringProp(sortableEnable) && sortableEnable) ||
                         (Utils.isStringProp(sortableDisable) && sortableDisable) ||
                         (Utils.isStringProp(sortableToggle) && sortableToggle),
      };
    },
    linkActionsClasses: function linkActionsClasses(self) {
      var panelOpen = self.panelOpen;
      var panelClose = self.panelClose;
      var popupOpen = self.popupOpen;
      var actionsClose = self.actionsClose;
      var actionsOpen = self.actionsOpen;
      var popupClose = self.popupClose;
      var popoverOpen = self.popoverOpen;
      var popoverClose = self.popoverClose;
      var loginScreenOpen = self.loginScreenOpen;
      var loginScreenClose = self.loginScreenClose;
      var sheetOpen = self.sheetOpen;
      var sheetClose = self.sheetClose;
      var sortableEnable = self.sortableEnable;
      var sortableDisable = self.sortableDisable;
      var sortableToggle = self.sortableToggle;
      return {
        'panel-close': Utils.isTrueProp(panelClose),
        'panel-open': panelOpen || panelOpen === '',
        'popup-close': Utils.isTrueProp(popupClose),
        'popup-open': popupOpen || popupOpen === '',
        'actions-close': Utils.isTrueProp(actionsClose),
        'actions-open': actionsOpen || actionsOpen === '',
        'popover-close': Utils.isTrueProp(popoverClose),
        'popover-open': popoverOpen || popoverOpen === '',
        'sheet-close': Utils.isTrueProp(sheetClose),
        'sheet-open': sheetOpen || sheetOpen === '',
        'login-screen-close': Utils.isTrueProp(loginScreenClose),
        'login-screen-open': loginScreenOpen || loginScreenOpen === '',
        'sortable-enable': Utils.isTrueProp(sortableEnable),
        'sortable-disable': Utils.isTrueProp(sortableDisable),
        'sortable-toggle': sortableToggle === true || sortableToggle.length,
      };
    },
  };

  var f7AccordionContent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-item-content",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-accordion-content',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var AccordionItemProps = Utils.extend(
    {
      opened: Boolean,
    },
    Mixins.colorProps
  );

  var f7AccordionItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-item",class:_vm.classes,on:{"accordion:open":_vm.onOpen,"accordion:opened":_vm.onOpened,"accordion:close":_vm.onClose,"accordion:closed":_vm.onClosed}},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-accordion-item',
    props: AccordionItemProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            'accordion-item-opened': self.opened,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('accordion:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('accordion:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('accordion:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('accordion:closed', event);
      },
    },
  };

  var f7AccordionToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-item-toggle",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-accordion-toggle',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7Accordion = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-list",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-accordion',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var ActionsButtonProps = Utils.extend(
    {
      bold: Boolean,
      close: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7ActionsButton = {
    name: 'f7-actions-button',
    render: function render(c) {
      var self = this;
      var mediaEl;
      if (self.$slots.media && self.$slots.media.length) {
        mediaEl = c('div', {
          staticClass: 'actions-button-media',
        }, self.$slots.media);
      }
      var textEl = c('div', {
        staticClass: 'actions-button-text',
      }, self.$slots.default);

      return c('div', {
        staticClass: 'actions-button',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [mediaEl, textEl]);
    },
    props: ActionsButtonProps,
    computed: {
      classes: function classes() {
        var self = this;

        return Utils.extend({
          'actions-button-bold': self.bold,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onClick: function onClick(event) {
        var self = this;
        var $$ = self.$$;
        if (self.close && self.$f7) {
          self.$f7.actions.close($$(self.$el).parents('.actions-modal'));
        }
        self.$emit('click', event);
      },
    },
  };

  var f7ActionsGroup = {
    name: 'f7-actions-group',
    render: function render(c) {
      var self = this;
      return c('div', { staticClass: 'actions-group' }, self.$slots.default);
    },
  };

  var ActionsLabelProps = Utils.extend(
    {
      bold: Boolean,
    },
    Mixins.colorProps
  );
  var f7ActionsLabel = {
    name: 'f7-actions-label',
    render: function render(c) {
      var self = this;
      return c('div', {
        staticClass: 'actions-label',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, self.$slots.default);
    },
    props: ActionsLabelProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'actions-button-bold': self.bold,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var ActionsProps = Utils.extend(
    {
      opened: Boolean,
      grid: Boolean,
      convertToPopover: Boolean,
      forceToPopover: Boolean,
      target: [String, Object],
    },
    Mixins.colorProps
  );

  var f7Actions = {
    name: 'f7-actions',
    render: function render(c) {
      var self = this;

      return c('div', {
        staticClass: 'actions-modal',
        class: self.classes,
        on: {
          'actions:open': self.onOpen,
          'actions:opened': self.onOpened,
          'actions:close': self.onClose,
          'actions:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.f7Actions) { return; }
        if (opened$1) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
        }
      },
    },
    props: ActionsProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'actions-grid': self.grid,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Actions) { self.f7Actions.destroy(); }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('actions:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('actions:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('actions:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('actions:closed', event);
      },
      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.actions.open(self.$el, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.actions.close(self.$el, animate);
      },
      onF7Ready: function onF7Ready() {
        var self = this;

        var actionsParams = {
          el: self.$el,
          grid: self.grid,
        };
        if (self.target) { actionsParams.targetEl = self.target; }
        if (typeof self.$options.propsData.convertToPopover !== 'undefined') { actionsParams.convertToPopover = self.convertToPopover; }
        if (typeof self.$options.propsData.forceToPopover !== 'undefined') { actionsParams.forceToPopover = self.forceToPopover; }

        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (self.opened) {
          self.f7Actions.open(false);
        }
      },
    },
  };

  var f7Badge = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"badge",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-badge',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7BlockFooter = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-footer",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-block-footer',
    props: Mixins.colorProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7BlockHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-header",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-block-header',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7BlockTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-title",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-block-title',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var BlockProps = Utils.extend(
    {
      inset: Boolean,
      tabletInset: Boolean,
      strong: Boolean,
      tabs: Boolean,
      tab: Boolean,
      tabActive: Boolean,
      accordionList: Boolean,
      noHairlines: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesIos: Boolean,
    },
    Mixins.colorProps
  );

  var f7Block = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block",class:_vm.classes,on:{"tab:show":_vm.onTabShow,"tab:hide":_vm.onTabHide}},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-block',
    props: BlockProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            inset: self.inset,
            'block-strong': self.strong,
            'accordion-list': self.accordionList,
            'tablet-inset': self.tabletInset,
            tabs: self.tabs,
            tab: self.tab,
            'tab-active': self.tabActive,
            'no-hairlines': self.noHairlines,
            'no-hairlines-md': self.noHairlinesMd,
            'no-hairlines-ios': self.noHairlinesIos,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onTabShow: function onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function onTabHide(e) {
        this.$emit('tab:hide', e);
      },
    },
  };

  var IconProps = Utils.extend(
    {
      material: String, // Material Icons
      f7: String, // Framework7 Icons
      ion: String, // Ionicons
      fa: String, // Font Awesome
      icon: String, // Custom
      ifMd: String,
      ifIos: String,
      size: [String, Number],
    },
    Mixins.colorProps
  );

  var f7Icon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{staticClass:"icon",class:_vm.classes,style:({'font-size':_vm.sizeComputed})},[_vm._v(_vm._s(_vm.iconTextComputed)),_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-icon',
    props: IconProps,
    computed: {
      sizeComputed: function sizeComputed() {
        var self = this;
        var size = self.size;
        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = size + "px";
        }
        return size;
      },
      iconTextComputed: function iconTextComputed() {
        var self = this;
        var text = self.material || self.f7;
        if (self.ifMd && self.$theme.md && (self.ifMd.indexOf('material:') >= 0 || self.ifMd.indexOf('f7:') >= 0)) {
          text = self.ifMd.split(':')[1];
        } else if (self.ifIos && self.$theme.ios && (self.ifIos.indexOf('material:') >= 0 || self.ifIos.indexOf('f7:') >= 0)) {
          text = self.ifIos.split(':')[1];
        }
        return text;
      },
      classes: function classes() {
        var classes = {};
        var self = this;
        if (self.ifMd || self.ifIos) {
          var parts = self[self.$theme.md ? 'ifMd' : 'ifIos'].split(':');
          var prop = parts[0];
          var value = parts[1];
          if (prop === 'material' || prop === 'fa' || prop === 'f7') {
            classes.fa = prop === 'fa';
            classes['material-icons'] = prop === 'material';
            classes['f7-icons'] = prop === 'f7';
          }
          if (prop === 'fa' || prop === 'ion') {
            classes[(prop + "-" + value)] = true;
          }
          if (prop === 'icon') {
            classes[value] = true;
          }
        } else {
          classes = {
            'material-icons': this.material,
            'f7-icons': this.f7,
            fa: this.fa,
          };
          if (this.ion) { classes[("ion-" + (this.ion))] = true; }
          if (this.fa) { classes[("fa-" + (this.fa))] = true; }
          if (this.icon) { classes[this.icon] = true; }
        }
        return Utils.extend(classes, Mixins.colorClasses(self));
      },
    },
  };

  var ButtonProps = Utils.extend(
    {
      noFastclick: Boolean,
      noFastClick: Boolean,
      text: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      href: {
        type: [String, Boolean],
        default: '#',
      },

      round: Boolean,
      roundMd: Boolean,
      roundIos: Boolean,
      fill: Boolean,
      fillMd: Boolean,
      fillIos: Boolean,
      big: Boolean,
      bigMd: Boolean,
      bigIos: Boolean,
      small: Boolean,
      smallMd: Boolean,
      smallIos: Boolean,
      raised: Boolean,
      outline: Boolean,
      active: Boolean,
      disabled: Boolean,
    },
    Mixins.colorProps,
    Mixins.linkIconProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  var f7Button = {
    name: 'f7-button',
    components: {
      f7Icon: f7Icon,
    },
    props: ButtonProps,
    render: function render(c) {
      var self = this;
      var iconEl;
      var textEl;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || self.iconIfMd || self.iconIfIos) {
        iconEl = c('f7-icon', {
          props: {
            material: self.iconMaterial,
            ion: self.iconIon,
            fa: self.iconFa,
            f7: self.iconF7,
            icon: self.icon,
            ifMd: self.iconIfMd,
            ifIos: self.iconIfIos,
            color: self.iconColor,
            size: self.iconSize,
          },
        });
      }
      self.classes.button = true;
      var linkEl = c('a', {
        class: self.classes,
        attrs: self.attrs,
        on: {
          click: self.onClick,
        },
      }, [iconEl, textEl, self.$slots.default]);

      return linkEl;
    },
    computed: {
      attrs: function attrs() {
        var self = this;
        var href = self.href;
        var target = self.target;
        var tabLink = self.tabLink;
        var hrefComputed = href;
        if (href === true) { hrefComputed = '#'; }
        if (href === false) { hrefComputed = undefined; } // no href attribute
        return Utils.extend(
          {
            href: hrefComputed,
            target: target,
            'data-tab': Utils.isStringProp(tabLink) && tabLink,
          },
          Mixins.linkRouterAttrs(self),
          Mixins.linkActionsAttrs(self)
        );
      },
      classes: function classes() {
        var self = this;
        var noFastclick = self.noFastclick;
        var noFastClick = self.noFastClick;
        var tabLink = self.tabLink;
        var tabLinkActive = self.tabLinkActive;
        var round = self.round;
        var roundIos = self.roundIos;
        var roundMd = self.roundMd;
        var fill = self.fill;
        var fillIos = self.fillIos;
        var fillMd = self.fillMd;
        var big = self.big;
        var bigIos = self.bigIos;
        var bigMd = self.bigMd;
        var small = self.small;
        var smallIos = self.smallIos;
        var smallMd = self.smallMd;
        var raised = self.raised;
        var active = self.active;
        var outline = self.outline;
        var disabled = self.disabled;

        return Utils.extend(
          {
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive,
            'no-fastclick': noFastclick || noFastClick,

            'button-round': round,
            'button-round-ios': roundIos,
            'button-round-md': roundMd,
            'button-fill': fill,
            'button-fill-ios': fillIos,
            'button-fill-md': fillMd,
            'button-big': big,
            'button-big-ios': bigIos,
            'button-big-md': bigMd,
            'button-small': small,
            'button-small-ios': smallIos,
            'button-small-md': smallMd,
            'button-raised': raised,
            'button-active': active,
            'button-outline': outline,

            disabled: disabled,
          },
          Mixins.colorClasses(self),
          Mixins.linkRouterClasses(self),
          Mixins.linkActionsClasses(self)
        );
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var CardContentProps = Utils.extend(
    {
      padding: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7CardContent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-content",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-card-content',
    props: CardContentProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            'card-content-padding': self.padding,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };

  var f7CardFooter = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-footer",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-card-footer',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7CardHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-card-header',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var CardProps = Utils.extend(
    {
      title: [String, Number],
      content: [String, Number],
      footer: [String, Number],
      padding: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7Card = {
    name: 'f7-card',
    components: {
      f7CardHeader: f7CardHeader,
      f7CardContent: f7CardContent,
      f7CardFooter: f7CardFooter,
    },
    props: CardProps,
    render: function render(c) {
      var self = this;
      var headerEl;
      var contentEl;
      var footerEl;

      if (self.title || (self.$slots && self.$slots.header)) {
        headerEl = c('f7-card-header', [self.title, self.$slots.header]);
      }
      if (self.content || (self.$slots && self.$slots.content)) {
        contentEl = c('f7-card-content', { props: { padding: self.padding } }, [self.content, self.$slots.content]);
      }
      if (self.footer || (self.$slots && self.$slots.footer)) {
        footerEl = c('f7-card-footer', [self.footer, self.$slots.footer]);
      }
      return c('div', { staticClass: 'card', class: self.classes }, [headerEl, contentEl, footerEl, self.$slots.default]);
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var CheckboxProps = Utils.extend({
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
  }, Mixins.colorProps);

  var f7Checkbox = {
    name: 'f7-checkbox',
    props: CheckboxProps,
    render: function render(c) {
      var self = this;

      var inputEl = c('input', {
        attrs: {
          type: 'checkbox',
          name: self.name,
        },
        domProps: {
          value: self.value,
          disabled: self.disabled,
          readonly: self.readonly,
          checked: self.checked,
        },
        on: {
          change: self.onChange,
        },
      });

      var iconEl = c('i', { staticClass: 'icon-checkbox' });

      return c('label', {
        staticClass: 'checkbox',
        class: self.classes,
      }, [inputEl, iconEl, self.$slots.default]);
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            disabled: self.disabled,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
    },
  };

  var ChipProps = Utils.extend({
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
  }, Mixins.colorProps);

  var f7Chip = {
    name: 'f7-chip',
    props: ChipProps,
    render: function render(c) {
      var self = this;
      var mediaEl;
      var labelEl;
      var deleteEl;
      if (self.media || (self.$slots && self.$slots.media)) {
        mediaEl = c('div', { staticClass: 'chip-media', class: self.mediaClasses }, self.media || self.$slots.media);
      }
      if (self.text || (self.$slots && self.$slots.text)) {
        labelEl = c('div', { staticClass: 'chip-label' }, [self.text, self.$slots.text]);
      }
      if (self.deleteable) {
        deleteEl = c('a', {
          staticClass: 'chip-delete',
          attrs: {
            href: '#',
          },
          on: {
            click: self.onDeleteClick,
          },
        });
      }
      return c('div', {
        staticClass: 'chip',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [mediaEl, labelEl, deleteEl]);
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
      mediaClasses: function mediaClasses() {
        var c = {};
        if (this.mediaTextColor) { c[("text-color-" + (this.mediaTextColor))] = true; }
        if (this.mediaBgColor) { c[("bg-color-" + (this.mediaBgColor))] = true; }
        return c;
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
      onDeleteClick: function onDeleteClick(event) {
        this.$emit('delete', event);
      },
    },
  };

  var ColProps = Utils.extend(
    {
      tag: {
        type: String,
        default: 'div',
      },
      width: {
        type: [Number, String],
        default: 'auto',
      },
      tabletWidth: {
        type: [Number, String],
      },
      desktopWidth: {
        type: [Number, String],
      },
    },
    Mixins.colorProps
  );

  var f7Col = {
    name: 'f7-col',
    props: ColProps,
    render: function render(c) {
      var self = this;
      return c(self.tag, {
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        return Utils.extend(
          ( obj = {
            col: self.width === 'auto'
          }, obj[("col-" + (self.width))] = self.width !== 'auto', obj[("tablet-" + (self.tabletWidth))] = self.tabletWidth, obj[("desktop-" + (self.desktopWidth))] = self.desktopWidth, obj ),
          Mixins.colorClasses(self)
        );
      },
    },
  };

  var FabButtonProps = Utils.extend(
    {
      fabClose: Boolean,
    },
    Mixins.colorProps
  );

  var f7FabButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:_vm.classes,on:{"click":_vm.onClick}},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-fab-button',
    props: FabButtonProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            'fab-close': self.fabClose,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var FabButtonsProps = Utils.extend(
    {
      position: {
        type: String,
        default: 'top',
      },
    },
    Mixins.colorProps
  );

  var f7FabButtons = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fab-buttons",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-fab-buttons',
    props: FabButtonsProps,
    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        return Utils.extend(
          ( obj = {}, obj[("fab-buttons-" + (self.position))] = true, obj ),
          Mixins.colorClasses(self)
        );
      },
    },
  };

  var FabProps = Utils.extend(
    {
      morphTo: String,
      href: [Boolean, String],
      position: {
        type: String,
        default: 'right-bottom',
      },
    },
    Mixins.colorProps
  );

  var f7Fab = {
    name: 'f7-fab',
    props: FabProps,
    render: function render(c) {
      var self = this;

      var href = self.href;
      if (href === true) { href = '#'; }
      if (href === false) { href = undefined; } // no href attribute

      var linkChildren = [];
      var fabChildren = [];

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i += 1) {
          var child = self.$slots.default[i];
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) {
            fabChildren.push(child);
          } else {
            linkChildren.push(child);
          }
        }
      }

      var linkEl = c('a', {
        attrs: {
          href: href,
        },
        on: {
          click: self.onClick,
        },
      }, linkChildren);

      fabChildren.push(linkEl);

      return c('div', {
        staticClass: 'fab',
        class: self.classes,
        attrs: {
          'data-morph-to': self.morphTo,
        },
      }, fabChildren);
    },
    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        return Utils.extend(
          ( obj = {
            'fab-morph': self.morphTo
          }, obj[("fab-" + (self.position))] = true, obj ),
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onClick: function onClick(event) {
        var self = this;
        self.$emit('click', event);
      },
    },
  };

  var ToggleProps = Utils.extend({
    init: {
      type: Boolean,
      default: true,
    },
    checked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array],
  }, Mixins.colorProps);

  var f7Toggle = {
    name: 'f7-toggle',
    render: function render(c) {
      var self = this;

      return c('label', {
        staticClass: 'toggle',
        class: Utils.extend(
          {
            disabled: self.disabled,
          },
          Mixins.colorClasses(self)
        ),
      }, [
        c('input', {
          attrs: {
            type: 'checkbox',
            name: self.name,
          },
          domProps: {
            disabled: self.disabled,
            readonly: self.readonly,
            checked: self.checked,
            value: self.value,
          },
          on: {
            change: self.onChange,
          },
        }),
        c('span', { staticClass: 'toggle-icon' }) ]);
    },
    props: ToggleProps,
    watch: {
      checked: function checked(newValue) {
        var self = this;
        if (!self.f7Toggle) { return; }
        self.f7Toggle.checked = newValue;
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) { self.f7Toggle.destroy(); }
    },
    methods: {
      toggle: function toggle() {
        var self = this;
        if (self.f7Toggle && self.f7Toggle.setValue) { self.f7Toggle.toggle(); }
      },
      onChange: function onChange(e) {
        var self = this;
        self.$emit('change', e);
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        self.$nextTick(function () {
          self.f7Toggle = f7.toggle.create({
            el: self.$el,
            on: {
              change: function change(toggle) {
                self.$emit('toggle:change', toggle.checked);
              },
            },
          });
        });
      },
    },
  };

  var RangeProps = Utils.extend({
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [Number, Array, String],
      default: 0,
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    label: {
      type: Boolean,
      default: false,
    },
    dual: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    draggableBar: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  var f7Range = {
    name: 'f7-range',
    render: function render(c) {
      var self = this;

      return c('div', {
        staticClass: 'range-slider',
        class: Utils.extend({
          disabled: self.disabled,
        }, Mixins.colorClasses(self)),
      });
    },
    props: RangeProps,
    watch: {
      value: function value(newValue) {
        var self = this;
        if (!self.f7Range) { return; }
        self.f7Range.setValue(newValue);
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Range && self.f7Range.destroy) { self.f7Range.destroy(); }
    },
    methods: {
      setValue: function setValue(newValue) {
        var self = this;
        if (self.f7Range && self.f7Range.setValue) { self.f7Range.setValue(newValue); }
      },
      getValue: function getValue() {
        var self = this;
        if (self.f7Range && self.f7Range.getValue) {
          return self.f7Range.getValue();
        }
        return undefined;
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        self.$nextTick(function () {
          self.f7Range = f7.range.create({
            el: self.$el,
            value: self.value,
            min: self.min,
            max: self.max,
            step: self.step,
            label: self.label,
            dual: self.dual,
            draggableBar: self.draggableBar,
            on: {
              change: function change(range, value) {
                self.$emit('range:change', value);
              },
              changed: function changed(range, value) {
                self.$emit('range:changed', value);
              },
            },
          });
        });
      },
    },
  };

  var InputProps = Utils.extend(
    {
      // Inputs
      type: String,
      name: String,
      value: [String, Number, Array],
      placeholder: String,
      id: String,
      size: [String, Number],
      accept: [String, Number],
      autocomplete: [String],
      autocorrect: [String],
      autocapitalize: [String],
      spellcheck: [String],
      autofocus: Boolean,
      autosave: String,
      checked: Boolean,
      disabled: Boolean,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],
      maxlength: [String, Number],
      minlength: [String, Number],
      multiple: Boolean,
      readonly: Boolean,
      required: Boolean,
      inputStyle: String,
      pattern: String,
      validate: Boolean,
      tabindex: [String, Number],
      resizable: Boolean,
      clearButton: Boolean,

      // Error, Info
      errorMessage: String,
      info: String,

      // Components
      wrap: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7Input = {
    name: 'f7-input',
    components: {
      f7Toggle: f7Toggle,
      f7Range: f7Range,
    },
    props: InputProps,
    render: function render(c) {
      var inputEl;
      var self = this;
      var attrs = {
        name: self.name,
        type: self.type,
        placeholder: self.placeholder,
        id: self.id,
        value: self.value,
        size: self.size,
        accept: self.accept,
        autocomplete: self.autocomplete,
        autocorrect: self.autocorrect,
        autocapitalize: self.autocapitalize,
        spellcheck: self.spellcheck,
        autofocus: self.autofocus,
        autosave: self.autosave,
        checked: self.checked,
        disabled: self.disabled,
        max: self.max,
        maxlength: self.maxlength,
        min: self.min,
        minlength: self.minlength,
        step: self.step,
        multiple: self.multiple,
        readonly: self.readonly,
        required: self.required,
        pattern: self.pattern,
        validate: self.validate,
        tabindex: self.tabindex,
        'data-error-message': self.errorMessage,
      };
      var on = {
        focus: self.onFocus,
        blur: self.onBlur,
        input: self.onInput,
        change: self.onChange,
        'textarea:resize': self.onTextareaResize,
        'input:notempty': self.onInputNotEmpty,
        'input:empty': self.onInputEmpty,
        'input:clear': self.onInputClear,
      };
      if (self.type === 'select' || self.type === 'textarea' || self.type === 'file') {
        delete attrs.value;
        if (self.type === 'select') {
          inputEl = c('select', {
            attrs: attrs, on: on, style: self.inputStyle, domProps: { value: self.value },
          }, self.$slots.default);
        } else if (self.type === 'file') {
          inputEl = c('input', { attrs: attrs, style: self.inputStyle, on: on }, self.$slots.default);
        } else {
          inputEl = c('textarea', {
            attrs: attrs,
            style: self.inputStyle,
            on: on,
            class: { resizable: self.resizable },
            domProps: { value: self.value },
          }, self.$slots.default);
        }
      } else if ((self.$slots.default && self.$slots.default.length > 0) || !self.type) {
        inputEl = self.$slots.default;
      } else if (self.type === 'toggle') {
        inputEl = c('f7-toggle', { props: attrs, on: on, attrs: { id: attrs.id } });
      } else if (self.type === 'range') {
        on['range:change'] = self.onChange;
        inputEl = c('f7-range', { props: attrs, on: on, attrs: { id: attrs.id } });
      } else {
        inputEl = c('input', {
          attrs: attrs,
          style: self.inputStyle,
          on: on,
          domProps: { value: self.value, checked: self.checked },
        });
      }

      var clearButtonEl;
      if (self.clearButton) {
        clearButtonEl = c('span', { staticClass: 'input-clear-button' });
      }

      var $parent = self.$parent;
      var foundItemContent;
      while ($parent && !foundItemContent) {
        var tag = $parent.$vnode && $parent.$vnode.tag;
        if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
          foundItemContent = $parent;
        }
        $parent = $parent.$parent;
      }
      if (foundItemContent) { foundItemContent.itemInputForced = true; }
      if (foundItemContent && (self.info || (self.$slots.info && self.$slots.info.length))) { foundItemContent.itemInputWithInfoForced = true; }

      var infoEl;
      if (self.info || (self.$slots.info && self.$slots.info.length)) {
        infoEl = c('div', { staticClass: 'item-input-info' }, [self.info, self.$slots.info]);
      }

      var itemInput = self.wrap ? c('div', { staticClass: 'item-input-wrap', class: self.classes }, [inputEl, clearButtonEl, infoEl]) : inputEl;
      return itemInput;
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    watch: {
      value: function value() {
        var self = this;
        if (self.type === 'range' || self.type === 'toggle') { return; }
        var f7 = self.$f7;
        if (!f7) { return; }
        var inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
        self.$nextTick(function () {
          f7.input.checkEmptyState(inputEl);
          if (self.validate) {
            f7.input.validate(inputEl);
          }
          if (self.resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        });
      },
    },
    methods: {
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        var inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
        f7.input.checkEmptyState(inputEl);
        if (self.validate) {
          f7.input.validate(inputEl);
        }
        if (self.resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      },
      onTextareaResize: function onTextareaResize(event) {
        this.$emit('textarea:resize', event);
      },
      onInputNotEmpty: function onInputNotEmpty(event) {
        this.$emit('input:notempty', event);
      },
      onInputEmpty: function onInputEmpty(event) {
        this.$emit('input:empty', event);
      },
      onInputClear: function onInputClear(event) {
        this.$emit('input:clear', event);
      },
      onInput: function onInput(event) {
        this.$emit('input', event);
      },
      onFocus: function onFocus(event) {
        this.$emit('focus', event);
      },
      onBlur: function onBlur(event) {
        this.$emit('blur', event);
      },
      onChange: function onChange(event) {
        var self = this;
        self.$emit('change', event);
      },
    },
  };

  var LabelProps = Utils.extend(
    {
      floating: Boolean,
      inline: Boolean,
    },
    Mixins.colorProps
  );

  var f7Label = {
    name: 'f7-label',
    props: LabelProps,
    render: function render(c) {
      var self = this;

      if (self.inline) {
        var $parent = self.$parent;
        var foundItemContent;
        while ($parent && !foundItemContent) {
          var tag = $parent.$vnode && $parent.$vnode.tag;
          if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
            foundItemContent = $parent;
          }
          $parent = $parent.$parent;
        }
        if (foundItemContent) { foundItemContent.inlineLabelForced = true; }
      }

      return c('div', {
        staticClass: 'item-title',
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            'item-label': !self.floating,
            'item-floating-label': self.floating,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };

  var LinkProps = Utils.extend(
    {
      noLinkClass: Boolean,
      noFastClick: Boolean,
      noFastclick: Boolean,
      text: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      iconOnly: Boolean,
      badge: [String, Number],
      badgeColor: [String],
      iconBadge: [String, Number],
      href: {
        type: [String, Boolean],
        default: '#',
      },
    },
    Mixins.colorProps,
    Mixins.linkIconProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  var f7Link = {
    name: 'f7-link',
    components: {
      f7Badge: f7Badge,
      f7Icon: f7Icon,
    },
    props: LinkProps,
    render: function render(c) {
      var self = this;
      var isTabbarLabel = (self.tabLink || self.tabLink === '') && self.$parent && self.$parent.tabbar && self.$parent.labels;

      var iconEl;
      var textEl;
      var badgeEl;
      var iconBadgeEl;

      if (self.text) {
        if (self.badge) { badgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.badge); }
        textEl = c('span', { class: { 'tabbar-label': isTabbarLabel } }, [self.text, badgeEl]);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || (self.iconIfMd && self.$theme.md) || (self.iconIfIos && self.$theme.ios)) {
        if (self.iconBadge) { iconBadgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.iconBadge); }
        iconEl = c('f7-icon', {
          props: {
            material: self.iconMaterial,
            ion: self.iconIon,
            fa: self.iconFa,
            f7: self.iconF7,
            icon: self.icon,
            ifMd: self.iconIfMd,
            ifIos: self.iconIfIos,
            color: self.iconColor,
            size: self.iconSize,
          },
        }, [iconBadgeEl]);
      }
      if (
        self.iconOnly ||
        (!self.text && self.$slots.default && self.$slots.default.length === 0) ||
        (!self.text && !self.$slots.default)
      ) {
        self.classes['icon-only'] = true;
      }
      self.classes.link = !(self.noLinkClass || isTabbarLabel);
      var linkEl = c('a', {
        class: self.classes,
        attrs: self.attrs,
        on: {
          click: self.onClick,
        },
      }, [iconEl, textEl, self.$slots.default]);
      return linkEl;
    },
    computed: {
      attrs: function attrs() {
        var self = this;
        var href = self.href;
        var target = self.target;
        var tabLink = self.tabLink;
        var hrefComputed = href;
        if (href === true) { hrefComputed = '#'; }
        if (href === false) { hrefComputed = undefined; } // no href attribute
        return Utils.extend(
          {
            href: hrefComputed,
            target: target,
            'data-tab': Utils.isStringProp(tabLink) && tabLink,
          },
          Mixins.linkRouterAttrs(self),
          Mixins.linkActionsAttrs(self)
        );
      },
      classes: function classes() {
        var self = this;
        var noFastclick = self.noFastclick;
        var noFastClick = self.noFastClick;
        var tabLink = self.tabLink;
        var tabLinkActive = self.tabLinkActive;

        return Utils.extend(
          {
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive,
            'no-fastclick': noFastclick || noFastClick,
          },
          Mixins.colorClasses(self),
          Mixins.linkRouterClasses(self),
          Mixins.linkActionsClasses(self)
        );
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var ListButtonProps = Utils.extend(
    {
      noFastclick: Boolean,
      noFastClick: Boolean,
      title: [String, Number],
      text: [String, Number],
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      link: [Boolean, String],
      href: [Boolean, String],
      target: String,
    },
    Mixins.colorProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  var f7ListButton = {
    name: 'f7-list-button',
    render: function render(c) {
      var self = this;
      var linkEl = c('a', {
        staticClass: 'item-link list-button',
        attrs: self.attrs,
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [self.title || self.text, self.$slots.default]);
      return c('li', {}, [linkEl]);
    },
    props: ListButtonProps,
    computed: {
      attrs: function attrs() {
        var self = this;
        // Link Props
        var link = self.link;
        var href = self.href;
        var target = self.target;
        var tabLink = self.tabLink;

        return Utils.extend(
          {
            href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
            target: target,
            'data-tab': Utils.isStringProp(tabLink) && tabLink,
          },
          Mixins.linkRouterAttrs(self),
          Mixins.linkActionsAttrs(self)
        );
      },
      classes: function classes() {
        var self = this;

        var noFastclick = self.noFastclick;
        var noFastClick = self.noFastClick;
        var tabLink = self.tabLink;
        var tabLinkActive = self.tabLinkActive;

        return Utils.extend(
          {
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive,
            'no-fastclick': noFastclick || noFastClick,
          },
          Mixins.colorClasses(self),
          Mixins.linkRouterClasses(self),
          Mixins.linkActionsClasses(self)
        );
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var ListGroupProps = Utils.extend(
    {
      mediaList: Boolean,
      sortable: Boolean,
    },
    Mixins.colorProps
  );

  var f7ListGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"list-group",class:_vm.classes},[_c('ul',[_vm._t("default")],2)])},staticRenderFns: [],
    name: 'f7-list-group',
    props: ListGroupProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
      sortableComputed: function sortableComputed() {
        return this.sortable || this.$parent.sortable;
      },
      mediaListComputed: function mediaListComputed() {
        return this.mediaList || this.$parent.mediaList;
      },
    },
    data: function data() {
      return {};
    },
  };

  var ListIndexProps = Utils.extend(
    {
      init: {
        type: Boolean,
        default: true,
      },
      listEl: [String, Object],
      indexes: {
        type: [String, Array],
        default: 'auto',
      },
      scrollList: {
        type: Boolean,
        default: true,
      },
      label: {
        type: Boolean,
        default: false,
      },
      iosItemHeight: {
        type: Number,
        default: 14,
      },
      mdItemHeight: {
        type: Number,
        default: 14,
      },
    },
    Mixins.colorProps
  );
  var f7ListIndex = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"list-index",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: ListIndexProps,
    name: 'f7-list-index',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy: function beforeDestroy() {
      if (!this.init) { return; }
      if (this.f7ListIndex && this.f7ListIndex.destroy) {
        this.f7ListIndex.destroy();
      }
    },
    watch: {
      indexes: function indexes() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.params.indexes = this.indexes;
        this.update();
      },
    },
    methods: {
      update: function update() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.update();
      },
      scrollListToIndex: function scrollListToIndex(itemContent) {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.scrollListToIndex(itemContent);
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        var $el = self.$el;
        var listEl = self.listEl;
        var indexes = self.indexes;
        var iosItemHeight = self.iosItemHeight;
        var mdItemHeight = self.mdItemHeight;
        var scrollList = self.scrollList;
        var label = self.label;
        self.f7ListIndex = f7.listIndex.create({
          el: $el,
          listEl: listEl,
          indexes: indexes,
          iosItemHeight: iosItemHeight,
          mdItemHeight: mdItemHeight,
          scrollList: scrollList,
          label: label,
          on: {
            select: function select(index, itemContent, itemIndex) {
              self.$emit('listindex:select', itemContent, itemIndex);
            },
          },
        });
      },
    },
  };

  var f7ListItemCell = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-cell",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-list-item-cell',
    props: Mixins.colorProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var ListItemContentProps = Utils.extend(
    {
      title: [String, Number],
      text: [String, Number],
      media: String,
      subtitle: [String, Number],
      header: [String, Number],
      footer: [String, Number],
      after: [String, Number],
      badge: [String, Number],
      badgeColor: String,
      mediaList: Boolean,
      itemInput: Boolean,
      itemInputWithInfo: Boolean,
      inlineLabel: Boolean,

      checkbox: Boolean,
      checked: Boolean,
      radio: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
    },
    Mixins.colorProps
  );

  var f7ListItemContent = {
    name: 'f7-list-item-content',
    components: {
      f7Badge: f7Badge,
    },
    props: ListItemContentProps,
    render: function render(c) {
      var self = this;
      var slotsContentStart = [];
      var slotsContent = [];
      var slotsContentEnd = [];
      var slotsInnerStart = [];
      var slotsInner = [];
      var slotsInnerEnd = [];
      var slotsAfterStart = [];
      var slotsAfter = [];
      var slotsAfterEnd = [];
      var slotsMedia = [];
      var slotsBeforeTitle = [];
      var slotsTitle = [];
      var slotsAfterTitle = [];
      var slotsSubtitle = [];
      var slotsText = [];
      var slotsHeader = [];
      var slotsFooter = [];

      var ref = [];
      var titleEl = ref[0];
      var afterWrapEl = ref[1];
      var afterEl = ref[2];
      var badgeEl = ref[3];
      var innerEl = ref[4];
      var titleRowEl = ref[5];
      var subtitleEl = ref[6];
      var textEl = ref[7];
      var mediaEl = ref[8];
      var inputEl = ref[9];
      var inputIconEl = ref[10];
      var headerEl = ref[11];
      var footerEl = ref[12];

      if (self.$slots.default && self.$slots.default.length > 0) {
        for (var i = 0; i < self.$slots.default.length; i += 1) {
          var slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
          if (!slotName || (slotName === 'inner')) { slotsInner.push(self.$slots.default[i]); }
          if (slotName === 'content-start') { slotsContentStart.push(self.$slots.default[i]); }
          if (slotName === 'content') { slotsContent.push(self.$slots.default[i]); }
          if (slotName === 'content-end') { slotsContentEnd.push(self.$slots.default[i]); }
          if (slotName === 'after-start') { slotsAfterStart.push(self.$slots.default[i]); }
          if (slotName === 'after') { slotsAfter.push(self.$slots.default[i]); }
          if (slotName === 'after-end') { slotsAfterEnd.push(self.$slots.default[i]); }
          if (slotName === 'media') { slotsMedia.push(self.$slots.default[i]); }
          if (slotName === 'inner-start') { slotsInnerStart.push(self.$slots.default[i]); }
          if (slotName === 'inner-end') { slotsInnerEnd.push(self.$slots.default[i]); }
          if (slotName === 'before-title') { slotsBeforeTitle.push(self.$slots.default[i]); }
          if (slotName === 'title') { slotsTitle.push(self.$slots.default[i]); }
          if (slotName === 'after-title') { slotsAfterTitle.push(self.$slots.default[i]); }
          if (slotName === 'subtitle') { slotsSubtitle.push(self.$slots.default[i]); }
          if (slotName === 'text') { slotsText.push(self.$slots.default[i]); }
          if (slotName === 'header') { slotsHeader.push(self.$slots.default[i]); }
          if (slotName === 'footer') { slotsFooter.push(self.$slots.default[i]); }
        }
      }

      // Input
      if (self.radio || self.checkbox) {
        inputEl = c('input', {
          attrs: {
            value: self.value,
            name: self.name,
            checked: self.checked,
            readonly: self.readonly,
            disabled: self.disabled,
            required: self.required,
            type: self.radio ? 'radio' : 'checkbox',
          },
          on: {
            change: self.onChange,
          },
          domProps: {
            checked: self.checked,
            disabled: self.disabled,
            required: self.required,
          },
        });
        inputIconEl = c('i', { staticClass: ("icon icon-" + (self.radio ? 'radio' : 'checkbox')) });
      }
      // Media
      if (self.media || slotsMedia.length) {
        var mediaImgEl;
        if (self.media) {
          mediaImgEl = c('img', { attrs: { src: self.media } });
        }
        mediaEl = c('div', { staticClass: 'item-media' }, [mediaImgEl, slotsMedia]);
      }
      // Inner Elements
      if (self.header || slotsHeader.length) {
        headerEl = c('div', { staticClass: 'item-header' }, [self.header, slotsHeader]);
      }
      if (self.footer || slotsFooter.length) {
        footerEl = c('div', { staticClass: 'item-footer' }, [self.footer, slotsFooter]);
      }
      if (self.title || slotsTitle.length) {
        titleEl = c('div', { staticClass: 'item-title' }, [!self.mediaList && headerEl, self.title, slotsTitle, !self.mediaList && footerEl]);
      }
      if (self.subtitle || slotsSubtitle.length) {
        subtitleEl = c('div', { staticClass: 'item-subtitle' }, [self.subtitle, slotsSubtitle]);
      }
      if (self.text || slotsText.length) {
        textEl = c('div', { staticClass: 'item-text' }, [self.text, slotsText]);
      }
      if (self.after || self.badge || slotsAfter.length) {
        if (self.after) {
          afterEl = c('span', [self.after]);
        }
        if (self.badge) {
          badgeEl = c('f7-badge', { props: { color: self.badgeColor } }, [self.badge]);
        }
        afterWrapEl = c('div', { staticClass: 'item-after' }, [slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', { staticClass: 'item-title-row' }, [slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl]);
      }
      innerEl = c('div', { staticClass: 'item-inner' }, self.mediaList ? [slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd] : [slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd]);

      // Finalize
      return c((self.checkbox || self.radio) ? 'label' : 'div', {
        staticClass: 'item-content',
        class: Utils.extend(
          {
            'item-checkbox': self.checkbox,
            'item-radio': self.radio,
            'item-input': self.itemInput || self.itemInputForced,
            'inline-label': self.inlineLabel || self.inlineLabelForced,
            'item-input-with-info': self.itemInputWithInfo || self.itemInputWithInfoForced,
          },
          Mixins.colorClasses(self)
        ),
        on: {
          click: self.onClick,
        },
      }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
    },
    data: function data() {
      return {
        itemInputForced: false,
        inlineLabelForced: false,
        itemInputWithInfoForced: false,
      };
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
      onInput: function onInput(event) {
        this.$emit('input', event);
      },
    },
  };

  var f7ListItemRow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-row",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-list-item-row',
    props: Mixins.colorProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var ListItemProps = Utils.extend(
    {
      title: [String, Number],
      text: [String, Number],
      media: String,
      subtitle: [String, Number],
      header: [String, Number],
      footer: [String, Number],

      // Link Props
      link: [Boolean, String],
      target: String,
      noFastclick: Boolean,
      noFastClick: Boolean,

      after: [String, Number],
      badge: [String, Number],
      badgeColor: String,

      mediaItem: Boolean,
      mediaList: Boolean,
      divider: Boolean,
      groupTitle: Boolean,
      swipeout: Boolean,
      sortable: Boolean,
      accordionItem: Boolean,
      accordionItemOpened: Boolean,

      // Smart Select
      smartSelect: Boolean,
      smartSelectParams: Object,

      // Inputs
      checkbox: Boolean,
      radio: Boolean,
      checked: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
      itemInput: Boolean,
      itemInputWithInfo: Boolean,
      inlineLabel: Boolean,
    },
    Mixins.colorProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  var f7ListItem = {
    name: 'f7-list-item',
    components: {
      f7ListItemContent: f7ListItemContent,
    },
    props: ListItemProps,
    render: function render(c) {
      var self = this;

      var liChildren;
      var linkEl;
      var itemContentEl;

      if (!self.simpleListComputed) {
        // Item Content
        itemContentEl = c('f7-list-item-content', {
          props: {
            title: self.title,
            text: self.text,
            media: self.media,
            subtitle: self.subtitle,
            after: self.after,
            header: self.header,
            footer: self.footer,
            badge: self.badge,
            badgeColor: self.badgeColor,
            mediaList: self.mediaListComputed,
            accordionItem: self.accordionItem,

            checkbox: self.checkbox,
            checked: self.checked,
            radio: self.radio,
            name: self.name,
            value: self.value,
            readonly: self.readonly,
            required: self.required,
            disabled: self.disabled,
            itemInput: self.itemInput || self.itemInputForced,
            itemInputWithInfo: self.itemInputWithInfo || self.itemInputWithInfoForced,
            inlineLabel: self.inlineLabel || self.inlineLabelForced,
          },
          on: (self.link || self.href || self.accordionItem || self.smartSelect) ? {} : { click: self.onClick, change: self.onChange },
        }, [
          self.$slots['content-start'],
          self.$slots.content,
          self.$slots['content-end'],
          self.$slots.media,
          self.$slots['inner-start'],
          self.$slots.inner,
          self.$slots['inner-end'],
          self.$slots['after-start'],
          self.$slots.after,
          self.$slots['after-end'],
          self.$slots.header,
          self.$slots.footer,
          self.$slots['before-title'],
          self.$slots.title,
          self.$slots['after-title'],
          self.$slots.subtitle,
          self.$slots.text,
          (self.swipeout || self.accordionItem ? [] : self.$slots.default) ]);

        // Link
        if (self.link || self.href || self.accordionItem || self.smartSelect) {
          linkEl = c('a', {
            attrs: Utils.extend(
              {
                href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link || self.href,
                target: self.target,
              },
              Mixins.linkRouterAttrs(self),
              Mixins.linkActionsAttrs(self)
            ),
            class: Utils.extend(
              {
                'item-link': true,
                'no-fastclick': self.noFastclick || self.noFastClick,
                'smart-select': self.smartSelect,
              },
              Mixins.linkRouterClasses(self),
              Mixins.linkActionsClasses(self)
            ),
            on: {
              click: self.onClick,
            },
          }, [itemContentEl]);
        }
      }

      if (self.divider || self.groupTitle) {
        liChildren = [c('span', self.$slots.default || self.title)];
      } else if (self.simpleListComputed) {
        liChildren = [self.title, self.$slots.default];
      } else {
        var linkItemEl = (self.link || self.href || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
        if (self.swipeout) {
          liChildren = [c('div', { class: { 'swipeout-content': true } }, [linkItemEl])];
        } else {
          liChildren = [linkItemEl];
        }
        if (self.sortableComputed) {
          liChildren.push(c('div', { class: { 'sortable-handler': true } }));
        }
        if (self.swipeout || self.accordionItem) {
          liChildren.push(self.$slots.default);
        }
        liChildren.unshift(self.$slots['root-start']);
        liChildren.push(self.$slots.root);
        liChildren.push(self.$slots['root-end']);
      }

      return c(
        'li',
        {
          class: Utils.extend(
            {
              'item-divider': self.divider,
              'list-group-title': self.groupTitle,
              'media-item': self.mediaItem,
              swipeout: self.swipeout,
              'accordion-item': self.accordionItem,
              'accordion-item-opened': self.accordionItemOpened,
            },
            Mixins.colorClasses(self)
          ),
          on: {
            'swipeout:open': self.onSwipeoutOpen,
            'swipeout:opened': self.onSwipeoutOpened,
            'swipeout:close': self.onSwipeoutClose,
            'swipeout:closed': self.onSwipeoutClosed,
            'swipeout:delete': self.onSwipeoutDelete,
            'swipeout:deleted': self.onSwipeoutDeleted,
            swipeout: self.onSwipeout,
            'accordion:open': self.onAccOpen,
            'accordion:opened': self.onAccOpened,
            'accordion:close': self.onAccClose,
            'accordion:closed': self.onAccClosed,
          },
        },
        liChildren
      );
    },
    data: function data() {
      return {
        itemInputForced: false,
        inlineLabelForced: false,
        itemInputWithInfoForced: false,
      };
    },
    computed: {
      sortableComputed: function sortableComputed() {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed: function mediaListComputed() {
        return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
      },
      simpleListComputed: function simpleListComputed() {
        return this.simpleList || this.$parent.simpleList || (this.$parent.$parent && this.$parent.simpleList);
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.destroy();
      }
    },
    methods: {
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.smartSelect) { return; }
        var smartSelectParams = Utils.extend({ el: self.$el.querySelector('a.smart-select') }, (self.smartSelectParams || {}));
        self.f7SmartSelect = f7.smartSelect.create(smartSelectParams);
      },
      onClick: function onClick(event) {
        var self = this;
        if (self.smartSelect && self.f7SmartSelect) {
          self.f7SmartSelect.open();
        }
        if (event.target.tagName.toLowerCase() !== 'input') {
          self.$emit('click', event);
        }
      },
      onSwipeoutDeleted: function onSwipeoutDeleted(event) {
        this.$emit('swipeout:deleted', event);
      },
      onSwipeoutDelete: function onSwipeoutDelete(event) {
        this.$emit('swipeout:delete', event);
      },
      onSwipeoutClose: function onSwipeoutClose(event) {
        this.$emit('swipeout:close', event);
      },
      onSwipeoutClosed: function onSwipeoutClosed(event) {
        this.$emit('swipeout:closed', event);
      },
      onSwipeoutOpen: function onSwipeoutOpen(event) {
        this.$emit('swipeout:open', event);
      },
      onSwipeoutOpened: function onSwipeoutOpened(event) {
        this.$emit('swipeout:opened', event);
      },
      onSwipeout: function onSwipeout(event) {
        this.$emit('swipeout', event);
      },
      onAccClose: function onAccClose(event) {
        this.$emit('accordion:close', event);
      },
      onAccClosed: function onAccClosed(event) {
        this.$emit('accordion:closed', event);
      },
      onAccOpen: function onAccOpen(event) {
        this.$emit('accordion:open', event);
      },
      onAccOpened: function onAccOpened(event) {
        this.$emit('accordion:opened', event);
      },
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
      onInput: function onInput(event) {
        this.$emit('input', event);
      },
    },
  };

  var ListProps = Utils.extend(
    {
      inset: Boolean,
      tabletInset: Boolean,
      mediaList: Boolean,
      sortable: Boolean,
      sortableEnabled: Boolean,
      accordionList: Boolean,
      contactsList: Boolean,
      simpleList: Boolean,
      linksList: Boolean,

      noHairlines: Boolean,
      noHairlinesBetween: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesBetweenMd: Boolean,
      noHairlinesIos: Boolean,
      noHairlinesBetweenIos: Boolean,

      // Tab
      tab: Boolean,
      tabActive: Boolean,

      // Form
      form: Boolean,
      formStoreData: Boolean,
      inlineLabels: Boolean,

      // Virtual List
      virtualList: Boolean,
      virtualListParams: Object,
    },
    Mixins.colorProps
  );

  var f7List = {
    name: 'f7-list',
    props: ListProps,
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (!(self.virtualList && self.f7VirtualList)) { return; }
      if (self.f7VirtualList.destroy) { self.f7VirtualList.destroy(); }
    },
    render: function render(c) {
      var self = this;

      var listChildren = [];
      var ulChildren = self.$slots.list || [];

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i += 1) {
          var tag = self.$slots.default[i].tag;
          if (tag && !(tag === 'li' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
            listChildren.push(self.$slots.default[i]);
          } else if (tag) {
            ulChildren.push(self.$slots.default[i]);
          }
        }
      }
      var blockEl = c(
        self.form ? 'form' : 'div',
        {
          staticClass: 'list',
          class: Utils.extend(
            {
              inset: self.inset,
              'tablet-inset': self.tabletInset,
              'media-list': self.mediaList,
              'simple-list': self.simpleList,
              'links-list': self.linksList,
              sortable: self.sortable,
              'accordion-list': self.accordionList,
              'contacts-list': self.contactsList,
              'virtual-list': self.virtualList,
              'sortable-enabled': self.sortableEnabled,
              tab: self.tab,
              'tab-active': self.tabActive,
              'no-hairlines': self.noHairlines,
              'no-hairlines-between': self.noHairlinesBetween,
              'no-hairlines-md': self.noHairlinesMd,
              'no-hairlines-between-md': self.noHairlinesBetweenMd,
              'no-hairlines-ios': self.noHairlinesIos,
              'no-hairlines-between-ios': self.noHairlinesBetweenIos,
              'form-store-data': self.formStoreData,
              'inline-labels': self.inlineLabels,
            },
            Mixins.colorClasses(self)
          ),
          on: {
            'sortable:enable': self.onSortableEnable,
            'sortable:disable': self.onSortableDisable,
            'sortable:sort': self.onSortableSort,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [
          ulChildren.length > 0 ?
            [
              self.$slots['before-list'],
              c('ul', {}, ulChildren),
              self.$slots['after-list'],
              listChildren ] :
            [
              self.$slots['before-list'],
              listChildren,
              self.$slots['after-list'] ] ]
      );
      return blockEl;
    },
    methods: {
      onSortableEnable: function onSortableEnable(event) {
        this.$emit('sortable:enable', event);
      },
      onSortableDisable: function onSortableDisable(event) {
        this.$emit('sortable:disable', event);
      },
      onSortableSort: function onSortableSort(event) {
        this.$emit('sortable:sort', event, event.detail);
      },
      onTabShow: function onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function onTabHide(e) {
        this.$emit('tab:hide', e);
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        // Init Virtual List
        if (!self.virtualList) { return; }
        var $$ = self.$$;
        var $el = $$(self.$el);
        var templateScript = $el.find('script');
        var template = templateScript.html();
        if (!template && templateScript.length > 0) {
          template = templateScript[0].outerHTML;
          // eslint-disable-next-line
          template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
        }
        var vlParams = self.virtualListParams || {};
        if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) { return; }
        if (template) { template = self.$t7.compile(template); }

        self.f7VirtualList = f7.virtualList.create(Utils.extend(
          {
            el: self.$el,
            itemTemplate: template,
            on: {
              itemBeforeInsert: function itemBeforeInsert(itemEl, item) {
                var vl = this;
                self.$emit('virtual:itembeforeinsert', vl, itemEl, item);
              },
              beforeClear: function beforeClear(fragment) {
                var vl = this;
                self.$emit('virtual:beforeclear', vl, fragment);
              },
              itemsBeforeInsert: function itemsBeforeInsert(fragment) {
                var vl = this;
                self.$emit('virtual:itemsbeforeinsert', vl, fragment);
              },
              itemsAfterInsert: function itemsAfterInsert(fragment) {
                var vl = this;
                self.$emit('virtual:itemsafterinsert', vl, fragment);
              },
            },
          },
          vlParams
        ));
      },
    },
  };

  var f7LoginScreenTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-screen-title",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-login-screen-title',
    props: Mixins.colorProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var LoginScreenProps = Utils.extend(
    {
      opened: Boolean,
    },
    Mixins.colorProps
  );

  var f7LoginScreen = {
    name: 'f7-login-screen',
    render: function render(c) {
      var self = this;
      return c('div', {
        staticClass: 'login-screen',
        class: self.classes,
        on: {
          'loginscreen:open': self.onOpen,
          'loginscreen:opened': self.onOpened,
          'loginscreen:close': self.onClose,
          'loginscreen:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.f7LoginScreen) { return; }
        if (opened$1) {
          self.f7LoginScreen.open();
        } else {
          self.f7LoginScreen.close();
        }
      },
    },
    props: LoginScreenProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7LoginScreen) { self.f7LoginScreen.destroy(); }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('loginscreen:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('loginscreen:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('loginscreen:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('loginscreen:closed', event);
      },
      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.loginScreen.open(self.$el, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.loginScreen.close(self.$el, animate);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        self.f7LoginScreen = self.$f7.loginScreen.create({
          el: self.$el,
        });
        if (self.opened) {
          self.f7LoginScreen.open(false);
        }
      },
    },
  };

  var MessageProps = Utils.extend(
    {
      text: String,
      name: String,
      avatar: String,
      type: {
        type: String,
        default: 'sent',
      },
      image: String,
      header: String,
      footer: String,
      textHeader: String,
      textFooter: String,
      first: Boolean,
      last: Boolean,
      tail: Boolean,
      sameName: Boolean,
      sameHeader: Boolean,
      sameFooter: Boolean,
      sameAvatar: Boolean,
      typing: Boolean,
    },
    Mixins.colorProps
  );
  var f7Message = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"message",class:_vm.classes,on:{"click":_vm.onClick}},[_vm._t("start"),_vm._v(" "),(_vm.avatar || _vm.$slots.avatar)?_c('div',{staticClass:"message-avatar",style:({'background-image': _vm.avatar && 'url(' + _vm.avatar + ')'}),on:{"click":_vm.onAvatarClick}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"message-content"},[_vm._t("content-start"),_vm._v(" "),(_vm.name || _vm.$slots.name)?_c('div',{staticClass:"message-name",on:{"click":_vm.onNameClick}},[_vm._t("name",[_vm._v(_vm._s(_vm.name))])],2):_vm._e(),_vm._v(" "),(_vm.header || _vm.$slots.header)?_c('div',{staticClass:"message-header",on:{"click":_vm.onHeaderClick}},[_vm._t("header",[_vm._v(_vm._s(_vm.header))])],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"message-bubble",on:{"click":_vm.onBubbleClick}},[_vm._t("bubble-start"),_vm._v(" "),(_vm.image || _vm.$slots.image)?_c('div',{staticClass:"message-image"},[_vm._t("image",[_c('img',{attrs:{"src":_vm.image}})])],2):_vm._e(),_vm._v(" "),(_vm.textHeader || _vm.$slots['text-header'])?_c('div',{staticClass:"message-text-header"},[_vm._t("text-header",[_vm._v(_vm._s(_vm.textHeader))])],2):_vm._e(),_vm._v(" "),(_vm.text || _vm.$slots.text || _vm.typing)?_c('div',{staticClass:"message-text",on:{"click":_vm.onTextClick}},[_vm._t("text",[_vm._v(_vm._s(_vm.text))]),_vm._v(" "),(_vm.typing)?_c('div',{staticClass:"message-typing-indicator"},[_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div')]):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.textFooter || _vm.$slots['text-footer'])?_c('div',{staticClass:"message-text-footer"},[_vm._t("text-footer",[_vm._v(_vm._s(_vm.textFooter))])],2):_vm._e(),_vm._v(" "),_vm._t("bubble-end"),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),(_vm.footer || _vm.$slots.footer)?_c('div',{staticClass:"message-footer",on:{"click":_vm.onFooterClick}},[_vm._t("footer",[_vm._v(_vm._s(_vm.footer))])],2):_vm._e(),_vm._v(" "),_vm._t("content-end")],2),_vm._v(" "),_vm._t("end")],2)},staticRenderFns: [],
    name: 'f7-message',
    props: MessageProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'message-sent': self.type === 'sent',
          'message-received': self.type === 'received',
          'message-typing': self.typing,
          'message-first': self.first,
          'message-last': self.last,
          'message-tail': self.tail,
          'message-same-name': self.sameName,
          'message-same-header': self.sameHeader,
          'message-same-footer': self.sameFooter,
          'message-same-avatar': self.sameAvatar,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
      onNameClick: function onNameClick(event) {
        this.$emit('click:name', event);
      },
      onTextClick: function onTextClick(event) {
        this.$emit('click:text', event);
      },
      onAvatarClick: function onAvatarClick(event) {
        this.$emit('click:avatar', event);
      },
      onHeaderClick: function onHeaderClick(event) {
        this.$emit('click:header', event);
      },
      onFooterClick: function onFooterClick(event) {
        this.$emit('click:footer', event);
      },
      onBubbleClick: function onBubbleClick(event) {
        this.$emit('click:bubble', event);
      },
    },
  };

  var MessagebarAttachmentProps = Utils.extend(
    {
      image: String,
      deletable: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7MessagebarAttachment = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-attachment",class:_vm.classes,on:{"click":_vm.onClick}},[(_vm.image)?_c('img',{attrs:{"src":_vm.image}}):_vm._e(),_vm._v(" "),(_vm.deletable)?_c('span',{staticClass:"messagebar-attachment-delete",on:{"click":_vm.onDeleteClick}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
    props: MessagebarAttachmentProps,
    name: 'f7-messagebar-attachment',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    methods: {
      onClick: function onClick(e) {
        this.$emit('attachment:click', e);
      },
      onDeleteClick: function onDeleteClick(e) {
        this.$emit('attachment:delete', e);
      },
    },
  };

  var f7MessagebarAttachments = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-attachments",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-messagebar-attachments',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var MessagebarSheetItemProps = Utils.extend(
    {
      image: String,
      checked: Boolean,
    },
    Mixins.colorProps
  );

  var f7MessagebarSheetImage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"messagebar-sheet-image checkbox",class:_vm.classes,style:({ 'background-image': _vm.image && ("url(" + (_vm.image) + ")")})},[_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":_vm.checked},on:{"change":_vm.onChange}}),_vm._v(" "),_c('i',{staticClass:"icon icon-checkbox"}),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
    props: MessagebarSheetItemProps,
    name: 'f7-messagebar-sheet-image',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    methods: {
      onChange: function onChange(e) {
        if (this.checked) { this.$emit('checked', e); }
        else { this.$emit('unchecked', e); }
        this.$emit('change', e);
      },
    },
  };

  var f7MessagebarSheetItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-sheet-item",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-messagebar-sheet-item',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var f7MessagebarSheet = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-sheet",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-messagebar-sheet',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var MessagebarProps = Utils.extend(
    {
      sheetVisible: Boolean,
      attachmentsVisible: Boolean,
      top: Boolean,
      resizable: {
        type: Boolean,
        default: true,
      },
      bottomOffset: {
        type: Number,
        default: 0,
      },
      topOffset: {
        type: Number,
        default: 0,
      },
      maxHeight: Number,
      sendLink: String,
      value: [String, Number, Array],
      disabled: Boolean,
      readonly: Boolean,
      name: String,
      placeholder: {
        type: String,
        default: 'Message',
      },
      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7Messagebar = {
    name: 'f7-messagebar',
    components: {
      f7Input: f7Input,
      f7Link: f7Link,
    },
    render: function render(c) {
      var self = this;
      var beforeInnerEls = [];
      var afterInnerEls = [];
      var innerStartEls = [];
      var innerEndEls = []; // add send link here
      var beforeAreaEls = []; // add attachments here
      var afterAreaEls = [];

      var linkEl;
      if ((self.sendLink && self.sendLink.length > 0) || self.$slots['send-link']) {
        linkEl = c('f7-link', {
          on: {
            click: self.onClick,
          },
        }, [self.sendLink ? self.sendLink : self.$slots['send-link']]);
        innerEndEls.push(linkEl);
      }

      if (self.$slots['before-inner']) {
        self.$slots['before-inner'].forEach(function (el) {
          beforeInnerEls.push(el);
        });
      }
      if (self.$slots['after-inner']) {
        self.$slots['after-inner'].forEach(function (el) {
          afterInnerEls.push(el);
        });
      }
      if (self.$slots['inner-start']) {
        self.$slots['inner-start'].forEach(function (el) {
          innerStartEls.push(el);
        });
      }
      if (self.$slots['inner-end']) {
        self.$slots['inner-end'].forEach(function (el) {
          innerEndEls.push(el);
        });
      }
      if (self.$slots['before-area']) {
        self.$slots['before-area'].forEach(function (el) {
          beforeAreaEls.push(el);
        });
      }
      if (self.$slots['after-area']) {
        self.$slots['after-area'].forEach(function (el) {
          afterAreaEls.push(el);
        });
      }
      if (self.$slots.default) {
        self.$slots.default.forEach(function (el) {
          var tag = el.tag;
          if (tag && tag.indexOf('messagebar-attachments') >= 0) {
            beforeAreaEls.push(el);
          } else if (tag && tag.indexOf('messagebar-sheet') >= 0) {
            afterInnerEls.push(el);
          } else {
            innerEndEls.push(el);
          }
        });
      }

      var inputEl = c('f7-input', {
        props: {
          type: 'textarea',
          wrap: false,
          placeholder: self.placeholder,
          disabled: self.disabled,
          name: self.name,
          readonly: self.readonly,
          resizable: self.resizable,
          value: self.value,
        },
        ref: 'area',
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur,
        },
      });

      var areaEl = c('div', {
        staticClass: 'messagebar-area',
      }, [
        beforeAreaEls,
        inputEl,
        afterAreaEls ]);

      var innerEl = c('div', {
        staticClass: 'toolbar-inner',
      }, [
        innerStartEls,
        areaEl,
        innerEndEls ]);

      return c('div', {
        staticClass: 'toolbar messagebar',
        class: self.classes,
        on: {
          'messagebar:attachmentdelete': self.onDeleteAttachment,
          'messagebar:attachmentclick': self.onClickAttachment,
          'messagebar:resizepage': self.onResizePage,
        },
      }, [
        beforeInnerEls,
        innerEl,
        afterInnerEls ]);
    },
    props: MessagebarProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'messagebar-attachments-visible': self.attachmentsVisible,
          'messagebar-sheet-visible': self.sheetVisible,
        }, Mixins.colorClasses);
      },
    },
    watch: {
      sheetVisible: function sheetVisible() {
        var self = this;
        if (!self.resizable) { return; }
        self.$nextTick(function () {
          if (!self.f7Messagebar) { return; }
          self.f7Messagebar.sheetVisible = self.sheetVisible;
          self.f7Messagebar.resizePage();
        });
      },
      attachmentsVisible: function attachmentsVisible() {
        var self = this;
        if (!self.resizable) { return; }
        self.$nextTick(function () {
          if (!self.f7Messagebar) { return; }
          self.f7Messagebar.attachmentsVisible = self.attachmentsVisible;
          self.f7Messagebar.resizePage();
        });
      },
    },
    beforeDestroy: function beforeDestroy() {
      if (this.f7Messagebar && this.f7Messagebar.destroy) { this.f7Messagebar.destroy(); }
    },
    methods: {
      clear: function clear() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).clear.apply(ref, args);
      },
      getValue: function getValue() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).getValue.apply(ref, args);
      },
      setValue: function setValue() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).setValue.apply(ref, args);
      },
      setPlaceholder: function setPlaceholder() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).setPlaceholder.apply(ref, args);
      },
      resizePage: function resizePage() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).resizePage.apply(ref, args);
      },
      focus: function focus() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).focus.apply(ref, args);
      },
      blur: function blur() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).blur.apply(ref, args);
      },
      attachmentsShow: function attachmentsShow() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsShow.apply(ref, args);
      },
      attachmentsHide: function attachmentsHide() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsHide.apply(ref, args);
      },
      attachmentsToggle: function attachmentsToggle() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsToggle.apply(ref, args);
      },
      sheetShow: function sheetShow() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetShow.apply(ref, args);
      },
      sheetHide: function sheetHide() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetHide.apply(ref, args);
      },
      sheetToggle: function sheetToggle() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetToggle.apply(ref, args);
      },
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
      onInput: function onInput(event) {
        this.$emit('input', event);
      },
      onFocus: function onFocus(event) {
        this.$emit('focus', event);
      },
      onBlur: function onBlur(event) {
        this.$emit('blur', event);
      },
      onClick: function onClick(event) {
        var self = this;
        var value = self.$refs.area.$el.value;
        var clear = self.f7Messagebar ? self.f7Messagebar.clear : function () {};
        this.$emit('submit', value, clear);
        this.$emit('send', value, clear);
        this.$emit('click', event);
      },
      onDeleteAttachment: function onDeleteAttachment(e) {
        this.$emit('messagebar:attachmentdelete', e);
      },
      onClickAttachment: function onClickAttachment(e) {
        this.$emit('messagebar:attachmentclick', e);
      },
      onResizePage: function onResizePage(e) {
        this.$emit('messagebar:resizepage', e);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        if (!self.init) { return; }
        self.f7Messagebar = self.$f7.messagebar.create({
          el: self.$el,
          top: self.top,
          resizePage: self.resizable,
          bottomOffset: self.bottomOffset,
          topOffset: self.topOffset,
          maxHeight: self.maxHeight,
        });
      },
    },
  };

  var f7MessagesTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messages-title",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    props: Mixins.colorProps,
    name: 'f7-messages-title',
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var MessagesProps = Utils.extend(
    {
      autoLayout: {
        type: Boolean,
        default: false,
      },
      messages: {
        type: Array,
        default: function default$1() {
          return [];
        },
      },
      newMessagesFirst: {
        type: Boolean,
        default: false,
      },
      scrollMessages: {
        type: Boolean,
        default: true,
      },
      scrollMessagesOnEdge: {
        type: Boolean,
        default: true,
      },
      firstMessageRule: Function,
      lastMessageRule: Function,
      tailMessageRule: Function,
      sameNameMessageRule: Function,
      sameHeaderMessageRule: Function,
      sameFooterMessageRule: Function,
      sameAvatarMessageRule: Function,
      customClassMessageRule: Function,
      renderMessage: Function,

      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );
  var f7Messages = {
    name: 'f7-messages',
    render: function render(c) {
      var self = this;
      return c('div', {
        staticClass: 'messages',
        class: Mixins.colorClasses(self),
      }, self.$slots.default);
    },
    props: MessagesProps,
    beforeDestroy: function beforeDestroy() {
      if (this.f7Messages && this.f7Messages.destroy) { this.f7Messages.destroy(); }
    },
    beforeUpdate: function beforeUpdate() {
      var self = this;
      if (!self.init) { return; }
      self.$children.forEach(function (el) {
        self.$$(el.$el).addClass('message-appeared');
      });
    },
    updated: function updated() {
      var self = this;
      if (!self.init) { return; }
      self.$children.forEach(function (el) {
        var $el = self.$$(el.$el);
        if (!$el.hasClass('message-appeared')) {
          $el.addClass('message-appear-from-bottom');
        }
      });
      if (self.f7Messages && self.f7Messages.layout && self.autoLayout) {
        self.f7Messages.layout();
      }
      if (self.f7Messages && self.f7Messages.scroll && self.scrollMessages) {
        self.f7Messages.scroll();
      }
    },

    methods: {
      renderMessages: function renderMessages(messagesToRender, method) {
        if (!this.f7Messages) { return undefined; }
        return this.renderMessages(messagesToRender, method);
      },
      layout: function layout() {
        if (!this.f7Messages) { return undefined; }
        return this.layout();
      },
      scroll: function scroll(duration, scrollTop) {
        if (!this.f7Messages) { return undefined; }
        return this.scroll(duration, scrollTop);
      },
      clear: function clear() {
        if (!this.f7Messages) { return undefined; }
        return this.clear();
      },
      removeMessage: function removeMessage(messageToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.removeMessage(messageToRemove, layout);
      },
      removeMessages: function removeMessages(messagesToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.removeMessages(messagesToRemove, layout);
      },
      addMessage: function addMessage() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messages) { return undefined; }
        return (ref = this).addMessage.apply(ref, args);
      },
      addMessages: function addMessages() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messages) { return undefined; }
        return (ref = this).addMessages.apply(ref, args);
      },
      showTyping: function showTyping(message) {
        if (!this.f7Messages) { return undefined; }
        return this.showTyping(message);
      },
      hideTyping: function hideTyping() {
        if (!this.f7Messages) { return undefined; }
        return this.hideTyping();
      },
      destroy: function destroy() {
        if (!this.f7Messages) { return undefined; }
        return this.destroy();
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        self.f7Messages = f7.messages.create({
          el: self.$el,
          autoLayout: self.autoLayout,
          messages: self.messages,
          newMessagesFirst: self.newMessagesFirst,
          scrollMessages: self.scrollMessages,
          scrollMessagesOnEdge: self.scrollMessagesOnEdge,
          firstMessageRule: self.firstMessageRule,
          lastMessageRule: self.lastMessageRule,
          tailMessageRule: self.tailMessageRule,
          sameNameMessageRule: self.sameNameMessageRule,
          sameHeaderMessageRule: self.sameHeaderMessageRule,
          sameFooterMessageRule: self.sameFooterMessageRule,
          sameAvatarMessageRule: self.sameAvatarMessageRule,
          customClassMessageRule: self.customClassMessageRule,
          renderMessage: self.renderMessage,
        });
      },
    },
  };

  var NavLeftProps = Utils.extend({
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: Boolean,
  }, Mixins.colorProps);

  var f7NavLeft = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"left",class:_vm.classes},[(_vm.backLink)?_c('f7-link',{class:{'icon-only': (_vm.backLink === true || _vm.backLink && _vm.$theme.md)},attrs:{"href":_vm.backLinkUrl || '#',"back":"","icon":"icon-back","text":_vm.backLink !== true && !_vm.$theme.md ? _vm.backLink : undefined,"force":_vm.backLinkForce || undefined},on:{"click":_vm.onBackClick}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-nav-left',
    components: {
      f7Link: f7Link,
    },
    props: NavLeftProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      onBackClick: function onBackClick(e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      },
    },
  };

  var NavRightProps = Utils.extend({
    sliding: Boolean,
  }, Mixins.colorProps);

  var f7NavRight = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"right",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-nav-right',
    props: NavRightProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };

  var NavTitleProps = Utils.extend({
    title: String,
    subtitle: String,
    sliding: Boolean,
  }, Mixins.colorProps);

  var f7NavTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title",class:_vm.classes},[_vm._t("default",[_vm._v(_vm._s(_vm.title)),(_vm.subtitle)?_c('span',{staticClass:"subtitle"},[_vm._v(_vm._s(_vm.subtitle))]):_vm._e()])],2)},staticRenderFns: [],
    name: 'f7-nav-title',
    props: NavTitleProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };

  var NavbarProps = Utils.extend({
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: {
      type: Boolean,
      default: true,
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  var f7Navbar = {
    name: 'f7-navbar',
    components: {
      f7NavLeft: f7NavLeft,
      f7NavTitle: f7NavTitle,
    },
    render: function render(c) {
      var self = this;
      var innerEl;
      var leftEl;
      var titleEl;
      if (self.inner) {
        if (self.backLink) {
          leftEl = c('f7-nav-left', {
            props: {
              backLink: self.backLink,
              backLinkUrl: self.backLinkUrl,
              backLinkForce: self.backLinkForce,
            },
            on: {
              'back-click': self.onBackClick,
            },
          });
        }
        if (self.title || self.subtitle) {
          titleEl = c('f7-nav-title', {
            props: {
              title: self.title,
              subtitle: self.subtitle,
            },
          });
        }
        innerEl = c('div', { ref: 'inner', staticClass: 'navbar-inner', class: { sliding: self.sliding } }, [leftEl, titleEl, self.$slots.default]);
      }
      return c('div', {
        staticClass: 'navbar',
        class: self.classes,
      }, [self.$slots['before-inner'], innerEl, self.$slots['after-inner']]);
    },
    updated: function updated() {
      var self = this;
      if (!self.$f7) { return; }
      self.$nextTick(function () {
        if (self.$el && self.$el.children && self.$el.children.length) {
          self.$f7.navbar.size(self.$el);
        } else if (self.$refs.inner) {
          self.$f7.navbar.size(self.$refs.inner);
        }
      });
    },
    props: NavbarProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'navbar-hidden': self.hidden,
          'no-shadow': self.noShadow,
          'no-hairline': self.noHairline,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      hide: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.hide(self.$el, animate);
      },
      show: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.show(self.$el, animate);
      },
      size: function size() {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.size(self.$el);
      },
      onBackClick: function onBackClick(e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      },
    },
  };

  var PageContentProps = Utils.extend({
    tab: Boolean,
    tabActive: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true,
    },
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true,
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean,
  }, Mixins.colorProps);

  var f7PageContent = {
    name: 'f7-page-content',
    render: function render(c) {
      var self = this;

      var ptrEl;
      var infiniteEl;

      if (self.ptr && (self.ptrPreloader)) {
        ptrEl = c('div', { staticClass: 'ptr-preloader' }, [
          c('div', { staticClass: 'preloader' }),
          c('div', { staticClass: 'ptr-arrow' }) ]);
      }
      if ((self.infinite) && self.infinitePreloader) {
        infiniteEl = c('div', { staticClass: 'preloader infinite-scroll-preloader' });
      }
      return c('div', {
        staticClass: 'page-content',
        class: self.classes,
        attrs: {
          'data-ptr-distance': self.ptrDistance,
          'data-infinite-distance': self.infiniteDistance,
        },
        on: {
          'ptr:pullstart': self.onPtrPullStart,
          'ptr:pullmove': self.onPtrPullMove,
          'ptr:pullend': self.onPtrPullEnd,
          'ptr:refresh': self.onPtrRefresh,
          'ptr:done': self.onPtrRefreshDone,
          infinite: self.onInfinite,
          'tab:show': self.onTabShow,
          'tab:hide': self.onTabHide,
        },
      }, (self.infiniteTop ? [ptrEl, infiniteEl, self.$slots.default] : [ptrEl, self.$slots.default, infiniteEl]));
    },
    props: PageContentProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          tab: self.tab,
          'tab-active': self.tabActive,
          'ptr-content': self.ptr,
          'infinite-scroll-content': self.infinite,
          'infinite-scroll-top': self.infiniteTop,
          'hide-bars-on-scroll': self.hideBarsOnScroll,
          'hide-navbar-on-scroll': self.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': self.hideToolbarOnScroll,
          'messages-content': self.messagesContent,
          'login-screen-content': self.loginScreen,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onPtrPullStart: function onPtrPullStart(event) {
        this.$emit('ptr:pullstart', event);
      },
      onPtrPullMove: function onPtrPullMove(event) {
        this.$emit('ptr:pullmove', event);
      },
      onPtrPullEnd: function onPtrPullEnd(event) {
        this.$emit('ptr:pullend', event);
      },
      onPtrRefresh: function onPtrRefresh(event) {
        this.$emit('ptr:refresh', event, event.detail);
      },
      onPtrRefreshDone: function onPtrRefreshDone(event) {
        this.$emit('ptr:done', event);
      },
      onInfinite: function onInfinite(event) {
        this.$emit('infinite', event);
      },
      onTabShow: function onTabShow(e) {
        var self = this;
        self.$emit('tab:show', e);
      },
      onTabHide: function onTabHide(e) {
        var self = this;
        self.$emit('tab:hide', e);
      },
    },
  };

  var PageProps = Utils.extend({
    name: String,
    stacked: Boolean,
    withSubnavbar: Boolean,
    subnavbar: Boolean,
    noNavbar: Boolean,
    noToolbar: Boolean,
    tabs: Boolean,
    pageContent: {
      type: Boolean,
      default: true,
    },
    noSwipeback: Boolean,
    // Page Content Props
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true,
    },
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true,
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean,
  }, Mixins.colorProps);

  var f7Page = {
    name: 'f7-page',
    components: {
      f7PageContent: f7PageContent,
    },
    render: function render(c) {
      var fixedList = [];
      var staticList = [];
      var self = this;

      var pageContentEl;

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ');

      var tag;
      var child;
      var withSubnavbar;
      var withSearchbar;
      var withMessages = self.$options.propsData.withMessages;

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i += 1) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue; // eslint-disable-line
          }
          var isFixed = false;
          if (tag.indexOf('subnavbar') >= 0) { withSubnavbar = true; }
          if (tag.indexOf('searchbar') >= 0) { withSearchbar = true; }
          if (typeof withMessages === 'undefined' && tag.indexOf('messages') >= 0) { withMessages = true; }
          for (var j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) { fixedList.push(child); }
          else { staticList.push(child); }
        }
      }

      if (fixedList.length > 0 && withSearchbar) {
        fixedList.push(c('div', { class: { 'searchbar-overlay': true } }));
      }
      if (self.pageContent) {
        pageContentEl = c('f7-page-content', {
          props: {
            ptr: self.ptr,
            ptrDistance: self.ptrDistance,
            ptrPreloader: self.ptrPreloader,
            infinite: self.infinite,
            infiniteTop: self.infiniteTop,
            infiniteDistance: self.infiniteDistance,
            infinitePreloader: self.infinitePreloader,
            hideBarsOnScroll: self.hideBarsOnScroll,
            hideNavbarOnScroll: self.hideNavbarOnScroll,
            hideToolbarOnScroll: self.hideToolbarOnScroll,
            messagesContent: self.messagesContent || withMessages,
            loginScreen: self.loginScreen,
          },
          on: {
            'ptr:pullstart': self.onPtrPullStart,
            'ptr:pullmove': self.onPtrPullMove,
            'ptr:pullend': self.onPtrPullEnd,
            'ptr:refresh': self.onPtrRefresh,
            'ptr:done': self.onPtrRefreshDone,
            infinite: self.onInfinite,
          },
        }, [self.$slots.static, staticList]);
      } else {
        pageContentEl = [];
        if (self.$slots.default && fixedList.length > 0) {
          for (var i$1 = 0; i$1 < self.$slots.default.length; i$1 += 1) {
            if (fixedList.indexOf(self.$slots.default[i$1]) < 0) {
              pageContentEl.push(self.$slots.default[i$1]);
            }
          }
        } else {
          pageContentEl = [self.$slots.default];
        }
      }
      fixedList.push(self.$slots.fixed);

      if (withSubnavbar) { self.classes['page-with-subnavbar'] = true; }

      var pageEl = c('div', {
        staticClass: 'page',
        class: self.classes,
        attrs: {
          'data-name': self.name,
        },
        on: {
          'page:mounted': self.onPageMounted,
          'page:init': self.onPageInit,
          'page:reinit': self.onPageReinit,
          'page:beforein': self.onPageBeforeIn,
          'page:afterin': self.onPageAfterIn,
          'page:beforeout': self.onPageBeforeOut,
          'page:afterout': self.onPageAfterOut,
          'page:beforeremove': self.onPageBeforeRemove,
        },
      }, [fixedList, pageContentEl]);

      return pageEl;
    },
    props: PageProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          stacked: this.stacked,
          tabs: this.tabs,
          'page-with-subnavbar': this.subnavbar || this.withSubnavbar,
          'no-navbar': this.noNavbar,
          'no-toolbar': this.noToolbar,
          'no-swipeback': this.noSwipeback,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      onPtrPullStart: function onPtrPullStart(event) {
        this.$emit('ptr:pullstart', event);
      },
      onPtrPullMove: function onPtrPullMove(event) {
        this.$emit('ptr:pullmove', event);
      },
      onPtrPullEnd: function onPtrPullEnd(event) {
        this.$emit('ptr:pullend', event);
      },
      onPtrRefresh: function onPtrRefresh(event) {
        this.$emit('ptr:refresh', event, event.detail);
      },
      onPtrRefreshDone: function onPtrRefreshDone(event) {
        this.$emit('ptr:done', event);
      },
      onInfinite: function onInfinite(event) {
        this.$emit('infinite', event);
      },
      onPageMounted: function onPageMounted(event) {
        this.$emit('page:mounted', event, event.detail);
      },
      onPageInit: function onPageInit(event) {
        this.$emit('page:init', event, event.detail);
      },
      onPageReinit: function onPageReinit(event) {
        this.$emit('page:reinit', event, event.detail);
      },
      onPageBeforeIn: function onPageBeforeIn(event) {
        this.$emit('page:beforein', event, event.detail);
      },
      onPageBeforeOut: function onPageBeforeOut(event) {
        this.$emit('page:beforeout', event, event.detail);
      },
      onPageAfterOut: function onPageAfterOut(event) {
        this.$emit('page:afterout', event, event.detail);
      },
      onPageAfterIn: function onPageAfterIn(event) {
        this.$emit('page:afterin', event, event.detail);
      },
      onPageBeforeRemove: function onPageBeforeRemove(event) {
        this.$emit('page:beforeremove', event, event.detail);
      },
    },
  };

  var PanelProps = Utils.extend(
    {
      side: String,
      effect: String,
      cover: Boolean,
      reveal: Boolean,
      left: Boolean,
      right: Boolean,
      opened: Boolean,
    },
    Mixins.colorProps
  );

  var f7Panel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel",class:_vm.classes,on:{"panel:open":_vm.onOpen,"panel:opened":_vm.onOpened,"panel:close":_vm.onClose,"panel:closed":_vm.onClosed,"panel:backdrop-click":_vm.onBackdropClick,"panel:swipe":_vm.onPanelSwipe,"panel:swipeopen":_vm.onPanelSwipeOpen,"panel:breakpoint":_vm.onBreakpoint}},[_vm._t("default")],2)},staticRenderFns: [],
    props: PanelProps,
    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        var side = self.side || (self.left ? 'left' : 'right');
        var effect = self.effect || (self.reveal ? 'reveal' : 'cover');
        return Utils.extend(
          ( obj = {
            'panel-active': self.opened
          }, obj[("panel-" + side)] = side, obj[("panel-" + effect)] = effect, obj ),
          Mixins.colorClasses(self)
        );
      },
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        if (opened$1) {
          self.$f7.panel.open(side);
        } else {
          self.$f7.panel.open(side);
        }
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Panel) { self.f7Panel.destroy(); }
    },
    mounted: function mounted() {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
      var $ = self.$;
      if (!$) { return; }
      var side = self.side || (self.left ? 'left' : 'right');
      var effect = self.effect || (self.reveal ? 'reveal' : 'cover');
      if (self.opened) {
        $('html').addClass(("with-panel-" + side + "-" + effect));
      }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('panel:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('panel:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('panel:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('panel:closed', event);
      },
      onBackdropClick: function onBackdropClick(event) {
        this.$emit('panel:backdrop-click', event);
      },
      onPanelSwipe: function onPanelSwipe(event) {
        this.$emit('panel:swipe', event);
      },
      onPanelSwipeOpen: function onPanelSwipeOpen(event) {
        this.$emit('panel:swipeopen', event);
      },
      onBreakpoint: function onBreakpoint(event) {
        this.$emit('panel:breakpoint', event);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        var $ = self.$$;
        if (!$) { return; }
        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(self.$el);
        }
        self.f7Panel = self.$f7.panel.create({ el: self.$el });
      },
      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        self.$f7.panel.open(side, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        self.$f7.panel.close(side, animate);
      },
    },
  };

  var f7PhotoBrowser = {
    name: 'f7-photo-browser',
    render: function render() {},
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) { self.f7PhotoBrowser.destroy(); }
    },
    watch: {
      photos: function photos(newValue) {
        var self = this;
        var pb = self.f7PhotoBrowser;
        if (!pb) { return; }
        self.f7PhotoBrowser.photos = newValue;
        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      },
    },
    props: {
      init: {
        type: Boolean,
        default: true,
      },
      params: Object,
      photos: Array,
      exposition: Boolean,
      expositionHideCaptions: Boolean,
      type: String,
      navbar: Boolean,
      toolbar: Boolean,
      theme: String,
      captionsTheme: String,
      swipeToClose: Boolean,
      backLinkText: String,
      navbarOfText: String,
      iconsColor: String,
      swiper: Object,
      url: String,
      view: [String, Object],
      routableModals: Boolean,
      renderNavbar: Function,
      renderToolbar: Function,
      renderCaption: Function,
      renderObject: Function,
      renderLazyPhoto: Function,
      renderPhoto: Function,
      renderPage: Function,
      renderPopup: Function,
      renderStandalone: Function,
    },
    methods: {
      open: function open(index) {
        return this.f7PhotoBrowser.open(index);
      },
      close: function close() {
        return this.f7PhotoBrowser.close();
      },
      expositionToggle: function expositionToggle() {
        return this.f7PhotoBrowser.expositionToggle();
      },
      expositionEnable: function expositionEnable() {
        return this.f7PhotoBrowser.expositionEnable();
      },
      expositionDisable: function expositionDisable() {
        return this.f7PhotoBrowser.expositionDisable();
      },
      onF7Init: function onF7Init(f7) {
        var self = this;
        // Init Virtual List
        if (!self.init) { return; }
        var params;

        if (typeof self.params !== 'undefined') { params = self.params; }
        else { params = self.$options.propsData; }

        params = Utils.extend({}, params, {
          on: {
            open: function open() {
              self.$emit('photobrowser:open');
            },
            close: function close() {
              self.$emit('photobrowser:close');
            },
            opened: function opened() {
              self.$emit('photobrowser:opened');
            },
            closed: function closed() {
              self.$emit('photobrowser:closed');
            },
            swipeToClose: function swipeToClose() {
              self.$emit('photobrowser:swipetoclose');
            },
          },
        });

        self.f7PhotoBrowser = f7.photoBrowser.create(params);
      },
    },
  };

  var PopoverProps = Utils.extend(
    {
      opened: Boolean,
      target: [String, Object],
    },
    Mixins.colorProps
  );

  var f7Popover = {
    name: 'f7-popover',
    render: function render(c) {
      var self = this;
      var angleEl = c('div', { staticClass: 'popover-angle' });
      var innerEl = c('div', { staticClass: 'popover-inner' }, self.$slots.default);
      return c('div', {
        class: self.classes,
        staticClass: 'popover',
        on: {
          'popover:open': self.onOpen,
          'popover:opened': self.onOpened,
          'popover:close': self.onClose,
          'popover:closed': self.onClosed,
        },
      }, [angleEl, innerEl]);
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.f7Popover) { return; }
        if (opened$1) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
        }
      },
    },
    props: PopoverProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popover) { self.f7Popover.destroy(); }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('popover:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('popover:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('popover:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('popover:closed', event);
      },
      open: function open(target, animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popover.open(self.$el, target, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.close(self.$el, animate);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        var popoverParams = {
          el: self.$el,
        };
        if (self.target) { popoverParams.targetEl = self.target; }
        self.f7Popover = self.$f7.popover.create(popoverParams);
        if (self.opened && self.target) {
          self.f7Popover.open(self.target, false);
        }
      },
    },
  };

  var PopupProps = Utils.extend(
    {
      'tablet-fullscreen': Boolean,
      opened: Boolean,
    },
    Mixins.colorProps
  );

  var f7Popup = {
    name: 'f7-popup',
    render: function render(c) {
      var self = this;
      return c('div', {
        staticClass: 'popup',
        class: self.classes,
        on: {
          'popup:open': self.onOpen,
          'popup:opened': self.onOpened,
          'popup:close': self.onClose,
          'popup:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.f7Popup) { return; }
        if (opened$1) {
          self.f7Popup.open();
        } else {
          self.f7Popup.close();
        }
      },
    },
    props: PopupProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'popup-tablet-fullscreen': self.tabletFullscreen,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popup) { self.f7Popup.destroy(); }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('popup:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('popup:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('popup:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('popup:closed', event);
      },
      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popup.open(self.$el, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popup.close(self.$el, animate);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        self.f7Popup = self.$f7.popup.create({
          el: self.$el,
        });
        if (self.opened) {
          self.f7Popup.open(false);
        }
      },
    },
  };

  var PreloaderProps = Utils.extend({
    size: [Number, String],
  }, Mixins.colorProps);

  var f7Preloader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader",class:_vm.classes,style:({'width': (_vm.sizeComputed ? ((_vm.sizeComputed) + "px") : ''), 'height': (_vm.sizeComputed ? ((_vm.sizeComputed) + "px") : '')})},[(_vm.$theme.md)?_c('span',{staticClass:"preloader-inner"},[_c('span',{staticClass:"preloader-inner-gap"}),_vm._v(" "),_vm._m(0),_vm._v(" "),_vm._m(1)]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader-inner-left"},[_c('span',{staticClass:"preloader-inner-half-circle"})])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader-inner-right"},[_c('span',{staticClass:"preloader-inner-half-circle"})])}],
    name: 'f7-preloader',
    props: PreloaderProps,
    computed: {
      classes: function classes() {
        return Mixins.colorClasses(this);
      },
      sizeComputed: function sizeComputed() {
        var s = this.size;
        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }
        return s;
      },
    },
  };

  var ProgressbarProps = Utils.extend({
    progress: Number,
    infinite: Boolean,
  }, Mixins.colorProps);

  var f7Progressbar = {
    name: 'f7-progressbar',
    render: function render(c) {
      var self = this;
      var progress = self.progress;
      return c('span', {
        staticClass: 'progressbar',
        class: self.classes,
        attrs: {
          'data-progress': progress,
        },
      }, [
        c('span', {
          style: {
            transform: progress ? ("translate3d(" + (-100 + progress) + "%, 0, 0)") : '',
            '-webkit-transform': progress ? ("translate3d(" + (-100 + progress) + "%, 0, 0)") : '',
          },
        }) ]);
    },
    props: ProgressbarProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          'progressbar-infinite': this.infinite,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      set: function set(progress, speed) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.progressbar.set(self.$el, progress, speed);
      },
    },
  };

  var RadioProps = Utils.extend({
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
  }, Mixins.colorProps);

  var f7Radio = {
    name: 'f7-radio',
    props: RadioProps,
    render: function render(c) {
      var self = this;

      var inputEl = c('input', {
        attrs: {
          type: 'radio',
          name: self.name,
        },
        domProps: {
          value: self.value,
          disabled: self.disabled,
          readonly: self.readonly,
          checked: self.checked,
        },
        on: {
          change: self.onChange,
        },
      });

      var iconEl = c('i', { staticClass: 'icon-radio' });

      return c('label', {
        staticClass: 'radio',
        class: Utils.extend({
          disabled: self.disabled,
        }, Mixins.colorClasses(self)),
      }, [inputEl, iconEl, self.$slots.default]);
    },
    methods: {
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
    },
  };

  var f7RoutableModals = {
    name: 'f7-routable-modals',
    data: function data() {
      return {
        modals: [],
      };
    },
    render: function render(c) {
      var self = this;
      var modals = self.modals.map(function (modal) { return c(modal.component, {
        tag: 'component',
        props: modal.params ? modal.params || {} : {},
        key: modal.id,
      }); });
      return c(
        'div',
        {
          staticClass: 'framework7-modals',
          ref: 'routableModals',
        },
        modals
      );
    },
  };

  var RowProps = Utils.extend(
    {
      noGap: Boolean,
      tag: {
        type: String,
        default: 'div',
      },
    },
    Mixins.colorProps
  );

  var f7Row = {
    name: 'f7-row',
    props: RowProps,
    render: function render(c) {
      var self = this;
      return c(self.tag, {
        staticClass: 'row',
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend(
          {
            'no-gap': self.noGap,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };

  var SearchbarProps = Utils.extend(
    {
      noShadow: Boolean,
      noHairline: Boolean,
      form: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: 'Search',
      },
      disableButton: {
        type: Boolean,
        default: true,
      },
      disableButtonText: {
        type: String,
        default: 'Cancel',
      },
      clearButton: {
        type: Boolean,
        default: true,
      },

      // SB Params
      expandable: Boolean,
      searchContainer: [String, Object],
      searchIn: {
        type: String,
        default: '.item-title',
      },
      searchItem: {
        type: String,
        default: 'li',
      },
      foundEl: {
        type: [String, Object],
        default: '.searchbar-found',
      },
      notFoundEl: {
        type: [String, Object],
        default: '.searchbar-not-found',
      },
      backdrop: {
        type: Boolean,
        default: true,
      },
      backdropEl: [String, Object],
      hideOnEnableEl: {
        type: [String, Object],
        default: '.searchbar-hide-on-enable',
      },
      hideOnSearchEl: {
        type: [String, Object],
        default: '.searchbar-hide-on-search',
      },
      ignore: {
        type: String,
        default: '.searchbar-ignore',
      },
      customSearch: {
        type: Boolean,
        default: false,
      },
      removeDiacritics: {
        type: Boolean,
        default: false,
      },
      hideDividers: {
        type: Boolean,
        default: true,
      },
      hideGroups: {
        type: Boolean,
        default: true,
      },
      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7Searchbar = {
    name: 'f7-searchbar',
    render: function render(c) {
      var self = this;
      var clearEl;
      var disableEl;

      var inputEl = c('input', {
        attrs: {
          placeholder: self.placeholder,
          type: 'search',
        },
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur,
        },
      });
      if (self.clearButton) {
        clearEl = c('span', {
          staticClass: 'input-clear-button',
          on: {
            click: self.onClearButtonClick,
          },
        });
      }
      if (self.disableButton) {
        disableEl = c('span', {
          staticClass: 'searchbar-disable-button',
          on: {
            click: self.onDisableButtonClick,
          },
        }, [self.disableButtonText]);
      }
      var iconEl = c('i', {
        staticClass: 'searchbar-icon',
      });

      var inputWrapEl = c('div', { staticClass: 'searchbar-input-wrap' }, [self.$slots['input-wrap-start'], inputEl, iconEl, clearEl, self.$slots['input-wrap-end']]);

      var innerEl = c('div', {
        staticClass: 'searchbar-inner',
      }, [self.$slots['inner-start'], inputWrapEl, disableEl, self.$slots['inner-end'], self.$slots.default]);

      return c(self.form ? 'form' : 'div', {
        staticClass: 'searchbar',
        class: Utils.extend({
          'no-shadow': self.noShadow,
          'no-hairline': self.noHairline,
          'searchbar-expandable': self.expandable,
        }, Mixins.colorClasses(self)),
        on: {
          submit: self.onSubmit,
        },
      }, [self.$slots['before-inner'], innerEl, self.$slots['after-inner']]);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.f7Searchbar && this.f7Searchbar.destroy) { this.f7Searchbar.destroy(); }
    },
    props: SearchbarProps,
    methods: {
      search: function search(query) {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.search(query);
      },
      enable: function enable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.enable();
      },
      disable: function disable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.disable();
      },
      toggle: function toggle() {
        if (!this.f7Searchbar) { return undefined; }
        return this.toggle.disable();
      },
      clear: function clear() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.clear();
      },
      onChange: function onChange(event) {
        this.$emit('change', event);
      },
      onInput: function onInput(event) {
        this.$emit('input', event);
      },
      onFocus: function onFocus(event) {
        this.$emit('focus', event);
      },
      onBlur: function onBlur(event) {
        this.$emit('blur', event);
      },
      onSubmit: function onSubmit(event) {
        this.$emit('submit', event);
      },
      onClearButtonClick: function onClearButtonClick(event) {
        this.$emit('click:clear', event);
      },
      onDisableButtonClick: function onDisableButtonClick(event) {
        this.$emit('click:disable', event);
      },

      onF7Ready: function onF7Ready() {
        var self = this;
        if (!self.init) { return; }
        var params = {
          el: self.$el,
          searchContainer: self.searchContainer,
          searchIn: self.searchIn,
          searchItem: self.searchItem,
          hideOnEnableEl: self.hideOnEnableEl,
          hideOnSearchEl: self.hideOnSearchEl,
          foundEl: self.foundEl,
          notFoundEl: self.notFoundEl,
          backdrop: self.backdrop,
          backdropEl: self.backdropEl,
          disableButton: self.disableButton,
          ignore: self.ignore,
          customSearch: self.customSearch,
          removeDiacritics: self.removeDiacritics,
          hideDividers: self.hideDividers,
          hideGroups: self.hideGroups,
          on: {
            search: function search(searchbar, query, previousQuery) {
              self.$emit('searchbar:search', searchbar, query, previousQuery);
            },
            clear: function clear(searchbar, previousQuery) {
              self.$emit('searchbar:clear', searchbar, previousQuery);
            },
            enable: function enable(searchbar) {
              self.$emit('searchbar:enable', searchbar);
            },
            disable: function disable(searchbar) {
              self.$emit('searchbar:disable', searchbar);
            },
          },
        };
        Object.keys(params).forEach(function (key) {
          if (typeof params[key] === 'undefined' || params[key] === '') {
            delete params[key];
          }
        });
        self.f7Searchbar = self.$f7.searchbar.create(params);
      },
    },
  };

  var SegmentedProps = Utils.extend({
    raised: Boolean,
    round: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  }, Mixins.colorProps);

  var f7Segmented = {
    name: 'f7-segmented',
    props: SegmentedProps,
    render: function render(c) {
      var self = this;
      return c(self.tag, {
        staticClass: 'segmented',
        class: Utils.extend({
          'segmented-raised': self.raised,
          'segmented-round': self.round,
        }, Mixins.colorClasses(self)),
      }, [self.$slots.default]);
    },
  };

  var SheetProps = Utils.extend(
    {
      opened: Boolean,
      backdrop: Boolean,
    },
    Mixins.colorProps
  );

  var f7Sheet = {
    name: 'f7-sheet',
    render: function render(c) {
      var self = this;
      var fixedList = [];
      var staticList = [];
      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab').split(' ');

      var tag;
      var child;

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i += 1) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue; // eslint-disable-line
          }
          var isFixed = false;
          for (var j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) { fixedList.push(child); }
          else { staticList.push(child); }
        }
      }

      var innerEl = c('div', {
        staticClass: 'sheet-modal-inner',
      }, staticList);

      return c('div', {
        class: self.classes,
        staticClass: 'sheet-modal',
        on: {
          'sheet:open': self.onOpen,
          'sheet:opened': self.onOpened,
          'sheet:close': self.onClose,
          'sheet:closed': self.onClosed,
        },
      }, [fixedList, innerEl]);
    },
    watch: {
      opened: function opened(opened$1) {
        var self = this;
        if (!self.f7Sheet) { return; }
        if (opened$1) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
        }
      },
    },
    props: SheetProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Sheet) { self.f7Sheet.destroy(); }
    },
    methods: {
      onOpen: function onOpen(event) {
        this.$emit('sheet:open', event);
      },
      onOpened: function onOpened(event) {
        this.$emit('sheet:opened', event);
      },
      onClose: function onClose(event) {
        this.$emit('sheet:close', event);
      },
      onClosed: function onClosed(event) {
        this.$emit('sheet:closed', event);
      },
      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.open(self.$el, animate);
      },
      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.close(self.$el, animate);
      },
      onF7Ready: function onF7Ready() {
        var self = this;
        var backdrop = self.backdrop;
        if (self.$options.propsData.backdrop === undefined) {
          var app = self.$f7;
          backdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
        }
        self.f7Sheet = self.$f7.sheet.create({
          el: self.$el,
          backdrop: backdrop,
        });
        if (self.opened) {
          self.f7Sheet.open(false);
        }
      },
    },
  };

  var f7Statusbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"statusbar",class:_vm.classes})},staticRenderFns: [],
    name: 'f7-statusbar',
    props: Mixins.colorProps,
    computed: {
      classes: function classes() {
        var self = this;
        return Mixins.colorClasses(self);
      },
    },
  };

  var StepperProps = Utils.extend({
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    formatValue: Function,
    input: {
      type: Boolean,
      default: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputReadonly: {
      type: Boolean,
      default: true,
    },
    autorepeat: {
      type: Boolean,
      default: false,
    },
    autorepeatDynamic: {
      type: Boolean,
      default: false,
    },
    wraps: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    buttonsOnly: Boolean,

    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    big: Boolean,
    bigMd: Boolean,
    bigIos: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    raised: Boolean,
  }, Mixins.colorProps);

  var f7Stepper = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"stepper",class:_vm.classes},[_c('div',{staticClass:"stepper-button-minus",on:{"click":_vm.onMinusClick}}),_vm._v(" "),(_vm.input && !_vm.buttonsOnly)?_c('div',{staticClass:"stepper-input-wrap"},[_c('input',{attrs:{"type":_vm.inputType,"min":_vm.inputType === 'number' ? _vm.min : undefined,"max":_vm.inputType === 'number' ? _vm.max : undefined,"step":_vm.inputType === 'number' ? _vm.step : undefined,"readonly":_vm.inputReadonly},domProps:{"value":_vm.value},on:{"input":_vm.onInput}})]):_vm._e(),_vm._v(" "),(!_vm.input && !_vm.buttonsOnly)?_c('div',{staticClass:"stepper-value"},[_vm._v(_vm._s(_vm.value))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"stepper-button-plus",on:{"click":_vm.onPlusClick}})])},staticRenderFns: [],
    props: StepperProps,
    computed: {
      classes: function classes() {
        var self = this;
        var round = self.round;
        var roundIos = self.roundIos;
        var roundMd = self.roundMd;
        var fill = self.fill;
        var fillIos = self.fillIos;
        var fillMd = self.fillMd;
        var big = self.big;
        var bigIos = self.bigIos;
        var bigMd = self.bigMd;
        var small = self.small;
        var smallIos = self.smallIos;
        var smallMd = self.smallMd;
        var raised = self.raised;

        return Utils.extend({
          disabled: self.disabled,
          'stepper-round': round,
          'stepper-round-ios': roundIos,
          'stepper-round-md': roundMd,
          'stepper-fill': fill,
          'stepper-fill-ios': fillIos,
          'stepper-fill-md': fillMd,
          'stepper-big': big,
          'stepper-big-ios': bigIos,
          'stepper-big-md': bigMd,
          'stepper-small': small,
          'stepper-small-ios': smallIos,
          'stepper-small-md': smallMd,
          'stepper-raised': raised,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy: function beforeDestroy() {
      if (!this.init) { return; }
      if (this.f7Stepper && this.f7Stepper.destroy) {
        this.f7Stepper.destroy();
      }
    },
    methods: {
      increment: function increment() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.increment();
      },
      decrement: function decrement() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.decrement();
      },
      setValue: function setValue(newValue) {
        var self = this;
        if (self.f7Stepper && self.f7Stepper.setValue) { self.f7Stepper.setValue(newValue); }
      },
      getValue: function getValue() {
        var self = this;
        if (self.f7Stepper && self.f7Stepper.getValue) {
          return self.f7Stepper.getValue();
        }
        return undefined;
      },
      onInput: function onInput(e) {
        this.$emit('input', e, this.f7Stepper);
      },
      onMinusClick: function onMinusClick(e) {
        this.$emit('stepper:minusclick', e, this.f7Stepper);
      },
      onPlusClick: function onPlusClick(e) {
        this.$emit('stepper:plusclick', e, this.f7Stepper);
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        var min = self.min;
        var max = self.max;
        var value = self.value;
        var step = self.step;
        var formatValue = self.formatValue;
        var $el = self.$el;
        var autorepeat = self.autorepeat;
        var autorepeatDynamic = self.autorepeatDynamic;
        var wraps = self.wraps;
        self.f7Stepper = f7.stepper.create({
          el: $el,
          min: min,
          max: max,
          value: value,
          step: step,
          formatValue: formatValue,
          autorepeat: autorepeat,
          autorepeatDynamic: autorepeatDynamic,
          wraps: wraps,
          on: {
            change: function change(stepper, newValue) {
              self.$emit('stepper:change', newValue);
            },
          },
        });
      },
    },
  }

  var SubnavbarProps = Utils.extend({
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  var f7Subnavbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"subnavbar",class:_vm.classes},[(_vm.inner)?_c('div',{staticClass:"subnavbar-inner"},[(_vm.title)?_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_vm._t("default")],2):_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-subnavbar',
    props: SubnavbarProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          sliding: this.sliding,
        }, Mixins.colorClasses(this));
      },
    },
  };

  var SwipeoutActionsProps = Utils.extend({
    left: Boolean,
    right: Boolean,
    side: String,
  }, Mixins.colorProps);

  var f7SwipeoutActions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-swipeout-actions',
    props: SwipeoutActionsProps,
    computed: {
      classes: function classes() {
        var obj;

        return Utils.extend(( obj = {}, obj[("swipeout-actions-" + (this.sideComputed))] = true, obj ), Mixins.colorClasses(this));
      },
      sideComputed: function sideComputed() {
        if (!this.side) {
          if (this.left) { return 'left'; }
          if (this.right) { return 'right'; }
          return 'right';
        }
        return this.side;
      },
    },
    data: function data() {
      return {};
    },
  };

  var SwipeoutButtonProps = Utils.extend({
    text: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
  }, Mixins.colorProps);

  var f7SwipeoutButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:_vm.classes,attrs:{"data-confirm":_vm.confirmText || undefined},on:{"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.text))])],2)},staticRenderFns: [],
    name: 'f7-swipeout-button',
    props: SwipeoutButtonProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      onClick: function onClick(event) {
        this.$emit('click', event);
      },
    },
  };

  var f7SwiperSlide = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper-slide"},[(_vm.zoom)?_c('div',{staticClass:"swiper-zoom-container"},[_vm._t("default")],2):_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-swiper-slide',
    props: {
      zoom: Boolean,
    },
  };

  var SwiperProps = Utils.extend({
    params: Object,
    pagination: Boolean,
    scrollbar: Boolean,
    navigation: Boolean,
    init: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  var f7Swiper = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper-container",class:_vm.classes},[_vm._t("before-wrapper"),_vm._v(" "),_c('div',{staticClass:"swiper-wrapper"},[_vm._t("default")],2),_vm._v(" "),(_vm.paginationComputed === true)?_c('div',{staticClass:"swiper-pagination"}):_vm._e(),_vm._v(" "),(_vm.scrollbarComputed === true)?_c('div',{staticClass:"swiper-scrollbar"}):_vm._e(),_vm._v(" "),(_vm.navigationComputed === true)?_c('div',{staticClass:"swiper-button-next"}):_vm._e(),_vm._v(" "),(_vm.navigationComputed === true)?_c('div',{staticClass:"swiper-button-prev"}):_vm._e(),_vm._v(" "),_vm._t("after-wrapper")],2)},staticRenderFns: [],
    name: 'f7-swiper',
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (!self.init) { return; }
      if (self.swiper && self.swiper.destroy) { self.swiper.destroy(); }
    },
    data: function data() {
      return {
        initialUpdate: false,
      };
    },
    updated: function updated() {
      var self = this;
      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }
      if (self.swiper && self.swiper.update) { self.swiper.update(); }
    },
    props: SwiperProps,
    computed: {
      classes: function classes() {
        return Mixins.colorClasses(this);
      },
      paginationComputed: function paginationComputed() {
        var self = this;
        if (self.pagination === true || (self.params && self.params.pagination && !self.params.pagination.el)) {
          return true;
        }
        return false;
      },
      scrollbarComputed: function scrollbarComputed() {
        var self = this;
        if (self.scrollbar === true || (self.params && self.params.scrollbar && !self.params.scrollbar.el)) {
          return true;
        }
        return false;
      },
      navigationComputed: function navigationComputed() {
        var self = this;
        if (self.navigation === true || (self.params && self.params.navigation && !self.params.navigation.nextEl && !self.params.navigation.prevEl)) {
          return true;
        }
        return false;
      },
    },
    methods: {
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }
        var params = {
          pagination: {},
          navigation: {},
          scrollbar: {},
        };
        if (self.params) { Utils.extend(params, self.params); }
        if (self.pagination && !params.pagination.el) { params.pagination.el = '.swiper-pagination'; }
        if (self.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
          params.navigation.nextEl = '.swiper-button-next';
          params.navigation.prevEl = '.swiper-button-prev';
        }
        if (self.scrollbar && !params.scrollbar.el) { params.scrollbar.el = '.swiper-scrollbar'; }

        self.swiper = f7.swiper.create(this.$el, params);
      },
    },
  };

  var TabProps = Utils.extend({
    tabActive: Boolean,
    id: String,
  }, Mixins.colorProps);

  var f7Tab = {
    name: 'f7-tab',
    props: TabProps,
    data: function data() {
      return {
        tabContent: null,
      };
    },
    render: function render(c) {
      var self = this;

      return c(
        'div', {
          staticClass: 'tab',
          attrs: {
            id: self.id,
          },
          class: Utils.extend({
            'tab-active': self.tabActive,
          }, Mixins.colorClasses(self)),
          on: {
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [self.tabContent ? c(self.tabContent.component, { tag: 'component', props: self.tabContent.params, key: self.tabContent.id }) : self.$slots.default]
      );
    },
    methods: {
      show: function show(animate) {
        if (!this.$f7) { return; }
        this.$f7.tab.show(this.$el, animate);
      },
      onTabShow: function onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function onTabHide(e) {
        this.$emit('tab:hide', e);
      },
    },
  };

  var TabsProps = Utils.extend({
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
  }, Mixins.colorProps);

  var f7Tabs = {
    name: 'f7-tabs',
    render: function render(c) {
      var self = this;
      var tabsEl = c('div', { staticClass: 'tabs' }, [self.$slots.default]);
      if (self.animated || self.swipeable) { return c('div', { class: self.classes }, [tabsEl]); }
      return tabsEl;
    },
    props: TabsProps,
    computed: {
      classes: function classes() {
        return Utils.extend({
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
          'tabs-routable': this.routable,
        }, Mixins.colorClasses(this));
      },
    },
  };

  var ToolbarProps = Utils.extend({
    bottomMd: Boolean,
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  var f7Toolbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toolbar",class:_vm.classes},[_vm._t("before-inner"),_vm._v(" "),(_vm.inner)?_c('div',{staticClass:"toolbar-inner"},[_vm._t("default")],2):_vm._t("default"),_vm._v(" "),_vm._t("after-inner")],2)},staticRenderFns: [],
    name: 'f7-toolbar',
    props: ToolbarProps,
    updated: function updated() {
      var self = this;
      if (self.tabbar && self.$f7) {
        self.$nextTick(function () {
          self.$f7.toolbar.setHighlight(self.$el);
        });
      }
    },
    computed: {
      classes: function classes() {
        var self = this;
        return Utils.extend({
          'toolbar-bottom-md': self.bottomMd,
          tabbar: self.tabbar,
          'tabbar-labels': self.labels,
          'tabbar-scrollable': self.scrollable,
          'toolbar-hidden': self.hidden,
          'no-shadow': self.noShadow,
          'no-hairline': self.noHairline,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      hide: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.hide(this.$el, animate);
      },
      show: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.show(this.$el, animate);
      },
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (self.tabbar) { f7.toolbar.setHighlight(self.$el); }
      },
    },
  };

  var ViewProps = Utils.extend(
    {
      tab: Boolean,
      tabActive: Boolean,

      name: String,
      router: Boolean,
      linksView: [Object, String],
      url: String,
      main: Boolean,
      stackPages: Boolean,
      xhrCache: String,
      xhrCacheIgnore: Array,
      xhrCacheIgnoreGetParameters: Boolean,
      xhrCacheDuration: Number,
      preloadPreviousPage: Boolean,
      uniqueHistory: Boolean,
      uniqueHistoryIgnoreGetParameters: Boolean,
      allowDuplicateUrls: Boolean,
      reloadPages: Boolean,
      removeElements: Boolean,
      removeElementsWithTimeout: Boolean,
      removeElementsTimeout: Number,
      restoreScrollTopOnBack: Boolean,
      // Swipe Back
      iosSwipeBack: Boolean,
      iosSwipeBackAnimateShadow: Boolean,
      iosSwipeBackAnimateOpacity: Boolean,
      iosSwipeBackActiveArea: Number,
      iosSwipeBackThreshold: Number,
      // Push State
      pushState: Boolean,
      pushStateRoot: String,
      pushStateAnimate: Boolean,
      pushStateAnimateOnLoad: Boolean,
      pushStateSeparator: String,
      pushStateOnLoad: Boolean,
      // Animate Pages
      animate: Boolean,
      // iOS Dynamic Navbar
      iosDynamicNavbar: Boolean,
      iosSeparateDynamicNavbar: Boolean,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: Boolean,
      // MD Theme delay
      materialPageLoadDelay: Number,

      passRouteQueryToRequest: Boolean,
      passRouteParamsToRequest: Boolean,
      routes: Array,
      routesAdd: Array,

      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  var f7View = {
    name: 'f7-view',
    props: ViewProps,
    render: function render(c) {
      var self = this;
      var pages = self.pages.map(function (page) { return c(page.component, {
        tag: 'component',
        props: page.params ? page.params || {} : {},
        key: page.id,
      }); });
      return c(
        'div',
        {
          staticClass: 'view',
          ref: 'view',
          class: self.classes,
          on: {
            'swipeback:move': self.onSwipeBackMove,
            'swipeback:beforechange': self.onSwipeBackBeforeChange,
            'swipeback:afterchange': self.onSwipeBackAfterChange,
            'swipeback:beforereset': self.onSwipeBackBeforeReset,
            'swipeback:afterreset': self.onSwipeBackAfterReset,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [
          self.$slots.default,
          pages ]
      );
    },
    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7View && self.f7View.destroy) { self.f7View.destroy(); }
    },
    data: function data() {
      return {
        pages: [],
      };
    },
    computed: {
      classes: function classes() {
        return Utils.extend(
          {
            'view-main': this.main,
            'tab-active': this.tabActive,
            tab: this.tab,
          },
          Mixins.colorClasses(this)
        );
      },
    },
    methods: {
      onF7Ready: function onF7Ready(f7) {
        var self = this;
        if (!self.init) { return; }

        // Init View
        self.f7View = f7.views.create(self.$el, self.$options.propsData);
      },
      onSwipeBackMove: function onSwipeBackMove(event) {
        this.$emit('swipeback:move', event, event.detail);
      },
      onSwipeBackBeforeChange: function onSwipeBackBeforeChange(event) {
        this.$emit('swipeback:beforechange', event, event.detail);
      },
      onSwipeBackAfterChange: function onSwipeBackAfterChange(event) {
        this.$emit('swipeback:afterchange', event, event.detail);
      },
      onSwipeBackBeforeReset: function onSwipeBackBeforeReset(event) {
        this.$emit('swipeback:beforereset', event, event.detail);
      },
      onSwipeBackAfterReset: function onSwipeBackAfterReset(event) {
        this.$emit('swipeback:afterreset', event, event.detail);
      },
      onTabShow: function onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function onTabHide(e) {
        this.$emit('tab:hide', e);
      },
    },
  };

  var ViewsProps = Utils.extend(
    {
      tabs: Boolean,
    },
    Mixins.colorProps
  );

  var f7Views = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
    name: 'f7-views',
    props: ViewsProps,
    computed: {
      classes: function classes() {
        return Utils.extend(
          {
            tabs: this.tabs,
          },
          Mixins.colorClasses(this)
        );
      },
    },
  };

  /* eslint no-param-reassign: "off" */

  var vuePlugin = {
    install: function install(Vue, Framework7) {
      if ( Framework7 === void 0 ) Framework7 = window.Framework7;

      // Check for F7
      if (typeof Framework7 === 'undefined') {
        throw new Error('Framework7 is undefined, make sure you have passed it as an argument: Vue.use(Framework7Vue, Framework7)');
      }
      // Event Hub
      var eventHub = new Vue();

      // Flags
      var f7Ready = false;
      var f7Instance;

      // Define protos
      Object.defineProperty(Vue.prototype, '$f7', {
        get: function get() {
          return f7Instance;
        },
      });

      var $theme = {};
      Object.defineProperty(Vue.prototype, '$theme', {
        get: function get() {
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
        var f7Params = Utils.extend({}, (params || {}), { root: rootEl });
        if (routes && routes.length && !f7Params.routes) { f7Params.routes = routes; }

        f7Instance = new Framework7(f7Params);
        f7Ready = true;
        eventHub.$emit('f7Ready', f7Instance);
      }

      // Extend F7 Router
      Framework7.Router
        .use(VueRouter)
        .use({
          on: {
            routeChange: function routeChange(to, from, router) {
              eventHub.$emit('f7RouteChange', to, from, router);
            },
            routeChanged: function routeChanged(to, from, router) {
              eventHub.$emit('f7RouteChanged', to, from, router);
            },
          },
        });

      // Mixin
      Vue.mixin({
        directives: Directives,
        components: {
          // eslint-disable-next-line
          f7AccordionContent: f7AccordionContent,
          f7AccordionItem: f7AccordionItem,
          f7AccordionToggle: f7AccordionToggle,
          f7Accordion: f7Accordion,
          f7ActionsButton: f7ActionsButton,
          f7ActionsGroup: f7ActionsGroup,
          f7ActionsLabel: f7ActionsLabel,
          f7Actions: f7Actions,
          f7Badge: f7Badge,
          f7BlockFooter: f7BlockFooter,
          f7BlockHeader: f7BlockHeader,
          f7BlockTitle: f7BlockTitle,
          f7Block: f7Block,
          f7Button: f7Button,
          f7CardContent: f7CardContent,
          f7CardFooter: f7CardFooter,
          f7CardHeader: f7CardHeader,
          f7Card: f7Card,
          f7Checkbox: f7Checkbox,
          f7Chip: f7Chip,
          f7Col: f7Col,
          f7FabButton: f7FabButton,
          f7FabButtons: f7FabButtons,
          f7Fab: f7Fab,
          f7Icon: f7Icon,
          f7Input: f7Input,
          f7Label: f7Label,
          f7Link: f7Link,
          f7ListButton: f7ListButton,
          f7ListGroup: f7ListGroup,
          f7ListIndex: f7ListIndex,
          f7ListItemCell: f7ListItemCell,
          f7ListItemContent: f7ListItemContent,
          f7ListItemRow: f7ListItemRow,
          f7ListItem: f7ListItem,
          f7List: f7List,
          f7LoginScreenTitle: f7LoginScreenTitle,
          f7LoginScreen: f7LoginScreen,
          f7Message: f7Message,
          f7MessagebarAttachment: f7MessagebarAttachment,
          f7MessagebarAttachments: f7MessagebarAttachments,
          f7MessagebarSheetImage: f7MessagebarSheetImage,
          f7MessagebarSheetItem: f7MessagebarSheetItem,
          f7MessagebarSheet: f7MessagebarSheet,
          f7Messagebar: f7Messagebar,
          f7MessagesTitle: f7MessagesTitle,
          f7Messages: f7Messages,
          f7NavLeft: f7NavLeft,
          f7NavRight: f7NavRight,
          f7NavTitle: f7NavTitle,
          f7Navbar: f7Navbar,
          f7PageContent: f7PageContent,
          f7Page: f7Page,
          f7Panel: f7Panel,
          f7PhotoBrowser: f7PhotoBrowser,
          f7Popover: f7Popover,
          f7Popup: f7Popup,
          f7Preloader: f7Preloader,
          f7Progressbar: f7Progressbar,
          f7Radio: f7Radio,
          f7Range: f7Range,
          f7RoutableModals: f7RoutableModals,
          f7Row: f7Row,
          f7Searchbar: f7Searchbar,
          f7Segmented: f7Segmented,
          f7Sheet: f7Sheet,
          f7Statusbar: f7Statusbar,
          f7Stepper: f7Stepper,
          f7Subnavbar: f7Subnavbar,
          f7SwipeoutActions: f7SwipeoutActions,
          f7SwipeoutButton: f7SwipeoutButton,
          f7SwiperSlide: f7SwiperSlide,
          f7Swiper: f7Swiper,
          f7Tab: f7Tab,
          f7Tabs: f7Tabs,
          f7Toggle: f7Toggle,
          f7Toolbar: f7Toolbar,
          f7View: f7View,
          f7Views: f7Views,
        },
        beforeCreate: function beforeCreate() {
          var self = this;
          if (self === self.$root) {
            var ref = (self.$options.framework7 || {});
            var theme = ref.theme;
            if (theme === 'md') { $theme.md = true; }
            if (theme === 'ios') { $theme.ios = true; }
            if (!theme || theme === 'auto') {
              $theme.ios = !!(Framework7.Device || Framework7.device).ios;
              $theme.md = !(Framework7.Device || Framework7.device).ios;
            }
          }

          var $route;
          var $router;
          var parent = self;
          while (parent && !$router && !$route) {
            if (parent.$f7route) { $route = parent.$f7route; }
            if (parent.$f7router) { $router = parent.$f7router; }
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
        beforeDestroy: function beforeDestroy() {
          var self = this;
          if (self.$f7RouteChangeCallback) { eventHub.$off('f7RouteChange', self.$f7RouteChangeCallback); }
          if (self.$f7RouteChangedCallback) { eventHub.$off('f7RouteChanged', self.$f7RouteChangedCallback); }
        },
        created: function created() {
          var self = this;

          var routeChangeCallback = self.onF7RouteChange || self.F7RouteChange || self.f7RouteChange || self.f7routeChange;
          var routeChangedCallback = self.onF7RouteChanged || self.F7RouteChanged || self.f7RouteChanged || self.f7routeChanged;
          if (!routeChangeCallback && !routeChangedCallback) { return; }

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

          if (!self.$f7) { eventHub.$once('f7Ready', addRoutesCallbacks); }
          else { addRoutesCallbacks(); }
        },
        mounted: function mounted() {
          var self = this;
          if (self === self.$root) {
            initFramework7(self.$root.$el, self.$options.framework7, self.$options.routes);
          }
          var callback = self.onF7Ready || self.onF7ready || self.onF7Init || self.onF7init || self.f7Ready || self.f7Init || self.f7ready || self.f7init;
          if (!callback) { return; }
          if (f7Ready) { callback(f7Instance); }
          else {
            eventHub.$once('f7Ready', function (f7) {
              callback(f7);
            });
          }
        },
      });
    },
  };

  return vuePlugin;

})));
