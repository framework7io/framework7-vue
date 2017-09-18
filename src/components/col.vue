<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'div',
      },
      width: {
        type: [Number, String],
        default: 'auto',
      },
      tabletWidth: {
        type: [Number, String],
      },
      desktopWidth: {
        type: [Number, String],
      },
    },
    render(c) {
      const self = this;
      return c(self.tag, {
        class: {
          col: self.width === 'auto',
          [`col-${self.width}`]: self.width !== 'auto',
          [`tablet-${self.tabletWidth}`]: self.tabletWidth,
          [`desktop-${self.desktopWidth}`]: self.desktopWidth,
        }
      }, [self.$slots.default]);
    },
  };
</script>
