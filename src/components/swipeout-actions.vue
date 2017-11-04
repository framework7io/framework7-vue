<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const SwipeoutActionsProps = Utils.extend({
    left: Boolean,
    right: Boolean,
    side: String,
  }, Mixins.colorProps);

  export default {
    name: 'f7-swipeout-actions',
    props: SwipeoutActionsProps,
    computed: {
      classes() {
        return Utils.extend({
          [`swipeout-actions-${this.sideComputed}`]: true,
        }, Mixins.colorClasses(this));
      },
      sideComputed() {
        if (!this.side) {
          if (this.left) return 'left';
          if (this.right) return 'right';
          return 'right';
        }
        return this.side;
      },
    },
    data() {
      return {};
    },
  };
</script>
