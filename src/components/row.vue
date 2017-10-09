<script>
  export default {
    name: 'f7-row',
    props: {
      noGap: Boolean,
      tag: {
        type: String,
        default: 'div',
      },
    },
    render(c) {
      const self = this;
      return c(self.tag, {
        staticClass: 'row',
        class: {
          'no-gap': self.noGap,
        },
      }, [self.$slots.default])
    },
  };
</script>
