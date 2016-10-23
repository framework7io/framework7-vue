<template>
  <div class="popover"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
    <div class="popover-angle"></div>
    <div class="popover-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
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