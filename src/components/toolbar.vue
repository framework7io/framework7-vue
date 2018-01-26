<template>
  <div class="toolbar" :class="classes">
    <slot name="before-inner"></slot>
    <div class="toolbar-inner" v-if="inner">
      <slot></slot>
    </div>
    <slot v-else></slot>
    <slot name="after-inner"></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ToolbarProps = Utils.extend({
    bottomMd: Boolean,
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  export default {
    name: 'f7-toolbar',
    props: ToolbarProps,
    updated() {
      const self = this;
      if (self.tabbar && self.$f7) {
        self.$nextTick(() => {
          self.$f7.toolbar.setHighlight(self.$el);
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
          'no-hairline': self.noHairline,
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
      onF7Ready(f7) {
        const self = this;
        if (self.tabbar) f7.toolbar.setHighlight(self.$el);
      },
    },
  };
</script>
