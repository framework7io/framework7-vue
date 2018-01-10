<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const SegmentedProps = Utils.extend({
    raised: Boolean,
    round: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  }, Mixins.colorProps);

  export default {
    name: 'f7-segmented',
    props: SegmentedProps,
    render(c) {
      const self = this;
      return c(self.tag, {
        staticClass: 'segmented',
        class: Utils.extend({
          'segmented-raised': self.raised,
          'segmented-round': self.round,
        }, Mixins.colorClasses(self)),
      }, [self.$slots.default]);
    },
  };
</script>
