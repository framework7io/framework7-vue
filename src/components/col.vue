<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ColProps = Utils.extend(
    {
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
    Mixins.colorProps
  );

  export default {
    name: 'f7-col',
    props: ColProps,
    render(c) {
      const self = this;
      return c(self.tag, {
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            col: self.width === 'auto',
            [`col-${self.width}`]: self.width !== 'auto',
            [`tablet-${self.tabletWidth}`]: self.tabletWidth,
            [`desktop-${self.desktopWidth}`]: self.desktopWidth,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };
</script>
