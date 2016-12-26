<template>
  <div class="content-block" :class="classesObject" @tab:show="onTabShow" @tab:hide="onTabHide">
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
      'tab': Boolean,
      'active': Boolean,
      'no-hairlines': Boolean,
      'no-hairlines-between': Boolean,
    },
    computed: {
      classesObject: function () {
        var self = this;
        return {
          'inset': self.inset,
          'tabs': self.tabs,
          'tab': self.tab,
          'active': self.active,
          'no-hairlines': self.noHairlines,
          'no-hairlines-between': self.noHairlinesBetween,
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