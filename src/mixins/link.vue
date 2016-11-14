<script>
  export default {
    props: {
      noLinkClass: Boolean,
      noFastclick: Boolean,

      external: Boolean,
      color: String,
      bg: String,
      theme: String,
      text: String,
      iconOnly: Boolean,
      icon: String,
      iconMaterial: String,
      iconIon: String,
      iconFa: String,
      iconF7: String,
      rippleColor: String,
      href: {
        type: String,
        default: '#'
      },

      // Button
      round: Boolean,
      fill: Boolean,
      big: Boolean,
      raised: Boolean,

      // Router
      force: Boolean,
      reload: Boolean,
      animatePages: Boolean,
      ignoreCache: Boolean,
      pageName: String,
      template: String,

      // View
      view: String,

      // Panel
      openPanel: [String, Boolean],
      closePanel: Boolean,

      // Popup
      openPopup: [String, Boolean],
      closePopup: Boolean,

      // Popover
      openPopover: [String, Boolean],
      closePopover: Boolean,

      // Login Screen
      openLoginScreen: [String, Boolean],
      closeLoginScreen: Boolean,

      // Picker
      openPicker: [String, Boolean],
      closePicker: Boolean,

      // Tab
      tabLink: [Boolean, String],

      // Sortable
      openSortable: [String, Boolean],
      closeSortable: Boolean,
      toggleSortable: [String, Boolean],

      // Active
      active: Boolean,

      // Badge
      badge: [String, Number],
      iconBadge: [String, Number],
      badgeColor: [String],

      // Back Link
      back: Boolean
    },
    computed: {
      attrsObject: function () {
        var self = this;
        var ao = {
          href: self.href
        };
        var pd = self.$options.propsData;
        if ('force' in pd) ao['data-force'] = self.force;
        if ('reload' in pd) ao['data-reload'] = 'true';
        if ('animatePages' in pd) ao['data-animate-pages'] = 'true';
        if ('ignoreCache' in pd) ao['data-ignore-cache'] = 'true';
        if (self.pageName) ao['data-page-name'] = self.pageName;
        if (self.template) ao['data-template'] = self.template;
        if (self.view) ao['data-view'] = self.view;

        if (typeof self.openPanel === 'string') ao['data-panel'] = self.openPanel;
        if (typeof self.openPopup === 'string') ao['data-popup'] = self.openPopup;
        if (typeof self.openPopover === 'string') ao['data-popover'] = self.openPopover;
        if (typeof self.openPicker === 'string') ao['data-picker'] = self.openPicker;
        if (typeof self.openLoginScreen === 'string') ao['data-login-screen'] = self.openLoginScreen;
        if (typeof self.openSortable === 'string') ao['data-sortable'] = self.openSortable;
        if (typeof self.toggleSortable === 'string') ao['data-sortable'] = self.toggleSortable;
        if (typeof self.tabLink === 'string') ao['data-tab'] = self.tabLink;
        return ao;
      },
      classesObject: function () {
        var self = this;
        var co = {};
        var pd = self.$options.propsData;
        if (self.rippleColor) co['ripple-color-' + self.rippleColor] = true;
        if (self.color) co['color-' + self.color] = true;
        if (self.theme) co['theme-' + self.theme] = true;
        if (self.bg) co['bg-' + self.bg] = true;

        co['back'] = self.back;
        co['external'] = self.external;
        co['no-fastclick'] = self.noFastclick;

        // Button
        ['round', 'fill', 'big', 'raised'].forEach(function (prop, index) {
          if (self[prop]) co['button-' + prop] = true;
        });

        // Active
        co['active'] = self.active;

        // Panel
        if (self.closePanel) co['close-panel'] = true;
        if (self.openPanel) co['open-panel'] = true;

        // Popup
        if (self.closePopup) co['close-popup'] = true;
        if (self.openPopup) co['open-popup'] = true;

        // Popover
        if (self.closePopover) co['close-popover'] = true;
        if (self.openPopover) co['open-popover'] = true;

        // Picker
        if (self.closePicker) co['close-picker'] = true;
        if (self.openPicker) co['open-picker'] = true;

        // Login Screen
        if (self.closeLoginScreen) co['close-login-screen'] = true;
        if (self.openLoginScreen) co['open-login-screen'] = true;

        // Sortable
        if (self.closeSortable) co['close-sortable'] = true;
        if (self.openSortable) co['open-sortable'] = true;
        if (self.toggleSortable) co['toggle-sortable'] = true;

        // Tab
        if (self.tabLink) co['tab-link'] = true;

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>