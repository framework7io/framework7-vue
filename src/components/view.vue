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
      if (!hasNavbar && self.$theme.ios && (self.dynamicNavbar || self.navbarThrough)) {
        navbarEl = c('f7-navbar');
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

        self.f7View = f7.addView(self.$el, params);
        if (self.f7View && self.f7View.pagesContainer.querySelectorAll('.page').length === 0) {
          self.f7View.router.load({url: self.url, reload: true});
        }
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