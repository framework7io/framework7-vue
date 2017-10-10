<template>
  <div class="toolbar" :class="classes">
    <slot name="before-inner"></slot>
    <div class="toolbar-inner">
      <slot></slot>
    </div>
    <slot name="after-inner"></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const Toolbar = {
    name: 'f7-toolbar',
    props: Utils.extend({
      bottomMd: Boolean,
      tabbar: Boolean,
      labels: Boolean,
      scrollable: Boolean,
      hidden: Boolean,
      noShadow: Boolean,
    }, Mixins.colorProps),
    updated() {
      const self = this;
      if (self.tabbar && self.$f7) {
        self.$nextTick(() => {
          self.$f7.toolbar.init(self.$el);
        });
      }
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'toolbar-bottom-md': self.bottomMd,
          tabbar: self.tabbar,
          'tabbar-labels': self.labels,
          'tabbar-scrollable': self.scrollable,
          'toolbar-hidden': self.hidden,
          'no-shadow': self.noShadow,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      hide(animate) {
        const self = this;
        if (!self.$f7) return;
        self.$f7.toolbar.hide(this.$el, animate);
      },
      show(animate) {
        const self = this;
        if (!self.$f7) return;
        self.$f7.toolbar.show(this.$el, animate);
      },
    },
  };

  export default Toolbar;
</script>
