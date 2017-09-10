<template>
  <div class="timeline-month">
    <div class="timeline-month-title" v-if="month || title"><span v-html="month || title"></span></div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      month: [Number, String],
      title: [Number, String]
    }
  }
</script>