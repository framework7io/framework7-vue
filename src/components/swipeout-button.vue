<template>
  <a @click="onClick" :class="classes"><slot>{{text}}</slot></a>
</template>
<script>
  export default {
    name: 'f7-swipeout-button',
    props: {
      text: String,
      overswipe: Boolean,
      close: Boolean,
      delete: Boolean,
      color: String,
    },
    computed: {
      classes() {
        const co = {
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close,
          [`color-${this.color}`]: this.color,
        };
        return co;
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
