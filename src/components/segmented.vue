<template>
  <div class="segmented" :class="(color ? 'color-' + color : '')"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      color: String,
      raised: Boolean,
      round: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
          [`color-${self.color}`]: self.color,
          'segmented-raised': self.raised,
          'segmented-round': self.round,
        };
      },
    },
  };
</script>
