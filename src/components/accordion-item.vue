<template>
  <div
    class="accordion-item"
    :class="{'accordion-item-opened': opened}"
    @accordion:open="onOpen"
    @accordion:opened="onOpened"
    @accordion:close="onClose"
    @accordion:closed="onClosed"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      opened: Boolean
    },
    methods: {
      onOpen: function (event) {
        this.$emit('accordion:open', event);
      },
      onOpened: function (event) {
        this.$emit('accordion:opened', event);
      },
      onClose: function (event) {
        this.$emit('accordion:close', event);
      },
      onClosed: function (event) {
        this.$emit('accordion:closed', event);
      }
    }
  }
</script>
