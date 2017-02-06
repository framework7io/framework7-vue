<template>
  <div class="tab" :class="active ? 'active' : false" @tab:show="onTabShow" @tab:hide="onTabHide">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      'active': Boolean
    },
    methods: {
      show: function () {
        if (!this.$f7) return;
        this.$f7.showTab(this.$el);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  }
</script>