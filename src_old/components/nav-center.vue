<template>
  <div class="center" :class="{sliding:sliding}"><slot>{{title}}</slot></div>
</template>
<script>
  export default {
    props: {
        sliding: Boolean,
        title: String
    }
  }
</script>