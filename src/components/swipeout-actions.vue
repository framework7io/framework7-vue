<template>
  <div :class="`swipeout-actions-${sideComputed}`">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      left: Boolean,
      right: Boolean,
      side: String,
    },
    computed: {
      sideComputed() {
        if (!this.side) {
          if (this.left) return 'left';
          if (this.right) return 'right';
          return 'right';
        }
        return this.side;
      },
    },
    data() {
      return {};
    },
  };
</script>
