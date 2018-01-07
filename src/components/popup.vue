<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const PopupProps = Utils.extend(
    {
      'tablet-fullscreen': Boolean,
      opened: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-popup',
    render(c) {
      const self = this;
      return c('div', {
        staticClass: 'popup',
        class: self.classes,
        on: {
          'popup:open': self.onOpen,
          'popup:opened': self.onOpened,
          'popup:close': self.onClose,
          'popup:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.f7Popup) return;
        if (opened) {
          self.f7Popup.open();
        } else {
          self.f7Popup.close();
        }
      },
    },
    props: PopupProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'popup-tablet-fullscreen': self.tabletFullscreen,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Popup) self.f7Popup.destroy();
    },
    methods: {
      onOpen(event) {
        this.$emit('popup:open', event);
      },
      onOpened(event) {
        this.$emit('popup:opened', event);
      },
      onClose(event) {
        this.$emit('popup:close', event);
      },
      onClosed(event) {
        this.$emit('popup:closed', event);
      },
      open(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.popup.open(self.$el, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.popup.close(self.$el, animate);
      },
      onF7Ready() {
        const self = this;
        self.f7Popup = self.$f7.popup.create({
          el: self.$el,
        });
        if (self.opened) {
          self.f7Popup.open(false);
        }
      },
    },
  };
</script>
