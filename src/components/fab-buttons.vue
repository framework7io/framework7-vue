<template>
  <div class="fab-buttons" :class="classes"><slot></slot></div>
</template>
<script>
  export default {
    name: 'f7-fab-buttons',
    props: {
      position: {
        type: String,
        default: 'top',
      },
    },
    computed: {
      classes() {
        const self = this;
        return {
          [`fab-buttons-${self.position}`]: true,
        };
      },
    },
  };
</script>
