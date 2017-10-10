<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-row',
    props: Utils.extend(
      {
        noGap: Boolean,
        tag: {
          type: String,
          default: 'div',
        },
      },
      Mixins.colorProps
    ),
    render(c) {
      const self = this;
      return c(self.tag, {
        staticClass: 'row',
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'no-gap': self.noGap,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };
</script>
