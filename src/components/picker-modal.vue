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
        style: {
          'display': self.opened ? 'block': false
        },
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      }, [fixedList, innerEl]);
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
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) return;
        if ($$('.picker-modal-overlay').length === 0 && this.$theme && this.$theme.material) {
          $$('<div class="picker-modal-overlay ' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el)
        }
      }
    }
  }
</script>