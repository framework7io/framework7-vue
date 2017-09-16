<template>
  <div class="list-group">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      mediaList: Boolean,
      sortable: Boolean,
    },
    computed: {
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
