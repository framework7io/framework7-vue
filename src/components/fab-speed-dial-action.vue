<template>
  <a href="#" @click="onClick" :class="color ? 'color-' + color : false"><slot></slot></a>
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