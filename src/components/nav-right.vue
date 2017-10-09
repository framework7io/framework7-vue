<template>
  <div class="right" :class="{ sliding }"><slot></slot></div>
</template>
<script>
  export default {
    name: 'f7-nav-right',
    props: {
      sliding: Boolean,
    },
  };
</script>
