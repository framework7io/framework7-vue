<template>
  <div
    class="accordion-item"
    :class="classes"
    @accordion:open="onOpen"
    @accordion:opened="onOpened"
    @accordion:close="onClose"
    @accordion:closed="onClosed"
  >
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const AccordionItemProps = Utils.extend(
    {
      opened: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-accordion-item',
    props: AccordionItemProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'accordion-item-opened': self.opened,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onOpen(event) {
        this.$emit('accordion:open', event);
      },
      onOpened(event) {
        this.$emit('accordion:opened', event);
      },
      onClose(event) {
        this.$emit('accordion:close', event);
      },
      onClosed(event) {
        this.$emit('accordion:closed', event);
      },
    },
  };
</script>
