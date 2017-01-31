<script>
  export default {
    render: function (c) {
      var pageEl, pageContentEl, ptrEl, infiniteEl, fixedList = [], staticList = [];
      var self = this;

      if (self.pullToRefresh && (self.ptrLayer && self.pullToRefreshLayer)) {
        ptrEl = c('div', {class: {'pull-to-refresh-layer': true}} ,[
          c('div', {class: {'preloader': true}}),
          c('div', {class: {'pull-to-refresh-arrow': true}})
        ]);
      }
      if ((self.infiniteScroll || self.infiniteScroll === '') && self.infiniteScrollPreloader) {
        infiniteEl = c('div', {class: {'infinite-scroll-preloader': true}} ,[
          c('div', {class: {'preloader': true}})
        ]);
      }

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');

      var tag, child, withSubnavbar, withMessages, withSearchbar;

      var i, j;
      if (self.$slots.default) {
        for (i = 0; i < self.$slots.default.length; i++) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue;
          }
          var isFixed = false;
          if (tag.indexOf('messages') >= 0) withMessages = true;
          if (tag.indexOf('subnavbar') >= 0) withSubnavbar = true;
          if (tag.indexOf('searchbar') >= 0) withSearchbar = true;
          for (j = 0; j < fixedTags.length; j++) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) fixedList.push(child);
          else staticList.push(child);
        }
      }

      if (fixedList.length > 0 && withSearchbar) {
        fixedList.push(c('div', {class:{'searchbar-overlay': true}}));
      }
      if (withMessages) self.classesObjectPageContent['messages-content'] = true;
      if (!self.noPageContent) {
        pageContentEl = c('div', {
          staticClass: 'page-content',
          class: self.classesObjectPageContent,
          attrs: {
            'data-ptr-distance': self.pullToRefreshDistance || self.ptrDistance,
            'data-distance': self.infiniteScrollDistance
          },
          on: {
            'ptr:pullstart': self.onPtrPullstart,
            'ptr:pullmove': self.onPtrPullmove,
            'ptr:pullend': self.onPtrPullend,
            'ptr:refresh': self.onPtrRefresh,
            'ptr:done': self.onPtrRefreshdone,
            'infinite': self.onInfinite
          },
        }, (self.infiniteScroll === 'top' ? [ptrEl, infiniteEl, self.$slots.static, staticList] : [ptrEl, self.$slots.static, staticList, infiniteEl]))
      }
      else {
        pageContentEl = [];
        if (self.$slots.default && fixedList.length > 0) {
          for (i = 0; i < self.$slots.default.length; i++) {
            if (fixedList.indexOf(self.$slots.default[i]) < 0) {
              pageContentEl.push(self.$slots.default[i]);
            }
          }
        }
        else {
          pageContentEl = [self.$slots.default]
        }
      }
      fixedList.push(self.$slots.fixed);
      
      if (withSubnavbar) self.classesObjectPage['with-subnavbar'] = true;
      pageEl = c('div', {
        staticClass: 'page',
        class: self.classesObjectPage,
        attrs: {
          'data-page': self.name
        },
        on: {
          'page:beforeinit': self.onPageBeforeInit,
          'page:init': self.onPageInit,
          'page:reinit': self.onPageReinit,
          'page:beforeanimation': self.onPageBeforeAnimation,
          'page:afteranimation': self.onPageAfterAnimation,
          'page:beforeremove': self.onPageBeforeRemove,
          'page:back': self.onPageBack,
          'page:afterback': self.onPageAfterBack
        }
      }, [fixedList, pageContentEl]);

      return pageEl;

    },
    props: {
      'name': String,
      'cached': Boolean,
      'navbar-fixed': Boolean,
      'navbar-through': Boolean,
      'toolbar-fixed': Boolean,
      'toolbar-through': Boolean,
      'tabbar-fixed': Boolean,
      'tabbar-through': Boolean,
      'tabbar-labels-fixed': Boolean,
      'tabbar-labels-through': Boolean,
      'with-subnavbar': Boolean,
      'subnavbar': Boolean,
      'no-navbar': Boolean,
      'no-toolbar': Boolean,
      'no-tabbar': Boolean,
      'pull-to-refresh': Boolean,
      'pull-to-refresh-distance': Number,
      'ptr-distance': Number,
      'pull-to-refresh-layer': {
        type: Boolean,
        default: true
      },
      'ptr-layer': {
        type: Boolean,
        default: true
      },
      'infinite-scroll': [Boolean, String],
      'infinite-scroll-distance': Number,
      'infinite-scroll-preloader': {
        type: Boolean,
        default: true
      },
      'hide-bars-on-scroll': Boolean,
      'hide-navbar-on-scroll': Boolean,
      'hide-toolbar-on-scroll': Boolean,
      'hide-tabbar-on-scroll': Boolean,
      'messages': Boolean,
      'tabs': Boolean,
      'no-page-content': Boolean,
      'login-screen': Boolean,
      'theme': String,
      'layout': String,
      'no-swipeback': Boolean
    },
    computed: {
      classesObjectPage: function () {
        var co = {
          'cached': this.cached,
          'navbar-fixed': this.navbarFixed || this.navbarThrough && this.$theme.material,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabelsThrough,
          'with-subnavbar': this.subnavbar || this.withSubnavbar,
          'no-navbar': this.noNavbar,
          'no-toolbar': this.noToolbar,
          'no-tabbar': this.noTabbar,
          'tabs': this.tabs,
          'no-swipeback': this.noSwipeBack
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      },
      classesObjectPageContent: function () {
        return {
          'pull-to-refresh-content': this.pullToRefresh,
          'infinite-scroll': this.infiniteScroll || this.infiniteScroll === '',
          'infinite-scroll-top': this.infiniteScroll === 'top',
          'hide-bars-on-scroll': this.hideBarsOnScroll,
          'hide-navbar-on-scroll': this.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': this.hideToolbarOnScroll,
          'hide-tabbar-on-scroll': this.hideTabbarOnScroll,
          'messages-content': this.messages,
          'login-screen-content': this.loginScreen
        }
      }
    },
    methods: {
      onPtrPullstart: function (event) {
        this.$emit('ptr:pullstart', event);
      },
      onPtrPullmove: function (event) {
        this.$emit('ptr:pullmove', event);
      },
      onPtrPullend: function (event) {
        this.$emit('ptr:pullend', event);
      },
      onPtrRefresh: function (event) {
        this.$emit('ptr:refresh', event, event.detail.done);
      },
      onPtrRefreshdone: function (event) {
        this.$emit('ptr:done', event);
      },
      onInfinite: function (event) {
        this.$emit('infinite', event);
      },
      onPageBeforeInit: function (event) {
        this.f7PageData = event.detail.page;
        this.$emit('page:beforeinit', event, event.detail.page);
      },
      onPageInit: function (event) {
        this.$emit('page:init', event, event.detail.page);
      },
      onPageReinit: function (event) {
        this.$emit('page:reinit', event, event.detail.page);
      },
      onPageBeforeAnimation: function (event) {
        this.$emit('page:beforeanimation', event, event.detail.page);
      },
      onPageAfterAnimation: function (event) {
        this.$emit('page:afteranimation', event, event.detail.page);
      },
      onPageBeforeRemove: function (event) {
        this.$emit('page:beforeremove', event, event.detail.page);
      },
      onPageBack: function (event) {
        this.$emit('page:back', event, event.detail.page);
      },
      onPageAfterBack: function (event) {
        this.$emit('page:afterback', event, event.detail.page);
      }
    }
  }
</script>