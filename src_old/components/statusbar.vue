<template>
  <div class="statusbar-overlay" :class="(theme ? 'theme-' + theme : undefined)"></div>
</template>
<script>
  export default {
    props: {
      theme: String
    }
  }
</script>
