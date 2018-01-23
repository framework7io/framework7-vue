<template>
  <div class="block" :class="classes" @tab:show="onTabShow" @tab:hide="onTabHide">
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const BlockProps = Utils.extend(
    {
      inset: Boolean,
      tabletInset: Boolean,
      strong: Boolean,
      tabs: Boolean,
      tab: Boolean,
      tabActive: Boolean,
      accordionList: Boolean,
      noHairlines: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesIos: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-block',
    props: BlockProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            inset: self.inset,
            'block-strong': self.strong,
            'accordion-list': self.accordionList,
            'tablet-inset': self.tabletInset,
            tabs: self.tabs,
            tab: self.tab,
            'tab-active': self.tabActive,
            'no-hairlines': self.noHairlines,
            'no-hairlines-md': self.noHairlinesMd,
            'no-hairlines-ios': self.noHairlinesIos,
          },
          Mixins.colorClasses(self)
        );
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
