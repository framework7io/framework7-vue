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
    },
    computed: {
      classes() {
        const co = {
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close,
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
