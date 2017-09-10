<template>
  <div class="item-title" :class="{'label': !floating, 'floating-label' : floating}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
        floating: Boolean
    }
  }
</script>