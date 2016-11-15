<template>
  <div class="actions-modal"
    :class="{'modal-in': opened}"
    :style="{'display': opened ? 'block' : ''}"
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
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) return;
        if (opened) {
          self.$f7.openModal(self.$el);
        }
        else {
          self.$f7.closeModal(self.$el);
        }
      }
    },
    props: {
        opened: Boolean
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
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) return;
        if ($$('.modal-overlay').length === 0) {
          $$('<div class="modal-overlay' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el)
        }
      }
    }
  }
</script>