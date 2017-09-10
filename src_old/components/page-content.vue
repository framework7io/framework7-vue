<template>
  <div class="page-content" :class="classesObject" @tab:show="onTabShow" @tab:hide="onTabHide"><slot></slot></div>
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
    },
    methods: {
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  }
</script>