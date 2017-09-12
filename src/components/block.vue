<template>
  <div class="block" :class="classes" @tab:show="onTabShow" @tab:hide="onTabHide">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      inset: Boolean,
      tabletInset: Boolean,
      strong: Boolean,
      tabs: Boolean,
      tab: Boolean,
      tabActive: Boolean,
      noHairlines: Boolean,
      noHairlinesBetween: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
          inset: self.inset,
          'block-strong': self.strong,
          'tablet-inset': self.tabletInset,
          tabs: self.tabs,
          tab: self.tab,
          'tab-active': self.tabActive,
          'no-hairlines': self.noHairlines,
          'no-hairlines-between': self.noHairlinesBetween,
        };
      },
    },
    methods: {
      onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide(e) {
        this.$emit('tab:hide', e);
      },
    },
  };
</script>
