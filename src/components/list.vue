<script>
  export default {
    render: function (c) {
      var blockEl, blockChildren;
      var self = this;

      blockChildren = self.grouped ? self.$slots.default : c('ul', {}, self.$slots.default)
      var outOfList = [], ulSlots = [];
      for (var i = 0; i < self.$slots.default.length; i++) {
        var tag = self.$slots.default[i].tag;
        if (tag && !(tag == 'li' || tag.indexOf('list-item')>=0 || tag.indexOf('list-button')>=0)) {
          outOfList.push(self.$slots.default[i]);
        }
        else {
          ulSlots.push(self.$slots.default[i]);
        }
      }
      blockEl = c(
        self.form ? 'form' : 'div',
        {
          'class': {
            'list-block': true,
            'inset': self.inset,
            'media-list': self.mediaList,
            'sortable': self.sortable,
            'accordion-list': self.accordion,
            'contacts-block': self.contacts
          },
          on: {
            open: self.onOpen,
            close: self.onClose,
            sort: self.onSort
          }
        },
        [
          ulSlots.length > 0 ? [c('ul', {}, ulSlots), outOfList] : outOfList
        ]
      );
      return blockEl;
    },
    props: {
      'inset': Boolean,
      'media-list': Boolean,
      'grouped': Boolean,
      'sortable': Boolean,
      'form': Boolean,
      'label': String,
      'accordion': Boolean,
      'contacts': Boolean
    },
    data: function () {
      return {};
    },
    methods: {
      onOpen: function (event) {
        this.$emit('open', event)
      },
      onClose: function (event) {
        this.$emit('close', event)
      },
      onSort: function (event) {
        this.$emit('sort', event, event.detail)
      }
    }
  }
</script>