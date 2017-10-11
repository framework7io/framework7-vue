<template>
  <a @click="onClick" :class="classes"><slot>{{text}}</slot></a>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-swipeout-button',
    props: Utils.extend({
      text: String,
      overswipe: Boolean,
      close: Boolean,
      delete: Boolean,
    }, Mixins.colorProps),
    computed: {
      classes() {
        return Utils.extend({
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
