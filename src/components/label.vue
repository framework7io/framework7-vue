<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const LabelProps = Utils.extend(
    {
      floating: Boolean,
      inline: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-label',
    props: LabelProps,
    render(c) {
      const self = this;

      if (self.inline) {
        let $parent = self.$parent;
        let foundItemContent;
        while ($parent && !foundItemContent) {
          const tag = $parent.$vnode && $parent.$vnode.tag;
          if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
            foundItemContent = $parent;
          }
          $parent = $parent.$parent;
        }
        if (foundItemContent) foundItemContent.inlineLabelForced = true;
      }

      return c('div', {
        staticClass: 'item-title',
        class: self.classes,
      }, [self.$slots.default]);
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'item-label': !self.floating,
            'item-floating-label': self.floating,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };
</script>
