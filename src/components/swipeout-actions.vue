<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const SwipeoutActions = {
    name: 'f7-swipeout-actions',
    props: Utils.extend({
      left: Boolean,
      right: Boolean,
      side: String,
    }, Mixins.colorProps),
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

  export default SwipeoutActions;
</script>
