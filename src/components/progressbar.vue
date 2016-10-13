<template>
  <span class="progressbar"
    :data-progress="progress"
    :class="[(color ? ('color-' + color + ' preloader-' + color) : ''), (infinite ? 'progressbar-infinite' : '')].join(' ')"
  ><span :style="(progress ? 'translate3d(' + (-100 + progress) + '%,0,0)' : '')"></span></span>
</template>
<script>
  export default {
    props: {
      'color': String,
      'progress': Number,
      'infinite': Boolean
    },
    data: function () {
      return {};
    }
  }
</script>