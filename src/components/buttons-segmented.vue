<template>
  <div class="buttons-row" :class="(colorComputed ? 'theme-' + colorComputed : '')"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'color': String,
      'theme': String,
      'bg': String
    },
    computed: {
      colorComputed: function () {
        return this.color || this.theme || this.bg;
      }
    }
  }
</script>