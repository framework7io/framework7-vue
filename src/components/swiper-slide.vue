<template>
  <div class="swiper-slide">
    <div v-if="zoom" class="swiper-zoom-container">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'zoom': Boolean
    }
  }
</script>