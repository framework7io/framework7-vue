<template>
  <div class="popup"
    :class="tabletFullscreen ? 'tablet-fullscreen' : false"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'tablet-fullscreen': Boolean
    },
    methods: {
      onOpen: function (event) {
        this.$emit('open', event);
      },
      onOpened: function (event) {
        this.$emit('opened', event);
      },
      onClose: function (event) {
        this.$emit('close', event);
      },
      onClosed: function (event) {
        this.$emit('closed', event);
      },
    }
  }
</script>