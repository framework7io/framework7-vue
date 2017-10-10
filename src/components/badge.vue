<template>
  <span class="badge" :class="classes"><slot></slot></span>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-badge',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
