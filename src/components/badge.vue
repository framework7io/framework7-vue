<template>
  <span class="badge" :class="color ? `color-${color}` : ''"><slot></slot></span>
</template>
<script>
  export default {
    name: 'f7-badge',
    props: {
      color: String,
    },
  };
</script>
