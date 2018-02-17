<script>
  import Utils from '../utils/utils';
  import f7ListItemContent from './list-item-content.vue';
  import Mixins from '../utils/mixins';

  const ListItemProps = Utils.extend(
    {
      title: [String, Number],
      text: [String, Number],
      media: String,
      subtitle: [String, Number],
      header: [String, Number],
      footer: [String, Number],

      // Link Props
      link: [Boolean, String],
      target: String,
      noFastclick: Boolean,
      noFastClick: Boolean,

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
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
      itemInput: Boolean,
      itemInputWithInfo: Boolean,
      inlineLabel: Boolean,
    },
    Mixins.colorProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  export default {
    name: 'f7-list-item',
    components: {
      f7ListItemContent,
    },
    props: ListItemProps,
    render(c) {
      const self = this;

      let liChildren;
      let linkEl;
      let itemContentEl;

      if (!self.simpleListComputed) {
        // Item Content
        itemContentEl = c('f7-list-item-content', {
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
            name: self.name,
            value: self.value,
            readonly: self.readonly,
            required: self.required,
            disabled: self.disabled,
            itemInput: self.itemInput || self.itemInputForced,
            itemInputWithInfo: self.itemInputWithInfo || self.itemInputWithInfoForced,
            inlineLabel: self.inlineLabel || self.inlineLabelForced,
          },
          on: (self.link || self.href || self.accordionItem || self.smartSelect) ? {} : { click: self.onClick, change: self.onChange },
        }, [
          self.$slots['content-start'],
          self.$slots.content,
          self.$slots['content-end'],
          self.$slots.media,
          self.$slots['inner-start'],
          self.$slots.inner,
          self.$slots['inner-end'],
          self.$slots['after-start'],
          self.$slots.after,
          self.$slots['after-end'],
          self.$slots.header,
          self.$slots.footer,
          self.$slots['before-title'],
          self.$slots.title,
          self.$slots['after-title'],
          self.$slots.subtitle,
          self.$slots.text,
          (self.swipeout || self.accordionItem ? [] : self.$slots.default),
        ]);

        // Link
        if (self.link || self.href || self.accordionItem || self.smartSelect) {
          linkEl = c('a', {
            attrs: Utils.extend(
              {
                href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link || self.href,
                target: self.target,
              },
              Mixins.linkRouterAttrs(self),
              Mixins.linkActionsAttrs(self)
            ),
            class: Utils.extend(
              {
                'item-link': true,
                'no-fastclick': self.noFastclick || self.noFastClick,
                'smart-select': self.smartSelect,
              },
              Mixins.linkRouterClasses(self),
              Mixins.linkActionsClasses(self)
            ),
            on: {
              click: self.onClick,
            },
          }, [itemContentEl]);
        }
      }

      if (self.divider || self.groupTitle) {
        liChildren = [c('span', self.$slots.default || self.title)];
      } else if (self.simpleListComputed) {
        liChildren = [self.title, self.$slots.default];
      } else {
        const linkItemEl = (self.link || self.href || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
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
        liChildren.push(self.$slots['root-end']);
      }

      return c(
        'li',
        {
          class: Utils.extend(
            {
              'item-divider': self.divider,
              'list-group-title': self.groupTitle,
              'media-item': self.mediaItem,
              swipeout: self.swipeout,
              'accordion-item': self.accordionItem,
              'accordion-item-opened': self.accordionItemOpened,
            },
            Mixins.colorClasses(self)
          ),
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
    data() {
      return {
        itemInputForced: false,
        inlineLabelForced: false,
        itemInputWithInfoForced: false,
      };
    },
    computed: {
      sortableComputed() {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed() {
        return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
      },
      simpleListComputed() {
        return this.simpleList || this.$parent.simpleList || (this.$parent.$parent && this.$parent.simpleList);
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.destroy();
      }
    },
    methods: {
      onF7Ready(f7) {
        const self = this;
        if (!self.smartSelect) return;
        const smartSelectParams = Utils.extend({ el: self.$el.querySelector('a.smart-select') }, (self.smartSelectParams || {}));
        self.f7SmartSelect = f7.smartSelect.create(smartSelectParams);
      },
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
