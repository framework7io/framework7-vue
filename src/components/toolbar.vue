<template>
  <div class="toolbar" :class="classesObject">
    <div class="toolbar-inner">
      <slot></slot>
    </div>
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
          'tabbar-scrollabel': this.scrollable,
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    }
  }
</script>