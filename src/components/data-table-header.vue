<script>
  export default {
    render: function (c) {
      var self = this;
      var tableEl = c('table', {}, [self.$slots.default]);

      c('td', {
        staticClass: 'data-table',
        class: {
          'data-table-collapsible': self.collapsible
        }
      },[tableEl]);
    },
    props: {
      card: Boolean,
      collapsible: Boolean
    }
  }
</script>
