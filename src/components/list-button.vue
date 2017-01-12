<script>
  export default {
    render: function (c) {
      var self = this;
      var linkEl;
      if (self.title) {
        linkEl = c('a', {
          staticClass: 'item-link list-button',
          attrs: self.attrsObject,
          class: self.classesObject,
          domProps: {
            innerHTML: self.title
          },
          on: {
            click: self.onClick
          }
        })
      }
      else{
        linkEl = c('a', {
          staticClass: 'item-link list-button',
          attrs: self.attrsObject,
          class: self.classesObject,
          on: {
            click: self.onClick
          }
        }, [self.$slots.default])
      }
      return c('li', {}, [linkEl]);
    },
    props: {
      'title': [String, Number],
      'link': [Boolean, String],
      'href': [Boolean, String],
      'external': Boolean,
      'link-external': Boolean,
      'back': Boolean,
      'link-back': Boolean,
      'no-fastclick': Boolean,
      'link-no-fastlick': Boolean,

      color: String,

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

      // Sortable
      openSortable: [Boolean, String],
      closeSortable: [Boolean, String],
      toggleSortable: [Boolean, String],
    },
    computed: {
      attrsObject: function () {
        var self = this;
        var ao = {
          href: ((typeof self.link === 'boolean' && typeof self.href === 'boolean') ? '#' : (self.link || self.href))
        }
        var pd = self.$options.propsData;
        if ('force' in pd) ao['data-force'] = self.force;
        if ('reload' in pd) ao['data-reload'] = 'true';
        if ('animatePages' in pd) ao['data-animate-pages'] = 'true';
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
          'external': self.external || self.linkExternal,
          'back': self.back || self.linkBack,
          'no-fastclick': self.noFastclick || self.linkNoFastclick
        };

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
        if (trustyBoolean(self.tabLink)) co['tab-link'] = true;

        // Color
        if (self.color) co['color-' + self.color] = true;

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      }
    }
  }
</script>