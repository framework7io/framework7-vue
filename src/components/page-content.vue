<template>
  <div class="page-content" :class="classes" @tab:show="onTabShow" @tab:hide="onTabHide"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      tab: Boolean,
      tabActive: Boolean,
    },
    computed: {
      classes() {
        const self = this;
        return {
          tab: self.tab,
          'tab-active': self.tabActive,
        };
      },
    },
    methods: {
      onTabShow(e) {
        const self = this;
        self.$emit('tab:show', e);
      },
      onTabHide(e) {
        const self = this;
        self.$emit('tab:hide', e);
      },
    },
  };
</script>
