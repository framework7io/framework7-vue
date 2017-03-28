<script>
  export default {
    render: function (c) {
      var liChildren, linkEl, itemContentEl;
      var self = this;
      function trustyBoolean(b) {
        if (b || b === '') return true;
        return false;
      }
      function trustyString(s) {
        if (typeof s === 'string' && s !== '') return true;
        return false;
      }

      // Item Content
      itemContentEl = c('f7-list-item-content', {
        props: {
          'title': self.title,
          'text': self.text,
          'media': self.media,
          'subtitle': self.subtitle,
          'after': self.after,
          'badge': self.badge,
          'badge-color': self.badgeColor,
          'media-list': self.mediaListComputed,
          'accordion-item': self.accordionItem,

          'checkbox': self.checkbox,
          'checked': self.checkedComputed,
          'radio': self.radio,
          'name': self.name,
          'value': self.valueComputed,
          'readonly': self.readonly,
          'required': self.required,
          'disabled': self.disabled
        },
        on: (self.link || self.accordionItem || self.smartSelect) ? {} : {click: self.onClick, change: self.onChange}
      }, [self.$slots['content-start'], self.$slots.content, self.$slots['media-start'], self.$slots.media, self.$slots['inner-start'], self.$slots.inner, self.$slots['after-start'], self.$slots.after, (self.swipeout || self.accordionItem ? [] : self.$slots.default)]);

      // Link
      if (self.link || self.accordionItem || self.smartSelect) {
        linkEl = c('a', {
          attrs: {
            href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link,
            'target': self.linkTarget,
            'data-searchbar': self.smartSelectSearchbar,
            'data-searchbar-placeholder': self.smartSelectSearchbarPlaceholder,
            'data-searchbar-cancel': self.smartSelectSearchbarCancel,
            'data-page-title': self.smartSelectPageTitle,
            'data-back-text': self.smartSelectBackText,
            'data-back-on-select': self.smartSelectBackOnSelect,
            'data-virtual-list': self.smartSelectVirtualList,
            'data-virtual-list-height': self.smartSelectVirtualListHeight,
            'data-open-in': self.smartSelectOpenIn,
            'data-navbar-theme': self.smartSelectNavbarTheme,
            'data-form-theme': self.smartSelectFormTheme,

            'data-view': trustyString(self.linkView) ? self.linkView : false,
            'data-panel': trustyString(self.linkOpenPanel) ? self.linkOpenPanel : false,
            'data-popup': trustyString(self.linkOpenPopup) ? self.linkOpenPopup : false,
            'data-popover': trustyString(self.linkOpenPopover) ? self.linkOpenPopover : false,
            'data-picker': trustyString(self.linkOpenPicker) ? self.linkOpenPicker : false,
            'data-login-screen': trustyString(self.linkOpenLoginScreen) ? self.linkOpenLoginScreen : false,
            'data-sortable': trustyString(self.linkOpenSortable) ? self.linkOpenSortable : (trustyString(self.linkToggleSortable) ? self.linkToggleSortable : false),

            'data-force': self.linkForce,
            'data-reload': self.linkReload,
            'data-animate-pages': ('linkAnimatePages' in self.$options.propsData) ? self.linkAnimatePages.toString() : undefined,
            'data-ignore-cache': self.linkIgnoreCache,
            'data-page-name': typeof self.linkPageName === 'string' ? self.linkPageName : false,
            'data-template': typeof self.linkTemplate === 'string' ? self.linkTemplate : false,
          },
          'class': {
            'item-link': true,
            'external': self.linkExternal,
            'back': self.linkBack,
            'no-fastclick': self.linkNoFastclick,
            'smart-select': self.smartSelect,
            'close-panel': trustyBoolean(self.linkClosePanel),
            'open-panel': self.linkOpenPanel || self.linkOpenPanel === '',
            'close-popup': trustyBoolean(self.linkClosePopup),
            'open-popup': self.linkOpenPopup || self.linkOpenPopup === '',
            'close-popover': trustyBoolean(self.linkClosePopover),
            'open-popover': self.linkOpenPopover || self.linkOpenPopover === '',
            'close-picker': trustyBoolean(self.linkClosePicker),
            'open-picker': self.linkOpenPicker || self.linkOpenPicker === '',
            'close-login-screen': trustyBoolean(self.linkCloseLoginScreen),
            'open-login-screen': self.linkOpenLoginScreen || self.linkOpenLoginScreen === '',
            'close-sortable': trustyBoolean(self.linkCloseSortable),
            'open-sortable': self.linkOpenSortable || self.linkOpenSortable === '',
            'toggle-sortable': self.linkToggleSortable || self.linkToggleSortable === '',
          },
          on: {
            click: self.onClick
          }
        }, [itemContentEl])
      }

      if (self.dividerOrGroupTitle) {
        liChildren = [c('span', self.$slots.default || self.title)]
      }
      else {
        var linkItemEl = (self.link || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
        if (self.swipeout) {
          liChildren = [c('div', {'class':{'swipeout-content': true}}, [linkItemEl])]
        }
        else {
          liChildren = [linkItemEl];
        }
        if (self.sortableComputed) {
          liChildren.push(c('div', {'class': {'sortable-handler': true}}));
        }
        if (self.swipeout || self.accordionItem) {
          liChildren.push(self.$slots.default);
        }
        liChildren.unshift(self.$slots['root-start']);
        liChildren.push(self.$slots.root);
      }

      return c(
        'li',
        {
          'class': {
            'item-divider' : self.divider,
            'list-group-title': self.groupTitle,
            'swipeout': self.swipeout,
            'accordion-item': self.accordionItem,
            'accordion-item-expanded': self.accordionExpanded
          },
          on: {
            'swipeout:open': self.onSwipeoutOpen,
            'swipeout:opened': self.onSwipeoutOpened,
            'swipeout:close': self.onSwipeoutClose,
            'swipeout:closed': self.onSwipeoutClosed,
            'swipeout:delete': self.onSwipeoutDelete,
            'swipeout:deleted': self.onSwipeoutDeleted,
            'swipeout': self.onSwipeout,
            'accordion:open': self.onAccOpen,
            'accordion:opened': self.onAccOpened,
            'accordion:close': self.onAccClose,
            'accordion:closed': self.onAccClosed,
          }
        },
        liChildren
      )
    },
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],

      // Link Props
      'link': [Boolean, String],
      'link-external': Boolean,
      'link-back': Boolean,
      'link-no-fastclick': Boolean,

      'link-force': Boolean,
      'link-reload': Boolean,
      'link-animate-pages': Boolean,
      'link-ignore-cache': Boolean,
      'link-page-name': String,
      'link-template': String,
      'link-target': String,

      'link-view': String,
      'link-open-panel': [Boolean, String],
      'link-close-panel': [Boolean, String],
      'link-open-popup': [Boolean, String],
      'link-close-popup': [Boolean, String],
      'link-open-popover': [Boolean, String],
      'link-close-popover': [Boolean, String],
      'link-open-login-screen': [Boolean, String],
      'link-close-login-screen': [Boolean, String],
      'link-open-picker': [Boolean, String],
      'link-close-picker': [Boolean, String],

      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-item': Boolean,
      'media-list-item': Boolean,
      'media-list': Boolean,
      'divider': Boolean,
      'group-title': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean,
      'accordion-item': Boolean,
      'accordion-expanded': Boolean,

      // Smart Select
      'smart-select': Boolean,
      'smart-select-searchbar': Boolean,
      'smart-select-searchbar-placeholder': String,
      'smart-select-searchbar-cancel': String,
      'smart-select-page-title': String,
      'smart-select-back-text': String,
      'smart-select-back-on-select': Boolean,
      'smart-select-virtual-list': Boolean,
      'smart-select-virtual-list-height': Number,
      'smart-select-open-in': String, //popup or picker or page
      'smart-select-navbar-theme': String,
      'smart-select-form-theme': String,

      // Inputs
      'checkbox': Boolean,
      'checked': Boolean,
      'radio': Boolean,
      'name': String,
      'value': [String, Number, Boolean, Array],
      'input-value': [String, Number],
      'readonly': Boolean,
      'required': Boolean,
      'disabled': Boolean
    },
    computed: {
      dividerOrGroupTitle: function () {
        return this.divider || this.groupTitle;
      },
      sortableComputed: function () {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed: function () {
        return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
      },
      hasCheckboxModel: function () {
        var self = this;
        return self.checkbox && (typeof self.$options.propsData.value !== 'undefined' && typeof self.value === 'boolean' || Array.isArray(self.value));
      },
      hasRadioModel: function () {
        var self = this;
        return self.radio && typeof self.inputValue !== 'undefined';
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) return self.inputValue;
        else if (self.hasCheckboxModel) return undefined;
        else return self.value;
      },
      checkedComputed: function () {
        var self = this;
        if (self.hasCheckboxModel) {
          if (self.inputValue && Array.isArray(self.value)) {
            return self.value.indexOf(self.inputValue) >= 0;
          }
          return self.value;
        }
        else if (self.hasRadioModel) {
          if (typeof self.value !== typeof self.inputValue) {
            return self.value.toString() === self.inputValue.toString();
          }
          return self.value === self.inputValue;
        }
        else return self.checked;
      }
    },
    methods: {
      onClick: function (event) {
        if (event.target.tagName.toLowerCase() !== 'input') {
          this.$emit('click', event);
        }
      },
      onSwipeoutDeleted: function (event) {
        this.$emit('swipeout:deleted', event)
      },
      onSwipeoutDelete: function (event) {
        this.$emit('swipeout:delete', event)
      },
      onSwipeoutClose: function (event) {
        this.$emit('swipeout:close', event)
      },
      onSwipeoutClosed: function (event) {
        this.$emit('swipeout:closed', event)
      },
      onSwipeoutOpen: function (event) {
        this.$emit('swipeout:open', event)
      },
      onSwipeoutOpened: function (event) {
        this.$emit('swipeout:opened', event)
      },
      onSwipeout: function (event) {
        this.$emit('swipeout', event)
      },
      onAccClose: function (event) {
        this.$emit('accordion:close', event)
      },
      onAccClosed: function (event) {
        this.$emit('accordion:closed', event)
      },
      onAccOpen: function (event) {
        this.$emit('accordion:open', event)
      },
      onAccOpened: function (event) {
        this.$emit('accordion:opened', event)
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) self.value.push(event.target.value);
            else self.value.splice(self.value.indexOf(event.target.value), 1);
          }
          else {
            self.$emit('input', event.target.checked);
          }
          self.$emit('change', event);
        }
        else if (self.hasRadioModel) {
          self.$emit('input', event.target.value);
        }
        else {
          self.$emit('change', event);
        }
      }
    }
  }
</script>
