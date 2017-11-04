<template>
  <div class="fab-buttons" :class="classes"><slot></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const FabButtonsProps = Utils.extend(
    {
      position: {
        type: String,
        default: 'top',
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-fab-buttons',
    props: FabButtonsProps,
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
