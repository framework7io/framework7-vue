<template>
  <div class="badge" :class="color ? 'color-' + color : ''"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'color': String
    }
  }
</script>