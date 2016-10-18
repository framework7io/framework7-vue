<script>
  export default {
    render: function (c) {
      var liChildren, linkEl, itemContentEl;
      var self = this;

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
          'checked': self.checked,
          'radio': self.radio,
          'name': self.name,
          'value': self.value,
          'readonly': self.readonly,
          'required': self.required,
          'disabled': self.disabledn
        },
        on: self.link ? {} : {click: self.onClick, change: self.onChange}
      }, self.$slots.default);

      // Link
      if (self.link || self.accordionItem) {
        linkEl = c('a', {
          attrs: {
            href: self.link === true || self.accordionItem ? '#' : self.link
          },
          'class': {
            'item-link': true,
            'external': self.linkExternal
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
        var linkItemEl = self.link || self.accordionItem ? linkEl : itemContentEl;
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
      }

      return c(
        'li',
        {
          'class': {
            'item-divider' : self.divider,
            'list-group-title': self.groupTitle,
            'swipeout': self.swipeout,
            'accordion-item': self.accordionItem
          },
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed,
            delete: self.onDelete,
            deleted: self.onDeleted,
            swipeout: self.onSwipeout
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
      'link': [String, Boolean],
      'link-external': Boolean,
      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-list-item': Boolean,
      'media-list': Boolean,
      'media-list-computed': Boolean,
      'divider': Boolean,
      'group-title': Boolean,
      'divider-or-group-title': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean,
      'sortable-computed': Boolean,
      'accordion-item': Boolean,

      'checkbox': Boolean,
      'checked': Boolean,
      'radio': Boolean,
      'name': String,
      'value': [String, Number],
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
        return this.mediaList || this.$parent.mediaList || this.$parent.mediaListComputed;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      },
      onDeleted: function (event) {
        this.$emit('deleted', event)
      },
      onDelete: function (event) {
        this.$emit('delete', event)
      },
      onClose: function (event) {
        this.$emit('close', event)
      },
      onClosed: function (event) {
        this.$emit('closed', event)
      },
      onOpen: function (event) {
        this.$emit('open', event)
      },
      onOpened: function (event) {
        this.$emit('opened', event)
      },
      onSwipeout: function (event) {
        this.$emit('swipeout', event)
      },
      onChange: function (event) {
        this.$emit('change', event)
      }
    }
  }
</script>