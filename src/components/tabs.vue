<script>
  export default {
    name: 'f7-tabs',
    render(c) {
      const self = this;
      const tabsEl = c('div', { staticClass: 'tabs' }, [self.$slots.default]);
      if (self.animated || self.swipeable) return c('div', { class: self.classes }, [tabsEl]);
      return tabsEl;
    },
    props: {
      animated: Boolean,
      swipeable: Boolean,
    },
    computed: {
      classes() {
        return {
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
        };
      },
    },
  };
</script>
