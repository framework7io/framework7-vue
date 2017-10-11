<template>
  <div class="fab-buttons" :class="classes"><slot></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-fab-buttons',
    props: Utils.extend(
      {
        position: {
          type: String,
          default: 'top',
        },
      },
      Mixins.colorProps
    ),
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            [`fab-buttons-${self.position}`]: true,
          },
          Mixins.colorClasses(self)
        );
      },
    },
  };
</script>
