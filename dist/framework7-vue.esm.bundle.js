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

const Utils = {
  isTrueProp(val) {
    return val === true || val === '';
  },
  isStringProp(val) {
    return typeof val === 'string' && val !== '';
  },
  isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  now() {
    return Date.now();
  },
  extend(...args) {
    let deep = true;
    let to;
    let from;
    if (typeof args[0] === 'boolean') {
      [deep, to] = args;
      args.splice(0, 2);
      from = args;
    } else {
      [to] = args;
      args.splice(0, 1);
      from = args;
    }
    for (let i = 0; i < from.length; i += 1) {
      const nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        const keysArray = Object.keys(Object(nextSource));
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
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

const Directives = {};
['color', 'color-theme', 'text-color', 'bg-color', 'border-color', 'ripple-color'].forEach((name) => {
  Directives[`f7-${name}`] = function f7ColorDirective(el, binding) {
    const { value, oldValue } = binding;
    if (value === oldValue) return;
    if (!value && !oldValue) return;
    if (oldValue) {
      el.classList.remove(`${name}-${oldValue}`);
    }
    if (value) {
      el.classList.add(`${name}-${value}`);
    }
  };
});

/* eslint no-underscore-dangle: "off" */

let routerComponentIdCounter = 0;

var VueRouter = {
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

const Mixins = {
  colorProps: {
    color: String,
    colorTheme: String,
    textColor: String,
    bgColor: String,
    borderColor: String,
    rippleColor: String,
    themeDark: Boolean,
  },
  colorClasses(self) {
    const {
      color,
      colorTheme,
      textColor,
      bgColor,
      borderColor,
      rippleColor,
      themeDark,
    } = self;

    return {
      'theme-dark': themeDark,
      [`color-${color}`]: color,
      [`color-theme-${colorTheme}`]: colorTheme,
      [`text-color-${textColor}`]: textColor,
      [`bg-color-${bgColor}`]: bgColor,
      [`border-color-${borderColor}`]: borderColor,
      [`ripple-color-${rippleColor}`]: rippleColor,
    };
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
  linkRouterAttrs(self) {
    const {
      force,
      reloadCurrent,
      reloadPrevious,
      reloadAll,
      animate,
      ignoreCache,
      routeTabId,
      view,
    } = self;

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
  linkRouterClasses(self) {
    const { back, linkBack, external } = self;

    return {
      back: back || linkBack,
      external,
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
  linkActionsAttrs(self) {
    const {
      panelOpen,
      panelClose,
      popupOpen,
      popupClose,
      actionsOpen,
      actionsClose,
      popoverOpen,
      popoverClose,
      loginScreenOpen,
      loginScreenClose,
      sheetOpen,
      sheetClose,
      sortableEnable,
      sortableDisable,
      sortableToggle,
    } = self;

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
  linkActionsClasses(self) {
    const {
      panelOpen,
      panelClose,
      popupOpen,
      actionsClose,
      actionsOpen,
      popupClose,
      popoverOpen,
      popoverClose,
      loginScreenOpen,
      loginScreenClose,
      sheetOpen,
      sheetClose,
      sortableEnable,
      sortableDisable,
      sortableToggle,
    } = self;
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const AccordionItemProps = Utils.extend(
  {
    opened: Boolean,
  },
  Mixins.colorProps
);

var f7AccordionItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-item",class:_vm.classes,on:{"accordion:open":_vm.onOpen,"accordion:opened":_vm.onOpened,"accordion:close":_vm.onClose,"accordion:closed":_vm.onClosed}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-accordion-item',
  props: AccordionItemProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend(
        {
          'accordion-item-opened': self.opened,
        },
        Mixins.colorClasses(self)
      );
    },
  },
  methods: {
    onOpen(event) {
      this.$emit('accordion:open', event);
    },
    onOpened(event) {
      this.$emit('accordion:opened', event);
    },
    onClose(event) {
      this.$emit('accordion:close', event);
    },
    onClosed(event) {
      this.$emit('accordion:closed', event);
    },
  },
};

var f7AccordionToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-item-toggle",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-accordion-toggle',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7Accordion = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-list",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-accordion',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const ActionsButtonProps = Utils.extend(
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
  render(c) {
    const self = this;
    let mediaEl;
    if (self.$slots.media && self.$slots.media.length) {
      mediaEl = c('div', {
        staticClass: 'actions-button-media',
      }, self.$slots.media);
    }
    const textEl = c('div', {
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
    classes() {
      const self = this;

      return Utils.extend({
        'actions-button-bold': self.bold,
      }, Mixins.colorClasses(self));
    },
  },
  methods: {
    onClick(event) {
      const self = this;
      const $$ = self.$$;
      if (self.close && self.$f7) {
        self.$f7.actions.close($$(self.$el).parents('.actions-modal'));
      }
      self.$emit('click', event);
    },
  },
};

var f7ActionsGroup = {
  name: 'f7-actions-group',
  render(c) {
    const self = this;
    return c('div', { staticClass: 'actions-group' }, self.$slots.default);
  },
};

const ActionsLabelProps = Utils.extend(
  {
    bold: Boolean,
  },
  Mixins.colorProps
);
var f7ActionsLabel = {
  name: 'f7-actions-label',
  render(c) {
    const self = this;
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
    classes() {
      const self = this;
      return Utils.extend({
        'actions-button-bold': self.bold,
      }, Mixins.colorClasses(self));
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};

const ActionsProps = Utils.extend(
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
  render(c) {
    const self = this;

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
    opened(opened) {
      const self = this;
      if (!self.f7Actions) return;
      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
      }
    },
  },
  props: ActionsProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend({
        'actions-grid': self.grid,
      }, Mixins.colorClasses(self));
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
  },
  methods: {
    onOpen(event) {
      this.$emit('actions:open', event);
    },
    onOpened(event) {
      this.$emit('actions:opened', event);
    },
    onClose(event) {
      this.$emit('actions:close', event);
    },
    onClosed(event) {
      this.$emit('actions:closed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.open(self.$el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.close(self.$el, animate);
    },
    onF7Ready() {
      const self = this;

      const actionsParams = {
        el: self.$el,
        grid: self.grid,
      };
      if (self.target) actionsParams.targetEl = self.target;
      if (typeof self.$options.propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = self.convertToPopover;
      if (typeof self.$options.propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = self.forceToPopover;

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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7BlockFooter = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-footer",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-block-footer',
  props: Mixins.colorProps,
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7BlockHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-header",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-block-header',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7BlockTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-title",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-block-title',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const BlockProps = Utils.extend(
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
    classes() {
      const self = this;
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
    onTabShow(e) {
      this.$emit('tab:show', e);
    },
    onTabHide(e) {
      this.$emit('tab:hide', e);
    },
  },
};

const IconProps = Utils.extend(
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
    sizeComputed() {
      const self = this;
      let size = self.size;
      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = `${size}px`;
      }
      return size;
    },
    iconTextComputed() {
      const self = this;
      let text = self.material || self.f7;
      if (self.ifMd && self.$theme.md && (self.ifMd.indexOf('material:') >= 0 || self.ifMd.indexOf('f7:') >= 0)) {
        text = self.ifMd.split(':')[1];
      } else if (self.ifIos && self.$theme.ios && (self.ifIos.indexOf('material:') >= 0 || self.ifIos.indexOf('f7:') >= 0)) {
        text = self.ifIos.split(':')[1];
      }
      return text;
    },
    classes() {
      let classes = {};
      const self = this;
      if (self.ifMd || self.ifIos) {
        const parts = self[self.$theme.md ? 'ifMd' : 'ifIos'].split(':');
        const prop = parts[0];
        const value = parts[1];
        if (prop === 'material' || prop === 'fa' || prop === 'f7') {
          classes.fa = prop === 'fa';
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }
        if (prop === 'fa' || prop === 'ion') {
          classes[`${prop}-${value}`] = true;
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
        if (this.ion) classes[`ion-${this.ion}`] = true;
        if (this.fa) classes[`fa-${this.fa}`] = true;
        if (this.icon) classes[this.icon] = true;
      }
      return Utils.extend(classes, Mixins.colorClasses(self));
    },
  },
};

const ButtonProps = Utils.extend(
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
    f7Icon,
  },
  props: ButtonProps,
  render(c) {
    const self = this;
    let iconEl;
    let textEl;
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
    const linkEl = c('a', {
      class: self.classes,
      attrs: self.attrs,
      on: {
        click: self.onClick,
      },
    }, [iconEl, textEl, self.$slots.default]);

    return linkEl;
  },
  computed: {
    attrs() {
      const self = this;
      const { href, target, tabLink } = self;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined; // no href attribute
      return Utils.extend(
        {
          href: hrefComputed,
          target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink,
        },
        Mixins.linkRouterAttrs(self),
        Mixins.linkActionsAttrs(self)
      );
    },
    classes() {
      const self = this;
      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
        round,
        roundIos,
        roundMd,
        fill,
        fillIos,
        fillMd,
        big,
        bigIos,
        bigMd,
        small,
        smallIos,
        smallMd,
        raised,
        active,
        outline,
        disabled,
      } = self;

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

          disabled,
        },
        Mixins.colorClasses(self),
        Mixins.linkRouterClasses(self),
        Mixins.linkActionsClasses(self)
      );
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};

const CardContentProps = Utils.extend(
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
    classes() {
      const self = this;
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7CardHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-card-header',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const CardProps = Utils.extend(
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
    f7CardHeader,
    f7CardContent,
    f7CardFooter,
  },
  props: CardProps,
  render(c) {
    const self = this;
    let headerEl;
    let contentEl;
    let footerEl;

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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const CheckboxProps = Utils.extend({
  checked: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
}, Mixins.colorProps);

var f7Checkbox = {
  name: 'f7-checkbox',
  props: CheckboxProps,
  render(c) {
    const self = this;

    const inputEl = c('input', {
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

    const iconEl = c('i', { staticClass: 'icon-checkbox' });

    return c('label', {
      staticClass: 'checkbox',
      class: self.classes,
    }, [inputEl, iconEl, self.$slots.default]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.extend(
        {
          disabled: self.disabled,
        },
        Mixins.colorClasses(self)
      );
    },
  },
  methods: {
    onChange(event) {
      this.$emit('change', event);
    },
  },
};

const ChipProps = Utils.extend({
  media: String,
  text: [String, Number],
  deleteable: Boolean,
  mediaBgColor: String,
  mediaTextColor: String,
}, Mixins.colorProps);

var f7Chip = {
  name: 'f7-chip',
  props: ChipProps,
  render(c) {
    const self = this;
    let mediaEl;
    let labelEl;
    let deleteEl;
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
    mediaClasses() {
      const c = {};
      if (this.mediaTextColor) c[`text-color-${this.mediaTextColor}`] = true;
      if (this.mediaBgColor) c[`bg-color-${this.mediaBgColor}`] = true;
      return c;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
    onDeleteClick(event) {
      this.$emit('delete', event);
    },
  },
};

const ColProps = Utils.extend(
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
  render(c) {
    const self = this;
    return c(self.tag, {
      class: self.classes,
    }, [self.$slots.default]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.extend(
        {
          col: self.width === 'auto',
          [`col-${self.width}`]: self.width !== 'auto',
          [`tablet-${self.tabletWidth}`]: self.tabletWidth,
          [`desktop-${self.desktopWidth}`]: self.desktopWidth,
        },
        Mixins.colorClasses(self)
      );
    },
  },
};

const FabButtonProps = Utils.extend(
  {
    fabClose: Boolean,
  },
  Mixins.colorProps
);

var f7FabButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:_vm.classes,on:{"click":_vm.onClick}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-fab-button',
  props: FabButtonProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend(
        {
          'fab-close': self.fabClose,
        },
        Mixins.colorClasses(self)
      );
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};

const FabButtonsProps = Utils.extend(
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
    classes() {
      const self = this;
      return Utils.extend(
        {
          [`fab-buttons-${self.position}`]: true,
        },
        Mixins.colorClasses(self)
      );
    },
  },
};

const FabProps = Utils.extend(
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
  render(c) {
    const self = this;

    let href = self.href;
    if (href === true) href = '#';
    if (href === false) href = undefined; // no href attribute

    const linkChildren = [];
    const fabChildren = [];

    if (self.$slots.default) {
      for (let i = 0; i < self.$slots.default.length; i += 1) {
        const child = self.$slots.default[i];
        if (child.tag && child.tag.indexOf('fab-buttons') >= 0) {
          fabChildren.push(child);
        } else {
          linkChildren.push(child);
        }
      }
    }

    const linkEl = c('a', {
      attrs: {
        href,
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
    classes() {
      const self = this;
      return Utils.extend(
        {
          'fab-morph': self.morphTo,
          [`fab-${self.position}`]: true,
        },
        Mixins.colorClasses(self)
      );
    },
  },
  methods: {
    onClick(event) {
      const self = this;
      self.$emit('click', event);
    },
  },
};

const ToggleProps = Utils.extend({
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
  render(c) {
    const self = this;

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
      c('span', { staticClass: 'toggle-icon' }),
    ]);
  },
  props: ToggleProps,
  watch: {
    checked(newValue) {
      const self = this;
      if (!self.f7Toggle) return;
      self.f7Toggle.checked = newValue;
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
  },
  methods: {
    toggle() {
      const self = this;
      if (self.f7Toggle && self.f7Toggle.setValue) self.f7Toggle.toggle();
    },
    onChange(e) {
      const self = this;
      self.$emit('change', e);
    },
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
      self.$nextTick(() => {
        self.f7Toggle = f7.toggle.create({
          el: self.$el,
          on: {
            change(toggle) {
              self.$emit('toggle:change', toggle.checked);
            },
          },
        });
      });
    },
  },
};

const RangeProps = Utils.extend({
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
  render(c) {
    const self = this;

    return c('div', {
      staticClass: 'range-slider',
      class: Utils.extend({
        disabled: self.disabled,
      }, Mixins.colorClasses(self)),
    });
  },
  props: RangeProps,
  watch: {
    value(newValue) {
      const self = this;
      if (!self.f7Range) return;
      self.f7Range.setValue(newValue);
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
  },
  methods: {
    setValue(newValue) {
      const self = this;
      if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
    },
    getValue() {
      const self = this;
      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }
      return undefined;
    },
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
      self.$nextTick(() => {
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
            change(range, value) {
              self.$emit('range:change', value);
            },
            changed(range, value) {
              self.$emit('range:changed', value);
            },
          },
        });
      });
    },
  },
};

const InputProps = Utils.extend(
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
    f7Toggle,
    f7Range,
  },
  props: InputProps,
  render(c) {
    let inputEl;
    const self = this;
    const attrs = {
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
    const on = {
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
          attrs, on, style: self.inputStyle, domProps: { value: self.value },
        }, self.$slots.default);
      } else if (self.type === 'file') {
        inputEl = c('input', { attrs, style: self.inputStyle, on }, self.$slots.default);
      } else {
        inputEl = c('textarea', {
          attrs,
          style: self.inputStyle,
          on,
          class: { resizable: self.resizable },
          domProps: { value: self.value },
        }, self.$slots.default);
      }
    } else if ((self.$slots.default && self.$slots.default.length > 0) || !self.type) {
      inputEl = self.$slots.default;
    } else if (self.type === 'toggle') {
      inputEl = c('f7-toggle', { props: attrs, on, attrs: { id: attrs.id } });
    } else if (self.type === 'range') {
      on['range:change'] = self.onChange;
      inputEl = c('f7-range', { props: attrs, on, attrs: { id: attrs.id } });
    } else {
      inputEl = c('input', {
        attrs,
        style: self.inputStyle,
        on,
        domProps: { value: self.value, checked: self.checked },
      });
    }

    let clearButtonEl;
    if (self.clearButton) {
      clearButtonEl = c('span', { staticClass: 'input-clear-button' });
    }

    let $parent = self.$parent;
    let foundItemContent;
    while ($parent && !foundItemContent) {
      const tag = $parent.$vnode && $parent.$vnode.tag;
      if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
        foundItemContent = $parent;
      }
      $parent = $parent.$parent;
    }
    if (foundItemContent) foundItemContent.itemInputForced = true;
    if (foundItemContent && (self.info || (self.$slots.info && self.$slots.info.length))) foundItemContent.itemInputWithInfoForced = true;

    let infoEl;
    if (self.info || (self.$slots.info && self.$slots.info.length)) {
      infoEl = c('div', { staticClass: 'item-input-info' }, [self.info, self.$slots.info]);
    }

    const itemInput = self.wrap ? c('div', { staticClass: 'item-input-wrap', class: self.classes }, [inputEl, clearButtonEl, infoEl]) : inputEl;
    return itemInput;
  },
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  watch: {
    value() {
      const self = this;
      if (self.type === 'range' || self.type === 'toggle') return;
      const f7 = self.$f7;
      if (!f7) return;
      const inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
      self.$nextTick(() => {
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
    onF7Ready(f7) {
      const self = this;
      const inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
      f7.input.checkEmptyState(inputEl);
      if (self.validate) {
        f7.input.validate(inputEl);
      }
      if (self.resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    },
    onTextareaResize(event) {
      this.$emit('textarea:resize', event);
    },
    onInputNotEmpty(event) {
      this.$emit('input:notempty', event);
    },
    onInputEmpty(event) {
      this.$emit('input:empty', event);
    },
    onInputClear(event) {
      this.$emit('input:clear', event);
    },
    onInput(event) {
      this.$emit('input', event);
    },
    onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur(event) {
      this.$emit('blur', event);
    },
    onChange(event) {
      const self = this;
      self.$emit('change', event);
    },
  },
};

const LabelProps = Utils.extend(
  {
    floating: Boolean,
    inline: Boolean,
  },
  Mixins.colorProps
);

var f7Label = {
  name: 'f7-label',
  props: LabelProps,
  render(c) {
    const self = this;

    if (self.inline) {
      let $parent = self.$parent;
      let foundItemContent;
      while ($parent && !foundItemContent) {
        const tag = $parent.$vnode && $parent.$vnode.tag;
        if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
          foundItemContent = $parent;
        }
        $parent = $parent.$parent;
      }
      if (foundItemContent) foundItemContent.inlineLabelForced = true;
    }

    return c('div', {
      staticClass: 'item-title',
      class: self.classes,
    }, [self.$slots.default]);
  },
  computed: {
    classes() {
      const self = this;
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

const LinkProps = Utils.extend(
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
    f7Badge,
    f7Icon,
  },
  props: LinkProps,
  render(c) {
    const self = this;
    const isTabbarLabel = (self.tabLink || self.tabLink === '') && self.$parent && self.$parent.tabbar && self.$parent.labels;

    let iconEl;
    let textEl;
    let badgeEl;
    let iconBadgeEl;

    if (self.text) {
      if (self.badge) badgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.badge);
      textEl = c('span', { class: { 'tabbar-label': isTabbarLabel } }, [self.text, badgeEl]);
    }
    if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || (self.iconIfMd && self.$theme.md) || (self.iconIfIos && self.$theme.ios)) {
      if (self.iconBadge) iconBadgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.iconBadge);
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
    const linkEl = c('a', {
      class: self.classes,
      attrs: self.attrs,
      on: {
        click: self.onClick,
      },
    }, [iconEl, textEl, self.$slots.default]);
    return linkEl;
  },
  computed: {
    attrs() {
      const self = this;
      const { href, target, tabLink } = self;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined; // no href attribute
      return Utils.extend(
        {
          href: hrefComputed,
          target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink,
        },
        Mixins.linkRouterAttrs(self),
        Mixins.linkActionsAttrs(self)
      );
    },
    classes() {
      const self = this;
      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
      } = self;

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
    onClick(event) {
      this.$emit('click', event);
    },
  },
};

const ListButtonProps = Utils.extend(
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
  render(c) {
    const self = this;
    const linkEl = c('a', {
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
    attrs() {
      const self = this;
      // Link Props
      const {
        link,
        href,
        target,
        tabLink,
      } = self;

      return Utils.extend(
        {
          href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
          target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink,
        },
        Mixins.linkRouterAttrs(self),
        Mixins.linkActionsAttrs(self)
      );
    },
    classes() {
      const self = this;

      const {
        noFastclick,
        noFastClick,
        tabLink,
        tabLinkActive,
      } = self;

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
    onClick(event) {
      this.$emit('click', event);
    },
  },
};

const ListGroupProps = Utils.extend(
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
    sortableComputed() {
      return this.sortable || this.$parent.sortable;
    },
    mediaListComputed() {
      return this.mediaList || this.$parent.mediaList;
    },
  },
  data() {
    return {};
  },
};

const ListIndexProps = Utils.extend(
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  beforeDestroy() {
    if (!this.init) return;
    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  },
  watch: {
    indexes() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.params.indexes = this.indexes;
      this.update();
    },
  },
  methods: {
    update() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.update();
    },
    scrollListToIndex(itemContent) {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.scrollListToIndex(itemContent);
    },
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
      const {
        $el, listEl, indexes, iosItemHeight, mdItemHeight, scrollList, label,
      } = self;
      self.f7ListIndex = f7.listIndex.create({
        el: $el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const ListItemContentProps = Utils.extend(
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
    f7Badge,
  },
  props: ListItemContentProps,
  render(c) {
    const self = this;
    const slotsContentStart = [];
    const slotsContent = [];
    const slotsContentEnd = [];
    const slotsInnerStart = [];
    const slotsInner = [];
    const slotsInnerEnd = [];
    const slotsAfterStart = [];
    const slotsAfter = [];
    const slotsAfterEnd = [];
    const slotsMedia = [];
    const slotsBeforeTitle = [];
    const slotsTitle = [];
    const slotsAfterTitle = [];
    const slotsSubtitle = [];
    const slotsText = [];
    const slotsHeader = [];
    const slotsFooter = [];

    let [titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl, headerEl, footerEl] = [];

    if (self.$slots.default && self.$slots.default.length > 0) {
      for (let i = 0; i < self.$slots.default.length; i += 1) {
        const slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
        if (!slotName || (slotName === 'inner')) slotsInner.push(self.$slots.default[i]);
        if (slotName === 'content-start') slotsContentStart.push(self.$slots.default[i]);
        if (slotName === 'content') slotsContent.push(self.$slots.default[i]);
        if (slotName === 'content-end') slotsContentEnd.push(self.$slots.default[i]);
        if (slotName === 'after-start') slotsAfterStart.push(self.$slots.default[i]);
        if (slotName === 'after') slotsAfter.push(self.$slots.default[i]);
        if (slotName === 'after-end') slotsAfterEnd.push(self.$slots.default[i]);
        if (slotName === 'media') slotsMedia.push(self.$slots.default[i]);
        if (slotName === 'inner-start') slotsInnerStart.push(self.$slots.default[i]);
        if (slotName === 'inner-end') slotsInnerEnd.push(self.$slots.default[i]);
        if (slotName === 'before-title') slotsBeforeTitle.push(self.$slots.default[i]);
        if (slotName === 'title') slotsTitle.push(self.$slots.default[i]);
        if (slotName === 'after-title') slotsAfterTitle.push(self.$slots.default[i]);
        if (slotName === 'subtitle') slotsSubtitle.push(self.$slots.default[i]);
        if (slotName === 'text') slotsText.push(self.$slots.default[i]);
        if (slotName === 'header') slotsHeader.push(self.$slots.default[i]);
        if (slotName === 'footer') slotsFooter.push(self.$slots.default[i]);
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
      inputIconEl = c('i', { staticClass: `icon icon-${self.radio ? 'radio' : 'checkbox'}` });
    }
    // Media
    if (self.media || slotsMedia.length) {
      let mediaImgEl;
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
  data() {
    return {
      itemInputForced: false,
      inlineLabelForced: false,
      itemInputWithInfoForced: false,
    };
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onInput(event) {
      this.$emit('input', event);
    },
  },
};

var f7ListItemRow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-row",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-list-item-row',
  props: Mixins.colorProps,
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const ListItemProps = Utils.extend(
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
    f7ListItemContent,
  },
  props: ListItemProps,
  render(c) {
    const self = this;

    let liChildren;
    let linkEl;
    let itemContentEl;

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
        (self.swipeout || self.accordionItem ? [] : self.$slots.default),
      ]);

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
      const linkItemEl = (self.link || self.href || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
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
  data() {
    return {
      itemInputForced: false,
      inlineLabelForced: false,
      itemInputWithInfoForced: false,
    };
  },
  computed: {
    sortableComputed() {
      return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
    },
    mediaListComputed() {
      return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
    },
    simpleListComputed() {
      return this.simpleList || this.$parent.simpleList || (this.$parent.$parent && this.$parent.simpleList);
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.smartSelect && self.f7SmartSelect) {
      self.f7SmartSelect.destroy();
    }
  },
  methods: {
    onF7Ready(f7) {
      const self = this;
      if (!self.smartSelect) return;
      const smartSelectParams = Utils.extend({ el: self.$el.querySelector('a.smart-select') }, (self.smartSelectParams || {}));
      self.f7SmartSelect = f7.smartSelect.create(smartSelectParams);
    },
    onClick(event) {
      const self = this;
      if (self.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.open();
      }
      if (event.target.tagName.toLowerCase() !== 'input') {
        self.$emit('click', event);
      }
    },
    onSwipeoutDeleted(event) {
      this.$emit('swipeout:deleted', event);
    },
    onSwipeoutDelete(event) {
      this.$emit('swipeout:delete', event);
    },
    onSwipeoutClose(event) {
      this.$emit('swipeout:close', event);
    },
    onSwipeoutClosed(event) {
      this.$emit('swipeout:closed', event);
    },
    onSwipeoutOpen(event) {
      this.$emit('swipeout:open', event);
    },
    onSwipeoutOpened(event) {
      this.$emit('swipeout:opened', event);
    },
    onSwipeout(event) {
      this.$emit('swipeout', event);
    },
    onAccClose(event) {
      this.$emit('accordion:close', event);
    },
    onAccClosed(event) {
      this.$emit('accordion:closed', event);
    },
    onAccOpen(event) {
      this.$emit('accordion:open', event);
    },
    onAccOpened(event) {
      this.$emit('accordion:opened', event);
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onInput(event) {
      this.$emit('input', event);
    },
  },
};

const ListProps = Utils.extend(
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
  beforeDestroy() {
    const self = this;
    if (!(self.virtualList && self.f7VirtualList)) return;
    if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
  },
  render(c) {
    const self = this;

    const listChildren = [];
    const ulChildren = self.$slots.list || [];

    if (self.$slots.default) {
      for (let i = 0; i < self.$slots.default.length; i += 1) {
        const tag = self.$slots.default[i].tag;
        if (tag && !(tag === 'li' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
          listChildren.push(self.$slots.default[i]);
        } else if (tag) {
          ulChildren.push(self.$slots.default[i]);
        }
      }
    }
    const blockEl = c(
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
            listChildren,
          ] :
          [
            self.$slots['before-list'],
            listChildren,
            self.$slots['after-list'],
          ],
      ]
    );
    return blockEl;
  },
  methods: {
    onSortableEnable(event) {
      this.$emit('sortable:enable', event);
    },
    onSortableDisable(event) {
      this.$emit('sortable:disable', event);
    },
    onSortableSort(event) {
      this.$emit('sortable:sort', event, event.detail);
    },
    onTabShow(e) {
      this.$emit('tab:show', e);
    },
    onTabHide(e) {
      this.$emit('tab:hide', e);
    },
    onF7Ready(f7) {
      const self = this;
      // Init Virtual List
      if (!self.virtualList) return;
      const $$ = self.$$;
      const $el = $$(self.$el);
      const templateScript = $el.find('script');
      let template = templateScript.html();
      if (!template && templateScript.length > 0) {
        template = templateScript[0].outerHTML;
        // eslint-disable-next-line
        template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
      }
      const vlParams = self.virtualListParams || {};
      if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
      if (template) template = self.$t7.compile(template);

      self.f7VirtualList = f7.virtualList.create(Utils.extend(
        {
          el: self.$el,
          itemTemplate: template,
          on: {
            itemBeforeInsert(itemEl, item) {
              const vl = this;
              self.$emit('virtual:itembeforeinsert', vl, itemEl, item);
            },
            beforeClear(fragment) {
              const vl = this;
              self.$emit('virtual:beforeclear', vl, fragment);
            },
            itemsBeforeInsert(fragment) {
              const vl = this;
              self.$emit('virtual:itemsbeforeinsert', vl, fragment);
            },
            itemsAfterInsert(fragment) {
              const vl = this;
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const LoginScreenProps = Utils.extend(
  {
    opened: Boolean,
  },
  Mixins.colorProps
);

var f7LoginScreen = {
  name: 'f7-login-screen',
  render(c) {
    const self = this;
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
    opened(opened) {
      const self = this;
      if (!self.f7LoginScreen) return;
      if (opened) {
        self.f7LoginScreen.open();
      } else {
        self.f7LoginScreen.close();
      }
    },
  },
  props: LoginScreenProps,
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7LoginScreen) self.f7LoginScreen.destroy();
  },
  methods: {
    onOpen(event) {
      this.$emit('loginscreen:open', event);
    },
    onOpened(event) {
      this.$emit('loginscreen:opened', event);
    },
    onClose(event) {
      this.$emit('loginscreen:close', event);
    },
    onClosed(event) {
      this.$emit('loginscreen:closed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.loginScreen.open(self.$el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.loginScreen.close(self.$el, animate);
    },
    onF7Ready() {
      const self = this;
      self.f7LoginScreen = self.$f7.loginScreen.create({
        el: self.$el,
      });
      if (self.opened) {
        self.f7LoginScreen.open(false);
      }
    },
  },
};

const MessageProps = Utils.extend(
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
    classes() {
      const self = this;
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
    onClick(event) {
      this.$emit('click', event);
    },
    onNameClick(event) {
      this.$emit('click:name', event);
    },
    onTextClick(event) {
      this.$emit('click:text', event);
    },
    onAvatarClick(event) {
      this.$emit('click:avatar', event);
    },
    onHeaderClick(event) {
      this.$emit('click:header', event);
    },
    onFooterClick(event) {
      this.$emit('click:footer', event);
    },
    onBubbleClick(event) {
      this.$emit('click:bubble', event);
    },
  },
};

const MessagebarAttachmentProps = Utils.extend(
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  methods: {
    onClick(e) {
      this.$emit('attachment:click', e);
    },
    onDeleteClick(e) {
      this.$emit('attachment:delete', e);
    },
  },
};

var f7MessagebarAttachments = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-attachments",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-messagebar-attachments',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const MessagebarSheetItemProps = Utils.extend(
  {
    image: String,
    checked: Boolean,
  },
  Mixins.colorProps
);

var f7MessagebarSheetImage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"messagebar-sheet-image checkbox",class:_vm.classes,style:({ 'background-image': _vm.image && `url(${_vm.image})`})},[_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":_vm.checked},on:{"change":_vm.onChange}}),_vm._v(" "),_c('i',{staticClass:"icon icon-checkbox"}),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
  props: MessagebarSheetItemProps,
  name: 'f7-messagebar-sheet-image',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  methods: {
    onChange(e) {
      if (this.checked) this.$emit('checked', e);
      else this.$emit('unchecked', e);
      this.$emit('change', e);
    },
  },
};

var f7MessagebarSheetItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-sheet-item",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-messagebar-sheet-item',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

var f7MessagebarSheet = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messagebar-sheet",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  props: Mixins.colorProps,
  name: 'f7-messagebar-sheet',
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const MessagebarProps = Utils.extend(
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
    f7Input,
    f7Link,
  },
  render(c) {
    const self = this;
    const beforeInnerEls = [];
    const afterInnerEls = [];
    const innerStartEls = [];
    const innerEndEls = []; // add send link here
    const beforeAreaEls = []; // add attachments here
    const afterAreaEls = [];

    let linkEl;
    if ((self.sendLink && self.sendLink.length > 0) || self.$slots['send-link']) {
      linkEl = c('f7-link', {
        on: {
          click: self.onClick,
        },
      }, [self.sendLink ? self.sendLink : self.$slots['send-link']]);
      innerEndEls.push(linkEl);
    }

    if (self.$slots['before-inner']) {
      self.$slots['before-inner'].forEach((el) => {
        beforeInnerEls.push(el);
      });
    }
    if (self.$slots['after-inner']) {
      self.$slots['after-inner'].forEach((el) => {
        afterInnerEls.push(el);
      });
    }
    if (self.$slots['inner-start']) {
      self.$slots['inner-start'].forEach((el) => {
        innerStartEls.push(el);
      });
    }
    if (self.$slots['inner-end']) {
      self.$slots['inner-end'].forEach((el) => {
        innerEndEls.push(el);
      });
    }
    if (self.$slots['before-area']) {
      self.$slots['before-area'].forEach((el) => {
        beforeAreaEls.push(el);
      });
    }
    if (self.$slots['after-area']) {
      self.$slots['after-area'].forEach((el) => {
        afterAreaEls.push(el);
      });
    }
    if (self.$slots.default) {
      self.$slots.default.forEach((el) => {
        const tag = el.tag;
        if (tag && tag.indexOf('messagebar-attachments') >= 0) {
          beforeAreaEls.push(el);
        } else if (tag && tag.indexOf('messagebar-sheet') >= 0) {
          afterInnerEls.push(el);
        } else {
          innerEndEls.push(el);
        }
      });
    }

    const inputEl = c('f7-input', {
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

    const areaEl = c('div', {
      staticClass: 'messagebar-area',
    }, [
      beforeAreaEls,
      inputEl,
      afterAreaEls,
    ]);

    const innerEl = c('div', {
      staticClass: 'toolbar-inner',
    }, [
      innerStartEls,
      areaEl,
      innerEndEls,
    ]);

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
      afterInnerEls,
    ]);
  },
  props: MessagebarProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend({
        'messagebar-attachments-visible': self.attachmentsVisible,
        'messagebar-sheet-visible': self.sheetVisible,
      }, Mixins.colorClasses);
    },
  },
  watch: {
    sheetVisible() {
      const self = this;
      if (!self.resizable) return;
      self.$nextTick(() => {
        if (!self.f7Messagebar) return;
        self.f7Messagebar.sheetVisible = self.sheetVisible;
        self.f7Messagebar.resizePage();
      });
    },
    attachmentsVisible() {
      const self = this;
      if (!self.resizable) return;
      self.$nextTick(() => {
        if (!self.f7Messagebar) return;
        self.f7Messagebar.attachmentsVisible = self.attachmentsVisible;
        self.f7Messagebar.resizePage();
      });
    },
  },
  beforeDestroy() {
    if (this.f7Messagebar && this.f7Messagebar.destroy) this.f7Messagebar.destroy();
  },
  methods: {
    clear(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.clear(...args);
    },
    getValue(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.getValue(...args);
    },
    setValue(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.setValue(...args);
    },
    setPlaceholder(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.setPlaceholder(...args);
    },
    resizePage(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.resizePage(...args);
    },
    focus(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.focus(...args);
    },
    blur(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.blur(...args);
    },
    attachmentsShow(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsShow(...args);
    },
    attachmentsHide(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsHide(...args);
    },
    attachmentsToggle(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.attachmentsToggle(...args);
    },
    sheetShow(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetShow(...args);
    },
    sheetHide(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetHide(...args);
    },
    sheetToggle(...args) {
      if (!this.f7Messagebar) return undefined;
      return this.f7Messagebar.sheetToggle(...args);
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onInput(event) {
      this.$emit('input', event);
    },
    onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur(event) {
      this.$emit('blur', event);
    },
    onClick(event) {
      const self = this;
      const value = self.$refs.area.$el.value;
      const clear = self.f7Messagebar ? self.f7Messagebar.clear : () => {};
      this.$emit('submit', value, clear);
      this.$emit('send', value, clear);
      this.$emit('click', event);
    },
    onDeleteAttachment(e) {
      this.$emit('messagebar:attachmentdelete', e);
    },
    onClickAttachment(e) {
      this.$emit('messagebar:attachmentclick', e);
    },
    onResizePage(e) {
      this.$emit('messagebar:resizepage', e);
    },
    onF7Ready() {
      const self = this;
      if (!self.init) return;
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const MessagesProps = Utils.extend(
  {
    autoLayout: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default() {
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
  render(c) {
    const self = this;
    return c('div', {
      staticClass: 'messages',
      class: Mixins.colorClasses(self),
    }, self.$slots.default);
  },
  props: MessagesProps,
  beforeDestroy() {
    if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
  },
  beforeUpdate() {
    const self = this;
    if (!self.init) return;
    self.$children.forEach((el) => {
      self.$$(el.$el).addClass('message-appeared');
    });
  },
  updated() {
    const self = this;
    if (!self.init) return;
    self.$children.forEach((el) => {
      const $el = self.$$(el.$el);
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
    renderMessages(messagesToRender, method) {
      if (!this.f7Messages) return undefined;
      return this.renderMessages(messagesToRender, method);
    },
    layout() {
      if (!this.f7Messages) return undefined;
      return this.layout();
    },
    scroll(duration, scrollTop) {
      if (!this.f7Messages) return undefined;
      return this.scroll(duration, scrollTop);
    },
    clear() {
      if (!this.f7Messages) return undefined;
      return this.clear();
    },
    removeMessage(messageToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.removeMessage(messageToRemove, layout);
    },
    removeMessages(messagesToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.removeMessages(messagesToRemove, layout);
    },
    addMessage(...args) {
      if (!this.f7Messages) return undefined;
      return this.addMessage(...args);
    },
    addMessages(...args) {
      if (!this.f7Messages) return undefined;
      return this.addMessages(...args);
    },
    showTyping(message) {
      if (!this.f7Messages) return undefined;
      return this.showTyping(message);
    },
    hideTyping() {
      if (!this.f7Messages) return undefined;
      return this.hideTyping();
    },
    destroy() {
      if (!this.f7Messages) return undefined;
      return this.destroy();
    },
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
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

const NavLeftProps = Utils.extend({
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  sliding: Boolean,
}, Mixins.colorProps);

var f7NavLeft = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"left",class:_vm.classes},[(_vm.backLink)?_c('f7-link',{class:{'icon-only': (_vm.backLink === true || _vm.backLink && _vm.$theme.md)},attrs:{"href":_vm.backLinkUrl || '#',"back":"","icon":"icon-back","text":_vm.backLink !== true && !_vm.$theme.md ? _vm.backLink : undefined,"force":_vm.backLinkForce || undefined},on:{"click":_vm.onBackClick}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-nav-left',
  components: {
    f7Link,
  },
  props: NavLeftProps,
  computed: {
    classes() {
      return Utils.extend({
        sliding: this.slidng,
      }, Mixins.colorClasses(this));
    },
  },
  methods: {
    onBackClick(e) {
      this.$emit('back-click', e);
      this.$emit('click:back', e);
    },
  },
};

const NavRightProps = Utils.extend({
  sliding: Boolean,
}, Mixins.colorProps);

var f7NavRight = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"right",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-nav-right',
  props: NavRightProps,
  computed: {
    classes() {
      return Utils.extend({
        sliding: this.slidng,
      }, Mixins.colorClasses(this));
    },
  },
};

const NavTitleProps = Utils.extend({
  title: String,
  subtitle: String,
  sliding: Boolean,
}, Mixins.colorProps);

var f7NavTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title",class:_vm.classes},[_vm._t("default",[_vm._v(_vm._s(_vm.title)),(_vm.subtitle)?_c('span',{staticClass:"subtitle"},[_vm._v(_vm._s(_vm.subtitle))]):_vm._e()])],2)},staticRenderFns: [],
  name: 'f7-nav-title',
  props: NavTitleProps,
  computed: {
    classes() {
      return Utils.extend({
        sliding: this.slidng,
      }, Mixins.colorClasses(this));
    },
  },
};

const NavbarProps = Utils.extend({
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
    f7NavLeft,
    f7NavTitle,
  },
  render(c) {
    const self = this;
    let innerEl;
    let leftEl;
    let titleEl;
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
  updated() {
    const self = this;
    if (!self.$f7) return;
    self.$nextTick(() => {
      if (self.$el && self.$el.children && self.$el.children.length) {
        self.$f7.navbar.size(self.$el);
      } else if (self.$refs.inner) {
        self.$f7.navbar.size(self.$refs.inner);
      }
    });
  },
  props: NavbarProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend({
        'navbar-hidden': self.hidden,
        'no-shadow': self.noShadow,
        'no-hairline': self.noHairline,
      }, Mixins.colorClasses(self));
    },
  },
  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.$el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.$el, animate);
    },
    size() {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.$el);
    },
    onBackClick(e) {
      this.$emit('back-click', e);
      this.$emit('click:back', e);
    },
  },
};

const PageContentProps = Utils.extend({
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
  render(c) {
    const self = this;

    let ptrEl;
    let infiniteEl;

    if (self.ptr && (self.ptrPreloader)) {
      ptrEl = c('div', { staticClass: 'ptr-preloader' }, [
        c('div', { staticClass: 'preloader' }),
        c('div', { staticClass: 'ptr-arrow' }),
      ]);
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
    classes() {
      const self = this;
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
    onPtrPullStart(event) {
      this.$emit('ptr:pullstart', event);
    },
    onPtrPullMove(event) {
      this.$emit('ptr:pullmove', event);
    },
    onPtrPullEnd(event) {
      this.$emit('ptr:pullend', event);
    },
    onPtrRefresh(event) {
      this.$emit('ptr:refresh', event, event.detail);
    },
    onPtrRefreshDone(event) {
      this.$emit('ptr:done', event);
    },
    onInfinite(event) {
      this.$emit('infinite', event);
    },
    onTabShow(e) {
      const self = this;
      self.$emit('tab:show', e);
    },
    onTabHide(e) {
      const self = this;
      self.$emit('tab:hide', e);
    },
  },
};

const PageProps = Utils.extend({
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
    f7PageContent,
  },
  render(c) {
    const fixedList = [];
    const staticList = [];
    const self = this;

    let pageContentEl;

    const fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ');

    let tag;
    let child;
    let withSubnavbar;
    let withSearchbar;
    let withMessages = self.$options.propsData.withMessages;

    if (self.$slots.default) {
      for (let i = 0; i < self.$slots.default.length; i += 1) {
        child = self.$slots.default[i];
        tag = child.tag;
        if (!tag) {
          staticList.push(child);
          continue; // eslint-disable-line
        }
        let isFixed = false;
        if (tag.indexOf('subnavbar') >= 0) withSubnavbar = true;
        if (tag.indexOf('searchbar') >= 0) withSearchbar = true;
        if (typeof withMessages === 'undefined' && tag.indexOf('messages') >= 0) withMessages = true;
        for (let j = 0; j < fixedTags.length; j += 1) {
          if (tag.indexOf(fixedTags[j]) >= 0) {
            isFixed = true;
          }
        }
        if (isFixed) fixedList.push(child);
        else staticList.push(child);
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
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          if (fixedList.indexOf(self.$slots.default[i]) < 0) {
            pageContentEl.push(self.$slots.default[i]);
          }
        }
      } else {
        pageContentEl = [self.$slots.default];
      }
    }
    fixedList.push(self.$slots.fixed);

    if (withSubnavbar) self.classes['page-with-subnavbar'] = true;

    const pageEl = c('div', {
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
    classes() {
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
    onPtrPullStart(event) {
      this.$emit('ptr:pullstart', event);
    },
    onPtrPullMove(event) {
      this.$emit('ptr:pullmove', event);
    },
    onPtrPullEnd(event) {
      this.$emit('ptr:pullend', event);
    },
    onPtrRefresh(event) {
      this.$emit('ptr:refresh', event, event.detail);
    },
    onPtrRefreshDone(event) {
      this.$emit('ptr:done', event);
    },
    onInfinite(event) {
      this.$emit('infinite', event);
    },
    onPageMounted(event) {
      this.$emit('page:mounted', event, event.detail);
    },
    onPageInit(event) {
      this.$emit('page:init', event, event.detail);
    },
    onPageReinit(event) {
      this.$emit('page:reinit', event, event.detail);
    },
    onPageBeforeIn(event) {
      this.$emit('page:beforein', event, event.detail);
    },
    onPageBeforeOut(event) {
      this.$emit('page:beforeout', event, event.detail);
    },
    onPageAfterOut(event) {
      this.$emit('page:afterout', event, event.detail);
    },
    onPageAfterIn(event) {
      this.$emit('page:afterin', event, event.detail);
    },
    onPageBeforeRemove(event) {
      this.$emit('page:beforeremove', event, event.detail);
    },
  },
};

const PanelProps = Utils.extend(
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
    classes() {
      const self = this;
      const side = self.side || (self.left ? 'left' : 'right');
      const effect = self.effect || (self.reveal ? 'reveal' : 'cover');
      return Utils.extend(
        {
          'panel-active': self.opened,
          [`panel-${side}`]: side,
          [`panel-${effect}`]: effect,
        },
        Mixins.colorClasses(self)
      );
    },
  },
  watch: {
    opened(opened) {
      const self = this;
      if (!self.$f7) return;
      const side = self.side || (self.left ? 'left' : 'right');
      if (opened) {
        self.$f7.panel.open(side);
      } else {
        self.$f7.panel.open(side);
      }
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Panel) self.f7Panel.destroy();
  },
  mounted() {
    const self = this;
    if (self.opened) {
      self.$el.style.display = 'block';
    }
    const $ = self.$;
    if (!$) return;
    const side = self.side || (self.left ? 'left' : 'right');
    const effect = self.effect || (self.reveal ? 'reveal' : 'cover');
    if (self.opened) {
      $('html').addClass(`with-panel-${side}-${effect}`);
    }
  },
  methods: {
    onOpen(event) {
      this.$emit('panel:open', event);
    },
    onOpened(event) {
      this.$emit('panel:opened', event);
    },
    onClose(event) {
      this.$emit('panel:close', event);
    },
    onClosed(event) {
      this.$emit('panel:closed', event);
    },
    onBackdropClick(event) {
      this.$emit('panel:backdrop-click', event);
    },
    onPanelSwipe(event) {
      this.$emit('panel:swipe', event);
    },
    onPanelSwipeOpen(event) {
      this.$emit('panel:swipeopen', event);
    },
    onBreakpoint(event) {
      this.$emit('panel:breakpoint', event);
    },
    onF7Ready() {
      const self = this;
      const $ = self.$$;
      if (!$) return;
      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(self.$el);
      }
      self.f7Panel = self.$f7.panel.create({ el: self.$el });
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return;
      const side = self.side || (self.left ? 'left' : 'right');
      self.$f7.panel.open(side, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return;
      const side = self.side || (self.left ? 'left' : 'right');
      self.$f7.panel.close(side, animate);
    },
  },
};

var f7PhotoBrowser = {
  name: 'f7-photo-browser',
  render() {},
  beforeDestroy() {
    const self = this;
    if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
  },
  watch: {
    photos(newValue) {
      const self = this;
      const pb = self.f7PhotoBrowser;
      if (!pb) return;
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
    open(index) {
      return this.f7PhotoBrowser.open(index);
    },
    close() {
      return this.f7PhotoBrowser.close();
    },
    expositionToggle() {
      return this.f7PhotoBrowser.expositionToggle();
    },
    expositionEnable() {
      return this.f7PhotoBrowser.expositionEnable();
    },
    expositionDisable() {
      return this.f7PhotoBrowser.expositionDisable();
    },
    onF7Init(f7) {
      const self = this;
      // Init Virtual List
      if (!self.init) return;
      let params;

      if (typeof self.params !== 'undefined') params = self.params;
      else params = self.$options.propsData;

      params = Utils.extend({}, params, {
        on: {
          open() {
            self.$emit('photobrowser:open');
          },
          close() {
            self.$emit('photobrowser:close');
          },
          opened() {
            self.$emit('photobrowser:opened');
          },
          closed() {
            self.$emit('photobrowser:closed');
          },
          swipeToClose() {
            self.$emit('photobrowser:swipetoclose');
          },
        },
      });

      self.f7PhotoBrowser = f7.photoBrowser.create(params);
    },
  },
};

const PopoverProps = Utils.extend(
  {
    opened: Boolean,
    target: [String, Object],
  },
  Mixins.colorProps
);

var f7Popover = {
  name: 'f7-popover',
  render(c) {
    const self = this;
    const angleEl = c('div', { staticClass: 'popover-angle' });
    const innerEl = c('div', { staticClass: 'popover-inner' }, self.$slots.default);
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
    opened(opened) {
      const self = this;
      if (!self.f7Popover) return;
      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
      }
    },
  },
  props: PopoverProps,
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Popover) self.f7Popover.destroy();
  },
  methods: {
    onOpen(event) {
      this.$emit('popover:open', event);
    },
    onOpened(event) {
      this.$emit('popover:opened', event);
    },
    onClose(event) {
      this.$emit('popover:close', event);
    },
    onClosed(event) {
      this.$emit('popover:closed', event);
    },
    open(target, animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popover.open(self.$el, target, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.$el, animate);
    },
    onF7Ready() {
      const self = this;
      const popoverParams = {
        el: self.$el,
      };
      if (self.target) popoverParams.targetEl = self.target;
      self.f7Popover = self.$f7.popover.create(popoverParams);
      if (self.opened && self.target) {
        self.f7Popover.open(self.target, false);
      }
    },
  },
};

const PopupProps = Utils.extend(
  {
    'tablet-fullscreen': Boolean,
    opened: Boolean,
  },
  Mixins.colorProps
);

var f7Popup = {
  name: 'f7-popup',
  render(c) {
    const self = this;
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
    opened(opened) {
      const self = this;
      if (!self.f7Popup) return;
      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
      }
    },
  },
  props: PopupProps,
  computed: {
    classes() {
      const self = this;
      return Utils.extend({
        'popup-tablet-fullscreen': self.tabletFullscreen,
      }, Mixins.colorClasses(self));
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Popup) self.f7Popup.destroy();
  },
  methods: {
    onOpen(event) {
      this.$emit('popup:open', event);
    },
    onOpened(event) {
      this.$emit('popup:opened', event);
    },
    onClose(event) {
      this.$emit('popup:close', event);
    },
    onClosed(event) {
      this.$emit('popup:closed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.open(self.$el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.close(self.$el, animate);
    },
    onF7Ready() {
      const self = this;
      self.f7Popup = self.$f7.popup.create({
        el: self.$el,
      });
      if (self.opened) {
        self.f7Popup.open(false);
      }
    },
  },
};

const PreloaderProps = Utils.extend({
  size: [Number, String],
}, Mixins.colorProps);

var f7Preloader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader",class:_vm.classes,style:({'width': (_vm.sizeComputed ? `${_vm.sizeComputed}px` : ''), 'height': (_vm.sizeComputed ? `${_vm.sizeComputed}px` : '')})},[(_vm.$theme.md)?_c('span',{staticClass:"preloader-inner"},[_c('span',{staticClass:"preloader-inner-gap"}),_vm._v(" "),_vm._m(0),_vm._v(" "),_vm._m(1)]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader-inner-left"},[_c('span',{staticClass:"preloader-inner-half-circle"})])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"preloader-inner-right"},[_c('span',{staticClass:"preloader-inner-half-circle"})])}],
  name: 'f7-preloader',
  props: PreloaderProps,
  computed: {
    classes() {
      return Mixins.colorClasses(this);
    },
    sizeComputed() {
      let s = this.size;
      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }
      return s;
    },
  },
};

const ProgressbarProps = Utils.extend({
  progress: Number,
  infinite: Boolean,
}, Mixins.colorProps);

var f7Progressbar = {
  name: 'f7-progressbar',
  render(c) {
    const self = this;
    const { progress } = self;
    return c('span', {
      staticClass: 'progressbar',
      class: self.classes,
      attrs: {
        'data-progress': progress,
      },
    }, [
      c('span', {
        style: {
          transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
          '-webkit-transform': progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
        },
      }),
    ]);
  },
  props: ProgressbarProps,
  computed: {
    classes() {
      return Utils.extend({
        'progressbar-infinite': this.infinite,
      }, Mixins.colorClasses(this));
    },
  },
  methods: {
    set(progress, speed) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.$el, progress, speed);
    },
  },
};

const RadioProps = Utils.extend({
  checked: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
}, Mixins.colorProps);

var f7Radio = {
  name: 'f7-radio',
  props: RadioProps,
  render(c) {
    const self = this;

    const inputEl = c('input', {
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

    const iconEl = c('i', { staticClass: 'icon-radio' });

    return c('label', {
      staticClass: 'radio',
      class: Utils.extend({
        disabled: self.disabled,
      }, Mixins.colorClasses(self)),
    }, [inputEl, iconEl, self.$slots.default]);
  },
  methods: {
    onChange(event) {
      this.$emit('change', event);
    },
  },
};

var f7RoutableModals = {
  name: 'f7-routable-modals',
  data() {
    return {
      modals: [],
    };
  },
  render(c) {
    const self = this;
    const modals = self.modals.map(modal => c(modal.component, {
      tag: 'component',
      props: modal.params ? modal.params || {} : {},
      key: modal.id,
    }));
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

const RowProps = Utils.extend(
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
  render(c) {
    const self = this;
    return c(self.tag, {
      staticClass: 'row',
      class: self.classes,
    }, [self.$slots.default]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.extend(
        {
          'no-gap': self.noGap,
        },
        Mixins.colorClasses(self)
      );
    },
  },
};

const SearchbarProps = Utils.extend(
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
  render(c) {
    const self = this;
    let clearEl;
    let disableEl;

    const inputEl = c('input', {
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
    const iconEl = c('i', {
      staticClass: 'searchbar-icon',
    });

    const inputWrapEl = c('div', { staticClass: 'searchbar-input-wrap' }, [self.$slots['input-wrap-start'], inputEl, iconEl, clearEl, self.$slots['input-wrap-end']]);

    const innerEl = c('div', {
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
  beforeDestroy() {
    if (this.f7Searchbar && this.f7Searchbar.destroy) this.f7Searchbar.destroy();
  },
  props: SearchbarProps,
  methods: {
    search(query) {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.search(query);
    },
    enable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.enable();
    },
    disable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.disable();
    },
    toggle() {
      if (!this.f7Searchbar) return undefined;
      return this.toggle.disable();
    },
    clear() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.clear();
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onInput(event) {
      this.$emit('input', event);
    },
    onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur(event) {
      this.$emit('blur', event);
    },
    onSubmit(event) {
      this.$emit('submit', event);
    },
    onClearButtonClick(event) {
      this.$emit('click:clear', event);
    },
    onDisableButtonClick(event) {
      this.$emit('click:disable', event);
    },

    onF7Ready() {
      const self = this;
      if (!self.init) return;
      const params = {
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
          search(searchbar, query, previousQuery) {
            self.$emit('searchbar:search', searchbar, query, previousQuery);
          },
          clear(searchbar, previousQuery) {
            self.$emit('searchbar:clear', searchbar, previousQuery);
          },
          enable(searchbar) {
            self.$emit('searchbar:enable', searchbar);
          },
          disable(searchbar) {
            self.$emit('searchbar:disable', searchbar);
          },
        },
      };
      Object.keys(params).forEach((key) => {
        if (typeof params[key] === 'undefined' || params[key] === '') {
          delete params[key];
        }
      });
      self.f7Searchbar = self.$f7.searchbar.create(params);
    },
  },
};

const SegmentedProps = Utils.extend({
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
  render(c) {
    const self = this;
    return c(self.tag, {
      staticClass: 'segmented',
      class: Utils.extend({
        'segmented-raised': self.raised,
        'segmented-round': self.round,
      }, Mixins.colorClasses(self)),
    }, [self.$slots.default]);
  },
};

const SheetProps = Utils.extend(
  {
    opened: Boolean,
    backdrop: Boolean,
  },
  Mixins.colorProps
);

var f7Sheet = {
  name: 'f7-sheet',
  render(c) {
    const self = this;
    const fixedList = [];
    const staticList = [];
    const fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab').split(' ');

    let tag;
    let child;

    if (self.$slots.default) {
      for (let i = 0; i < self.$slots.default.length; i += 1) {
        child = self.$slots.default[i];
        tag = child.tag;
        if (!tag) {
          staticList.push(child);
          continue; // eslint-disable-line
        }
        let isFixed = false;
        for (let j = 0; j < fixedTags.length; j += 1) {
          if (tag.indexOf(fixedTags[j]) >= 0) {
            isFixed = true;
          }
        }
        if (isFixed) fixedList.push(child);
        else staticList.push(child);
      }
    }

    const innerEl = c('div', {
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
    opened(opened) {
      const self = this;
      if (!self.f7Sheet) return;
      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    },
  },
  props: SheetProps,
  computed: {
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();
  },
  methods: {
    onOpen(event) {
      this.$emit('sheet:open', event);
    },
    onOpened(event) {
      this.$emit('sheet:opened', event);
    },
    onClose(event) {
      this.$emit('sheet:close', event);
    },
    onClosed(event) {
      this.$emit('sheet:closed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.open(self.$el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.$el, animate);
    },
    onF7Ready() {
      const self = this;
      let backdrop = self.backdrop;
      if (self.$options.propsData.backdrop === undefined) {
        const app = self.$f7;
        backdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
      }
      self.f7Sheet = self.$f7.sheet.create({
        el: self.$el,
        backdrop,
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
    classes() {
      const self = this;
      return Mixins.colorClasses(self);
    },
  },
};

const StepperProps = Utils.extend({
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
    classes() {
      const self = this;
      const {
        round,
        roundIos,
        roundMd,
        fill,
        fillIos,
        fillMd,
        big,
        bigIos,
        bigMd,
        small,
        smallIos,
        smallMd,
        raised,
      } = self;

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
  beforeDestroy() {
    if (!this.init) return;
    if (this.f7Stepper && this.f7Stepper.destroy) {
      this.f7Stepper.destroy();
    }
  },
  methods: {
    increment() {
      if (!this.f7Stepper) return;
      this.f7Stepper.increment();
    },
    decrement() {
      if (!this.f7Stepper) return;
      this.f7Stepper.decrement();
    },
    setValue(newValue) {
      const self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
    },
    getValue() {
      const self = this;
      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }
      return undefined;
    },
    onInput(e) {
      this.$emit('input', e, this.f7Stepper);
    },
    onMinusClick(e) {
      this.$emit('stepper:minusclick', e, this.f7Stepper);
    },
    onPlusClick(e) {
      this.$emit('stepper:plusclick', e, this.f7Stepper);
    },
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
      const {
        min, max, value, step, formatValue, $el, autorepeat, autorepeatDynamic, wraps,
      } = self;
      self.f7Stepper = f7.stepper.create({
        el: $el,
        min,
        max,
        value,
        step,
        formatValue,
        autorepeat,
        autorepeatDynamic,
        wraps,
        on: {
          change(stepper, newValue) {
            self.$emit('stepper:change', newValue);
          },
        },
      });
    },
  },
}

const SubnavbarProps = Utils.extend({
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
    classes() {
      return Utils.extend({
        sliding: this.sliding,
      }, Mixins.colorClasses(this));
    },
  },
};

const SwipeoutActionsProps = Utils.extend({
  left: Boolean,
  right: Boolean,
  side: String,
}, Mixins.colorProps);

var f7SwipeoutActions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-swipeout-actions',
  props: SwipeoutActionsProps,
  computed: {
    classes() {
      return Utils.extend({
        [`swipeout-actions-${this.sideComputed}`]: true,
      }, Mixins.colorClasses(this));
    },
    sideComputed() {
      if (!this.side) {
        if (this.left) return 'left';
        if (this.right) return 'right';
        return 'right';
      }
      return this.side;
    },
  },
  data() {
    return {};
  },
};

const SwipeoutButtonProps = Utils.extend({
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
    classes() {
      return Utils.extend({
        'swipeout-overswipe': this.overswipe,
        'swipeout-delete': this.delete,
        'swipeout-close': this.close,
      }, Mixins.colorClasses(this));
    },
  },
  methods: {
    onClick(event) {
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

const SwiperProps = Utils.extend({
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
  beforeDestroy() {
    const self = this;
    if (!self.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
  },
  data() {
    return {
      initialUpdate: false,
    };
  },
  updated() {
    const self = this;
    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }
    if (self.swiper && self.swiper.update) self.swiper.update();
  },
  props: SwiperProps,
  computed: {
    classes() {
      return Mixins.colorClasses(this);
    },
    paginationComputed() {
      const self = this;
      if (self.pagination === true || (self.params && self.params.pagination && !self.params.pagination.el)) {
        return true;
      }
      return false;
    },
    scrollbarComputed() {
      const self = this;
      if (self.scrollbar === true || (self.params && self.params.scrollbar && !self.params.scrollbar.el)) {
        return true;
      }
      return false;
    },
    navigationComputed() {
      const self = this;
      if (self.navigation === true || (self.params && self.params.navigation && !self.params.navigation.nextEl && !self.params.navigation.prevEl)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;
      const params = {
        pagination: {},
        navigation: {},
        scrollbar: {},
      };
      if (self.params) Utils.extend(params, self.params);
      if (self.pagination && !params.pagination.el) params.pagination.el = '.swiper-pagination';
      if (self.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        params.navigation.nextEl = '.swiper-button-next';
        params.navigation.prevEl = '.swiper-button-prev';
      }
      if (self.scrollbar && !params.scrollbar.el) params.scrollbar.el = '.swiper-scrollbar';

      self.swiper = f7.swiper.create(this.$el, params);
    },
  },
};

const TabProps = Utils.extend({
  tabActive: Boolean,
  id: String,
}, Mixins.colorProps);

var f7Tab = {
  name: 'f7-tab',
  props: TabProps,
  data() {
    return {
      tabContent: null,
    };
  },
  render(c) {
    const self = this;

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
    show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.$el, animate);
    },
    onTabShow(e) {
      this.$emit('tab:show', e);
    },
    onTabHide(e) {
      this.$emit('tab:hide', e);
    },
  },
};

const TabsProps = Utils.extend({
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean,
}, Mixins.colorProps);

var f7Tabs = {
  name: 'f7-tabs',
  render(c) {
    const self = this;
    const tabsEl = c('div', { staticClass: 'tabs' }, [self.$slots.default]);
    if (self.animated || self.swipeable) return c('div', { class: self.classes }, [tabsEl]);
    return tabsEl;
  },
  props: TabsProps,
  computed: {
    classes() {
      return Utils.extend({
        'tabs-animated-wrap': this.animated,
        'tabs-swipeable-wrap': this.swipeable,
        'tabs-routable': this.routable,
      }, Mixins.colorClasses(this));
    },
  },
};

const ToolbarProps = Utils.extend({
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
  updated() {
    const self = this;
    if (self.tabbar && self.$f7) {
      self.$nextTick(() => {
        self.$f7.toolbar.setHighlight(self.$el);
      });
    }
  },
  computed: {
    classes() {
      const self = this;
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
    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.hide(this.$el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.show(this.$el, animate);
    },
    onF7Ready(f7) {
      const self = this;
      if (self.tabbar) f7.toolbar.setHighlight(self.$el);
    },
  },
};

const ViewProps = Utils.extend(
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
  render(c) {
    const self = this;
    const pages = self.pages.map(page => c(page.component, {
      tag: 'component',
      props: page.params ? page.params || {} : {},
      key: page.id,
    }));
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
        pages,
      ]
    );
  },
  beforeDestroy() {
    const self = this;
    if (self.f7View && self.f7View.destroy) self.f7View.destroy();
  },
  data() {
    return {
      pages: [],
    };
  },
  computed: {
    classes() {
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
    onF7Ready(f7) {
      const self = this;
      if (!self.init) return;

      // Init View
      self.f7View = f7.views.create(self.$el, self.$options.propsData);
    },
    onSwipeBackMove(event) {
      this.$emit('swipeback:move', event, event.detail);
    },
    onSwipeBackBeforeChange(event) {
      this.$emit('swipeback:beforechange', event, event.detail);
    },
    onSwipeBackAfterChange(event) {
      this.$emit('swipeback:afterchange', event, event.detail);
    },
    onSwipeBackBeforeReset(event) {
      this.$emit('swipeback:beforereset', event, event.detail);
    },
    onSwipeBackAfterReset(event) {
      this.$emit('swipeback:afterreset', event, event.detail);
    },
    onTabShow(e) {
      this.$emit('tab:show', e);
    },
    onTabHide(e) {
      this.$emit('tab:hide', e);
    },
  },
};

const ViewsProps = Utils.extend(
  {
    tabs: Boolean,
  },
  Mixins.colorProps
);

var f7Views = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'f7-views',
  props: ViewsProps,
  computed: {
    classes() {
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
        f7AccordionContent,
        f7AccordionItem,
        f7AccordionToggle,
        f7Accordion,
        f7ActionsButton,
        f7ActionsGroup,
        f7ActionsLabel,
        f7Actions,
        f7Badge,
        f7BlockFooter,
        f7BlockHeader,
        f7BlockTitle,
        f7Block,
        f7Button,
        f7CardContent,
        f7CardFooter,
        f7CardHeader,
        f7Card,
        f7Checkbox,
        f7Chip,
        f7Col,
        f7FabButton,
        f7FabButtons,
        f7Fab,
        f7Icon,
        f7Input,
        f7Label,
        f7Link,
        f7ListButton,
        f7ListGroup,
        f7ListIndex,
        f7ListItemCell,
        f7ListItemContent,
        f7ListItemRow,
        f7ListItem,
        f7List,
        f7LoginScreenTitle,
        f7LoginScreen,
        f7Message,
        f7MessagebarAttachment,
        f7MessagebarAttachments,
        f7MessagebarSheetImage,
        f7MessagebarSheetItem,
        f7MessagebarSheet,
        f7Messagebar,
        f7MessagesTitle,
        f7Messages,
        f7NavLeft,
        f7NavRight,
        f7NavTitle,
        f7Navbar,
        f7PageContent,
        f7Page,
        f7Panel,
        f7PhotoBrowser,
        f7Popover,
        f7Popup,
        f7Preloader,
        f7Progressbar,
        f7Radio,
        f7Range,
        f7RoutableModals,
        f7Row,
        f7Searchbar,
        f7Segmented,
        f7Sheet,
        f7Statusbar,
        f7Stepper,
        f7Subnavbar,
        f7SwipeoutActions,
        f7SwipeoutButton,
        f7SwiperSlide,
        f7Swiper,
        f7Tab,
        f7Tabs,
        f7Toggle,
        f7Toolbar,
        f7View,
        f7Views,
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

export default vuePlugin;
