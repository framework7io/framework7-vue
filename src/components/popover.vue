<template>
  <div class="popover"
    @popover:open="onOpen"
    @popover:opened="onOpened"
    @popover:close="onClose"
    @popover:closed="onClosed"
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
        this.$emit('popover:open', event);
      },
      onOpened: function (event) {
        this.$emit('popover:opened', event);
      },
      onClose: function (event) {
        this.$emit('popover:close', event);
      },
      onClosed: function (event) {
        this.$emit('popover:closed', event);
      },
      open: function (target) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.popover(self.$el, target);
      },
      close: function () {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el);
      }
    }
  }
</script>