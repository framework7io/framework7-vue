<template>
  <div class="item-row" :class="classes"><slot></slot></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-list-item-row',
    props: Mixins.colorProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
