<script>
  export default {
    render: function (c) {
      var blockEl, blockChildren, self = this;
      blockChildren = self.grouped ? self.$slots.default : c('ul', {}, self.$slots.default)
      blockEl = c(
        self.form ? 'form' : 'div',
        {
          'class': {'list-block': true, 'inset': self.inset, 'media-list': self.mediaList, 'sortable': self.sortable}
        },
        [
          self.grouped ? self.$slots.default : c('ul', {}, self.$slots.default)
        ]
      );
      return blockEl;
    },
    props: {
      'inset': Boolean,
      'media-list': Boolean,
      'grouped': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean,
      'form': Boolean
    },
    data: function () {
      return {};
    },
    methods: {
      onOpen: function (event) {
        this.$emit('open', event, event.target)
      },
      onClose: function (event) {
        this.$emit('close', event, event.target)
      },
      onSort: function (event) {
        this.$emit('sort', event, event.target)
      }
    }
  }
</script>