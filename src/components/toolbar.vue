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
        layout: String
    },
    computed: {
      classesObject: function () {
        var co = {
          'toolbar-bottom': this.bottom,
          'tabbar': this.tabbar,
          'tabbar-labels': this.labels,
          'tabbar-scrollable': this.scrollable,
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    }
  }
</script>