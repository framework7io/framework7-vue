<script>
  import ListItemContent from './list-item-content.vue'
  export default {
    render: function (c) {
      var liChildren, linkEl, itemContentEl;

      // Item Content
      itemContentEl = c('f7-list-item-content', {
        props: {
          'title': this.title,
          'text': this.text,
          'media': this.media,
          'subtitle': this.subtitle,
          'after': this.after,
          'badge': this.badge,
          'badge-color': this.badgeColor,
          'media-list': this.mediaListComputed,

          'checkbox': this.checkbox,
          'checked': this.checked,
          'radio': this.radio,
          'name': this.name,
          'value': this.value,
          'readonly': this.readonly,
          'required': this.required,
          'disabled': this.disabledn
        },
        on: this.link ? {} : {click: this.onClick, change: this.onChange}
      }, this.$slots.default);

      // Link
      if (this.link) {
        linkEl = c('a', {
          attrs: {
            href: this.link === true ? '#' : this.link
          },
          'class': {
            'item-link': true,
            'external': this.linkExternal
          },
          on: {
            click: this.onClick
          }
        }, [itemContentEl])
      }

      if (this.dividerOrGroupTitle) {
        liChildren = [c('span', this.$slots.default || this.title)]
      }
      else {
        var linkItemEl = this.link ? linkEl : itemContentEl;
        if (this.swipeout) {
          liChildren = [c('div', {'class':{'swipeout-content': true}}, [linkItemEl])]
        }
        else {
          liChildren = [linkItemEl];
        }
        if (this.sortableComputed) {
          liChildren.push(c('div', {'class': {'sortable-handler': true}}));
        }
        if (this.swipeout) {
          liChildren.push(this.$slots.default);
        }
      }

      return c(
        'li',
        {
          'class': {
            'item-divider' : this.divider,
            'list-group-title': this.groupTitle,
            'swipeout': this.swipeout
          },
          on: {
            open: this.onOpen,
            opened: this.onOpened,
            close: this.onClose,
            closed: this.onClosed,
            delete: this.onDelete,
            deleted: this.onDeleted,
            swipeout: this.onSwipeout
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
    data: function () {
      return {};
    },
    components: {
      'f7-list-item-content': ListItemContent
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event, event.target)
      },
      onDeleted: function (event) {
        this.$emit('deleted', event, event.target)
      },
      onDelete: function (event) {
        this.$emit('delete', event, event.target)
      },
      onClose: function (event) {
        this.$emit('close', event, event.target)
      },
      onClosed: function (event) {
        this.$emit('closed', event, event.target)
      },
      onOpen: function (event) {
        this.$emit('open', event, event.target)
      },
      onOpened: function (event) {
        this.$emit('opened', event, event.target)
      },
      onSwipeout: function (event) {
        this.$emit('swipeout', event, event.target)
      },
      onChange: function (event) {
        this.$emit('change', event, event.target)
      }
    }
  }
</script>