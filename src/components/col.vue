<template>
  <div :class="('col-' + width) + (tabletWidth ? ` tablet-${tabletWidth}` : '') + (desktopWidth ? ` desktop-${desktopWidth}` : '')"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      width: {
        type: [Number, String],
        default: 'auto',
      },
      tabletWidth: {
        type: [Number, String],
      },
      desktopWidth: {
        type: [Number, String],
      },
    },
    data() {
      return {};
    },
  };
</script>
