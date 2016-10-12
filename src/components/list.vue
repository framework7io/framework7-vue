<template>
  <div class="list-block" :class="{'inset': inset, 'media-list': mediaList, 'sortable': sortable}" @open="onOpen" @close="onClose" @sort="onSort">
    <ul v-if="!grouped">
      <slot></slot>
    </ul>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'inset': Boolean,
      'media-list': Boolean,
      'grouped': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean
    },
    data: function () {
      return {};
    },
    methods: {
      onOpen: function (event) {
        this.$emit('open', event, event.target)
      },
      onClose: function (event) {
        this.$emit('close', event, event.target)
      },
      onSort: function (event) {
        this.$emit('sort', event, event.target)
      }
    }
  }
</script>