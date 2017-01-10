<script>
  export default {
    render: function (c) {
      var self = this;
      var clearEl, cancelEl, inputEl, inputWrapEl;
      inputEl = c('input', {
        attrs: {
          'placeholder': self.placeholder,
          'type': 'search'
        },
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur
        }
      });
      if (self.clearButtonComputed) {
        clearEl = c('a', {
          staticClass: 'searchbar-clear',
          attrs: {
            'href' : '#'
          },
          on: {
            click: self.onClearClick
          }
        });
      }
      if (self.cancelLink) {
        cancelEl = c('a', {
          staticClass: 'searchbar-cancel',
          attrs: {
            'href' : '#'
          },
          domProps: {
            innerHTML: self.cancelLink
          },
          on: {
            click: self.onCancelClick
          }
        });
      }
      inputWrapEl = c('div', {staticClass:'searchbar-input'}, [inputEl, clearEl])

      return c(self.form ? 'form' : 'div', {
        staticClass: 'searchbar',
        on: {
          'submit': self.onSubmit,
          'searchbar:search': self.onSearch,
          'searchbar:enable': self.onEnable,
          'searchbar:disable': self.onDisable,
          'searchbar:clear': self.onClear
        }
      }, [self.$slots['before-input'], inputWrapEl, self.$slots['after-input'], cancelEl, self.$slots.default]);
    },
    beforeDestroy: function () {
      if (this.f7Searchbar && this.f7Searchbar.destroy) this.f7Searchbar.destroy();
    },
    props: {
      form: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: 'Search'
      },
      cancelLink: String,
      clear: Boolean,
      clearButton: {
        type: Boolean,
        default: true
      },

      // SB Params
      params: Object,
      searchList: [String, Object],
      searchIn: {
        type: String,
        default: '.item-title'
      },
      searchBy: String,
      found: [String, Object],
      notFound: [String, Object],
      overlay: [String, Object],
      ignore: {
        type: String,
        default: '.searchbar-ignore'
      },
      customSearch: {
        type: Boolean,
        default: false
      },
      removeDiacritics: {
        type: Boolean,
        default: false
      },
      hideDividers: {
        type: Boolean,
        default: true
      },
      hideGroups: {
        type: Boolean,
        default: true
      },
      init: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      clearButtonComputed: function () {
        var self = this;
        var cb = self.clearButton;
        if (self.$options.propsData.clear === false) {
          cb = false;
        }
        return cb;
      }
    },
    methods: {
      search: function (query) {
        if (!this.f7Searchbar) return;
        return this.f7Searchbar.search(query)
      },
      enable: function () {
        if (!this.f7Searchbar) return;
        return this.f7Searchbar.enable()
      },
      disable: function () {
        if (!this.f7Searchbar) return;
        return this.f7Searchbar.disable()
      },
      empty: function () {
        if (!this.f7Searchbar) return;
        return this.f7Searchbar.clear()
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onSubmit: function (event) {
        this.$emit('submit', event);
      },
      onSearch: function (event) {
        if(!event.detail) return;
        this.$emit('searchbar:search', event.detail.query, event.detail.foundItems);
      },
      onClear: function (event) {
        this.$emit('searchbar:clear', event);
      },
      onEnable: function (event) {
        this.$emit('searchbar:enable', event);
      },
      onDisable: function (event) {
        this.$emit('searchbar:disable', event);
      },
      onClearClick: function (event) {
        this.$emit('click:clear', event);
      },
      onCancelClick: function (event) {
        this.$emit('click:cancel', event);
      },
      onF7Init: function () {
        var self = this;
        if (!self.init) return;
        self.f7Searchbar = self.$f7.searchbar(self.$el, self.params || {
          searchList: self.searchList,
          searchIn: self.searchIn,
          searchBy: self.searchBy,
          found: self.found,
          notFound: self.notFound,
          overlay: self.overlay,
          ignore: self.ignore,
          customSearch: self.customSearch,
          removeDiacritics: self.removeDiacritics,
          hideDividers: self.hideDividers,
          hideGroups: self.hideGroups
        });
      }
    }
  }
</script>
