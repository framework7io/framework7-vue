<template>
  <div class="subnavbar" :class="classes">
    <div class="subnavbar-inner" v-if="inner">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-subnavbar',
    props: Utils.extend({
      sliding: Boolean,
      inner: {
        type: Boolean,
        default: true,
      },
    }, Mixins.colorProps),
    computed: {
      classes() {
        return Utils.extend({
          sliding: this.sliding,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
