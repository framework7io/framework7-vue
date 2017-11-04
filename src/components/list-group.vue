<template>
  <div class="list-group" :class="classes">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ListGroupProps = Utils.extend(
    {
      mediaList: Boolean,
      sortable: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-list-group',
    props: ListGroupProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
      sortableComputed() {
        return this.sortable || this.$parent.sortable;
      },
      mediaListComputed() {
        return this.mediaList || this.$parent.mediaList;
      },
    },
    data() {
      return {};
    },
  };
</script>
