<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

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

  export default {
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
</script>
