<template>
  <div class="timeline-year">
    <div class="timeline-year-title" v-if="year || title"><span v-html="year || title"></span></div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      year: [Number, String],
      title: [Number, String]
    }
  }
</script>