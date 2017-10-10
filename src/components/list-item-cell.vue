<template>
  <div class="item-cell" :class="classes"><slot></slot></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-list-item-cell',
    props: Mixins.colorProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
