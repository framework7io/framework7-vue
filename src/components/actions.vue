<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const ActionsProps = Utils.extend(
    {
      opened: Boolean,
      grid: Boolean,
      convertToPopover: Boolean,
      forceToPopover: Boolean,
      target: [String, Object],
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-actions',
    render(c) {
      const self = this;

      return c('div', {
        staticClass: 'actions-modal',
        class: self.classes,
        on: {
          'actions:open': self.onOpen,
          'actions:opened': self.onOpened,
          'actions:close': self.onClose,
          'actions:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.f7Actions) return;
        if (opened) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
        }
      },
    },
    props: ActionsProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'actions-grid': self.grid,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Actions) self.f7Actions.destroy();
    },
    methods: {
      onOpen(event) {
        this.$emit('actions:open', event);
      },
      onOpened(event) {
        this.$emit('actions:opened', event);
      },
      onClose(event) {
        this.$emit('actions:close', event);
      },
      onClosed(event) {
        this.$emit('actions:closed', event);
      },
      open(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.actions.open(self.$el, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.actions.close(self.$el, animate);
      },
      onF7Ready() {
        const self = this;

        const actionsParams = {
          el: self.$el,
          grid: self.grid,
        };
        if (self.target) actionsParams.targetEl = self.target;
        if (typeof self.$options.propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = self.convertToPopover;
        if (typeof self.$options.propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = self.forceToPopover;

        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (self.opened) {
          self.f7Actions.open(false);
        }
      },
    },
  };
</script>
