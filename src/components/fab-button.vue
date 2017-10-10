<template>
  <a :class="classes" @click="onClick"><slot></slot></a>
</template>
<script>
  export default {
    name: 'f7-fab-button',
    props: {
      fabClose: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
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
