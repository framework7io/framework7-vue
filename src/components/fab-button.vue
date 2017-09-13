<template>
  <a :class="color ? `color-${color}` : false" @click="onClick"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      color: String,
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
