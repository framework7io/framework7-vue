<template>
  <span class="preloader"
    :class="(color ? ('color-' + color + ' preloader-' + color) : '')"
    :style="(sizeComputed ? 'width:' + (sizeComputed) + 'px; height:' + (sizeComputed) + 'px' : '')"
  ></span>
</template>
<script>
  export default {
    props: {
      'color': String,
      'size': [Number, String],
      'sizeComputed': Number
    },
    computed: {
      sizeComputed: function () {
        var s = this.size;
        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }
        return s;
      }
    }
  }
</script>