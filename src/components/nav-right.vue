<template>
  <div class="right" :class="classes"><slot></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-nav-right',
    props: Utils.extend({
      sliding: Boolean,
    }, Mixins.colorProps),
    computed: {
      classes() {
        return Utils.extend({
          slidng: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
