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
      },
      onRouteChange: function (event) {
        var self = this;
        var pageComponent = event.pageComponent;
        var isBack = event.action === 'POP';
        var view = event.view; 
        
        const alreadyOnPage = view.url === event.path;       

        if (view === self.$parent.f7View && !alreadyOnPage) {
          var id = new Date().getTime();

          self.$set(self.pages, id, {component: pageComponent});

          view.allowPageChange = false;

          self.$nextTick(function () {
            var newPage = view.pagesContainer.querySelector('.page:last-child');
            
            self.pages[id].pageElement = newPage;            
            view.allowPageChange = true;

            const options = {
              url: event.path,
              pageElement: newPage
            };

            if (isBack) {
              view.router.back(options);
            }
            else {
              view.router.load(options);
            }
          }); 
        }
      }
    }
  }
</script>