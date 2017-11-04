<script>
  export default {
    render: function (c) {
      var pickerEl, innerEl, fixedList = [], staticList = [];
      var self = this;

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');

      var tag, child;

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue;
          }
          var isFixed = false;
          for (var j = 0; j < fixedTags.length; j++) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) fixedList.push(child);
          else staticList.push(child);
        }
      }

      innerEl = c('div', {
        staticClass: 'picker-modal-inner'
      }, staticList)

      return c('div', {
        class: self.classesObject,
        staticClass: 'picker-modal',
        on: {
          'picker:open': self.onOpen,
          'picker:opened': self.onOpened,
          'picker:close': self.onClose,
          'picker:closed': self.onClosed
        }
      }, [fixedList, innerEl]);
    },
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
          self.$f7.pickerModal(self.$el)
        }
        else {
          self.$f7.closeModal(self.$el)
        }
      }
    },
    props: {
      'opened': Boolean,
      'theme': String,
      'layout': String,
      'overlay': Boolean
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
        if (this.overlay) {
          this.$$('.picker-modal-overlay').addClass('modal-overlay-visible');
        }
        this.$emit('picker:open', event);
      },
      onOpened: function (event) {
        this.$emit('picker:opened', event);
      },
      onClose: function (event) {
        if (this.overlay) {
          this.$$('.picker-modal-overlay').removeClass('modal-overlay-visible');
        }
        this.$emit('picker:close', event);
      },
      onClosed: function (event) {
        this.$emit('picker:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) return;
        if ($$('.picker-modal-overlay').length === 0 && (this.$theme && this.$theme.material || this.overlay)) {
          $$(this.$root.$el).append('<div class="picker-modal-overlay ' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>');
        }
      },
      open: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.pickerModal(self.$el, undefined, animated);
      },
      close: function (animated) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.closeModal(self.$el, animated);
      }
    }
  }
</script>
