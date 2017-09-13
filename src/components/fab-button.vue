<template>
  <a :class="classes" @click="onClick"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      color: String,
      fabClose: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
          [`color-${self.color}`]: self.color,
          'fab-close': self.fabClose,
        };
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
