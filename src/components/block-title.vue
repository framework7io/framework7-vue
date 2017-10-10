<template>
  <div class="block-title" :class="classes"><slot></slot></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-block-title',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
