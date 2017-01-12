<template>
  <div class="actions-modal keep-on-close"
    :class="{'modal-in': opened}"
    @actions:open="onOpen"
    @actions:opened="onOpened"
    @actions:close="onClose"
    @actions:closed="onClosed"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
    },
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
        this.$emit('actions:open', event);
      },
      onOpened: function (event) {
        this.$emit('actions:opened', event);
      },
      onClose: function (event) {
        this.$emit('actions:close', event);
      },
      onClosed: function (event) {
        this.$emit('actions:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) return;
        if ($$('.modal-overlay').length === 0) {
          $$('<div class="modal-overlay' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el)
        }
      },
      open: function () {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.openModal(self.$el);
      },
      close: function () {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el);
      }
    }
  }
</script>