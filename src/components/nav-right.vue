<template>
  <div class="right" :class="classes"><slot></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const NavRightProps = Utils.extend({
    sliding: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-nav-right',
    props: NavRightProps,
    computed: {
      classes() {
        return Utils.extend({
          sliding: this.slidng,
        }, Mixins.colorClasses(this));
      },
    },
  };
</script>
