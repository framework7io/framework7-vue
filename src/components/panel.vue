<template>
  <div class="panel" :class="'panel-' + sideComputed + ' panel-' + effectComputed">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'side': String,
      'effect': String,
      'cover': Boolean,
      'reveal': Boolean,
      'left': Boolean,
      'right': Boolean
    },
    computed: {
      sideComputed: function () {
        if (!this.side) {
          if (this.left) return 'left';
          if (this.right) return 'right';
          return 'right'
        }
        return this.side;
      },
      effectComputed: function () {
        if (!this.effect) {
          if (this.cover) return 'cover';
          if (this.reveal) return 'reveal';
          return 'cover'
        }
        return this.effect;
      }
    }
  }
</script>