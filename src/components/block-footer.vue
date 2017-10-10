<template>
  <div class="block-footer" :class="classes"><slot></slot></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    props: Mixins.colorProps,
    name: 'f7-block-footer',
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
