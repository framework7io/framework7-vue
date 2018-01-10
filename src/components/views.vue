<template>
  <div class="views" :class="classes"><slot></slot></div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ViewsProps = Utils.extend(
    {
      tabs: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-views',
    props: ViewsProps,
    computed: {
      classes() {
        return Utils.extend(
          {
            tabs: this.tabs,
          },
          Mixins.colorClasses(this)
        );
      },
    },
  };
</script>
