<!-- <template>
  <div class="pages" ref="pages" :class="classesObject" @pageBeforeRemove="onPageBeforeRemove">
    <slot></slot>
    <component v-for="(page, key) in pages" :is="page.component"></component>
  </div>
</template> -->
<script>
  export default {
    render: function (c) {
      var self = this;
      var pages = [];
      for (var pageId in self.pages) {
        var page = self.pages[pageId];
        pages.push(c(page.component, {tag: 'component'}))
      }
      return c('div',
        {
          staticClass:"pages",
          ref: 'pages',
          on: {
            'page:beforeremove': self.onPageBeforeRemove
          }
        },
        [
          self.$slots.default,
          pages
        ]
      )
    },
    props: {
      'navbar-fixed': Boolean,
      'navbar-through': Boolean,
      'toolbar-fixed': Boolean,
      'toolbar-through': Boolean,
      'tabbar-fixed': Boolean,
      'tabbar-through': Boolean,
      'tabbar-labels-fixed': Boolean,
      'tabbar-labels-through': Boolean,
      'theme': String,
      'layout': String
    },
    data: function () {
      return {
        pages: {}
      }
    },
    computed: {
      classesObject: function () {
        var co = {
          'navbar-fixed': this.navbarFixed || this.navbarThrough && this.$theme.material,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
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