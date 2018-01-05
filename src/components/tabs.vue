<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const TabsProps = Utils.extend({
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-tabs',
    render(c) {
      const self = this;
      const tabsEl = c('div', { staticClass: 'tabs' }, [self.$slots.default]);
      if (self.animated || self.swipeable) return c('div', { class: self.classes }, [tabsEl]);
      return tabsEl;
    },
    props: TabsProps,
    computed: {
      classes() {
        return Utils.extend({
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
          'tabs-routable': this.routable,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
