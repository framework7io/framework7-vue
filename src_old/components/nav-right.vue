<template>
  <div class="right" :class="{sliding:sliding}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
        sliding: Boolean
    }
  }
</script>