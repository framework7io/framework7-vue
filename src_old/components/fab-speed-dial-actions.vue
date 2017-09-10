<template>
  <div class="speed-dial-buttons" :class="theme ? 'theme-' + theme : false">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      theme: String
    }
  }
</script>