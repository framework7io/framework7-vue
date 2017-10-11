<template>
  <span class="preloader" :class="classes"
    :style="{'width': (sizeComputed ? `${sizeComputed}px` : ''), 'height': (sizeComputed ? `${sizeComputed}px` : '')}"
  >
    <span class="preloader-inner" v-if="$theme.md">
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
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const PreloaderProps = Utils.extend({
    size: [Number, String],
  }, Mixins.colorProps);

  export default {
    name: 'f7-preloader',
    props: PreloaderProps,
    computed: {
      classes() {
        return Mixins.colorClasses(this);
      },
      sizeComputed() {
        let s = this.size;
        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }
        return s;
      },
    },
  };
</script>
