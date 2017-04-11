<script>
  export default {
    render: function (c) {
      var self = this;
      return c('div', {staticClass: 'data-table-links'}, self.$slots.default);
    }
  }
</script>
