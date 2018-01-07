<script>
  export default {
    name: 'f7-actions-group',
    render(c) {
      const self = this;
      return c('div', { staticClass: 'actions-group' }, self.$slots.default);
    },
  };
</script>
