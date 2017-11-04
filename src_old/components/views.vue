<template>
  <div class="views" :class="classObject" ><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'navbar-fixed': Boolean,
      'navbar-through': Boolean,
      'toolbar-fixed': Boolean,
      'toolbar-through': Boolean,
      'tabbar-fixed': Boolean,
      'tabbar-through': Boolean,
      'tabbar-labels-fixed': Boolean,
      'tabbar-labels-through': Boolean,
      'tabs': Boolean,
      'theme': String,
      'layout': String
    },
    computed: {
      classObject: function () {
        var co = {
          'tabs': this.tabs,
          'navbar-fixed': this.navbarFixed || this.navbarThrough && this.$theme.material,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabelsThrough
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      }
    }
  }
</script>