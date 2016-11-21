<template>
  <div class="login-screen"
    :class="classesObject"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
    :style="opened ? 'display: block' : false"
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
        var $$ = self.$$;
        if (opened) {
          self.$f7.loginScreen(self.$el)
        }
        else {
          if (!$$(self.$el).hasClass('modal-in')) return;
          self.$f7.closeModal(self.$el)
        }
      }
    },
    props: {
      theme: String,
      layout: String,
      opened: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'modal-in': this.opened,
          'modal-out': !this.opened
        };
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
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