<template>
  <div class="tab" :class="active ? 'active' : false">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'active': Boolean
    }
  }
</script>