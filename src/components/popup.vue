<template>
  <div class="popup"
    :class="classesObject"
    @popup:open="onOpen"
    @popup:opened="onOpened"
    @popup:close="onClose"
    @popup:closed="onClosed"
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
          self.$f7.popup(self.$el)
        }
        else {
          if (!$$(self.$el).hasClass('modal-in')) return;
          self.$f7.closeModal(self.$el)
        }
      }
    },
    props: {
      'tablet-fullscreen': Boolean,
      'theme': String,
      'layout': String,
      'opened': Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'tablet-fullscreen': this.tabletFullscreen,
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
        this.$emit('popup:open', event);
      },
      onOpened: function (event) {
        this.$emit('popup:opened', event);
      },
      onClose: function (event) {
        this.$emit('popup:close', event);
      },
      onClosed: function (event) {
        this.$emit('popup:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) return;
        if ($$('.popup-overlay').length === 0) {
          $$(this.$root.$el).append('<div class="popup-overlay ' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>');
        }
      },
      open: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.popup(self.$el, undefined, animated);
      },
      close: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el, animated);
      }
    }
  }
</script>
