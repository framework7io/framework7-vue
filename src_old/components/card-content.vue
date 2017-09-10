<template>
  <div class="card-content">
    <div class="card-content-inner" v-if="inner">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    props: {
      inner: {
        type: Boolean,
        default: true
      }
    }
  }
</script>