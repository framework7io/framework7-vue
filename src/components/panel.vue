<template>
  <div
    class="panel"
    :class="classes"
    @panel:open="onOpen"
    @panel:opened="onOpened"
    @panel:close="onClose"
    @panel:closed="onClosed"
    @panel:backdrop-click="onBackdropClick"
    @panel:swipe="onPanelSwipe"
    @panel:swipeopen="onPanelSwipeOpen"
    @panel:breakpoint="onBreakpoint"
  >
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const PanelProps = Utils.extend(
    {
      side: String,
      effect: String,
      cover: Boolean,
      reveal: Boolean,
      left: Boolean,
      right: Boolean,
      opened: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    props: PanelProps,
    computed: {
      classes() {
        const self = this;
        const side = self.side || (self.left ? 'left' : 'right');
        const effect = self.effect || (self.reveal ? 'reveal' : 'cover');
        return Utils.extend(
          {
            'panel-active': self.opened,
            [`panel-${side}`]: side,
            [`panel-${effect}`]: effect,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.$f7) return;
        const side = self.side || (self.left ? 'left' : 'right');
        if (opened) {
          self.$f7.panel.open(side);
        } else {
          self.$f7.panel.open(side);
        }
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Panel) self.f7Panel.destroy();
    },
    mounted() {
      const self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
      const $ = self.$;
      if (!$) return;
      const side = self.side || (self.left ? 'left' : 'right');
      const effect = self.effect || (self.reveal ? 'reveal' : 'cover');
      if (self.opened) {
        $('html').addClass(`with-panel-${side}-${effect}`);
      }
    },
    methods: {
      onOpen(event) {
        this.$emit('panel:open', event);
      },
      onOpened(event) {
        this.$emit('panel:opened', event);
      },
      onClose(event) {
        this.$emit('panel:close', event);
      },
      onClosed(event) {
        this.$emit('panel:closed', event);
      },
      onBackdropClick(event) {
        this.$emit('panel:backdrop-click', event);
      },
      onPanelSwipe(event) {
        this.$emit('panel:swipe', event);
      },
      onPanelSwipeOpen(event) {
        this.$emit('panel:swipeopen', event);
      },
      onBreakpoint(event) {
        this.$emit('panel:breakpoint', event);
      },
      onF7Ready() {
        const self = this;
        const $ = self.$$;
        if (!$) return;
        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(self.$el);
        }
        self.f7Panel = self.$f7.panel.create({ el: self.$el });
      },
      open(animate) {
        const self = this;
        if (!self.$f7) return;
        const side = self.side || (self.left ? 'left' : 'right');
        self.$f7.panel.open(side, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return;
        const side = self.side || (self.left ? 'left' : 'right');
        self.$f7.panel.close(side, animate);
      },
    },
  };
</script>
