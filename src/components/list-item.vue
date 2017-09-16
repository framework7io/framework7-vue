<script>
  import Utils from '../utils/utils';
  import f7ListItemContent from './list-item-content.vue';

  export default {
    components: {
      f7ListItemContent,
    },
    render(c) {
      const self = this;

      let liChildren;
      let linkEl;

      // Item Content
      const itemContentEl = c('f7-list-item-content', {
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
          inputName: self.inputName,
          inputValue: self.inputValue,
          readonly: self.readonly,
          required: self.required,
          disabled: self.disabled,
        },
        on: (self.link || self.accordionItem || self.smartSelect) ? {} : { click: self.onClick, change: self.onChange },
      }, [
        self.$slots['content-start'],
        self.$slots.content,
        self.$slots['content-end'],
        self.$slots['media-start'],
        self.$slots.media,
        self.$slots['media-end'],
        self.$slots['inner-start'],
        self.$slots.inner,
        self.$slots['inner-end'],
        self.$slots['after-start'],
        self.$slots.after,
        self.$slots['after-end'],
        self.$slots.header,
        self.$slots.footer,
        self.$slots.title,
        self.$slots.subtitle,
        self.$slots.text,
        (self.swipeout || self.accordionItem ? [] : self.$slots.default),
      ]);

      // Link Props
      const {
        linkExternal,
        linkBack,
        linkNoFastclick,
        linkForce,
        linkReloadCurrent,
        linkReloadAll,
        linkReloadPrevious,
        linkAnimate,
        linkIgnoreCache,
        linkTarget,
        linkView,
        linkPanelOpen,
        linkPanelClose,
        linkPopupOpen,
        linkPopupClose,
        linkPopoverOpen,
        linkPopoverClose,
        linkLoginScreenOpen,
        linkLoginScreenClose,
        linkSheetOpen,
        linkSheetClose,
        linkSortableEnable,
        linkSortableDisable,
        linkSortableToggle,
      } = self;

      // Link
      if (self.link || self.accordionItem || self.smartSelect) {
        linkEl = c('a', {
          attrs: {
            href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link,
            target: linkTarget,
            'data-view': Utils.isStringProp(linkView) ? linkView : false,
            'data-panel': Utils.isStringProp(linkPanelOpen) ? linkPanelOpen : false,
            'data-popup': Utils.isStringProp(linkPopupOpen) ? linkPopupOpen : false,
            'data-popover': Utils.isStringProp(linkPopoverOpen) ? linkPopoverOpen : false,
            'data-picker': Utils.isStringProp(linkSheetOpen) ? linkSheetOpen : false,
            'data-login-screen': Utils.isStringProp(linkLoginScreenOpen) ? linkLoginScreenOpen : false,
            'data-sortable': Utils.isStringProp(linkSortableEnable) ? linkSortableEnable : (Utils.isStringProp(linkSortableToggle) ? linkSortableToggle : false), // eslint-disable-line

            'data-force': linkForce,
            'data-reload-current': linkReloadCurrent,
            'data-reload-all': linkReloadAll,
            'data-reload-previous': linkReloadPrevious,
            'data-animate': ('linkAnimate' in self.$options.propsData) ? linkAnimate.toString() : undefined,
            'data-ignore-cache': linkIgnoreCache,
          },
          class: {
            'item-link': true,
            external: linkExternal,
            back: linkBack,
            'no-fastclick': linkNoFastclick,
            'smart-select': self.smartSelect,
            'panel-close': Utils.isTrueProp(linkPanelClose),
            'panel-open': linkPanelOpen || linkPanelOpen === '',
            'popup-close': Utils.isTrueProp(linkPopupClose),
            'popup-open': linkPopupOpen || linkPopupOpen === '',
            'popover-close': Utils.isTrueProp(linkPopoverClose),
            'popover-open': linkPopoverOpen || linkPopoverOpen === '',
            'sheet-close': Utils.isTrueProp(linkSheetClose),
            'sheet-open': linkSheetOpen || linkSheetOpen === '',
            'login-screen-close': Utils.isTrueProp(linkLoginScreenClose),
            'login-screen-open': linkLoginScreenOpen || linkLoginScreenOpen === '',
            'sortable-enable': Utils.isTrueProp(linkSortableEnable),
            'sortable-disable': Utils.isTrueProp(linkSortableDisable),
            'sortable-toggle': Utils.isTrueProp(linkSortableToggle),
          },
          on: {
            click: self.onClick,
          },
        }, [itemContentEl]);
      }

      if (self.divider || self.groupTitle) {
        liChildren = [c('span', self.$slots.default || self.title)];
      } else {
        const linkItemEl = (self.link || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
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
      }

      return c(
        'li',
        {
          class: {
            'item-divider': self.divider,
            'list-group-title': self.groupTitle,
            'media-item': self.mediaItem,
            swipeout: self.swipeout,
            'accordion-item': self.accordionItem,
            'accordion-item-opened': self.accordionItemOpened,
          },
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
    props: {
      title: [String, Number],
      text: [String, Number],
      media: String,
      subtitle: [String, Number],
      header: [String, Number],
      footer: [String, Number],

      // Link Props
      link: [Boolean, String],
      linkExternal: Boolean,
      linkBack: Boolean,
      linkNoFastclick: Boolean,
      linkForce: Boolean,
      linkReloadCurrent: Boolean,
      linkReloadAll: Boolean,
      linkReloadPrevious: Boolean,
      linkAnimate: Boolean,
      linkIgnoreCache: Boolean,
      linkTarget: String,
      linkView: String,

      linkPanelOpen: [Boolean, String],
      linkPanelClose: [Boolean, String],
      linkPopupOpen: [Boolean, String],
      linkPopupClose: [Boolean, String],
      linkPopoverOpen: [Boolean, String],
      linkPopoverClose: [Boolean, String],
      linkLoginScreenOpen: [Boolean, String],
      linkLoginScreenClose: [Boolean, String],
      linkSheetOpen: [Boolean, String],
      linkSheetClose: [Boolean, String],
      linkSortableEnable: [Boolean, String],
      linkSortableDisable: [Boolean, String],
      linkSortableToggle: [Boolean, String],

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
      inputName: String,
      inputValue: [String, Number, Boolean, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
    },
    computed: {
      sortableComputed() {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed() {
        return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
      },
    },
    mounted() {
      const self = this;
      if (!self.smartSelect) return;
      const smartSelectParams = Utils.extend({ el: self.$el.querySelector('a.smart-select') }, (self.smartSelectParams || {}));
      self.f7SmartSelect = self.$f7.smartSelect.create(smartSelectParams);
    },
    beforeDestroy() {
      const self = this;
      if (self.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.destroy();
      }
    },
    methods: {
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
</script>
