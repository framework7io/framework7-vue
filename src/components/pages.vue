<template>
  <div class="pages" :class="classObject" @pageBeforeRemove="onPageBeforeRemove">
    <slot></slot>
    <component v-for="(page, key) in pages" :is="page.component"></component>
  </div>
</template>
<script>
  export default {
    updated: function () {
      console.log('Pages Updated')
    },
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
        pages: {}
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
        var idToRemove;
        for (var id in this.pages) {
          if (e.target === this.pages[id].pageElement) {
            idToRemove = id;
            break;
          }
        }
        if (idToRemove) this.$set(this.pages, idToRemove, {});
      }
    }
  }
</script>