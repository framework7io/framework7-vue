<script>
  export default {
    render: function (c) {
      var self = this;
      return c('div', {
        class: {
          'data-table-title': !self.selected,
          'data-table-title-selected': self.selected,
        }
      }, self.$slots.default);
    },
    props: {
      selected: Boolean
    }
  }
</script>
