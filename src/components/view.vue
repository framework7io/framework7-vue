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
      if (!hasNavbar) navbarEl = c('f7-navbar');

      return c('div', {class: self.classesObject}, [navbarEl, pagesEl, self.$slots.default]);
    },
    beforeDestroy: function () {
      if (this.f7View) this.f7View.destroy();
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

      'url': String,
      'init': {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        return {
          'view': true,
          'view-main': this.main,
          'active': this.active,
          'tab': this.tab,
          'navbar-fixed': this.navbarFixed,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough,
        }
      },

    },
    methods: {
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) return;
        var params = {
          domCache: true,
          url: self.url,
          dynamicNavbar: true
        }
        self.f7View = f7.addView(self.$el, params);
        if(self.f7View && self.f7View.pagesContainer.querySelectorAll('.page').length === 0) {
          self.f7View.router.load({url: self.url, reload: true});
        }
      },
      onSwipeBackMove: function (event) {
        this.$emit('swipeBackMove', event, event.detail);
      },
      onSwipeBackBeforeChange: function (event) {
        this.$emit('swipeBackBeforeChange', event, event.detail);
      },
      onSwipeBackAfterChange: function (event) {
        this.$emit('swipeBackAfterChange', event, event.detail);
      },
      onSwipeBackBeforeReset: function (event) {
        this.$emit('swipeBackBeforeReset', event, event.detail);
      },
      onSwipeBackAfterReset: function (event) {
        this.$emit('swipeBackAfterReset', event, event.detail);
      }
    }
  }
</script>