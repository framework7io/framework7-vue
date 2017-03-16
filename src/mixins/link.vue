<script>
  export default {
    data: function () {
      return {
        routeInfo: {
          activeTab: this.$route && this.$route.route.tab
        }
      };
    },
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
      iconIfMaterial: String,
      iconIfIos: String,
      iconSize: [String, Number],
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
      openPanel: [Boolean, String],
      closePanel: [Boolean, String],

      // Popup
      openPopup: [Boolean, String],
      closePopup: [Boolean, String],

      // Popover
      openPopover: [Boolean, String],
      closePopover: [Boolean, String],

      // Login Screen
      openLoginScreen: [Boolean, String],
      closeLoginScreen: [Boolean, String],

      // Picker
      openPicker: [Boolean, String],
      closePicker: [Boolean, String],

      // Tab
      tabLink: [Boolean, String],
      routeTabLink: [Boolean, String],

      // Sortable
      openSortable: [Boolean, String],
      closeSortable: [Boolean, String],
      toggleSortable: [Boolean, String],

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
        if ('animatePages' in pd && typeof pd.animatePages === 'boolean') ao['data-animate-pages'] = pd.animatePages.toString();
        if ('ignoreCache' in pd) ao['data-ignore-cache'] = 'true';
        if (self.pageName) ao['data-page-name'] = self.pageName;
        if (self.template) ao['data-template'] = self.template;
        if (self.view) ao['data-view'] = self.view;

        function trustyString(s) {
          if (typeof s === 'string' && s !== '') return true;
          return false;
        }

        if (trustyString(self.openPanel)) ao['data-panel'] = self.openPanel;
        if (trustyString(self.openPopup)) ao['data-popup'] = self.openPopup;
        if (trustyString(self.openPopover)) ao['data-popover'] = self.openPopover;
        if (trustyString(self.openPicker)) ao['data-picker'] = self.openPicker;
        if (trustyString(self.openLoginScreen)) ao['data-login-screen'] = self.openLoginScreen;
        if (trustyString(self.openSortable)) ao['data-sortable'] = self.openSortable;
        if (trustyString(self.toggleSortable)) ao['data-sortable'] = self.toggleSortable;

        if (trustyString(self.closePopup)) ao['data-popup'] = self.closePopup;
        if (trustyString(self.closePopover)) ao['data-popover'] = self.closePopover;
        if (trustyString(self.closePicker)) ao['data-picker'] = self.closePicker;
        if (trustyString(self.closeLoginScreen)) ao['data-login-screen'] = self.closeLoginScreen;
        if (trustyString(self.closeSortable)) ao['data-sortable'] = self.closeSortable;

        if (trustyString(self.tabLink)) ao['data-tab'] = self.tabLink;

        return ao;
      },
      classesObject: function () {
        var self = this;
        var co = {
          back: self.back,
          external: self.external,
          'no-fastclick': self.noFastclick
        };
        var pd = self.$options.propsData;
        if (self.rippleColor) co['ripple-color-' + self.rippleColor] = true;
        if (self.color) co['color-' + self.color] = true;
        if (self.theme) co['theme-' + self.theme] = true;
        if (self.bg) co['bg-' + self.bg] = true;

        // Button
        ['round', 'fill', 'big', 'raised'].forEach(function (prop, index) {
          if (self[prop]) co['button-' + prop] = true;
        });

        // Active
        if (self.routeInfo.activeTab) {
          const isActiveTab = self.routeTabLink && self.routeTabLink.replace('#', '') === self.routeInfo.activeTab.tabId;
          co.active = isActiveTab;
        } else {
          co.active = self.active;
        }

        function trustyBoolean(b) {
          if (b || b === '') return true;
          return false;
        }
        // Panel
        if (trustyBoolean(self.closePanel)) co['close-panel'] = true;
        if (self.openPanel || self.openPanel === '') co['open-panel'] = true;

        // Popup
        if (trustyBoolean(self.closePopup)) co['close-popup'] = true;
        if (self.openPopup || self.openPopup === '') co['open-popup'] = true;

        // Popover
        if (trustyBoolean(self.closePopover)) co['close-popover'] = true;
        if (self.openPopover || self.openPopover === '') co['open-popover'] = true;

        // Picker
        if (trustyBoolean(self.closePicker)) co['close-picker'] = true;
        if (self.openPicker || self.openPicker === '') co['open-picker'] = true;

        // Login Screen
        if (trustyBoolean(self.closeLoginScreen)) co['close-login-screen'] = true;
        if (self.openLoginScreen || self.openLoginScreen === '') co['open-login-screen'] = true;

        // Sortable
        if (trustyBoolean(self.closeSortable)) co['close-sortable'] = true;
        if (self.openSortable || self.openSortable === '') co['open-sortable'] = true;
        if (self.toggleSortable || self.toggleSortable === '') co['toggle-sortable'] = true;

        // Tab
        if (self.tabLink || self.tabLink === '') co['tab-link'] = true;

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onRouteChange: function (e) {
        if (e.route.tab) {
          this.$set(this.routeInfo, 'activeTab', e.route.tab)
        }
      }
    }
  }
</script>
