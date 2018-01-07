<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const PopoverProps = Utils.extend(
    {
      opened: Boolean,
      target: [String, Object],
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-popover',
    render(c) {
      const self = this;
      const angleEl = c('div', { staticClass: 'popover-angle' });
      const innerEl = c('div', { staticClass: 'popover-inner' }, self.$slots.default);
      return c('div', {
        class: self.classes,
        staticClass: 'popover',
        on: {
          'popover:open': self.onOpen,
          'popover:opened': self.onOpened,
          'popover:close': self.onClose,
          'popover:closed': self.onClosed,
        },
      }, [angleEl, innerEl]);
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.f7Popover) return;
        if (opened) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
        }
      },
    },
    props: PopoverProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Popover) self.f7Popover.destroy();
    },
    methods: {
      onOpen(event) {
        this.$emit('popover:open', event);
      },
      onOpened(event) {
        this.$emit('popover:opened', event);
      },
      onClose(event) {
        this.$emit('popover:close', event);
      },
      onClosed(event) {
        this.$emit('popover:closed', event);
      },
      open(target, animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.popover.open(self.$el, target, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.sheet.close(self.$el, animate);
      },
      onF7Ready() {
        const self = this;
        const popoverParams = {
          el: self.$el,
        };
        if (self.target) popoverParams.targetEl = self.target;
        self.f7Popover = self.$f7.popover.create(popoverParams);
        if (self.opened && self.target) {
          self.f7Popover.open(self.target, false);
        }
      },
    },
  };
</script>
