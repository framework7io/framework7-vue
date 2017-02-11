<template>
  <div class="login-screen"
    :class="classesObject"
    @loginscreen:open="onOpen"
    @loginscreen:opened="onOpened"
    @loginscreen:close="onClose"
    @loginscreen:closed="onClosed"
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
        this.$emit('loginscreen:open', event);
      },
      onOpened: function (event) {
        this.$emit('loginscreen:opened', event);
      },
      onClose: function (event) {
        this.$emit('loginscreen:close', event);
      },
      onClosed: function (event) {
        this.$emit('loginscreen:closed', event);
      },
      open: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.loginScreen(self.$el, animated);
      },
      close: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el, animated);
      }
    }
  }
</script>