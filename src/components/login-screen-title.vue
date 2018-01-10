<template>
  <div class="login-screen-title" :class="classes"><slot></slot></div>
</template>
<script>
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-login-screen-title',
    props: Mixins.colorProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
