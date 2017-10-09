<template>
  <div class="fab-buttons" :class="classes"><slot></slot></div>
</template>
<script>
  export default {
    name: 'f7-fab-buttons',
    props: {
      color: String,
      position: {
        type: String,
        default: 'top',
      },
    },
    computed: {
      classes() {
        const self = this;
        return {
          [`color-${self.color}`]: self.color,
          [`fab-buttons-${self.position}`]: true,
        };
      },
    },
  };
</script>
