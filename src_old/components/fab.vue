<template>
  <a href="#" class="floating-button" :class="color ? 'color-' + color : false" @click="onClick"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      color: String
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>