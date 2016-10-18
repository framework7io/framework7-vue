<template>
  <a href="#" @click="onClick" :class="classObject"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      'overswipe': Boolean,
      'close': Boolean,
      'delete': Boolean,
      'color': String,
      'bg': String
    },
    computed: {
      classObject: function () {
        var co = {
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close
        }
        if (this.color) co['bg-' + this.color] = true;
        if (this.bg) co['bg-' + this.bg] = true;
        return co;
      }
    },
    data: function () {
      return {};
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      }
    }
  }
</script>