<template>
  <div class="block" :class="classes" @tab:show="onTabShow" @tab:hide="onTabHide">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'f7-block',
    props: {
      inset: Boolean,
      tabletInset: Boolean,
      strong: Boolean,
      tabs: Boolean,
      tab: Boolean,
      tabActive: Boolean,
      accordionList: Boolean,
      noHairlines: Boolean,
      noHairlinesBetween: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesBetweenMd: Boolean,
      noHairlinesIos: Boolean,
      noHairlinesBetweenIos: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
          inset: self.inset,
          'block-strong': self.strong,
          'accordion-list': self.accordionList,
          'tablet-inset': self.tabletInset,
          tabs: self.tabs,
          tab: self.tab,
          'tab-active': self.tabActive,
          'no-hairlines': self.noHairlines,
          'no-hairlines-between': self.noHairlinesBetween,
          'no-hairlines-md': self.noHairlinesMd,
          'no-hairlines-between-md': self.noHairlinesBetweenMd,
          'no-hairlines-ios': self.noHairlinesIos,
          'no-hairlines-between-ios': self.noHairlinesBetweenIos,
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
