<script>
  export default {
    name: 'f7-segmented',
    props: {
      color: String,
      raised: Boolean,
      round: Boolean,
      tag: {
        type: String,
        default: 'div',
      },
    },
    render(c) {
      const self = this;
      return c(self.tag, {
        staticClass: 'segmented',
        class: {
          [`color-${self.color}`]: self.color,
          'segmented-raised': self.raised,
          'segmented-round': self.round,
        },
      }, [self.$slots.default]);
    },
  };
</script>
