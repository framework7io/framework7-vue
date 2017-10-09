<template>
  <div class="views" :class="classes"><slot></slot></div>
</template>
<script>
  export default {
    name: 'f7-views',
    props: {
      tabs: Boolean,
    },
    computed: {
      classes() {
        const co = {
          tabs: this.tabs,
        };
        return co;
      },
    },
  };
</script>
