<script>
import Utils from '../utils/utils';

export default {
  props: {
    noLinkClass: Boolean,
    noFastclick: Boolean,

    external: Boolean,
    color: String,
    text: String,
    iconOnly: Boolean,
    icon: String,
    iconMaterial: String,
    iconIon: String,
    iconFa: String,
    iconF7: String,
    iconIfMd: String,
    iconIfIos: String,
    iconSize: [String, Number],
    rippleColor: String,
    href: {
      type: String,
      default: '#',
    },

    // Button
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

    // Router
    force: Boolean,
    reload: Boolean,
    animate: Boolean,
    ignoreCache: Boolean,

    // View
    view: String,

    // Panel
    panelOpen: [Boolean, String],
    panelClose: [Boolean, String],

    // Popup
    popupOpen: [Boolean, String],
    popupClose: [Boolean, String],

    // Popover
    popoverOpen: [Boolean, String],
    popoverClose: [Boolean, String],

    // Login Screen
    loginScreenOpen: [Boolean, String],
    loginScreenClose: [Boolean, String],

    // Picker
    sheetOpen: [Boolean, String],
    sheetClose: [Boolean, String],

    // Tab
    tabLink: [Boolean, String],
    tabLinkActive: [Boolean, String],

    // Sortable
    sortableEnable: [Boolean, String],
    sortableDisable: [Boolean, String],
    sortableToggle: [Boolean, String],

    // Badge
    badge: [String, Number],
    iconBadge: [String, Number],
    badgeColor: [String],

    // Back Link
    back: Boolean,
  },
  computed: {
    attrs() {
      const self = this;

      // Link Props
      const {
        href,
        force,
        reloadCurrent,
        reloadAll,
        reloadPrevious,
        animate,
        ignoreCache,
        target,
        view,
        panelOpen,
        popupOpen,
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
        tabLink,
      } = self;

      const ao = {
        href,
        target,
        'data-force': force,
        'data-reload-current': reloadCurrent,
        'data-reload-all': reloadAll,
        'data-reload-previous': reloadPrevious,
        'data-animate': ('animate' in self.$options.propsData) ? animate.toString() : undefined,
        'data-ignore-cache': ignoreCache,
        'data-view': Utils.isStringProp(view) ? view : false,
        'data-panel': Utils.isStringProp(panelOpen),
        'data-tab': Utils.isStringProp(tabLink),
      };

      if (Utils.isStringProp(popupOpen)) ao['data-popup'] = popupOpen;
      if (Utils.isStringProp(popoverOpen)) ao['data-popover'] = popoverOpen;
      if (Utils.isStringProp(sheetOpen)) ao['data-sheet'] = sheetOpen;
      if (Utils.isStringProp(loginScreenOpen)) ao['data-login-screen'] = loginScreenOpen;
      if (Utils.isStringProp(sortableEnable)) ao['data-sortable'] = sortableEnable;
      if (Utils.isStringProp(sortableToggle)) ao['data-sortable'] = sortableToggle;

      if (Utils.isStringProp(popupClose)) ao['data-popup'] = popupClose;
      if (Utils.isStringProp(popoverClose)) ao['data-popover'] = popoverClose;
      if (Utils.isStringProp(sheetClose)) ao['data-picker'] = sheetClose;
      if (Utils.isStringProp(loginScreenClose)) ao['data-login-screen'] = loginScreenClose;
      if (Utils.isStringProp(sortableDisable)) ao['data-sortable'] = sortableDisable;

      return ao;
    },
    classes() {
      const self = this;

      const {
        external,
        back,
        noFastclick,
        panelOpen,
        panelClose,
        popupOpen,
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
        tabLink,
        rippleColor,
        color,
        textColor,

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

      const co = {
        external,
        back,
        [`ripple-color-${rippleColor}`]: rippleColor,
        [`color-${color}`]: color,
        [`text-color-${textColor}`]: textColor,
        'tab-link': tabLink || tabLink === '',
        'no-fastclick': noFastclick,
        'panel-close': Utils.isTrueProp(panelClose),
        'panel-open': panelOpen || panelOpen === '',
        'popup-close': Utils.isTrueProp(popupClose),
        'popup-open': popupOpen || popupOpen === '',
        'popover-close': Utils.isTrueProp(popoverClose),
        'popover-open': popoverOpen || popoverOpen === '',
        'sheet-close': Utils.isTrueProp(sheetClose),
        'sheet-open': sheetOpen || sheetOpen === '',
        'login-screen-close': Utils.isTrueProp(loginScreenClose),
        'login-screen-open': loginScreenOpen || loginScreenOpen === '',
        'sortable-enable': Utils.isTrueProp(sortableEnable),
        'sortable-disable': Utils.isTrueProp(sortableDisable),
        'sortable-toggle': Utils.isTrueProp(sortableToggle),
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
      };

      return co;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
