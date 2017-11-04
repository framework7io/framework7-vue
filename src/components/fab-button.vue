<template>
  <a :class="classes" @click="onClick"><slot></slot></a>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const FabButtonProps = Utils.extend(
    {
      fabClose: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-fab-button',
    props: FabButtonProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'fab-close': self.fabClose,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
