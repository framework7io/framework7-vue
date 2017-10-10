<template>
  <div class="accordion-list" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-accordion',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
