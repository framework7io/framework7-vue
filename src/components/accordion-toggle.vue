<template>
  <div class="accordion-item-toggle" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-accordion-toggle',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
