<template>
  <div class="content-block" :class="classesObject">
    <div class="content-block-inner" v-if="inner">
      <slot>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'inset': Boolean,
      'inner': Boolean,
      'tabs': Boolean,
      'tab': Boolean
    },
    computed: {
      classesObject: function () {
        return {
          'inset': this.inset,
          'tabs': this.tabs,
          'tab': this.tab,
          'active': this.active
        }
      }
    }
  }
</script>