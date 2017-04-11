<script>
  export default {
    render: function (c) {
      var hasNavbar, hasPages, pagesEl, navbarEl, self = this;
      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var child = self.$slots.default[i];
          if (child.tag && child.tag.indexOf('navbar') >= 0) hasNavbar = true;
          if (child.tag && child.tag.indexOf('pages') >= 0) hasPages = true;
        }
      }
      if (!hasPages) pagesEl = c('f7-pages');
      if (!hasNavbar && self.$theme.ios && (self.dynamicNavbar || self.navbarThrough || (self.params && self.params.dynamicNavbar))) {
        navbarEl = c('f7-navbar', {props: {inner: false}});
      }

      return c(
        'div',
        {
          class: self.classesObject,
          on: {
            'swipeback:move': self.onSwipeBackMove,
            'swipeback:beforechange': self.onSwipeBackBeforeChange,
            'swipeback:afterchange': self.onSwipeBackAfterChange,
            'swipeback:beforereset': self.onSwipeBackBeforeReset,
            'swipeback:afterreset': self.onSwipeBackAfterReset,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide
          }
        },
        [navbarEl, pagesEl, self.$slots.default]
      );
    },
    beforeDestroy: function () {
      var self = this;
      if (self.f7View && self.f7View.destroy) self.f7View.destroy();
    },
    props: {
      'main': Boolean,
      'navbar-fixed': Boolean,
      'navbar-through': Boolean,
      'toolbar-fixed': Boolean,
      'toolbar-through': Boolean,
      'tabbar-fixed': Boolean,
      'tabbar-through': Boolean,
      'tabbar-labels-fixed': Boolean,
      'tabbar-labels-through': Boolean,

      'tab': Boolean,
      'active': Boolean,

      'dynamic-navbar': Boolean,
      'dom-cache': Boolean,
      'links-view': [String, Object],
      'reload-pages': Boolean,
      'unique-history': Boolean,
      'unique-history-ignore-get-parameters': Boolean,
      'allow-duplicate-urls': Boolean,
      'swipe-back-page': Boolean,
      'swipe-back-page-animate-shadow': Boolean,
      'swipe-back-page-animate-opacity': Boolean,
      'swipe-back-page-active-area': Boolean,
      'swipe-back-page-threshold': Boolean,
      'animate-pages': Boolean,
      'preload-previous-page': Boolean,
      'name': String,

      'params': Object,

      'url': String,
      'init': {
        type: Boolean,
        default: true
      },

      'theme': String,
      'layout': String
    },
    computed: {
      classesObject: function () {
        var co = {
          'view': true,
          'view-main': this.main,
          'active': this.active,
          'tab': this.tab,
          'navbar-fixed': this.navbarFixed || this.navbarThrough && this.$theme.material,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough,
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      },

    },
    methods: {
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) return;
        var propsData = self.$options.propsData;
        var params = self.params || {
          name: self.name,
          url: self.url,
          dynamicNavbar: propsData.dynamicNavbar,
          domCache: typeof propsData.domCache === 'undefined' ? true : propsData.domCache,
          linksView: propsData.linksView,
          reloadPages: propsData.reloadPages,
          uniqueHistory: propsData.uniqueHistory,
          uniqueHistoryIgnoreGetParameters: propsData.uniqueHistoryIgnoreGetParameters,
          allowDuplicateUrls: propsData.allowDuplicateUrls,
          swipeBackPage: propsData.swipeBackPage,
          swipeBackPageAnimateShadow: propsData.swipeBackPageAnimateShadow,
          swipeBackPageAnimateOpacity: propsData.swipeBackPageAnimateOpacity,
          swipeBackPageActiveArea: propsData.swipeBackPageActiveArea,
          swipeBackPageThreshold: propsData.swipeBackPageThreshold,
          animatePages: propsData.animatePages,
          preloadPreviousPage: propsData.preloadPreviousPage,
        }

        var $$ = self.$$;
        var pagesContainer = $$(self.$el).find('.pages')[0];

        // Include page by route
        if (pagesContainer.querySelectorAll('.page').length === 0 && params.url) {
          // Find Matching Route
          const matchingRoute = self.$f7Router.findMatchingRoute(params.url);
          if (!matchingRoute) return;
          // Find Pages Vue Component
          var pagesVue = pagesContainer.__vue__;
          // Generate Page Id
          const id = new Date().getTime();
          // Push New Page component
          self.$set(pagesVue.pages, id, {component: matchingRoute.route.component});

          self.$nextTick(function () {
            // Page element
            var newPage = pagesContainer.querySelector('.page:first-child');
            pagesVue.pages[id].pageElement = newPage;

            // Move Navbar
            var newNavbar;
            var dynamicNavbar = self.$theme.ios && params.dynamicNavbar;

            if (dynamicNavbar) {
              newNavbar = $$(newPage).find('.navbar-inner:first-child');
              $$(self.$el).children('.navbar').append(newNavbar);
              $$(newPage).find('.navbar').remove();
            }

            // Init Page and Navbar Callbacks
            f7.initPageWithCallback(newPage);
            if (dynamicNavbar && newNavbar) {
              f7.initNavbarWithCallback(newNavbar);

            }
          });
        }
        // Init View
        self.f7View = f7.addView(self.$el, params);
      },
      onSwipeBackMove: function (event) {
        this.$emit('swipeback:move', event, event.detail);
      },
      onSwipeBackBeforeChange: function (event) {
        this.$emit('swipeback:beforechange', event, event.detail);
      },
      onSwipeBackAfterChange: function (event) {
        this.$emit('swipeback:afterchange', event, event.detail);
      },
      onSwipeBackBeforeReset: function (event) {
        this.$emit('swipeback:beforereset', event, event.detail);
      },
      onSwipeBackAfterReset: function (event) {
        this.$emit('swipeback:afterreset', event, event.detail);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  }
</script>
