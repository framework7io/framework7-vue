<template>
  <div class="list-block-group">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      'media-list': Boolean,
      'sortable': Boolean,
    },
    computed: {
      sortableComputed: function () {
        return this.sortable || this.$parent.sortable;
      },
      mediaListComputed: function () {
        return this.mediaList || this.$parent.mediaList;
      }
    },
    data: function () {
      return {};
    }
  }
</script>