<template>
  <div class="content-block" :class="{'inset': inset}">
    <div class="content-block-inner" v-if="inner">
      <slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'inset': Boolean,
      'inner': Boolean
    }
  }
</script>