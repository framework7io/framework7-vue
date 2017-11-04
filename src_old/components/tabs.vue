<script>
  export default {
    render: function (c) {
      var self = this;
      var tabs = c('div', {staticClass: 'tabs'}, [self.$slots.default]);
      if (self.animated || self.swipeable) return c('div', {class: self.classesObject}, [tabs]);
      else return tabs;
    },
    props: {
      'animated': Boolean,
      'swipeable': Boolean
    },
    computed: {
      classesObject: function () {
        return {
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
        }
      },
    }
  }
</script>