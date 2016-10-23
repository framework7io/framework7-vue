<template>
  <span class="badge" :class="color ? 'color-' + color : ''"><slot></slot></span>
</template>
<script>
  export default {
    props: {
      'color': String
    }
  }
</script>