/**
 * Framework7 Vue 0.7.8
 * Build full featured iOS & Android apps using Framework7 & Vue
 * http://www.framework7.io/vue/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: January 31, 2017
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Framework7Vue = factory());
}(this, (function () {

var StatusBar = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"statusbar-overlay"})},
staticRenderFns: [],};

var Panel = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"panel",class:_vm.classesObject,on:{"panel:open":_vm.onOpen,"panel:opened":_vm.onOpened,"panel:close":_vm.onClose,"panel:closed":_vm.onClosed}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'side': String,
      'effect': String,
      'cover': Boolean,
      'reveal': Boolean,
      'left': Boolean,
      'right': Boolean,
      'theme': String,
      'layout': String,
      'opened': Boolean
    },
    computed: {
      classesObject: function () {
        var self = this;
        var side = self.side || (self.left ? 'left' : 'right');
        var effect = self.effect || (self.reveal ? 'reveal' : 'cover');
        var co = {};
        co['panel-' + side] = true;
        co['panel-' + effect] = true;
        if (self.layout) { co['layout-' + self.layout] = true; }
        if (self.theme) { co['theme-' + self.theme] = true; }
        co['active'] = self.opened;
        return co;
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        if (opened) {
          self.$f7.openPanel(side);
        }
        else {
          self.$f7.closePanel(side);
        }
      }
    },
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
      var $$ = self.$$;
      if (!$$) { return; }
      var side = self.side || (self.left ? 'left' : 'right');
      var effect = self.effect || (self.reveal ? 'reveal' : 'cover');
      if (self.opened) {
        $$('body').addClass('with-panel-' + side + '-' + effect);
      }
    },
    methods: {
      onOpen: function (event) {
        this.$emit('panel:open', event);
      },
      onOpened: function (event) {
        this.$emit('panel:opened', event);
      },
      onClose: function (event) {
        this.$emit('panel:open', event);
      },
      onClosed: function (event) {
        this.$emit('panel:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) { return; }
        if ($$('.panel-overlay').length === 0) {
          $$('<div class="panel-overlay"></div>').insertBefore(this.$el);
        }
      },
      open: function () {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        self.$f7.openPanel(side);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.side || (self.left ? 'left' : 'right');
        self.$f7.closePanel(side);
      }
    }
  };

var Views = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"views",class:_vm.classObject},[_vm._t("default")],2)},
staticRenderFns: [],
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
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    }
  };

var View = {
    render: function (c) {
      var hasNavbar, hasPages, pagesEl, navbarEl, self = this;
      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var child = self.$slots.default[i];
          if (child.tag && child.tag.indexOf('navbar') >= 0) { hasNavbar = true; }
          if (child.tag && child.tag.indexOf('pages') >= 0) { hasPages = true; }
        }
      }
      if (!hasPages) { pagesEl = c('f7-pages'); }
      if (!hasNavbar && !self.$theme.material && self.dynamicNavbar) {
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
      if (self.f7View && self.f7View.destroy) { self.f7View.destroy(); }
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
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      },

    },
    methods: {
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) { return; }
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
        };

        self.f7View = f7.addView(self.$el, params);
        if(self.f7View && self.f7View.pagesContainer.querySelectorAll('.page').length === 0) {
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
  };

var Pages = {
    render: function (c) {
      var self = this;
      var pages = [];
      for (var pageId in self.pages) {
        var page = self.pages[pageId];
        pages.push(c(page.component, {tag: 'component'}));
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
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      onPageBeforeRemove: function (e) {
        var this$1 = this;

        var idToRemove;
        for (var id in this$1.pages) {
          if (e.target === this$1.pages[id].pageElement) {
            idToRemove = id;
            break;
          }
        }
        if (idToRemove) { this.$set(this.pages, idToRemove, {}); }
      }
    }
  };

var Page = {
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
          if (tag.indexOf('messages') >= 0) { withMessages = true; }
          if (tag.indexOf('subnavbar') >= 0) { withSubnavbar = true; }
          if (tag.indexOf('searchbar') >= 0) { withSearchbar = true; }
          for (j = 0; j < fixedTags.length; j++) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) { fixedList.push(child); }
          else { staticList.push(child); }
        }
      }

      if (fixedList.length > 0 && withSearchbar) {
        fixedList.push(c('div', {class:{'searchbar-overlay': true}}));
      }
      if (withMessages) { self.classesObjectPageContent['messages-content'] = true; }
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
        }, (self.infiniteScroll === 'top' ? [ptrEl, infiniteEl, self.$slots.static, staticList] : [ptrEl, self.$slots.static, staticList, infiniteEl]));
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
          pageContentEl = [self.$slots.default];
        }
      }
      fixedList.push(self.$slots.fixed);
      
      if (withSubnavbar) { self.classesObjectPage['with-subnavbar'] = true; }
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
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
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
  };

var PageContent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"page-content",class:_vm.classesObject,on:{"tab:show":_vm.onTabShow,"tab:hide":_vm.onTabHide}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'tab': Boolean,
      'active': Boolean
    },
    computed: {
      classesObject: function () {
        var self = this;
        return {
          'tab': self.tab,
          'active': self.active
        }
      }
    },
    methods: {
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  };

var Navbar = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"navbar",class:_vm.classesObject,on:{"navbar:beforeinit":_vm.onBeforeInit,"navbar:init":_vm.onInit,"navbar:reinit":_vm.onReinit,"navbar:beforeremove":_vm.onBeforeRemove}},[_vm._t("before-inner"),_vm._v(" "),_c('div',{staticClass:"navbar-inner"},[(_vm.backLink)?_c('f7-nav-left',{attrs:{"back-link":_vm.backLink,"sliding":_vm.sliding,"back-link-href":_vm.backLinkUrl || _vm.backLinkHref}}):_vm._e(),_vm._v(" "),(_vm.title)?_c('f7-nav-center',{attrs:{"title":_vm.title,"sliding":_vm.sliding}}):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_vm._t("after-inner")],2)},
staticRenderFns: [],
    updated: function () {
      var self = this;
      self.$nextTick(function () {
          self.$f7.sizeNavbars();
      });
    },
    props: {
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkHref: String,
      sliding: Boolean,
      title: String,
      theme: String,
      layout: String,
      hidden: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'navbar-hidden': this.hidden
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      hide: function () {
        if (!this.$f7) { return; }
        return this.$f7.hideNavbar(this.$el);
      },
      show: function () {
        if (!this.$f7) { return; }
        return this.$f7.showNavbar(this.$el);
      },
      size: function () {
        if (!this.$f7 || this.$theme.material) { return; }
        return this.$f7.sizeNavbars();
      },
      onBeforeInit: function (e) {
        this.$emit('navbar:beforeinit', e);
      },
      onInit: function (e) {
        this.$emit('navbar:init', e);
      },
      onReinit: function (e) {
        this.$emit('navbar:reinit', e);
      },
      onBeforeRemove: function (e) {
        this.$emit('navbar:beforeremove', e);
      }
    }
  };

var NavCenter = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"center",class:{sliding:_vm.sliding}},[_vm._t("default",[_vm._v(_vm._s(_vm.title))])],2)},
staticRenderFns: [],
    props: {
        sliding: Boolean,
        title: String
    }
  };

var NavLeft = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"left",class:{sliding:_vm.sliding}},[(_vm.backLink)?_c('f7-link',{class:{'icon-only': (_vm.backLink === true || _vm.backLink && _vm.$theme.material)},attrs:{"href":_vm.backLinkUrl || _vm.backLinkHref || '#',"back":"","icon":"icon-back","text":_vm.backLink !== true && !_vm.$theme.material ? _vm.backLink : undefined}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkHref: String,
      sliding: Boolean
    }
  };

var NavRight = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"right",class:{sliding:_vm.sliding}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
        sliding: Boolean
    }
  };

var Subnavbar = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"subnavbar",class:_vm.sliding ? 'sliding' : false},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
        sliding: Boolean
    }
  };

var Toolbar = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"toolbar",class:_vm.classesObject},[_vm._t("before-inner"),_vm._v(" "),_c('div',{staticClass:"toolbar-inner"},[_vm._t("default")],2),_vm._v(" "),_vm._t("after-inner")],2)},
staticRenderFns: [],
    props: {
        bottom: Boolean,
        tabbar: Boolean,
        labels: Boolean,
        scrollable: Boolean,
        theme: String,
        layout: String,
        hidden: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'toolbar-bottom': this.bottom,
          'tabbar': this.tabbar,
          'tabbar-labels': this.labels,
          'tabbar-scrollable': this.scrollable,
          'toolbar-hidden': this.hidden
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      hide: function () {
        if (!this.$f7) { return; }
        return this.$f7.hideToolbar(this.$el);
      },
      show: function () {
        if (!this.$f7) { return; }
        return this.$f7.showToolbar(this.$el);
      }
    }
  };

var Card = {
    render: function (c) {
      var self = this;
      var headerEl, contentEl, contentChildEl, footerEl;

      if (self.title) {
        headerEl = c('f7-card-header', {domProps: {innerHTML: self.title}});
      }
      if (self.content) {
        contentChildEl = c('div', {domProps: {innerHTML: self.content}});
        contentEl = c('f7-card-content', {props: {inner: self.inner}}, [contentChildEl]);
      }
      if (self.footer) {
        footerEl = c('f7-card-footer', {domProps: {innerHTML: self.footer}});
      }

      return c('div', {staticClass: 'card'}, [headerEl, contentEl, footerEl, self.$slots.default]);
    },
    props: {
      'title': [String, Number],
      'content': [String, Number],
      'footer': [String, Number],
      'inner': {
        type: Boolean,
        default: true
      }
    }
  };

var CardHeader = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"card-header"},[_vm._t("default")],2)},
staticRenderFns: [],};

var CardFooter = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"card-footer"},[_vm._t("default")],2)},
staticRenderFns: [],};

var CardContent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"card-content"},[(_vm.inner)?_c('div',{staticClass:"card-content-inner"},[_vm._t("default")],2):_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      inner: {
        type: Boolean,
        default: true
      }
    }
  };

var ContentBlock = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"content-block",class:_vm.classesObject,on:{"tab:show":_vm.onTabShow,"tab:hide":_vm.onTabHide}},[(_vm.inner)?_c('div',{staticClass:"content-block-inner"},[_vm._t("default")],2):_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'inset': Boolean,
      'inner': Boolean,
      'tabs': Boolean,
      'tab': Boolean,
      'active': Boolean,
      'no-hairlines': Boolean,
      'no-hairlines-between': Boolean,
    },
    computed: {
      classesObject: function () {
        var self = this;
        return {
          'inset': self.inset,
          'tabs': self.tabs,
          'tab': self.tab,
          'active': self.active,
          'no-hairlines': self.noHairlines,
          'no-hairlines-between': self.noHairlinesBetween,
        }
      }
    },
    methods: {
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  };

var ContentBlockTitle = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"content-block-title"},[_vm._t("default")],2)},
staticRenderFns: [],};

var Badge = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('span',{staticClass:"badge",class:_vm.color ? 'color-' + _vm.color : ''},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'color': String
    }
  };

var Icon = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('i',{staticClass:"icon",class:_vm.classesObject,style:({'font-size':_vm.sizeComputed})},[_vm._v(_vm._s(_vm.iconTextComputed)),_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'color': String,
      'material': String, //Material Icons
      'f7': String, //Framework7 Icons
      'ion': String, //Ionicons
      'fa': String, //Font Awesome
      'icon': String, //Custom
      'if-material': String,
      'if-ios': String,
      'size': [String, Number]
    },
    computed: {
      sizeComputed: function () {
        var self = this;
        var size = self.size;
        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = size + 'px';
        }
        return size;
      },
      iconTextComputed: function () {
        var self = this;
        var text = self.material || self.f7;
        if (self.ifMaterial && self.$theme.material && (self.ifMaterial.indexOf('material:')>=0 || self.ifMaterial.indexOf('f7:')>=0)) {
          text = self.ifMaterial.split(':')[1];
        }
        else if (self.ifIos && self.$theme.ios && (self.ifIos.indexOf('material:')>=0 || self.ifIos.indexOf('f7:')>=0)) {
          text = self.ifIos.split(':')[1];
        }
        return text;
      },
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.ifMaterial || self.ifIos) {
          var parts = self[self.$theme.material ? 'ifMaterial' : 'ifIos'].split(':');
          var prop = parts[0];
          var value = parts[1];
          if (prop === 'material' || prop === 'fa' || prop === 'f7') {
            co['fa'] = prop === 'fa';
            co['material-icons'] = prop === 'material';
            co['f7-icons'] = prop === 'f7';
          }
          if (prop === 'fa' || prop === 'ion') {
            co[prop + '-' + value] = true;
          }
          if (prop === 'icon') {
            co[value] = true;
          }
        }
        else {
          co = {
            'material-icons': this.material,
            'f7-icons': this.f7,
            'fa': this.fa
          };
          if (this.ion) { co['ion-' + this.ion] = true; }
          if (this.fa) { co['fa-' + this.fa] = true; }
          if (this.icon) { co[this.icon] = true; }
        }
        if (this.color) { co['color-' + this.color] = true; }
        return co;
      }
    }
  };

var List = {
    beforeDestroy: function () {
      var self = this;
      if (!(self.virtual && self.virtualInit && self.f7VirtualList)) { return; }
      if (self.f7VirtualList.destroy) { self.f7VirtualList.destroy(); }
    },
    watch: {
      virtualItems: function () {
        // Items Updated
        var self = this;
        if (!(self.virtual && self.virtualInit && self.f7VirtualList)) { return; }
        self.f7VirtualList.replaceAllItems(self.virtualItems);
      },
    },
    render: function (c) {
      var blockEl, blockChildren;
      var self = this;

      blockChildren = self.grouped ? self.$slots.default : c('ul', {}, self.$slots.default);
      var outOfList = [], ulSlots = [];
      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var tag = self.$slots.default[i].tag;
          if (tag && !(tag == 'li' || tag.indexOf('list-item')>=0 || tag.indexOf('list-button')>=0)) {
            outOfList.push(self.$slots.default[i]);
          }
          else {
            ulSlots.push(self.$slots.default[i]);
          }
        }
      }
      blockEl = c(
        self.form ? 'form' : 'div',
        {
          staticClass: 'list-block',
          'class': {
            'inset': self.inset,
            'media-list': self.mediaList,
            'sortable': self.sortable,
            'accordion-list': self.accordion,
            'contacts-block': self.contacts,
            'virtual-list': self.virtual,
            'tab': self.tab,
            'active': self.active,
            'no-hairlines': self.noHairlines,
            'no-hairlines-between': self.noHairlinesBetween,
            'store-data': self.storeData
          },
          on: {
            'sortable:open': self.onSortableOpen,
            'sortable:close': self.onSortableClose,
            'sortable:sort': self.onSortableSort,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide
          }
        },
        [
          ulSlots.length > 0 ? [c('ul', {}, ulSlots), outOfList] : outOfList
        ]
      );
      return blockEl;
    },
    props: {
      'inset': Boolean,
      'media-list': Boolean,
      'grouped': Boolean,
      'sortable': Boolean,
      'label': String,
      'accordion': Boolean,
      'contacts': Boolean,

      'no-hairlines': Boolean,
      'no-hairlines-between': Boolean,

      // Tab
      'tab': Boolean,
      'active': Boolean,

      // Form
      'form': Boolean,
      'store-data': Boolean,

      // Virtual List
      'virtual': Boolean,
      'virtual-init': {
        type: Boolean,
        default: true
      },
      'virtual-items': [Array, Object],
      'virtual-height': [Number, Function],
      'virtual-rows-before': Number,
      'virtual-rows-after': Number,
      'virtual-cols': {
        type: Number,
        default: 1
      },
      'virtual-cache': {
        type: Boolean,
        default: true
      },
      'virtual-filtered-only': {
        type: Boolean,
        default: false
      },
      'virtual-search-by-item': Function,
      'virtual-search-all': Function,
      'virtual-render-item': Function
    },
    methods: {
      onSortableOpen: function (event) {
        this.$emit('sortable:open', event);
      },
      onSortableClose: function (event) {
        this.$emit('sortable:close', event);
      },
      onSortableSort: function (event) {
        this.$emit('sortable:sort', event, event.detail);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      },
      onF7Init: function (f7) {
        var self = this;
        // Init Virtual List
        if (!(self.virtual && self.virtualInit)) { return; }
        var $$ = self.$$;
        var template = $$(self.$el).find('script').html();
        if (!template && !self.virtualRenderItem) { return; }
        if (template) { template = self.$t7.compile(template); }

        self.f7VirtualList = f7.virtualList(self.$el, {
          items: self.virtualItems || [],
          template: template,
          height: self.virtualHeight || undefined,
          cols: self.virtualCols,
          rowsBefore: self.virtualRowsBefore || undefined,
          rowsAfter: self.virtualRowsAfter || undefined,
          showFilteredItemsOnly: self.virtualFilteredOnly,
          searchByItem: self.virtualSearchByItem,
          searchAll: self.virtualSearchAll,
          renderItem: self.virtualRenderItem,
          onItemBeforeInsert: function (list, item) {
            self.$emit('virtual:itembeforeinsert', list, item);
          },
          onBeforeClear: function (list, fragment) {
            self.$emit('virtual:beforeclear', list, fragment);
          },
          onItemsBeforeInsert: function (list, fragment) {
            self.$emit('virtual:itemsbeforeinsert', list, fragment);
          },
          onItemsAfterInsert: function (list, fragment) {
            self.$emit('virtual:itemsafterinsert', list, fragment);
          },
        });
      }
    }
  };

var ListGroup = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"list-block-group"},[_c('ul',[_vm._t("default")],2)])},
staticRenderFns: [],
    props: {
      'media-list': Boolean,
      'sortable': Boolean,
    },
    computed: {
      sortableComputed: function () {
        return this.sortable || this.$parent.sortable;
      },
      mediaListComputed: function () {
        return this.mediaList || this.$parent.mediaList;
      }
    },
    data: function () {
      return {};
    }
  };

var ListItem = {
    render: function (c) {
      var liChildren, linkEl, itemContentEl;
      var self = this;
      function trustyBoolean(b) {
        if (b || b === '') { return true; }
        return false;
      }
      function trustyString(s) {
        if (typeof s === 'string' && s !== '') { return true; }
        return false;
      }

      // Item Content
      itemContentEl = c('f7-list-item-content', {
        props: {
          'title': self.title,
          'text': self.text,
          'media': self.media,
          'subtitle': self.subtitle,
          'after': self.after,
          'badge': self.badge,
          'badge-color': self.badgeColor,
          'media-list': self.mediaListComputed,
          'accordion-item': self.accordionItem,

          'checkbox': self.checkbox,
          'checked': self.checkedComputed,
          'radio': self.radio,
          'name': self.name,
          'value': self.valueComputed,
          'readonly': self.readonly,
          'required': self.required,
          'disabled': self.disabled
        },
        on: (self.link || self.accordionItem || self.smartSelect) ? {} : {click: self.onClick, change: self.onChange}
      }, [self.$slots['content-start'], self.$slots.content, self.$slots['media-start'], self.$slots.media, self.$slots['inner-start'], self.$slots.inner, self.$slots['after-start'], self.$slots.after, (self.swipeout || self.accordionItem ? [] : self.$slots.default)]);

      // Link
      if (self.link || self.accordionItem || self.smartSelect) {
        linkEl = c('a', {
          attrs: {
            href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link,
            'target': self.linkTarget,
            'data-searchbar': self.smartSelectSearchbar,
            'data-searchbar-placeholder': self.smartSelectSearchbarPlaceholder,
            'data-searchbar-cancel': self.smartSelectSearchbarCancel,
            'data-page-title': self.smartSelectPageTitle,
            'data-back-text': self.smartSelectBackText,
            'data-back-on-select': self.smartSelectBackOnSelect,
            'data-virtual-list': self.smartSelectVirtualList,
            'data-virtual-list-height': self.smartSelectVirtualListHeight,
            'data-open-in': self.smartSelectOpenIn,
            'data-navbar-theme': self.smartSelectNavbarTheme,
            'data-form-theme': self.smartSelectFormTheme,

            'data-view': trustyString(self.linkView) ? self.linkView : false,
            'data-panel': trustyString(self.linkOpenPanel) ? self.linkOpenPanel : false,
            'data-popup': trustyString(self.linkOpenPopup) ? self.linkOpenPopup : false,
            'data-popover': trustyString(self.linkOpenPopover) ? self.linkOpenPopover : false,
            'data-picker': trustyString(self.linkOpenPicker) ? self.linkOpenPicker : false,
            'data-login-screen': trustyString(self.linkOpenLoginScreen) ? self.linkOpenLoginScreen : false,
            'data-sortable': trustyString(self.linkOpenSortable) ? self.linkOpenSortable : (trustyString(self.linkToggleSortable) ? self.linkToggleSortable : false),

            'data-force': self.linkForce,
            'data-reload': self.linkReload,
            'data-animate-pages': self.linkAnimatePages,
            'data-ignore-cache': self.linkIgnoreCache,
            'data-page-name': typeof self.linkPageName === 'string' ? self.linkPageName : false,
            'data-template': typeof self.linkTemplate === 'string' ? self.linkTemplate : false,
          },
          'class': {
            'item-link': true,
            'external': self.linkExternal,
            'back': self.linkBack,
            'no-fastclick': self.linkNoFastclick,
            'smart-select': self.smartSelect,
            'close-panel': trustyBoolean(self.linkClosePanel),
            'open-panel': self.linkOpenPanel || self.linkOpenPanel === '',
            'close-popup': trustyBoolean(self.linkClosePopup),
            'open-popup': self.linkOpenPopup || self.linkOpenPopup === '',
            'close-popover': trustyBoolean(self.linkClosePopover),
            'open-popover': self.linkOpenPopover || self.linkOpenPopover === '',
            'close-picker': trustyBoolean(self.linkClosePicker),
            'open-picker': self.linkOpenPicker || self.linkOpenPicker === '',
            'close-login-screen': trustyBoolean(self.linkCloseLoginScreen),
            'open-login-screen': self.linkOpenLoginScreen || self.linkOpenLoginScreen === '',
            'close-sortable': trustyBoolean(self.linkCloseSortable),
            'open-sortable': self.linkOpenSortable || self.linkOpenSortable === '',
            'toggle-sortable': self.linkToggleSortable || self.linkToggleSortable === '',
          },
          on: {
            click: self.onClick
          }
        }, [itemContentEl]);
      }

      if (self.dividerOrGroupTitle) {
        liChildren = [c('span', self.$slots.default || self.title)];
      }
      else {
        var linkItemEl = (self.link || self.smartSelect || self.accordionItem) ? linkEl : itemContentEl;
        if (self.swipeout) {
          liChildren = [c('div', {'class':{'swipeout-content': true}}, [linkItemEl])];
        }
        else {
          liChildren = [linkItemEl];
        }
        if (self.sortableComputed) {
          liChildren.push(c('div', {'class': {'sortable-handler': true}}));
        }
        if (self.swipeout || self.accordionItem) {
          liChildren.push(self.$slots.default);
        }
        liChildren.unshift(self.$slots['root-start']);
        liChildren.push(self.$slots.root);
      }

      return c(
        'li',
        {
          'class': {
            'item-divider' : self.divider,
            'list-group-title': self.groupTitle,
            'swipeout': self.swipeout,
            'accordion-item': self.accordionItem
          },
          on: {
            'swipeout:open': self.onSwipeoutOpen,
            'swipeout:opened': self.onSwipeoutOpened,
            'swipeout:close': self.onSwipeoutClose,
            'swipeout:closed': self.onSwipeoutClosed,
            'swipeout:delete': self.onSwipeoutDelete,
            'swipeout:deleted': self.onSwipeoutDeleted,
            'swipeout': self.onSwipeout,
            'accordion:open': self.onAccOpen,
            'accordion:opened': self.onAccOpened,
            'accordion:close': self.onAccClose,
            'accordion:closed': self.onAccClosed,
          }
        },
        liChildren
      )
    },
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],

      // Link Props
      'link': [Boolean, String],
      'link-external': Boolean,
      'link-back': Boolean,
      'link-no-fastclick': Boolean,

      'link-force': Boolean,
      'link-reload': Boolean,
      'link-animate-pages': Boolean,
      'link-ignore-cache': Boolean,
      'link-page-name': String,
      'link-template': String,
      'link-target': String,

      'link-view': String,
      'link-open-panel': [Boolean, String],
      'link-close-panel': [Boolean, String],
      'link-open-popup': [Boolean, String],
      'link-close-popup': [Boolean, String],
      'link-open-popover': [Boolean, String],
      'link-close-popover': [Boolean, String],
      'link-open-login-screen': [Boolean, String],
      'link-close-login-screen': [Boolean, String],
      'link-open-picker': [Boolean, String],
      'link-close-picker': [Boolean, String],

      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-item': Boolean,
      'media-list-item': Boolean,
      'media-list': Boolean,
      'divider': Boolean,
      'group-title': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean,
      'accordion-item': Boolean,

      // Smart Select
      'smart-select': Boolean,
      'smart-select-searchbar': Boolean,
      'smart-select-searchbar-placeholder': String,
      'smart-select-searchbar-cancel': String,
      'smart-select-page-title': String,
      'smart-select-back-text': String,
      'smart-select-back-on-select': Boolean,
      'smart-select-virtual-list': Boolean,
      'smart-select-virtual-list-height': Number,
      'smart-select-open-in': String, //popup or picker or page
      'smart-select-navbar-theme': String,
      'smart-select-form-theme': String,

      // Inputs
      'checkbox': Boolean,
      'checked': Boolean,
      'radio': Boolean,
      'name': String,
      'value': [String, Number, Boolean, Array],
      'input-value': [String, Number],
      'readonly': Boolean,
      'required': Boolean,
      'disabled': Boolean
    },
    computed: {
      dividerOrGroupTitle: function () {
        return this.divider || this.groupTitle;
      },
      sortableComputed: function () {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed: function () {
        return this.mediaList || this.mediaItem || this.$parent.mediaList || this.$parent.mediaListComputed;
      },
      hasCheckboxModel: function () {
        var self = this;
        return self.checkbox && (typeof self.value === 'boolean' || Array.isArray(self.value));
      },
      hasRadioModel: function () {
        var self = this;
        return self.radio && typeof self.inputValue !== 'undefined';
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) { return self.inputValue; }
        else if (self.hasCheckboxModel) { return undefined; }
        else { return self.value; }
      },
      checkedComputed: function () {
        var self = this;
        if (self.hasCheckboxModel) {
          if (self.inputValue && Array.isArray(self.value)) {
            return self.value.indexOf(self.inputValue) >= 0;
          }
          return self.value;
        }
        else if (self.hasRadioModel) {
          return self.value === self.inputValue;
        }
        else { return self.checked; }
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onSwipeoutDeleted: function (event) {
        this.$emit('swipeout:deleted', event);
      },
      onSwipeoutDelete: function (event) {
        this.$emit('swipeout:delete', event);
      },
      onSwipeoutClose: function (event) {
        this.$emit('swipeout:close', event);
      },
      onSwipeoutClosed: function (event) {
        this.$emit('swipeout:closed', event);
      },
      onSwipeoutOpen: function (event) {
        this.$emit('swipeout:open', event);
      },
      onSwipeoutOpened: function (event) {
        this.$emit('swipeout:opened', event);
      },
      onSwipeout: function (event) {
        this.$emit('swipeout', event);
      },
      onAccClose: function (event) {
        this.$emit('accordion:close', event);
      },
      onAccClosed: function (event) {
        this.$emit('accordion:closed', event);
      },
      onAccOpen: function (event) {
        this.$emit('accordion:open', event);
      },
      onAccOpened: function (event) {
        this.$emit('accordion:opened', event);
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) { self.value.push(event.target.value); }
            else { self.value.splice(self.value.indexOf(event.target.value), 1); }
            self.$emit('change', event);
          }
          else {
            self.$emit('input', event.target.checked);
          }
        }
        else if (self.hasRadioModel) {
          self.$emit('input', event.target.value);
        }
        else {
          self.$emit('change', event);
        }
      }
    }
  };

var ListItemContent = {
    render: function (c) {
      var titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl;
      var self = this;
      var slotsContentStart = [],
          slotsContent = [],
          slotsInnerStart = [],
          slotsInner = [],
          slotsAfterStart = [],
          slotsAfter = [],
          slotsMediaStart = [],
          slotsMedia = [];
      if (self.$slots.default && self.$slots.default.length > 0) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
          if (slotName && slotName === 'content-start') { slotsContentStart.push(self.$slots.default[i]); }
          if (slotName && slotName === 'content') { slotsContent.push(self.$slots.default[i]); }
          if (slotName && slotName === 'after-start') { slotsAfterStart.push(self.$slots.default[i]); }
          if (slotName && slotName === 'after') { slotsAfter.push(self.$slots.default[i]); }
          if (slotName && slotName === 'media-start') { slotsMediaStart.push(self.$slots.default[i]); }
          if (slotName && slotName === 'media') { slotsMedia.push(self.$slots.default[i]); }
          if (slotName && slotName === 'inner-start') { slotsInnerStart.push(self.$slots.default[i]); }
          if (!slotName || slotName && slotName === 'inner') { slotsInner.push(self.$slots.default[i]); }
        }
      }
      // Input
      if (self.radio || self.checkbox) {
        inputEl = c('input', {
          attrs: {
            value: self.value,
            name: self.name,
            checked: self.checked,
            readonly: self.readonly,
            disabled: self.disabled,
            required: self.required,
            type: self.radio ? 'radio' : 'checkbox'
          },
          on: {
            change: self.onChange
          },
          domProps: {
            checked: self.checked
          }
        });
      }
      // Media
      if (self.media || self.checkbox || self.radio && self.$theme.material || slotsMediaStart.length || slotsMedia.length) {
        if (self.checkbox || self.radio && self.$theme.material) {
          if (self.media) {
            inputIconEl = '<i class="icon icon-form-' +(self.radio ? 'radio' : 'checkbox')+ '"></i>';
            mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: inputIconEl + (self.media ? self.media : '')}});
          }
          else {
            var iconClasses = {'icon': true};
            iconClasses['icon-form-' + (self.radio ? 'radio' : 'checkbox')] = true;
            inputIconEl = c('i', {'class': iconClasses});
            mediaEl = c('div', {'class': {'item-media': true}}, [slotsMediaStart, inputIconEl, slotsMedia]);
          }
        }
        else {
          if (self.media) { mediaEl = c('div', {staticClass: 'item-media', domProps: {innerHTML: self.media}}); }
          else { mediaEl = c('div', {staticClass: 'item-media'}, [slotsMediaStart, slotsMedia]); }
        }
      }
      // Inner Elements
      if (self.title) {
        titleEl = c('div', {staticClass: 'item-title', domProps: {innerHTML: self.title}}, [self.title]);
      }
      if (self.subtitle) {
        subtitleEl = c('div', {staticClass: 'item-subtitle', domProps: {innerHTML: self.subtitle}}, [self.subtitle]);
      }
      if (self.text) {
        textEl = c('div', {staticClass: 'item-text', domProps: {innerHTML: self.text}});
      }
      if (self.after || self.badge || slotsAfter.length) {
        if (self.after) {
          afterEl = c('span', {domProps: {innerHTML: self.after}});
        }
        if (self.badge) {
          badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, [self.badge]);
        }
        afterWrapEl = c('div', {staticClass: 'item-after'}, [slotsAfterStart, afterEl, badgeEl, slotsAfter]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', {staticClass: 'item-title-row'}, [titleEl, afterWrapEl]);
      }
      innerEl = c('div', {staticClass: 'item-inner'}, self.mediaList ? [slotsInnerStart, titleRowEl, subtitleEl, textEl, slotsInner] : [slotsInnerStart, titleEl, afterWrapEl, slotsInner]);
      // Finalize
      return c((self.checkbox || self.radio) ? 'label': 'div', {staticClass: 'item-content', 'class': {'label-checkbox': self.checkbox, 'label-radio': self.radio}, on: {click: self.onClick}}, [slotsContentStart, inputEl, mediaEl, innerEl, slotsContent]);
    },
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],
      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-list': Boolean,

      'checkbox': Boolean,
      'checked': Boolean,
      'radio': Boolean,
      'name': String,
      'value': [String, Number, Boolean, Array],
      'input-value': [String, Number],
      'readonly': Boolean,
      'required': Boolean,
      'disabled': Boolean
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onChange: function (event) {
        this.$emit('change', event);
      }
    }
  };

var ListItemSwipeoutActions = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{class:'swipeout-actions-' + _vm.sideComputed},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
        'left': Boolean,
        'right': Boolean,
        'side': String
    },
    computed: {
        sideComputed: function () {
            if (!this.side) {
                if (this.left) { return 'left'; }
                if (this.right) { return 'right'; }
                return 'right';
            }
            return this.side;
        }
    },
    data: function () {
      return {};
    }
  };

var ListItemSwipeoutButton = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('a',{class:_vm.classObject,attrs:{"href":"#"},on:{"click":_vm.onClick}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'overswipe': Boolean,
      'close': Boolean,
      'delete': Boolean,
      'color': String,
      'bg': String
    },
    computed: {
      classObject: function () {
        var co = {
          'swipeout-overswipe': this.overswipe,
          'swipeout-delete': this.delete,
          'swipeout-close': this.close
        };
        if (this.color) { co['bg-' + this.color] = true; }
        if (this.bg) { co['bg-' + this.bg] = true; }
        return co;
      }
    },
    data: function () {
      return {};
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var ListButton = {
    render: function (c) {
      var self = this;
      var linkEl;
      if (self.title) {
        linkEl = c('a', {
          staticClass: 'item-link list-button',
          attrs: self.attrsObject,
          class: self.classesObject,
          domProps: {
            innerHTML: self.title
          },
          on: {
            click: self.onClick
          }
        });
      }
      else{
        linkEl = c('a', {
          staticClass: 'item-link list-button',
          attrs: self.attrsObject,
          class: self.classesObject,
          on: {
            click: self.onClick
          }
        }, [self.$slots.default]);
      }
      return c('li', {}, [linkEl]);
    },
    props: {
      'title': [String, Number],
      'link': [Boolean, String],
      'href': [Boolean, String],
      'external': Boolean,
      'link-external': Boolean,
      'back': Boolean,
      'link-back': Boolean,
      'no-fastclick': Boolean,
      'link-no-fastlick': Boolean,

      color: String,

      // Router
      force: Boolean,
      reload: Boolean,
      animatePages: Boolean,
      ignoreCache: Boolean,
      pageName: String,
      template: String,

      // View
      view: String,

      // Panel
      openPanel: [Boolean, String],
      closePanel: [Boolean, String],

      // Popup
      openPopup: [Boolean, String],
      closePopup: [Boolean, String],

      // Popover
      openPopover: [Boolean, String],
      closePopover: [Boolean, String],

      // Login Screen
      openLoginScreen: [Boolean, String],
      closeLoginScreen: [Boolean, String],

      // Picker
      openPicker: [Boolean, String],
      closePicker: [Boolean, String],

      // Tab
      tabLink: [Boolean, String],

      // Sortable
      openSortable: [Boolean, String],
      closeSortable: [Boolean, String],
      toggleSortable: [Boolean, String],
    },
    computed: {
      attrsObject: function () {
        var self = this;
        var ao = {
          href: ((typeof self.link === 'boolean' && typeof self.href === 'boolean') ? '#' : (self.link || self.href))
        };
        var pd = self.$options.propsData;
        if ('force' in pd) { ao['data-force'] = self.force; }
        if ('reload' in pd) { ao['data-reload'] = 'true'; }
        if ('animatePages' in pd) { ao['data-animate-pages'] = 'true'; }
        if ('ignoreCache' in pd) { ao['data-ignore-cache'] = 'true'; }
        if (self.pageName) { ao['data-page-name'] = self.pageName; }
        if (self.template) { ao['data-template'] = self.template; }
        if (self.view) { ao['data-view'] = self.view; }

        function trustyString(s) {
          if (typeof s === 'string' && s !== '') { return true; }
          return false;
        }

        if (trustyString(self.openPanel)) { ao['data-panel'] = self.openPanel; }
        if (trustyString(self.openPopup)) { ao['data-popup'] = self.openPopup; }
        if (trustyString(self.openPopover)) { ao['data-popover'] = self.openPopover; }
        if (trustyString(self.openPicker)) { ao['data-picker'] = self.openPicker; }
        if (trustyString(self.openLoginScreen)) { ao['data-login-screen'] = self.openLoginScreen; }
        if (trustyString(self.openSortable)) { ao['data-sortable'] = self.openSortable; }
        if (trustyString(self.toggleSortable)) { ao['data-sortable'] = self.toggleSortable; }

        if (trustyString(self.closePopup)) { ao['data-popup'] = self.closePopup; }
        if (trustyString(self.closePopover)) { ao['data-popover'] = self.closePopover; }
        if (trustyString(self.closePicker)) { ao['data-picker'] = self.closePicker; }
        if (trustyString(self.closeLoginScreen)) { ao['data-login-screen'] = self.closeLoginScreen; }
        if (trustyString(self.closeSortable)) { ao['data-sortable'] = self.closeSortable; }

        if (trustyString(self.tabLink)) { ao['data-tab'] = self.tabLink; }

        return ao;
      },
      classesObject: function () {
        var self = this;
        var co = {
          'external': self.external || self.linkExternal,
          'back': self.back || self.linkBack,
          'no-fastclick': self.noFastclick || self.linkNoFastclick
        };

        function trustyBoolean(b) {
          if (b || b === '') { return true; }
          return false;
        }

        // Panel
        if (trustyBoolean(self.closePanel)) { co['close-panel'] = true; }
        if (self.openPanel || self.openPanel === '') { co['open-panel'] = true; }

        // Popup
        if (trustyBoolean(self.closePopup)) { co['close-popup'] = true; }
        if (self.openPopup || self.openPopup === '') { co['open-popup'] = true; }

        // Popover
        if (trustyBoolean(self.closePopover)) { co['close-popover'] = true; }
        if (self.openPopover || self.openPopover === '') { co['open-popover'] = true; }

        // Picker
        if (trustyBoolean(self.closePicker)) { co['close-picker'] = true; }
        if (self.openPicker || self.openPicker === '') { co['open-picker'] = true; }

        // Login Screen
        if (trustyBoolean(self.closeLoginScreen)) { co['close-login-screen'] = true; }
        if (self.openLoginScreen || self.openLoginScreen === '') { co['open-login-screen'] = true; }

        // Sortable
        if (trustyBoolean(self.closeSortable)) { co['close-sortable'] = true; }
        if (self.openSortable || self.openSortable === '') { co['open-sortable'] = true; }
        if (self.toggleSortable || self.toggleSortable === '') { co['toggle-sortable'] = true; }

        // Tab
        if (trustyBoolean(self.tabLink)) { co['tab-link'] = true; }

        // Color
        if (self.color) { co['color-' + self.color] = true; }

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var ListLabel = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"list-block-label"},[_vm._t("default")],2)},
staticRenderFns: [],};

var Accordion = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"accordion-list"},[_vm._t("default")],2)},
staticRenderFns: [],};

var AccordionItem = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"accordion-item",on:{"accordion:open":_vm.onOpen,"accordion:opened":_vm.onOpened,"accordion:close":_vm.onClose,"accordion:closed":_vm.onClosed}},[_vm._t("default")],2)},
staticRenderFns: [],
    methods: {
      onOpen: function (event) {
        this.$emit('accordion:open', event);
      },
      onOpened: function (event) {
        this.$emit('accordion:opened', event);
      },
      onClose: function (event) {
        this.$emit('accordion:close', event);
      },
      onClosed: function (event) {
        this.$emit('accordion:closed', event);
      }
    }
  };

var AccordionToggle = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"accordion-item-toggle"},[_vm._t("default")],2)},
staticRenderFns: [],};

var AccordionContent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"accordion-item-content"},[_vm._t("default")],2)},
staticRenderFns: [],};

var ButtonsSegmented = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"buttons-row",class:(_vm.colorComputed ? 'theme-' + _vm.colorComputed : '')},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'color': String,
      'theme': String,
      'bg': String
    },
    computed: {
      colorComputed: function () {
        return this.color || this.theme || this.bg;
      }
    }
  };

var LinkMixin = {
    props: {
      noLinkClass: Boolean,
      noFastclick: Boolean,

      external: Boolean,
      color: String,
      bg: String,
      theme: String,
      text: String,
      iconOnly: Boolean,
      icon: String,
      iconMaterial: String,
      iconIon: String,
      iconFa: String,
      iconF7: String,
      iconIfMaterial: String,
      iconIfIos: String,
      iconSize: [String, Number],
      rippleColor: String,
      href: {
        type: String,
        default: '#'
      },

      // Button
      round: Boolean,
      fill: Boolean,
      big: Boolean,
      raised: Boolean,

      // Router
      force: Boolean,
      reload: Boolean,
      animatePages: Boolean,
      ignoreCache: Boolean,
      pageName: String,
      template: String,

      // View
      view: String,

      // Panel
      openPanel: [Boolean, String],
      closePanel: [Boolean, String],

      // Popup
      openPopup: [Boolean, String],
      closePopup: [Boolean, String],

      // Popover
      openPopover: [Boolean, String],
      closePopover: [Boolean, String],

      // Login Screen
      openLoginScreen: [Boolean, String],
      closeLoginScreen: [Boolean, String],

      // Picker
      openPicker: [Boolean, String],
      closePicker: [Boolean, String],

      // Tab
      tabLink: [Boolean, String],

      // Sortable
      openSortable: [Boolean, String],
      closeSortable: [Boolean, String],
      toggleSortable: [Boolean, String],

      // Active
      active: Boolean,

      // Badge
      badge: [String, Number],
      iconBadge: [String, Number],
      badgeColor: [String],

      // Back Link
      back: Boolean
    },
    computed: {
      attrsObject: function () {
        var self = this;
        var ao = {
          href: self.href
        };
        var pd = self.$options.propsData;
        if ('force' in pd) { ao['data-force'] = self.force; }
        if ('reload' in pd) { ao['data-reload'] = 'true'; }
        if ('animatePages' in pd) { ao['data-animate-pages'] = 'true'; }
        if ('ignoreCache' in pd) { ao['data-ignore-cache'] = 'true'; }
        if (self.pageName) { ao['data-page-name'] = self.pageName; }
        if (self.template) { ao['data-template'] = self.template; }
        if (self.view) { ao['data-view'] = self.view; }

        function trustyString(s) {
          if (typeof s === 'string' && s !== '') { return true; }
          return false;
        }

        if (trustyString(self.openPanel)) { ao['data-panel'] = self.openPanel; }
        if (trustyString(self.openPopup)) { ao['data-popup'] = self.openPopup; }
        if (trustyString(self.openPopover)) { ao['data-popover'] = self.openPopover; }
        if (trustyString(self.openPicker)) { ao['data-picker'] = self.openPicker; }
        if (trustyString(self.openLoginScreen)) { ao['data-login-screen'] = self.openLoginScreen; }
        if (trustyString(self.openSortable)) { ao['data-sortable'] = self.openSortable; }
        if (trustyString(self.toggleSortable)) { ao['data-sortable'] = self.toggleSortable; }

        if (trustyString(self.closePopup)) { ao['data-popup'] = self.closePopup; }
        if (trustyString(self.closePopover)) { ao['data-popover'] = self.closePopover; }
        if (trustyString(self.closePicker)) { ao['data-picker'] = self.closePicker; }
        if (trustyString(self.closeLoginScreen)) { ao['data-login-screen'] = self.closeLoginScreen; }
        if (trustyString(self.closeSortable)) { ao['data-sortable'] = self.closeSortable; }

        if (trustyString(self.tabLink)) { ao['data-tab'] = self.tabLink; }
        return ao;
      },
      classesObject: function () {
        var self = this;
        var co = {};
        var pd = self.$options.propsData;
        if (self.rippleColor) { co['ripple-color-' + self.rippleColor] = true; }
        if (self.color) { co['color-' + self.color] = true; }
        if (self.theme) { co['theme-' + self.theme] = true; }
        if (self.bg) { co['bg-' + self.bg] = true; }

        co['back'] = self.back;
        co['external'] = self.external;
        co['no-fastclick'] = self.noFastclick;

        // Button
        ['round', 'fill', 'big', 'raised'].forEach(function (prop, index) {
          if (self[prop]) { co['button-' + prop] = true; }
        });

        // Active
        co['active'] = self.active;
        
        function trustyBoolean(b) {
          if (b || b === '') { return true; }
          return false;
        }
        // Panel
        if (trustyBoolean(self.closePanel)) { co['close-panel'] = true; }
        if (self.openPanel || self.openPanel === '') { co['open-panel'] = true; }

        // Popup
        if (trustyBoolean(self.closePopup)) { co['close-popup'] = true; }
        if (self.openPopup || self.openPopup === '') { co['open-popup'] = true; }

        // Popover
        if (trustyBoolean(self.closePopover)) { co['close-popover'] = true; }
        if (self.openPopover || self.openPopover === '') { co['open-popover'] = true; }

        // Picker
        if (trustyBoolean(self.closePicker)) { co['close-picker'] = true; }
        if (self.openPicker || self.openPicker === '') { co['open-picker'] = true; }

        // Login Screen
        if (trustyBoolean(self.closeLoginScreen)) { co['close-login-screen'] = true; }
        if (self.openLoginScreen || self.openLoginScreen === '') { co['open-login-screen'] = true; }

        // Sortable
        if (trustyBoolean(self.closeSortable)) { co['close-sortable'] = true; }
        if (self.openSortable || self.openSortable === '') { co['open-sortable'] = true; }
        if (self.toggleSortable || self.toggleSortable === '') { co['toggle-sortable'] = true; }

        // Tab
        if (self.tabLink || self.tabLink === '') { co['tab-link'] = true; }

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var Link = {
    mixins: [LinkMixin],
    render: function (c) {
      var iconEl, textEl, isTabbarLabel, badgeEl, iconBadgeEl, self = this;
      isTabbarLabel = (self.tabLink || self.tabLink === '') && self.$parent && self.$parent.tabbar && self.$parent.labels;
      if (self.text) {
        if (self.badge) { badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.badge); }
        textEl = c('span', {class: {'tabbar-label': isTabbarLabel}}, [self.text, badgeEl]);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7  || self.iconIfMaterial || self.iconIfIos) {
        if (self.iconBadge) { iconBadgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.iconBadge); }
        iconEl = c('f7-icon', {props: {
          material: self.iconMaterial,
          ion: self.iconIon,
          fa: self.iconFa,
          f7: self.iconF7,
          icon: self.icon,
          ifMaterial: self.iconIfMaterial,
          ifIos: self.iconIfIos,
          size: self.iconSize
        }}, [iconBadgeEl]);
      }
      if (!self.text && self.$slots.default && self.$slots.default.length === 0 || self.iconOnly || !self.text && !self.$slots.default) {
        self.classesObject['icon-only'] = true;
      }
      self.classesObject.link = self.noLinkClass || isTabbarLabel ? false : true;
      var linkEl = c('a', {
        class: self.classesObject,
        attrs: self.attrsObject,
        on: {
          click: self.onClick
        }
      }, [iconEl, textEl, self.$slots.default]);
      return linkEl;
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var Button = {
    render: function (c) {
      var iconEl, textEl, self = this;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7  || self.iconIfMaterial || self.iconIfIos) {
        iconEl = c('f7-icon', {props: {
          material: self.iconMaterial,
          ion: self.iconIon,
          fa: self.iconFa,
          f7: self.iconF7,
          icon: self.icon,
          ifMaterial: self.iconIfMaterial,
          ifIos: self.iconIfIos,
          size: self.iconSize
        }});
      }
      self.classesObject['button'] = true;
      var linkEl = c('a', {
        class: self.classesObject,
        attrs: self.attrsObject,
        on: {
          click: self.onClick
        }
      }, [iconEl, textEl, self.$slots.default]);

      return linkEl;
    },
    mixins: [LinkMixin],
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var GridRow = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"row",class:{'no-gutter': _vm.noGutter}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'no-gutter': Boolean
    },
    data: function () {
      return {};
    }
  };

var GridCol = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{class:('col-' + _vm.width) + (_vm.tabletWidth ? ' tablet-' + _vm.tabletWidth : '')},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'width': {
        type: [Number, String],
        default: 'auto'
      },
      'tablet-width': {
        type: [Number, String]
      }
    },
    data: function () {
      return {};
    }
  };

var Preloader = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('span',{staticClass:"preloader",class:(_vm.color ? ('color-' + _vm.color + ' preloader-' + _vm.color) : ''),style:({'width': (_vm.sizeComputed ? _vm.sizeComputed + 'px' : ''), 'height': (_vm.sizeComputed ? _vm.sizeComputed + 'px' : '')})},[(_vm.$theme.material)?_c('span',{staticClass:"preloader-inner"},[_c('span',{staticClass:"preloader-inner-gap"}),_vm._v(" "),_vm._m(0),_vm._v(" "),_vm._m(1)]):_vm._e()])},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('span',{staticClass:"preloader-inner-left"},[_c('span',{staticClass:"preloader-inner-half-circle"})])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('span',{staticClass:"preloader-inner-right"},[_c('span',{staticClass:"preloader-inner-half-circle"})])}],
    props: {
      'color': String,
      'size': [Number, String]
    },
    computed: {
      sizeComputed: function () {
        var s = this.size;
        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }
        return s;
      }
    }
  };

var Progressbar = {
    render: function (c) {
      var self = this;
      var color = self.color;
      var progress = self.progress;
      var infinite = self.infinite;
      return c('span', {
        staticClass: 'progressbar',
        class: [(color ? ('color-' + color + ' progressbar-' + color) : ''), (infinite ? 'progressbar-infinite' : '')].join(' ')
      }, [
        c('span', {
          style: {
            'transform': progress ? 'translate3d(' + (-100 + progress) + '%,0,0)' : ''
          }
        })
      ]);
    },
    props: {
      'color': String,
      'progress': Number,
      'infinite': Boolean
    },
    methods: {
      set: function (progress, speed) {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.setProgressbar(self.$el, progress, speed);
      },
      show: function (container, progress, color) {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.showProgressbar(container, progress, color);
      }
    }
  };

var FormLabel = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"item-title",class:{'label': !_vm.floating, 'floating-label' : _vm.floating}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
        floating: Boolean
    }
  };

var FormInput = {
    render: function (c) {
      var inputEl;
      var self = this;
      var attrs = {
        name: self.name,
        type: self.type,
        placeholder: self.placeholder,
        id: self.id,
        value: self.valueComputed,
        size: self.size,
        accept: self.accept,
        autocomplete: self.autocomplete,
        autocorrect: self.autocorrect,
        autocapitalize: self.autocapitalize,
        spellcheck: self.spellcheck,
        autofocus: self.autofocus,
        autosave: self.autosave,
        checked: self.checkedComputed,
        disabled: self.disabled,
        max: self.max,
        maxlength: self.maxlength,
        min: self.min,
        minlength: self.minlength,
        step: self.step,
        multiple: self.multiple,
        readonly: self.readonly,
        required: self.required,
        style: self.style,
        color: self.color,
	      pattern: self.pattern
      };
      var on = {
        focus: self.onFocus,
        blur: self.onBlur,
        input: self.onInput,
        change: self.onChange,
        click: self.onClick,
	      keypress: self.onKeyPress,
	      keyup: self.onKeyUp,
	      keydown: self.onKeyDown,
	      beforeinput: self.onBeforeInput,
	      compositionstart: self.onCompositionStart,
	      compositionupdate: self.onCompositionUpdate,
	      compositionend: self.onCompositionEnd,
	      focusin: self.onFocusIn,
	      focusout: self.onFocusOut,
	      dblclick: self.onDblClick,
	      mousedown: self.onMouseDown,
	      mouseenter: self.onMouseEnter,
	      mouseleave: self.onMouseLeave,
	      mousemove: self.onMouseMove,
	      mouseout: self.onMouseOut,
	      mouseover: self.onMouseOver,
	      mouseup: self.onMouseUp,
	      wheel: self.onWheel,
	      select: self.onSelect
      };
      if (self.type === 'select' || self.type === 'textarea') {
        if (self.type === 'select') {
          if (self.hasSelectModel) {
            delete attrs.value;
            inputEl = c('select', {attrs: attrs, on: on}, self.$slots.default);
          }
          else {
            inputEl = c('select', {attrs: attrs, on: on, domProps: {value: self.valueComputed}}, self.$slots.default);
          }
          
        }
        else {
          var textareaChildren = self.$slots.default;
          if (self.value) {
            delete attrs.value;
            textareaChildren = self.value;
          }

          inputEl = c('textarea', {attrs: attrs, on: on}, textareaChildren);
        }
      }
      else {
        if(self.$slots.default && self.$slots.default.length > 0 || !self.type) {
          inputEl = self.$slots.default;
        }
        else {
          if (self.type === 'switch') {
            inputEl = c('f7-switch', {props: attrs, on: on});
          }
          else if (self.type === 'range') {
            inputEl = c('f7-range', {props: attrs, on: on});
          }
          else { inputEl = c('input', {attrs: attrs, on: on, domProps: {value: self.valueComputed, checked: self.checkedComputed}}); }
        }
      }

      var itemInput = self.wrap ? c('div', {staticClass: 'item-input'}, [inputEl]) : inputEl;
      return itemInput;
    },
    watch: {
      value: function () {
        var self = this;
        if (!self.hasSelectModel) { return; }
        var $$ = self.$$;
        $$(self.$el).find('option').each(function (index, option) {
          if (self.value.indexOf(option.value) >= 0) { option.selected = true; }
          else { option.selected = false; }
        });
      }
    },
    mounted: function () {
      var self = this;
      if (!self.hasSelectModel) { return; }
      var $$ = self.$$;
      $$(self.$el).find('option').each(function (index, option) {
        if (self.value.indexOf(option.value) >= 0) { option.selected = true; }
        else { option.selected = false; }
      });
    },
    props: {
      // Inputs
      type: String,
      name: String,
      placeholder: String,
      id: String,
      value: [String, Number, Boolean, Array, Object],
      inputValue: [String, Number],
      size: [String, Number],
      accept: [String, Number],
      autocomplete: [String],
      autocorrect: [String],
      autocapitalize: [String],
      spellcheck: [String],
      autofocus: Boolean,
      autosave: String,
      checked: Boolean,
      disabled: Boolean,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],
      maxlength: [String, Number],
      minlength: [String, Number],
      multiple: Boolean,
      readonly: Boolean,
      required: Boolean,
      style: String,
	    pattern: String,

      // Components
      color: String,
      wrap: {
        "type": Boolean,
        "default": true
      }
    },
    computed: {
      hasCheckboxModel: function () {
        var self = this;
        return (self.type === 'checkbox' || self.type === 'switch') && (typeof self.value === 'boolean' || Array.isArray(self.value));
      },
      hasRadioModel: function () {
        var self = this;
        return self.type === 'radio' && typeof self.inputValue !== 'undefined';
      },
      hasSelectModel: function () {
        var self = this;
        return self.type === 'select' && Array.isArray(self.value);
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) { return self.inputValue; }
        else if (self.hasCheckboxModel) { return undefined; }
        else if (self.$options.propsData && self.$options.propsData.value) { return self.value; }
        return undefined;
      },
      checkedComputed: function () {
        var self = this;
        if (self.hasCheckboxModel) {
          if (self.inputValue && Array.isArray(self.value)) {
            return self.value.indexOf(self.inputValue) >= 0;
          }
          return self.value;
        }
        else if (self.hasRadioModel) {
          return self.value === self.inputValue;
        }
        else { return self.checked; }
      }
    },
    methods: {
      onInput: function (event) {
        if (this.hasSelectModel) { return; }
        if (event && event.type && event.type === 'input') {
          this.$emit('input', event.target.value);
        }
        else {
          this.$emit('input', event);
        }
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) { self.value.push(event.target.value); }
            else { self.value.splice(self.value.indexOf(event.target.value), 1); }
            self.$emit('change', event);
          }
          else {
            self.$emit('input', event.target.checked);
          }
        }
        else if (self.hasRadioModel) {
          self.$emit('input', event.target.value);
        }
        else if (self.hasSelectModel) {
          var values = Array.prototype.filter.call(event.target.options, function(option) {
            return option.selected;
          }).map(function(option) {
            var val = "_value" in option ? option._value : option.value;
            return val
          });
          self.$emit('input', values);
        }
        else {
          self.$emit('change', event);
        }
      },
      onClick: function (event) {
        this.$emit('click', event);
      },
	    onKeyPress: function(event) {
      	this.$emit('keypress', event);
	    },
	    onKeyUp: function(event) {
		    this.$emit('keyup', event);
	    },
	    onKeyDown: function(event) {
		    this.$emit('keydown', event);
	    },
	    onBeforeInput: function(event) {
      	this.$emit('beforeinput', event);
	    },
	    onCompositionStart: function(event) {
      	this.$emit('compositionstart', event);
	    },
	    onCompositionUpdate: function(event) {
      	this.$emit('compositionupdate', event);
	    },
	    onCompositionEnd: function(event) {
		    this.$emit('compositionend', event);
	    },
	    onFocusIn: function(event) {
		    this.$emit('focusin', event);
	    },
	    onFocusOut: function(event) {
		    this.$emit('focusout', event);
	    },
	    onDblClick: function(event) {
		    this.$emit('dblclick', event);
	    },
	    onMouseDown: function(event) {
		    this.$emit('mousedown', event);
	    },
	    onMouseEnter: function(event) {
		    this.$emit('mouseenter', event);
	    },
	    onMouseLeave: function(event) {
		    this.$emit('mouseleave', event);
	    },
	    onMouseMove: function(event) {
		    this.$emit('mousemove', event);
	    },
	    onMouseOut: function(event) {
		    this.$emit('mouseout', event);
	    },
	    onMouseOver: function(event) {
		    this.$emit('mouseover', event);
	    },
	    onMouseUp: function(event) {
		    this.$emit('mouseup', event);
	    },
	    onWheel: function(event) {
		    this.$emit('wheel', event);
	    },
	    onSelect: function(event) {
		    this.$emit('select', event);
	    }
    }
  };

var FormSwitch = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('label',{staticClass:"label-switch",class:_vm.color ? 'color-' + _vm.color : '',on:{"click":_vm.onClick}},[_c('input',{style:(_vm.style),attrs:{"type":"checkbox","name":_vm.name,"id":_vm.id,"disabled":_vm.disabled,"readonly":_vm.readonly,"required":_vm.required},domProps:{"value":_vm.valueComputed,"checked":_vm.checkedComputed},on:{"input":_vm.onInput,"change":_vm.onChange}}),_vm._v(" "),_c('div',{staticClass:"checkbox"})])},
staticRenderFns: [],
    props: {
      name: String,
      id: String,
      value: [String, Number, Boolean, Array],
      inputValue: [String, Number],
      checked: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      style: String,

      color: String
    },
    computed: {
      hasCheckboxModel: function () {
        return typeof this.value === 'boolean' || Array.isArray(this.value);
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) { return self.inputValue; }
        else if (self.hasCheckboxModel) { return undefined; }
        else if (self.$options.propsData && self.$options.propsData.value) { return self.value; }
        return undefined;
      },
      checkedComputed: function () {
        var self = this;
        if (self.hasCheckboxModel) {
          if (self.inputValue && Array.isArray(self.value)) {
            return self.value.indexOf(self.inputValue) >= 0;
          }
          return self.value;
        }
        else { return self.checked; }
      }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event);
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) { self.value.push(event.target.value); }
            else { self.value.splice(self.value.indexOf(event.target.value), 1); }
            self.$emit('change', event);
          }
          else {
            self.$emit('input', event.target.checked);
          }
        }
        else {
          self.$emit('change', event);
        }
      },
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var FormRange = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"range-slider",class:_vm.color ? 'color-' + _vm.color : ''},[_c('input',{style:(_vm.style),attrs:{"type":"range","name":_vm.name,"id":_vm.id,"disabled":_vm.disabled,"readonly":_vm.readonly,"required":_vm.required,"max":_vm.max,"min":_vm.min,"step":_vm.step},domProps:{"value":_vm.value},on:{"input":_vm.onInput,"change":_vm.onChange,"click":_vm.onClick}})])},
staticRenderFns: [],
    props: {
      name: String,
      id: String,
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      style: String,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],

      color: String
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var Chip = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('span',{staticClass:"chip",class:_vm.chipClassObject,on:{"click":_vm.onClick}},[(_vm.media)?_c('span',{staticClass:"chip-media",class:_vm.mediaClassObject,domProps:{"innerHTML":_vm._s(_vm.media)}}):_vm._e(),_vm._v(" "),(_vm.text)?_c('span',{staticClass:"chip-label",domProps:{"innerHTML":_vm._s(_vm.text)}}):_vm._e(),_vm._v(" "),(_vm.deleteable)?_c('a',{staticClass:"chip-delete",attrs:{"href":"#"},on:{"click":_vm.onDeleteClick}}):_vm._e()])},
staticRenderFns: [],
    props: {
      media: String,
      text: [String, Number],
      deleteable: Boolean,
      color: String,
      bg: String,
      mediaBg: String,
      mediaColor: String
    },
    computed: {
      mediaClassObject: function () {
        var c = {};
        if (this.mediaColor) { c['color-' + this.mediaColor] = true; }
        if (this.mediaBg) { c['color-' + this.mediaBg] = true; }
        return c;
      },
      chipClassObject: function () {
        var c = {};
        if (this.color) { c['color-' + this.color] = true; }
        if (this.bg) { c['bg-' + this.bg] = true; }
        return c;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onDeleteClick: function (event) {
        this.$emit('delete', event);
      }
    }
  };

var Fab = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('a',{staticClass:"floating-button",class:_vm.color ? 'color-' + _vm.color : false,attrs:{"href":"#"},on:{"click":_vm.onClick}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      color: String
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var FabSpeedDial = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"speed-dial",class:_vm.theme ? 'theme-' + _vm.theme : false},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      theme: String
    }
  };

var FabActions = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"speed-dial-buttons",class:_vm.theme ? 'theme-' + _vm.theme : false},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      theme: String
    }
  };

var FabAction = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('a',{class:_vm.classesObject,attrs:{"href":"#"},on:{"click":_vm.onClick}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'color': String,
      'closeSpeedDial': Boolean
    },
    computed: {
      classesObject: function() {
        var co = {};
        if (this.color) { co['color-' + this.color] = true; }
        if (this.closeSpeedDial) { co['close-speed-dial'] = true; }
        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var Swiper = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"swiper-container"},[_c('div',{staticClass:"swiper-wrapper"},[_vm._t("default")],2),_vm._v(" "),(_vm.paginationComputed === true)?_c('div',{staticClass:"swiper-pagination"}):_vm._e(),_vm._v(" "),(_vm.scrollbarComputed === true)?_c('div',{staticClass:"swiper-scrollbar"}):_vm._e(),_vm._v(" "),(_vm.nextButtonComputed === true)?_c('div',{staticClass:"swiper-button-next"}):_vm._e(),_vm._v(" "),(_vm.prevButtonComputed === true)?_c('div',{staticClass:"swiper-button-prev"}):_vm._e()])},
staticRenderFns: [],
    beforeDestroy: function () {
      var self = this;
      if (!self.init) { return; }
      if (self.swiper && self.swiper.destroy) { self.swiper.destroy(); }
    },
    props: {
      'params': Object,
      'pagination': [Boolean, String, Object],
      'scrollbar': [Boolean, String, Object],
      'next-button': [Boolean, String, Object],
      'prev-button': [Boolean, String, Object],
      init: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      paramsComputed: function () {
        return this.params || {};
      },
      paginationComputed: function () {
        var self = this;
        if (self.pagination === true || self.pagination === '') {
          self.paramsComputed.pagination = '.swiper-pagination';
          return true;
        }
        else if (typeof self.pagination === 'object' || typeof self.pagination === 'string') {
          self.paramsComputed.pagination = self.pagination;
          return true;
        }
        return false;
      },
      scrollbarComputed: function () {
        var self = this;
        if (self.scrollbar || self.scrollbar === '') {
          self.paramsComputed.scrollbar = '.swiper-scrollbar';
          return true;
        }
        else if (typeof self.scrollbar === 'object' || typeof self.scrollbar === 'string') {
          self.paramsComputed.scrollbar = self.scrollbar;
          return true;
        }
        return false;
      },
      nextButtonComputed: function () {
        var self = this;
        if (self.nextButton || self.nextButton === '') {
          self.paramsComputed.nextButton = '.swiper-button-next';
          return true;
        }
        else if (typeof self.nextButton === 'object' || typeof self.nextButton === 'string') {
          self.paramsComputed.nextButton = self.nextButton;
          return true;
        }
        return false;
      },
      prevButtonComputed: function () {
        var self = this;
        if (self.prevButton || self.prevButton === '') {
          self.paramsComputed.prevButton = '.swiper-button-prev';
          return true;
        }
        else if (typeof self.prevButton === 'object' || typeof self.prevButton === 'string') {
          self.paramsComputed.prevButton = self.prevButton;
          return true;
        }
        return false;
      }
    },
    methods: {
      onF7Init: function () {
        if (!this.init) { return; }
        this.swiper = new window.Swiper(this.$el, this.paramsComputed);
      }
    }
  };

var SwiperSlide = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"swiper-slide"},[(_vm.zoom)?_c('div',{staticClass:"swiper-zoom-container"},[_vm._t("default")],2):_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'zoom': Boolean
    }
  };

var Messages = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"messages"},[_vm._t("default")],2)},
staticRenderFns: [],
    beforeDestroy: function () {
      if (this.f7Messages && this.f7Messages.destroy) { this.f7Messages.destroy(); }
    },
    beforeUpdate: function (a,b) {
      var self = this;
      if (!self.init) { return; }
      self.$children.forEach(function (el) {
        self.$$(el.$el).addClass('message-appeared');
      });
    },
    updated: function (a,b) {
      var self = this;
      if (!self.init) { return; }
      self.$children.forEach(function (el) {
        var $el = self.$$(el.$el);
        if (!$el.hasClass('message-appeared')) {
          $el.addClass('message-appear-from-bottom');
        }
      });
      if (this.f7Messages && this.f7Messages.layout && this.autoLayout) {
        this.f7Messages.layout();
      }
      if (this.f7Messages && this.f7Messages.layout && this.autoLayout) {
        this.f7Messages.scrollMessages();
      }
    },
    props: {
      autoLayout: {
        type: Boolean,
        default: true
      },
      newMessagesFirst: Boolean,
      messages: Array,
      scrollMessages: {
        type: Boolean,
        default: true
      },
      scrollMessagesOnlyOnEdge: Boolean,
      init: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      addMessage: function (messageParameters, method, animate) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.addMessage(messageParameters, method, animate)
      },
      appendMessage: function (messageParameters, animate) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.appendMessage(messageParameters, animate)
      },
      prependMessage: function (messageParameters, animate) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.prependMessage(messageParameters, animate)
      },
      addMessages: function (messages, method, animate) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.addMessages(messages, method, animate)
      },
      removeMessage: function (message) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.removeMessage(message)
      },
      removeMessages: function (messages) {
        if (!this.f7Messages) { return; }
        return this.f7Messages.removeMessages(messages)
      },
      scroll: function () {
        if (!this.f7Messages) { return; }
        return this.f7Messages.scrollMessages()
      },
      layout: function () {
        if (!this.f7Messages) { return; }
        return this.f7Messages.layout()
      },
      clean: function () {
        if (!this.f7Messages) { return; }
        return this.f7Messages.clean()
      },
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) { return; }
        self.f7Messages = f7.messages(self.$el, {
          autoLayout:  self.autoLayout,
          newMessagesFirst: self.newMessagesFirst,
          messages: self.messages,
          scrollMessages: self.scrollMessages,
          scrollMessagesOnlyOnEdge: self.scrollMessagesOnlyOnEdge,
        });
      }
    }
  };

var Message = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{class:_vm.classesObject,on:{"click":_vm.onClick}},[_vm._v("\n  "+_vm._s(_vm.day)+" "),(_vm.time)?_c('span',[_vm._v(_vm._s(_vm.time))]):_vm._e(),_vm._v(" "),_vm._t("start"),_vm._v(" "),(_vm.name)?_c('div',{staticClass:"message-name",on:{"click":_vm.onNameClick}},[_vm._v(_vm._s(_vm.name))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"message-text",on:{"click":_vm.onTextClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.text))]),_vm._v(" "),(_vm.date)?_c('div',{staticClass:"message-date"},[_vm._v(_vm._s(_vm.date))]):_vm._e()],2),_vm._v(" "),(_vm.avatar)?_c('div',{staticClass:"message-avatar",style:({'background-image': 'url(' + _vm.avatar + ')'}),on:{"click":_vm.onAvatarClick}}):_vm._e(),_vm._v(" "),(_vm.label)?_c('div',{staticClass:"message-label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_vm._t("end")],2)},
staticRenderFns: [],
    props: {
      text: String,
      name: String,
      avatar: String,
      type: {
        type: String,
        default: 'sent'
      },
      label: String,
      day: String,
      date: String,
      time: String,
      last: {
        type: Boolean,
        default: true
      },
      first: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.day || self.time) {
          co['messages-date'] = self.day || self.time;
        }
        else {
          var newPosition = 'bottom';
          if(self.$parent.newFirst) {
            newPosition = 'top';
          }
          // co['message-appear-from-' + newPosition] = true;
          co['message-date'] = self.day || self.time;
          co['message'] = !(self.day || self.time);
          co['message-' + self.type] = true;
          co['message-with-avatar'] = self.avatar;
          co['message-first'] = self.first;
          co['message-last'] = self.last;
          co['message-with-tail'] = self.last;
        }
        return co;
      },
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onNameClick: function (event) {
        this.$emit('click:name', event);
      },
      onTextClick: function (event) {
        this.$emit('click:text', event);
      },
      onAvatarClick: function (event) {
        this.$emit('click:avatar', event);
      },
    }
  };

var Messagebar = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"toolbar messagebar"},[_vm._t("before-inner"),_vm._v(" "),_c('div',{staticClass:"toolbar-inner"},[_vm._t("before-textarea"),_vm._v(" "),_c('textarea',{ref:"area",attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"name":_vm.name,"readonly":_vm.readonly},on:{"input":_vm.onInput,"change":_vm.onChange,"focus":_vm.onFocus,"blur":_vm.onBlur}},[_vm._v(_vm._s(_vm.value))]),_vm._v(" "),_vm._t("after-textarea"),_vm._v(" "),(_vm.sendLink && _vm.sendLink.indexOf('<') >= 0)?_c('f7-link',{domProps:{"innerHTML":_vm._s(_vm.sendLink)},on:{"click":_vm.onClick}}):_c('f7-link',{on:{"click":_vm.onClick}},[_vm._t("send-link",[_vm._v(_vm._s(_vm.sendLink))])],2),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_vm._t("after-inner")],2)},
staticRenderFns: [],
    beforeDestroy: function () {
      if (this.f7Messagebar && this.f7Messagebar.destroy) { this.f7Messagebar.destroy(); }
    },
    props: {
      placeholder: {
        type: String,
        default: 'Message'
      },
      init: {
        type: Boolean,
        default: true
      },
      maxHeight: Number,
      sendLink: String,
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      name: String
    },
    methods: {
      getValue: function () {
        if (!this.f7Messagebar) { return; }
        return this.f7Messagebar.value();
      },
      setValue: function (newValue) {
        if (!this.f7Messagebar) { return; }
        return this.f7Messagebar.value(newValue);
      },
      clear: function () {
        if (!this.f7Messagebar) { return; }
        return this.f7Messagebar.clear();
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onClick: function (event) {
        var value = this.$refs.area.value;
        var clear = this.f7Messagebar ? this.f7Messagebar.clear : function () {};
        this.$emit('submit', value, clear);
        this.$emit('click', event);
      },
      onF7Init: function () {
        var self = this;
        if (!self.init) { return; }
        self.f7Messagebar = self.$f7.messagebar(self.$el, {
          maxHeight: self.maxHeight
        });
      }
    }
  };

var Searchbar = {
    render: function (c) {
      var self = this;
      var clearEl, cancelEl, inputEl, inputWrapEl;
      inputEl = c('input', {
        attrs: {
          'placeholder': self.placeholder,
          'type': 'search'
        },
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur
        }
      });
      if (self.clearButtonComputed) {
        clearEl = c('a', {
          staticClass: 'searchbar-clear',
          attrs: {
            'href' : '#'
          },
          on: {
            click: self.onClearClick
          }
        });
      }
      if (self.cancelLink) {
        cancelEl = c('a', {
          staticClass: 'searchbar-cancel',
          attrs: {
            'href' : '#'
          },
          domProps: {
            innerHTML: self.cancelLink
          },
          on: {
            click: self.onCancelClick
          }
        });
      }
      inputWrapEl = c('div', {staticClass:'searchbar-input'}, [inputEl, clearEl]);

      return c(self.form ? 'form' : 'div', {
        staticClass: 'searchbar',
        on: {
          'submit': self.onSubmit,
          'searchbar:search': self.onSearch,
          'searchbar:enable': self.onEnable,
          'searchbar:disable': self.onDisable,
          'searchbar:clear': self.onClear
        }
      }, [self.$slots['before-input'], inputWrapEl, self.$slots['after-input'], cancelEl, self.$slots.default]);
    },
    beforeDestroy: function () {
      if (this.f7Searchbar && this.f7Searchbar.destroy) { this.f7Searchbar.destroy(); }
    },
    props: {
      form: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: 'Search'
      },
      cancelLink: String,
      clear: Boolean,
      clearButton: {
        type: Boolean,
        default: true
      },

      // SB Params
      params: Object,
      searchList: [String, Object],
      searchIn: {
        type: String,
        default: '.item-title'
      },
      searchBy: String,
      found: [String, Object],
      notFound: [String, Object],
      overlay: [String, Object],
      ignore: {
        type: String,
        default: '.searchbar-ignore'
      },
      customSearch: {
        type: Boolean,
        default: false
      },
      removeDiacritics: {
        type: Boolean,
        default: false
      },
      hideDividers: {
        type: Boolean,
        default: true
      },
      hideGroups: {
        type: Boolean,
        default: true
      },
      init: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      clearButtonComputed: function () {
        var self = this;
        var cb = self.clearButton;
        if (self.$options.propsData.clear === false) {
          cb = false;
        }
        return cb;
      }
    },
    methods: {
      search: function (query) {
        if (!this.f7Searchbar) { return; }
        return this.f7Searchbar.search(query)
      },
      enable: function () {
        if (!this.f7Searchbar) { return; }
        return this.f7Searchbar.enable()
      },
      disable: function () {
        if (!this.f7Searchbar) { return; }
        return this.f7Searchbar.disable()
      },
      empty: function () {
        if (!this.f7Searchbar) { return; }
        return this.f7Searchbar.clear()
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onSubmit: function (event) {
        this.$emit('submit', event);
      },
      onSearch: function (event) {
        if(!event.detail) { return; }
        this.$emit('searchbar:search', event.detail.query, event.detail.foundItems);
      },
      onClear: function (event) {
        this.$emit('searchbar:clear', event);
      },
      onEnable: function (event) {
        this.$emit('searchbar:enable', event);
      },
      onDisable: function (event) {
        this.$emit('searchbar:disable', event);
      },
      onClearClick: function (event) {
        this.$emit('click:clear', event);
      },
      onCancelClick: function (event) {
        this.$emit('click:cancel', event);
      },
      onF7Init: function () {
        var self = this;
        if (!self.init) { return; }
        self.f7Searchbar = self.$f7.searchbar(self.$el, self.params || {
          searchList: self.searchList,
          searchIn: self.searchIn,
          searchBy: self.searchBy,
          found: self.found,
          notFound: self.notFound,
          overlay: self.overlay,
          ignore: self.ignore,
          customSearch: self.customSearch,
          removeDiacritics: self.removeDiacritics,
          hideDividers: self.hideDividers,
          hideGroups: self.hideGroups
        });
      }
    }
  };

var Tabs = {
    render: function (c) {
      var self = this;
      var tabs = c('div', {staticClass: 'tabs'}, [self.$slots.default]);
      if (self.animated || self.swipeable) { return c('div', {class: self.classesObject}, [tabs]); }
      else { return tabs; }
    },
    props: {
      'animated': Boolean,
      'swipeable': Boolean
    },
    computed: {
      classesObject: function () {
        return {
          'tabs-animated-wrap': this.animated,
          'tabs-swipeable-wrap': this.swipeable,
        }
      },
    }
  };

var Tab = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"tab",class:_vm.active ? 'active' : false,on:{"tab:show":_vm.onTabShow,"tab:hide":_vm.onTabHide}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'active': Boolean
    },
    methods: {
      show: function () {
        if (!this.$f7) { return; }
        this.$f7.showTab(this.$el);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  };

var Popover = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"popover",on:{"popover:open":_vm.onOpen,"popover:opened":_vm.onOpened,"popover:close":_vm.onClose,"popover:closed":_vm.onClosed}},[_c('div',{staticClass:"popover-angle"}),_vm._v(" "),_c('div',{staticClass:"popover-content"},[_vm._t("default")],2)])},
staticRenderFns: [],
    methods: {
      onOpen: function (event) {
        this.$emit('popover:open', event);
      },
      onOpened: function (event) {
        this.$emit('popover:opened', event);
      },
      onClose: function (event) {
        this.$emit('popover:close', event);
      },
      onClosed: function (event) {
        this.$emit('popover:closed', event);
      },
      open: function (target) {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.popover(self.$el, target);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.closeModal(self.$el);
      }
    }
  };

var Popup = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"popup",class:_vm.classesObject,on:{"popup:open":_vm.onOpen,"popup:opened":_vm.onOpened,"popup:close":_vm.onClose,"popup:closed":_vm.onClosed}},[_vm._t("default")],2)},
staticRenderFns: [],
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) { return; }
        var $$ = self.$$;
        if (opened) {
          self.$f7.popup(self.$el);
        }
        else {
          if (!$$(self.$el).hasClass('modal-in')) { return; }
          self.$f7.closeModal(self.$el);
        }
      }
    },
    props: {
      'tablet-fullscreen': Boolean,
      'theme': String,
      'layout': String,
      'opened': Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'tablet-fullscreen': this.tabletFullscreen,
          'modal-in': this.opened,
          'modal-out': !this.opened
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      onOpen: function (event) {
        this.$emit('popup:open', event);
      },
      onOpened: function (event) {
        this.$emit('popup:opened', event);
      },
      onClose: function (event) {
        this.$emit('popup:close', event);
      },
      onClosed: function (event) {
        this.$emit('popup:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) { return; }
        if ($$('.popup-overlay').length === 0) {
          $$('<div class="popup-overlay ' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el);
        }
      },
      open: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.popup(self.$el);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.closeModal(self.$el);
      }
    }
  };

var PickerModal = {
    render: function (c) {
      var pickerEl, innerEl, fixedList = [], staticList = [];
      var self = this;

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');

      var tag, child;

      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue;
          }
          var isFixed = false;
          for (var j = 0; j < fixedTags.length; j++) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) { fixedList.push(child); }
          else { staticList.push(child); }
        }
      }

      innerEl = c('div', {
        staticClass: 'picker-modal-inner'
      }, staticList);

      return c('div', {
        class: self.classesObject,
        staticClass: 'picker-modal',
        on: {
          'picker:open': self.onOpen,
          'picker:opened': self.onOpened,
          'picker:close': self.onClose,
          'picker:closed': self.onClosed
        }
      }, [fixedList, innerEl]);
    },
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) { return; }
        if (opened) {
          self.$f7.pickerModal(self.$el);
        }
        else {
          self.$f7.closeModal(self.$el);
        }
      }
    },
    props: {
      'opened': Boolean,
      'theme': String,
      'layout': String,
      'overlay': Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'modal-in': this.opened,
          'modal-out': !this.opened
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      onOpen: function (event) {
        if (this.overlay) {
          this.$$('.picker-modal-overlay').addClass('modal-overlay-visible');
        }
        this.$emit('picker:open', event);
      },
      onOpened: function (event) {
        this.$emit('picker:opened', event);
      },
      onClose: function (event) {
        if (this.overlay) {
          this.$$('.picker-modal-overlay').removeClass('modal-overlay-visible');
        }
        this.$emit('picker:close', event);
      },
      onClosed: function (event) {
        this.$emit('picker:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) { return; }
        if ($$('.picker-modal-overlay').length === 0 && (this.$theme && this.$theme.material || this.overlay)) {
          $$('<div class="picker-modal-overlay ' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el);
        }
      },
      open: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.pickerModal(self.$el);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.closeModal(self.$el);
      }
    }
  };

var LoginScreen = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"login-screen",class:_vm.classesObject,on:{"loginscreen:open":_vm.onOpen,"loginscreen:opened":_vm.onOpened,"loginscreen:close":_vm.onClose,"loginscreen:closed":_vm.onClosed}},[_vm._t("default")],2)},
staticRenderFns: [],
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) { return; }
        var $$ = self.$$;
        if (opened) {
          self.$f7.loginScreen(self.$el);
        }
        else {
          if (!$$(self.$el).hasClass('modal-in')) { return; }
          self.$f7.closeModal(self.$el);
        }
      }
    },
    props: {
      theme: String,
      layout: String,
      opened: Boolean
    },
    computed: {
      classesObject: function () {
        var co = {
          'modal-in': this.opened,
          'modal-out': !this.opened
        };
        if (this.theme) { co['theme-' + this.theme] = true; }
        if (this.layout) { co['layout-' + this.layout] = true; }
        return co;
      }
    },
    methods: {
      onOpen: function (event) {
        this.$emit('loginscreen:open', event);
      },
      onOpened: function (event) {
        this.$emit('loginscreen:opened', event);
      },
      onClose: function (event) {
        this.$emit('loginscreen:close', event);
      },
      onClosed: function (event) {
        this.$emit('loginscreen:closed', event);
      },
      open: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.loginScreen(self.$el);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.closeModal(self.$el);
      }
    }
  };

var LoginScreenTitle = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"login-screen-title"},[_vm._t("default")],2)},
staticRenderFns: [],};

var Actions = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"actions-modal keep-on-close",class:{'modal-in': _vm.opened},on:{"actions:open":_vm.onOpen,"actions:opened":_vm.onOpened,"actions:close":_vm.onClose,"actions:closed":_vm.onClosed}},[_vm._t("default")],2)},
staticRenderFns: [],
    mounted: function () {
      var self = this;
      if (self.opened) {
        self.$el.style.display = 'block';
      }
    },
    watch: {
      opened: function (opened) {
        var self = this;
        if (!self.$f7) { return; }
        if (opened) {
          self.$f7.openModal(self.$el);
        }
        else {
          self.$f7.closeModal(self.$el);
        }
      }
    },
    props: {
        opened: Boolean
    },
    methods: {
      onOpen: function (event) {
        this.$emit('actions:open', event);
      },
      onOpened: function (event) {
        this.$emit('actions:opened', event);
      },
      onClose: function (event) {
        this.$emit('actions:close', event);
      },
      onClosed: function (event) {
        this.$emit('actions:closed', event);
      },
      onF7Init: function () {
        var $$ = this.$$;
        if (!$$) { return; }
        if ($$('.modal-overlay').length === 0) {
          $$('<div class="modal-overlay' + (this.opened ? ' modal-overlay-visible' : '') + '"></div>').insertBefore(this.$el);
        }
      },
      open: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.openModal(self.$el);
      },
      close: function () {
        var self = this;
        if (!self.$f7) { return; }
        return self.$f7.closeModal(self.$el);
      }
    }
  };

var ActionsGroup = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"actions-modal-group"},[_vm._t("default")],2)},
staticRenderFns: [],};

var ActionsButton = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"actions-modal-button",class:_vm.classesObject,on:{"click":_vm.onClick}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'color': String,
      'bold': Boolean,
      'close': {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        var self = this;
        var co = {
          'actions-modal-button-bold': self.bold
        };
        if (self.color) { co['color-' + self.color] = true; }
        return co;
      }
    },
    methods: {
      onClick: function (event) {
        if (this.close && this.$f7) {
          this.$f7.closeModal(this.$parent.$parent.$el);
        }
        this.$emit('click', event);
      }
    }
  };

var ActionsLabel = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"actions-modal-label",class:_vm.classesObject,on:{"click":_vm.onClick}},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      color: String,
      bold: Boolean
    },
    computed: {
      classesObject: function () {
        var self = this;
        var co = {
          'actions-modal-button-bold': self.bold
        };
        if (self.color) { co['color-' + self.color] = true; }
        return co
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  };

var PhotoBrowser = {
    render: function () {},
    beforeDestroy: function () {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) { self.f7PhotoBrowser.destroy(); }
    },
    props: {
      init: {
        type: Boolean,
        default: true
      },
      params: Object,
      photos: Array,
      initialSlide: Number,
      spaceBetween: Number,
      speed: Number,
      zoom: Boolean,
      zoomMax: Number,
      zoomMin: Number,
      exposition: Boolean,
      expositionHideCaptions: Boolean,
      type: String,
      navbar: Boolean,
      toolbar: Boolean,
      theme: String,
      captionsTheme: String,
      swipeToClose: Boolean,
      backLinkText: String,
      ofText: String,
      loop: Boolean,
      lazyLoading: Boolean,
      lazyLoadingInPrevNext: Boolean,
      lazyLoadingOnTransitionStart: Boolean,
    },
    methods: {
      open: function (index) {
        return this.f7PhotoBrowser.open(index)
      },
      close: function () {
        return this.f7PhotoBrowser.close()
      },
      toggleZoom: function () {
        return this.f7PhotoBrowser.toggleZoom()
      },
      toggleExposition: function () {
        return this.f7PhotoBrowser.toggleExposition()
      },
      enableExposition: function () {
        return this.f7PhotoBrowser.enableExposition()
      },
      disableExposition: function () {
        return this.f7PhotoBrowser.disableExposition()
      },
      onF7Init: function (f7) {
        var self = this;
        // Init Virtual List
        if (!self.init) { return; }
        var params = self.$options.propsData;
        self.f7PhotoBrowser = f7.photoBrowser(self.params || {
          photos: params.photos,
          initialSlide: params.initialSlide,
          spaceBetween: params.spaceBetween,
          speed: params.speed,
          zoom: params.zoom,
          zoomMax: params.zoomMax,
          zoomMin: params.zoomMin,
          exposition: params.exposition,
          expositionHideCaptions: params.expositionHideCaptions,
          type: params.type,
          navbar: params.navbar,
          toolbar: params.toolbar,
          theme: params.theme,
          captionsTheme: params.captionsTheme,
          swipeToClose: params.swipeToClose,
          backLinkText: params.backLinkText,
          ofText: params.ofText,
          loop: params.loop,
          lazyLoading: params.lazyLoading,
          lazyLoadingInPrevNext: params.lazyLoadingInPrevNext,
          lazyLoadingOnTransitionStart: params.lazyLoadingOnTransitionStart,
          onOpen: function (pb) {
            self.$emit('open', pb);
          },
          onClose: function (pb) {
            self.$emit('close', pb);
          },
          onSwipeToClose: function (pb) {
            self.$emit('swipeToClose', pb);
          },
          onSlideChangeStart: function (swiper) {
            self.$emit('slideChangeStart', swiper);
          },
          onSlideChangeEnd: function (swiper) {
            self.$emit('slideChangeEnd', swiper);
          },
          onTransitionStart: function (swiper) {
            self.$emit('transitionStart', swiper);
          },
          onTransitionEnd: function (swiper) {
            self.$emit('transitionEnd', swiper);
          },
          onClick: function (swiper, event) {
            self.$emit('click', swiper, event);
          },
          onTap: function (swiper, event) {
            self.$emit('tap', swiper, event);
          },
          onDoubleTap: function (swiper, event) {
            self.$emit('doubleTap', swiper, event);
          },
          onLazyImageLoad: function (swiper, event) {
            self.$emit('lazyImageLoad', swiper, event);
          },
          onLazyImageReady: function (swiper, event) {
            self.$emit('lazyImageReady', swiper, event);
          }
        });
      }
    }
  };

var Timeline = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"timeline",class:_vm.classesObject},[_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      'sides': Boolean,
      'tablet-sides': Boolean,
      'col': [Number, String],
      'tablet-col': [Number, String],
      'horizontal': Boolean
    },
    computed: {
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.sides) { co['timeline-sides'] = true; }
        if (self.tabletSides) { co['tablet-sides'] = true; }
        if (self.horizontal) { co['timeline-horizontal'] = true; }
        if (self.col) { co['col-' + self.col] = true; }
        if (self.tabletCol) { co['tablet-' + self.tabletCol] = true; }
        return co;
      }
    }
  };

var TimelineItem = {
    render: function (c) {
      var self = this;
      var timeEl, titleEl, subtitleEl, textEl, dateEl, dividerEl, contentEl, innerEl;
      if (self.day || self.month) {
        dateEl = c('div', {staticClass:'timeline-item-date', domProps: {innerHTML: [self.day, '<small>' + self.month + '</small>'].join(' ')}});
      }
      else {
        dateEl = c('div', {staticClass:'timeline-item-date', domProps: {innerHTML: self.date}});
      }

      dividerEl = c('div', {staticClass:'timeline-item-divider'});

      if (self.time) {
        timeEl = c('div', {staticClass:'timeline-item-time', domProps: {innerHTML: self.time}});
      }
      if (self.title) {
        titleEl = c('div', {staticClass:'timeline-item-title', domProps: {innerHTML: self.title}});
      }
      if (self.subtitle) {
        subtitleEl = c('div', {staticClass:'timeline-item-subtitle', domProps: {innerHTML: self.subtitle}});
      }
      if (self.text) {
        textEl = c('div', {staticClass:'timeline-item-text', domProps: {innerHTML: self.text}});
      }

      if (self.inner) {
        if (self.content) {
          innerEl = c('div', {staticClass:'timeline-item-inner', domProps:{innerHTML: self.content}});
        }
        else {
          innerEl = c('div', {staticClass:'timeline-item-inner'}, [timeEl, titleEl, subtitleEl, textEl, self.$slots.default]);
        }
      }
      else {
        innerEl = [timeEl, titleEl, subtitleEl, textEl, self.$slots.default];
      }
      if (self.content && !self.inner) {
        contentEl = c('div', {staticClass:'timeline-item-content', domProps: {innerHTML: self.content}});
      }
      else {
        contentEl = c('div', {staticClass:'timeline-item-content'}, [innerEl]);
      }
      return c('div', {
        staticClass: 'timeline-item',
        class: {
          'timeline-item-left': self.side === 'left',
          'timeline-item-right': self.side === 'right'
        }
      }, [dateEl, dividerEl, contentEl])
    },
    props: {
      date: [String, Number, Date],
      day: [String, Number],
      month: [String, Number],
      inner: Boolean,
      content: String,
      side: String,
      time: String,
      title: String,
      subtitle: String,
      text: String
    }
  };

var TimelineItemChild = {
    render: function (c) {
      var self = this;
      var timeEl, titleEl, subtitleEl, textEl;

      if (self.time) {
        timeEl = c('div', {staticClass:'timeline-item-time', domProps: {innerHTML: self.time}});
      }
      if (self.title) {
        titleEl = c('div', {staticClass:'timeline-item-title', domProps: {innerHTML: self.title}});
      }
      if (self.subtitle) {
        subtitleEl = c('div', {staticClass:'timeline-item-subtitle', domProps: {innerHTML: self.subtitle}});
      }
      if (self.text) {
        textEl = c('div', {staticClass:'timeline-item-text', domProps: {innerHTML: self.text}});
      }

      if (self.content) {
        return c('div', {
          class: {
            'timeline-item-inner': self.inner,
            'timeline-item-child': !self.inner
          },
          domProps: {
            innerHTML: self.content
          }
        })
      }
      else {
        return c('div', {
          class: {
            'timeline-item-inner': self.inner,
            'timeline-item-child': !self.inner
          }
        }, [timeEl, titleEl, subtitleEl, textEl, self.$slots.default])
      }
    },
    props: {
      inner: Boolean,
      content: String,
      time: String,
      title: String,
      subtitle: String,
      text: String
    }
  };

var TimelineYear = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"timeline-year"},[(_vm.year || _vm.title)?_c('div',{staticClass:"timeline-year-title"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.year || _vm.title)}})]):_vm._e(),_vm._v(" "),_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      year: [Number, String],
      title: [Number, String]
    }
  };

var TimelineMonth = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;return _c('div',{staticClass:"timeline-month"},[(_vm.month || _vm.title)?_c('div',{staticClass:"timeline-month-title"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.month || _vm.title)}})]):_vm._e(),_vm._v(" "),_vm._t("default")],2)},
staticRenderFns: [],
    props: {
      month: [Number, String],
      title: [Number, String]
    }
  };

var Template7Template = {
    render: function (c) {
        return c('script', {attrs: {type:'text/template7'}}, this.$slots.default)
    }
  };

/* Components */
/* Plugin */
var framework7Vue = {
  install: function (Vue, parameters) {
    // Parameters
    parameters = parameters || {};

    // Hub
    var eventHub = new Vue();

    // Protos
    var $$ = window.Dom7;
    Vue.prototype.Dom7 = $$;
    Vue.prototype.$$ = $$;
    Vue.prototype.Template7 = window.Template7;
    Vue.prototype.$t7 = window.Template7;
    Vue.prototype.$device = window.Framework7.prototype.device;

    // Theme
    var theme = {
      ios: false,
      material: false
    };

    Vue.prototype.$theme = theme;

    if (parameters.theme === 'auto') {
      if (window && window.navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) {
        theme.material = true;
      }
      else {
        theme.ios = true;
      }
    }
    if (parameters.theme === 'material') {
      theme.ios = false;
      theme.material = true;
    }
    else if (parameters.theme === 'ios') {
      theme.ios = true;
      theme.material = false;
    }

    // Parse Route
    function parseRoute(str) {
      var parts = [];
      str.split('/').forEach(function (part) {
        if (part !== '') {
          if (part.indexOf(':') === 0) {
            parts.push({name: part.replace(':', '')});
          }
          else { parts.push(part); }
        }
      });
      return parts;
    }
    // Routes Matching
    function findMatchingRoute(url, routes) {
      var matchingRoute;
      if (!url) { return matchingRoute; }

      var query = $$.parseUrlQuery(url);
      var hash = url.split('#')[1];
      var params = {};
      var path = url.split('#')[0].split('?')[0];
      var urlParts = path.split('/').filter(function (part) {
        if (part !== '') { return part; }
      });

      var i, j, k;
      for (i = 0; i < routes.length; i++) {
        if (matchingRoute) { continue; }
        var route = routes[i];
        var parsedRoute = parseRoute(route.path);
        if (parsedRoute.length !== urlParts.length) { continue; }
        var matchedParts = 0;
        for (j = 0; j < parsedRoute.length; j++) {
            if (typeof parsedRoute[j] === 'string' && urlParts[j] === parsedRoute[j]) { matchedParts ++; }
            if (typeof parsedRoute[j] === 'object') {
              params[parsedRoute[j].name] = urlParts[j];
              matchedParts ++;
            }
        }
        if (matchedParts === urlParts.length) {
          matchingRoute = {
            query: query,
            hash: hash,
            params: params,
            url: url,
            path: path,
            route: route
          };
        }
      }
      return matchingRoute;
    }

    // Preroute
    function preroute(view, options, routes) {
      if (!view.allowPageChange) { return false; }
      
      var url = options.url;
      var pageElement = options.pageElement;

      if (url && pageElement || !url || url === '#') {
        return true;
      }
      if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) { return false; }

      var matchingRoute = findMatchingRoute(url, routes);
      var inHistory = view.history.indexOf(url) >= 0;
      var inDomCache = view.pagesCache[url];
      if (inHistory && inDomCache) { return true; }
      if (!matchingRoute) { return true; }
      var pagesVue = view.pagesContainer.__vue__;
      if (!pagesVue) { return true; }
      
      var id = new Date().getTime();
      Vue.set(pagesVue.pages, id, {component: matchingRoute.route.component});
      view.container.__vue__.$route = {
        route: matchingRoute.route.path,
        query: matchingRoute.query,
        hash: matchingRoute.hash,
        params: matchingRoute.params,
        url: matchingRoute.url,
        path: matchingRoute.path
      };
      view.container.__vue__.$router = view.router;
      view.allowPageChange = false;
      Vue.nextTick(function () {
          var newPage = view.pagesContainer.querySelector('.page:last-child');
          pagesVue.pages[id].pageElement = newPage;
          options.pageElement = newPage;
          view.allowPageChange = true;
          if (options.isBack) {
            view.router.back(options);
          }
          else {
            view.router.load(options);
          }
      });

      return false;
    }

    // Init Framework7
    var f7Ready = false,
        f7Instance;

    function initFramework7(f7Params) {
      if (!window.Framework7) { return; }
      f7Params = f7Params || {};

      // Material
      if (typeof f7Params.material === 'undefined' && Vue.prototype.$theme.material) {
        f7Params.material = true;
      }
      // Modify Parameters
      f7Params.routerRemoveTimeout = true;

      // Correct Prerouting
      f7Params.routes = f7Params.routes || [];

      var initialPreroute = f7Params.preroute;
      f7Params.preroute = function (view, params) {
        var passToVueRouter = true;
        if (initialPreroute) {
          passToVueRouter = initialPreroute(view, params);
        }
        if (passToVueRouter) { return preroute(view, params, f7Params.routes); }
        else { return false; }
      };

      // Init
      f7Instance = Vue.prototype.$f7 = window.f7 = new window.Framework7(f7Params);

      // Set Flag
      f7Ready = true;

      // Emit event
      eventHub.$emit('f7init', f7Instance);
    }

    // Mixins
    Vue.mixin({
      beforeCreate: function () {
        var self = this;
        // Route
        if (self.$parent && self.$parent.$refs.pages) {
          self.$route = self.$parent.$parent.$route;
          self.$router = self.$parent.$parent.$router;
        }
        // Theme
        if (theme.ios === false && theme.material === false) {
          if ((self.$root.$options.framework7 && self.$root.$options.framework7.material) || (self.$f7 && self.$f7.params.material) || parameters.theme === 'material') {
            theme.material = true;
          }
          else {
            theme.ios = true;
          }
        }
      },
      mounted: function () {
        var self = this;
        if (f7Ready) {
          if (self.onF7Init) { self.onF7Init(f7Instance); }
          return;
        }
        eventHub.$on('f7init', function (f7Instance) {
          if (self.onF7Init) { self.onF7Init(f7Instance); }
        });
        if (self === self.$root) {
          initFramework7(self.$options.framework7);
        }
      },
      components: {
        'f7-statusbar': StatusBar,
        'f7-views': Views,
        'f7-panel': Panel,
        'f7-view': View,
        'f7-pages': Pages,
        'f7-page': Page,
        'f7-page-content': PageContent,
        'f7-navbar': Navbar,
        'f7-nav-left': NavLeft,
        'f7-nav-center': NavCenter,
        'f7-nav-right': NavRight,
        'f7-subnavbar': Subnavbar,
        'f7-toolbar': Toolbar,
        'f7-block-title': ContentBlockTitle,
        'f7-content-block-title': ContentBlockTitle,
        'f7-list-block-title': ContentBlockTitle,
        'f7-content-block': ContentBlock,
        'f7-block': ContentBlock,
        'f7-card': Card,
        'f7-card-header': CardHeader,
        'f7-card-footer': CardFooter,
        'f7-card-content': CardContent,
        'f7-list': List,
        'f7-list-group': ListGroup,
        'f7-list-item': ListItem,
        'f7-list-item-content': ListItemContent,
        'f7-list-button': ListButton,
        'f7-list-label': ListLabel,
        'f7-swipeout-actions': ListItemSwipeoutActions,
        'f7-swipeout-button': ListItemSwipeoutButton,
        'f7-accordion': Accordion,
        'f7-accordion-item': AccordionItem,
        'f7-accordion-toggle': AccordionToggle,
        'f7-accordion-content': AccordionContent,
        'f7-badge': Badge,
        'f7-icon': Icon,
        'f7-link': Link,
        'f7-buttons': ButtonsSegmented,
        'f7-segmented': ButtonsSegmented,
        'f7-button': Button,
        'f7-grid': GridRow,
        'f7-col': GridCol,
        'f7-preloader': Preloader,
        'f7-progressbar': Progressbar,
        'f7-label': FormLabel,
        'f7-input': FormInput,
        'f7-switch': FormSwitch,
        'f7-range': FormRange,
        'f7-chip': Chip,
        'f7-fab': Fab,
        'f7-fab-speed-dial': FabSpeedDial,
        'f7-fab-action': FabAction,
        'f7-fab-actions': FabActions,
        'f7-swiper': Swiper,
        'f7-swiper-slide': SwiperSlide,
        'f7-messages': Messages,
        'f7-message': Message,
        'f7-messagebar': Messagebar,
        'f7-searchbar': Searchbar,
        'f7-tabs': Tabs,
        'f7-tab': Tab,
        'f7-popover': Popover,
        'f7-popup': Popup,
        'f7-login-screen': LoginScreen,
        'f7-login-screen-title': LoginScreenTitle,
        'f7-picker-modal': PickerModal,
        'f7-actions': Actions,
        'f7-actions-group': ActionsGroup,
        'f7-actions-label': ActionsLabel,
        'f7-actions-button': ActionsButton,
        'f7-photo-browser': PhotoBrowser,
        'f7-timeline': Timeline,
        'f7-timeline-item': TimelineItem,
        'f7-timeline-item-child': TimelineItemChild,
        'f7-timeline-year': TimelineYear,
        'f7-timeline-month': TimelineMonth,
        't7-template': Template7Template,
      }
    });
  }
};

return framework7Vue;

})));

//# sourceMappingURL=framework7-vue.js.map
