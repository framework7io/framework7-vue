<template>
  <div class="item-title" :class="{'item-label': !floating, 'item-floating-label' : floating}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      floating: Boolean,
      inline: Boolean,
      wrap: {
        type: Boolean,
        default: true,
      },
    },
    render(c) {
      const self = this;

      if (self.inline) {
        let $parent = self.$parent;
        let foundItemContent;
        while ($parent && !foundItemContent) {
          const tag = $parent.$vnode && $parent.$vnode.tag;
          if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
            foundItemContent = $parent;
          }
          $parent = $parent.$parent;
        }
        if (foundItemContent) foundItemContent.inlineLabelForced = true;
      }

      return c('div', {
        staticClass: 'item-title',
        class: {
          'item-label': !self.floating,
          'item-floating-label': self.floating,
        },
      }, [self.$slots.default]);
    },
  };
</script>
