<template>
  <span class="preloader"
    :class="(color ? ('color-' + color + ' preloader-' + color) : '')"
    :style="{'width': (sizeComputed ? sizeComputed + 'px' : ''), 'height': (sizeComputed ? sizeComputed + 'px' : '')}"
  >
    <span class="preloader-inner" v-if="$theme.material">
      <span class="preloader-inner-gap"></span>
      <span class="preloader-inner-left">
        <span class="preloader-inner-half-circle"></span>
      </span>
      <span class="preloader-inner-right">
        <span class="preloader-inner-half-circle"></span>
      </span>
    </span>
  </span>
</template>
<script>
  export default {
    props: {
      'color': String,
      'size': [Number, String]
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