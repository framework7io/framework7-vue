<template>
  <div class="right" :class="{ sliding }"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      sliding: Boolean,
    },
  };
</script>
