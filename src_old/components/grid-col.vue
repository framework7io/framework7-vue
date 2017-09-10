<template>
  <div :class="('col-' + width) + (tabletWidth ? ' tablet-' + tabletWidth : '')"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'width': {
        type: [Number, String],
        default: 'auto'
      },
      'tablet-width': {
        type: [Number, String]
      }
    },
    data: function () {
      return {};
    }
  }
</script>