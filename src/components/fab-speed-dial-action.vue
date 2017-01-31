<template>
  <a href="#" @click="onClick" :class="classesObject"><slot></slot></a>
</template>
<script>
  export default {
    props: {
      'color': String,
      'closeSpeedDial': Boolean
    },
    computed: {
      classesObject: function() {
        var co = {};
        if (this.color) co['color-' + this.color] = true;
        if (this.closeSpeedDial) co['close-speed-dial'] = true;
        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>
