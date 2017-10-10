<template>
  <div class="card-footer" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-card-footer',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
