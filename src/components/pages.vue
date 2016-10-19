<template>
  <div class="pages" :class="classObject" @pageBeforeRemove="onPageBeforeRemove">
    <slot></slot>
    <component v-for="page in pages" :is="page.component" class="cached"></component>
  </div>
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
      'tabbar-labels-through': Boolean
    },
    data: function () {
      return {
        pages: []
      }
    },
    computed: {
      classObject: function () {
        return {
          'navbar-fixed': this.navbarFixed,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough
        }
      }
    },
    methods: {
      onPageBeforeRemove: function (e) {
        var indexToRemove;
        for (var i = 0; i < this.pages.length; i++) {
          if (e.target === this.pages[i].pageElement) {
            indexToRemove = i;
          }
        }
        if (typeof indexToRemove !== 'undefined') {
          this.pages.splice(indexToRemove, 1);
        }
      }
    }
  }
</script>