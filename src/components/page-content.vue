<template>
  <div class="page-content" :class="classesObject"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'tab': Boolean,
      'active': Boolean
    },
    computed: {
      classesObject: function () {
        var self = this;
        return {
          'tab': self.tab,
          'active': self.active
        }
      }
    }
  }
</script>