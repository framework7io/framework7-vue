import Utils from './utils';

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
export default Mixins;
