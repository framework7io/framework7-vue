<script>
  import Utils from '../utils/utils';

  export default {
    render(c) {
      const self = this;
      const linkEl = c('a', {
        staticClass: 'item-link list-button',
        attrs: self.attrs,
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [self.title, self.$slots.default]);
      return c('li', {}, [linkEl]);
    },
    props: {
      title: [String, Number],
      link: [Boolean, String],
      href: [Boolean, String],
      tabindex: [Number, String],
      external: Boolean,
      back: Boolean,
      linkBack: Boolean,
      noFastclick: Boolean,

      color: String,
      rippleColor: String,
      textColor: String,

      // Router
      force: Boolean,
      reload: Boolean,
      animate: Boolean,
      ignoreCache: Boolean,
      pageName: String,
      template: String,

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

      // Sortable
      sortableEnable: [Boolean, String],
      sortableDisable: [Boolean, String],
      sortableToggle: [Boolean, String],
    },
    computed: {
      attrs() {
        const self = this;
        // Link Props
        const {
          link,
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
          href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
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
          linkBack,
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
        } = self;

        const co = {
          external,
          back: back || linkBack,
          [`color-${color}`]: color,
          [`ripple-color-${rippleColor}`]: rippleColor,
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
