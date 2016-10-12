<template>
  <div class="row" :class="{'no-gutter': noGutter}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'no-gutter': Boolean
    },
    data: function () {
      return {};
    }
  }
</script>