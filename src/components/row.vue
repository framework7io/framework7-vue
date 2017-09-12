<template>
  <div class="row" :class="{'no-gap': noGap}"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      noGap: Boolean,
    },
  };
</script>
