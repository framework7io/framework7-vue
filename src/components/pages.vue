<script>
  export default {
    render: function (c) {
      var self = this;
      var pages = [];
      for (var pageId in self.pages) {
        var page = self.pages[pageId];
        pages.push(c(page.component, {tag: 'component', props: self.$route && self.$route.params, key:pageId}))
      }
      return c('div',
        {
          staticClass: 'pages',
          ref: 'pages',
          class: self.classesObject,
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
        if (idToRemove) this.$delete(this.pages, idToRemove);
      },
      onRouteChange: function (event) {
        var self = this;
        var pageComponent = event.route.component;
        var view = event.view;
        var currentView = self.$parent.f7View || self.$parent.$el.f7View;

        if (view !== currentView) return;

        const previousRoute = self.$f7Router.findMatchingRoute(view.url) || { route: { path: '/', pagePath: '/' } };
        const pageRouteChanged = previousRoute.route.pagePath !== event.route.pagePath;
        const childRouteChanged = !pageRouteChanged && previousRoute.route.path !== event.route.path;
        const shouldUpdatePages = pageRouteChanged || (!childRouteChanged && (event.options.reload || view.params.allowDuplicateUrls));

        if (!shouldUpdatePages) return;

        var id = new Date().getTime();

        self.$set(self.pages, id, {component: pageComponent});

        view.allowPageChange = false;

        self.$nextTick(function () {
          var newPage = view.pagesContainer.querySelector('.page:last-child');

          self.pages[id].pageElement = newPage;

          view.allowPageChange = true;

          const options = Object.assign(event.options, {
            pageElement: newPage
          });

          if (options.isBack) {
            view.router.back(options);
          }
          else {
            view.router.load(options);
          }
        });
      }
    }
  }
</script>
