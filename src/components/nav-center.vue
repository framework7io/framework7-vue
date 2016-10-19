<template>
  <div class="center" :class="{sliding:sliding}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
        sliding: Boolean
    }
  }
</script>