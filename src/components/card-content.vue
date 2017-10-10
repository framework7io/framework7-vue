<template>
  <div class="card-content" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-card-content',
    props: Utils.extend(
      {
        padding: {
          type: Boolean,
          default: true,
        },
      },
      Mixins.colorProps
    ),
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'card-content-padding': self.padding,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };
</script>
