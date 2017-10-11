<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-tabs',
    render(c) {
      const self = this;
      const tabsEl = c('div', { staticClass: 'tabs' }, [self.$slots.default]);
      if (self.animated || self.swipeable) return c('div', { class: self.classes }, [tabsEl]);
      return tabsEl;
    },
    props: Utils.extend({
      animated: Boolean,
      swipeable: Boolean,
    }, Mixins.colorProps),
    computed: {
      classes() {
        return Utils.extend({
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
