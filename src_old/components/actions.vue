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
      else {
        self.$el.style.display = 'none';
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) return;
        if (opened) {
          self.$el.style.display = 'block';
          self.$f7.openModal(self.$el);
        }
        else {
          self.$el.style.display = 'none';
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
          $$(this.$root.$el).append('<div class="modal-overlay' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>');
        }
      },
      open: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.openModal(self.$el, animated);
      },
      close: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el, animated);
      }
    }
  }
</script>
