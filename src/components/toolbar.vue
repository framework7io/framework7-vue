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
        scrollable: Boolean
    },
    computed: {
        classesObject: function () {
            return {
                'toolbar-bottom': this.bottom,
                'tabbar': this.tabbar,
                'tabbar-labels': this.labels,
                'tabbar-scrollabel': this.scrollable,
            }
        }
    }
  }
</script>