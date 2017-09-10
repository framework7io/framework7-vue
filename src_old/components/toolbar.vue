<template>
  <div class="toolbar" :class="classesObject">
    <slot name="before-inner"></slot>
    <div class="toolbar-inner">
      <slot></slot>
    </div>
    <slot name="after-inner"></slot>
  </div>
</template>
<script>
  export default {
    props: {
        bottom: Boolean,
        tabbar: Boolean,
        labels: Boolean,
        scrollable: Boolean,
        theme: String,
        layout: String,
        hidden: Boolean,
        noShadow: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'toolbar-bottom': this.bottom,
          'tabbar': this.tabbar,
          'tabbar-labels': this.labels,
          'tabbar-scrollable': this.scrollable,
          'toolbar-hidden': this.hidden
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        if (this.noShadow) co['no-shadow'] = true;
        return co;
      }
    },
    methods: {
      hide: function (animated) {
        if (!this.$f7) return;
        return this.$f7.hideToolbar(this.$el, animated);
      },
      show: function (animated) {
        if (!this.$f7) return;
        return this.$f7.showToolbar(this.$el, animated);
      }
    }
  }
</script>
