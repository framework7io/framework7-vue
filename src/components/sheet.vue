<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const SheetProps = Utils.extend(
    {
      opened: Boolean,
      backdrop: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-sheet',
    render(c) {
      const self = this;
      const fixedList = [];
      const staticList = [];
      const fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab').split(' ');

      let tag;
      let child;

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue; // eslint-disable-line
          }
          let isFixed = false;
          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) fixedList.push(child);
          else staticList.push(child);
        }
      }

      const innerEl = c('div', {
        staticClass: 'sheet-modal-inner',
      }, staticList);

      return c('div', {
        class: self.classes,
        staticClass: 'sheet-modal',
        on: {
          'sheet:open': self.onOpen,
          'sheet:opened': self.onOpened,
          'sheet:close': self.onClose,
          'sheet:closed': self.onClosed,
        },
      }, [fixedList, innerEl]);
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.f7Sheet) return;
        if (opened) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
        }
      },
    },
    props: SheetProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Sheet) self.f7Sheet.destroy();
    },
    methods: {
      onOpen(event) {
        this.$emit('sheet:open', event);
      },
      onOpened(event) {
        this.$emit('sheet:opened', event);
      },
      onClose(event) {
        this.$emit('sheet:close', event);
      },
      onClosed(event) {
        this.$emit('sheet:closed', event);
      },
      open(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.sheet.open(self.$el, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.sheet.close(self.$el, animate);
      },
      onF7Ready() {
        const self = this;
        let backdrop = self.backdrop;
        if (self.$options.propsData.backdrop === undefined) {
          const app = self.$f7;
          backdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
        }
        self.f7Sheet = self.$f7.sheet.create({
          el: self.$el,
          backdrop,
        });
        if (self.opened) {
          self.f7Sheet.open(false);
        }
      },
    },
  };
</script>
