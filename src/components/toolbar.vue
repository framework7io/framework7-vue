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
  export default {
    name: 'f7-toolbar',
    props: {
      bottomMd: Boolean,
      tabbar: Boolean,
      labels: Boolean,
      scrollable: Boolean,
      hidden: Boolean,
      noShadow: Boolean,
    },
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
        const co = {
          'toolbar-bottom-md': self.bottomMd,
          tabbar: self.tabbar,
          'tabbar-labels': self.labels,
          'tabbar-scrollable': self.scrollable,
          'toolbar-hidden': self.hidden,
          'no-shadow': self.noShadow,
        };
        return co;
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
</script>
