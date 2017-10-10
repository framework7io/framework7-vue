<template>
  <div class="statusbar" :class="classes"></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-statusbar',
    props: Mixins.colorProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
