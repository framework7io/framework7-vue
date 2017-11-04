<template>
  <div class="subnavbar" :class="sliding ? 'sliding' : false">
      <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
        sliding: Boolean
    }
  }
</script>