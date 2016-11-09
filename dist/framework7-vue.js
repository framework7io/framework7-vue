/**
 * Framework7 Vue 0.5.1
 * Build full featured iOS & Android apps using Framework7 & Vue
 * http://www.framework7.io/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: November 9, 2016
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Framework7Vue = factory());
}(this, (function () {

var StatusBar = {render: function(){with(this){return _m(0)}},staticRenderFns: [function(){with(this){return _h('div',{staticClass:"statusbar-overlay"})}}],};

var Panel = {render: function(){with(this){return _h('div',{staticClass:"panel",class:classesObject},[_t("default")])}},staticRenderFns: [],
  props: {
    'side': String,
    'effect': String,
    'cover': Boolean,
    'reveal': Boolean,
    'left': Boolean,
    'right': Boolean,
    'theme': String,
    'layout': String
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
      return co;
    }
  }
};

var Views = {render: function(){with(this){return _h('div',{staticClass:"views",class:classObject},[_t("default")])}},staticRenderFns: [],
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
        'tabbar-labels-through': this.tabbarLabesThrough
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

    return c('div', {class: self.classesObject}, [navbarEl, pagesEl, self.$slots.default]);
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
};

var Pages = {render: function(){with(this){return _h('div',{staticClass:"pages",class:classesObject,on:{"pagebeforeremove":onPageBeforeRemove}},[_t("default"),_l((pages),function(page,key){return _h(page.component,{tag:"component"})})])}},staticRenderFns: [],
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
      for (var id in this.pages) {
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

    if (self.pullToRefresh && (self.ptrLayer || self.pullToRefreshLayer)) {
      ptrEl = c('div', {class: {'pull-to-refresh-layer': true}} ,[
        c('div', {class: {'preloader': true}}),
        c('div', {class: {'pull-to-refresh-arrow': true}})
      ]);
    }
    if (self.infiniteScroll && self.infiniteScrollPreloader) {
      infiniteEl = c('div', {class: {'infinite-scroll-preloader': true}} ,[
        c('div', {class: {'preloader': true}})
      ]);
    }

    var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');

    var tag, child, withSubnavbar, withMessages, withSearchbar;
    if (self.$slots.default) {
      for (var i = 0; i < self.$slots.default.length; i++) {
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
        for (var j = 0; j < fixedTags.length; j++) {
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
        class: self.classesObjectPageContent,
        attrs: {
          'data-ptr-distance': self.pullToRefreshDistance || self.ptrDistance,
          'data-distance': self.infiniteScrollDistance
        },
        on: {
          pullstart: self.onPullstart,
          pullmove: self.onPullmove,
          pullend: self.onPullend,
          refresh: self.onRefresh,
          refreshdone: self.onRefreshdone,
          infinite: self.onInfinite
        },
      }, (self.infiniteScroll === 'top' ? [ptrEl, infiniteEl, self.$slots.static, staticList] : [ptrEl, self.$slots.static, staticList, infiniteEl]));
    }
    else {
      pageContentEl = [self.$slots.default];
    }
    fixedList.push(self.$slots.fixed);

    if (withSubnavbar) { self.classesObjectPage['with-subnavbar'] = true; }
    pageEl = c('div', {
      class: self.classesObjectPage,
      attrs: {
        'data-page': self.name
      },
      on: {
        pageBeforeInit: self.onPageBeforeInit,
        pageInit: self.onPageInit,
        pageReinit: self.onPageReinit,
        pageBeforeAnimation: self.onPageBeforeAnimation,
        pageAfterAnimation: self.onPageAfterAnimation,
        pageBeforeRemove: self.onPageBeforeRemove,
        pageBack: self.onPageBack,
        pageAfterBack: self.onPageAfterBack
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
        'page': true,
        'cached': this.cached,
        'navbar-fixed': this.navbarFixed || this.navbarThrough && this.$theme.material,
        'navbar-through': this.navbarThrough,
        'toolbar-fixed': this.toolbarFixed,
        'toolbar-through': this.toolbarThrough,
        'tabbar-fixed': this.tabbarFixed,
        'tabbar-through': this.tabbarThrough,
        'tabbar-labels-fixed': this.tabbarLabelsFixed,
        'tabbar-labels-through': this.tabbarLabesThrough,
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
        'page-content': true,
        'pull-to-refresh-content': this.pullToRefresh,
        'infinite-scroll': this.infiniteScroll,
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
    onPullstart: function (event) {
      this.$emit('pullstart', event);
    },
    onPullmove: function (event) {
      this.$emit('pullmove', event);
    },
    onPullend: function (event) {
      this.$emit('pullend', event);
    },
    onRefresh: function (event) {
      this.$emit('refresh', event, event.detail.done);
    },
    onRefreshdone: function (event) {
      this.$emit('refreshdone', event);
    },
    onInfinite: function (event) {
      this.$emit('infinite', event);
    },
    onPageBeforeInit: function (event) {
      this.f7PageData = event.detail.page;
      this.$emit('pageBeforeInit', event, event.detail.page);
    },
    onPageInit: function (event) {
      this.$emit('pageInit', event, event.detail.page);
    },
    onPageReinit: function (event) {
      this.$emit('pageReinit', event, event.detail.page);
    },
    onPageBeforeAnimation: function (event) {
      this.$emit('pageBeforeAnimation', event, event.detail.page);
    },
    onPageAfterAnimation: function (event) {
      this.$emit('pageAfterAnimation', event, event.detail.page);
    },
    onPageBeforeRemove: function (event) {
      this.$emit('pageBeforeRemove', event, event.detail.page);
    },
    onPageBack: function (event) {
      this.$emit('pageBack', event, event.detail.page);
    },
    onPageAfterBack: function (event) {
      this.$emit('pageAfterBack', event, event.detail.page);
    }
  }
};

var PageContent = {render: function(){with(this){return _h('div',{staticClass:"page-content",class:classesObject},[_t("default")])}},staticRenderFns: [],
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
  }
};

var Navbar = {render: function(){with(this){return _h('div',{staticClass:"navbar",class:classesObject},[_h('div',{staticClass:"navbar-inner"},[(backLink)?_h('f7-nav-left',{attrs:{"back-link":backLink,"sliding":sliding}}):_e(),(title)?_h('f7-nav-center',{attrs:{"title":title,"sliding":sliding}}):_e(),_t("default")])])}},staticRenderFns: [],
  updated: function () {
      var self = this;
      self.$nextTick(function () {
          self.$f7.sizeNavbars();
      });
  },
  props: {
    backLink: [Boolean, String],
    sliding: Boolean,
    title: String,
    theme: String,
    layout: String
  },
  computed: {
    classesObject: function () {
      var co = {};
      if (this.theme) { co['theme-' + this.theme] = true; }
      if (this.layout) { co['layout-' + this.layout] = true; }
      return co;
    }
  }
};

var NavCenter = {render: function(){with(this){return _h('div',{staticClass:"center",class:{sliding:sliding}},[_t("default",[_s(title)])])}},staticRenderFns: [],
  props: {
      sliding: Boolean,
      title: String
  }
};

var NavLeft = {render: function(){with(this){return _h('div',{staticClass:"left",class:{sliding:sliding}},[(backLink)?_h('f7-link',{class:{'icon-only': (backLink === true || backLink && $theme.material)},attrs:{"href":"#","back":"","icon":"icon-back","text":backLink !== true && !$theme.material ? backLink : undefined}}):_e(),_t("default")])}},staticRenderFns: [],
  props: {
    backLink: [Boolean, String],
    sliding: Boolean
  }
};

var NavRight = {render: function(){with(this){return _h('div',{staticClass:"right",class:{sliding:sliding}},[_t("default")])}},staticRenderFns: [],
  props: {
      sliding: Boolean
  }
};

var Subnavbar = {render: function(){with(this){return _h('div',{staticClass:"subnavbar",class:sliding ? 'sliding' : false},[_t("default")])}},staticRenderFns: [],
  props: {
      sliding: Boolean
  }
};

var Toolbar = {render: function(){with(this){return _h('div',{staticClass:"toolbar",class:classesObject},[_h('div',{staticClass:"toolbar-inner"},[_t("default")])])}},staticRenderFns: [],
  props: {
      bottom: Boolean,
      tabbar: Boolean,
      labels: Boolean,
      scrollable: Boolean,
      theme: String,
      layout: String
  },
  computed: {
    classesObject: function () {
      var co = {
        'toolbar-bottom': this.bottom,
        'tabbar': this.tabbar,
        'tabbar-labels': this.labels,
        'tabbar-scrollabel': this.scrollable,
      };
      if (this.theme) { co['theme-' + this.theme] = true; }
      if (this.layout) { co['layout-' + this.layout] = true; }
      return co;
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
      contentEl = c('f7-card-content', {}, [contentChildEl]);
    }
    if (self.footer) {
      footerEl = c('f7-card-footer', {domProps: {innerHTML: self.footer}});
    }

    return c('div', {class: {'card': true}}, [headerEl, contentEl, footerEl, self.$slots.default]);
  },
  props: ['title', 'content', 'footer']
};

var CardHeader = {render: function(){with(this){return _h('div',{staticClass:"card-header"},[_t("default")])}},staticRenderFns: [],};

var CardFooter = {render: function(){with(this){return _h('div',{staticClass:"card-footer"},[_t("default")])}},staticRenderFns: [],};

var CardContent = {render: function(){with(this){return _h('div',{staticClass:"card-content"},[_h('div',{staticClass:"card-content-inner"},[_t("default")])])}},staticRenderFns: [],};

var ContentBlock = {render: function(){with(this){return _h('div',{staticClass:"content-block",class:classesObject},[(inner)?_h('div',{staticClass:"content-block-inner"},[_t("default")]):_t("default")])}},staticRenderFns: [],
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
  }
};

var ContentBlockTitle = {render: function(){with(this){return _h('div',{staticClass:"content-block-title"},[_t("default")])}},staticRenderFns: [],};

var Badge = {render: function(){with(this){return _h('span',{staticClass:"badge",class:color ? 'color-' + color : ''},[_t("default")])}},staticRenderFns: [],
  props: {
    'color': String
  }
};

var Icon = {render: function(){with(this){return _h('i',{staticClass:"icon",class:classesObject},[_s(iconTextComputed),_t("default")])}},staticRenderFns: [],
  props: {
    'color': String,
    'material': String, //Material Icons
    'f7': String, //Framework7 Icons
    'ion': String, //Ionicons
    'fa': String, //Font Awesome
    'icon': String, //Custom
    'if-material': String,
    'if-ios': String,
  },
  computed: {
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
        'class': {
          'list-block': true,
          'inset': self.inset,
          'media-list': self.mediaList,
          'sortable': self.sortable,
          'accordion-list': self.accordion,
          'contacts-block': self.contacts,
          'virtual-list': self.virtual,
          'tab': self.tab,
          'active': self.active,
          'no-hairlines': self.noHairlines,
          'no-hairlines-between': self.noHairlinesBetween
        },
        on: {
          open: self.onOpen,
          close: self.onClose,
          sort: self.onSort
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
    'form': Boolean,
    'label': String,
    'accordion': Boolean,
    'contacts': Boolean,

    'no-hairlines': Boolean,
    'no-hairlines-between': Boolean,

    // Tab
    'tab': Boolean,
    'active': Boolean,

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
  },
  methods: {
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onSort: function (event) {
      this.$emit('sort', event, event.detail);
    },
    onF7Init: function (f7) {
      var self = this;
      // Init Virtual List
      if (!(self.virtual && self.virtualInit)) { return; }
      var $$ = self.$$;
      var template = $$(self.$el).find('script').html();
      if (!template) { return; }
      template = self.$t7.compile(template);

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
        onItemBeforeInsert: function (list, item) {
          self.$emit('virtualItemBeforeInsert', list, item);
        },
        onBeforeClear: function (list, fragment) {
          self.$emit('virtualBeforeClear', list, fragment);
        },
        onItemsBeforeInsert: function (list, fragment) {
          self.$emit('virtualItemsBeforeInsert', list, fragment);
        },
        onItemsAfterInsert: function (list, fragment) {
          self.$emit('virtualItemsAfterInsert', list, fragment);
        },
      });
    }
  }
};

var ListGroup = {render: function(){with(this){return _h('div',{staticClass:"list-block-group"},[_h('ul',[_t("default")])])}},staticRenderFns: [],
  props: {
    'media-list': Boolean,
    'media-list-computed': Boolean,
    'sortable': Boolean,
    'sortable-computed': Boolean
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
        'checked': self.checked,
        'radio': self.radio,
        'name': self.name,
        'value': self.value,
        'readonly': self.readonly,
        'required': self.required,
        'disabled': self.disabledn
      },
      on: (self.link || self.accordionItem || self.smartSelect) ? {} : {click: self.onClick, change: self.onChange}
    }, self.$slots.default);

    // Link
    if (self.link || self.accordionItem || self.smartSelect) {
      linkEl = c('a', {
        attrs: {
          href: self.link === true || self.accordionItem || self.smartSelect ? '#' : self.link,
          'data-searchbar': self.smartSelectSearchbar,
          'data-searchbar-paceholder': self.smartSelectSearchbarPlaceholder,
          'data-searchbar-cancel': self.smartSelectSearchbarCancel,
          'data-page-title': self.smartSelectPageTitle,
          'data-back-text': self.smartSelectBackText,
          'data-back-on-select': self.smartSelectBackOnSelect,
          'data-virtual-list': self.smartSelectVirtualList,
          'data-virtual-list-height': self.smartSelectVirtualListHeight,
          'data-open-in': self.smartSelectOpenIn,
          'data-navbar-theme': self.smartSelectNavbarTheme,
          'data-form-theme': self.smartSelectFormTheme,

          'data-view': typeof self.linkView === 'string' ? self.linkView : false,
          'data-panel': typeof self.linkOpenPanel === 'string' ? self.linkOpenPanel : false,
          'data-popup': typeof self.linkOpenPopup === 'string' ? self.linkOpenPopup : false,
          'data-popover': typeof self.linkOpenPopover === 'string' ? self.linkOpenPopover : false,
          'data-picker': typeof self.linkOpenPicker === 'string' ? self.linkOpenPicker : false,
          'data-login-screen': typeof self.linkOpenLoginScreen === 'string' ? self.linkOpenLoginScreen : false,
          'data-sortable': typeof self.linkOpenSortable === 'string' ? self.linkOpenSortable : (typeof self.linkToggleSortable === 'string' ? self.linkToggleSortable : false),

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
          'smart-select': self.smartSelect,
          'close-panel': self.linkClosePanel,
          'open-panel': self.linkOpenPanel,
          'close-popup': self.linkClosePopup,
          'open-popup': self.linkOpenPopup,
          'close-popover': self.linkClosePopover,
          'open-popover': self.linkOpenPopover,
          'close-picker': self.linkClosePicker,
          'open-picker': self.linkOpenPicker,
          'close-login-screen': self.linkCloseLoginScreen,
          'open-login-screen': self.linkOpenLoginScreen,
          'close-sortable': self.linkCloseSortable,
          'open-sortable': self.linkOpenSortable,
          'toggle-sortable': self.linkToggleSortable,
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
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed,
          delete: self.onDelete,
          deleted: self.onDeleted,
          swipeout: self.onSwipeout
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
    'link': [String, Boolean],
    'link-external': Boolean,

    'link-force': Boolean,
    'link-reload': Boolean,
    'link-animate-pages': Boolean,
    'link-ignore-cache': Boolean,
    'link-page-name': String,
    'link-template': String,

    'link-view': String,
    'link-open-panel': [String, Boolean],
    'link-close-panel': Boolean,
    'link-open-popup': [String, Boolean],
    'link-close-popup': Boolean,
    'link-open-popover': [String, Boolean],
    'link-close-popover': Boolean,
    'link-open-login-screen': [String, Boolean],
    'link-close-login-screen': Boolean,
    'link-open-picker': [String, Boolean],
    'link-close-picker': Boolean,

    'after': [String, Number],
    'badge': [String, Number],
    'badge-color': String,
    'media-item': Boolean,
    'media-list-item': Boolean,
    'media-list': Boolean,
    'media-list-computed': Boolean,
    'divider': Boolean,
    'group-title': Boolean,
    'divider-or-group-title': Boolean,
    'swipeout': Boolean,
    'sortable': Boolean,
    'sortable-computed': Boolean,
    'accordion-item': Boolean,

    // Smart Select
    'smart-select': Boolean,
    'smart-select-searchbar': Boolean,
    'smart-select-searchbar-paceholder': String,
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
    'value': [String, Number],
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
    }
  },
  methods: {
    onClick: function (event) {
      this.$emit('click', event);
    },
    onDeleted: function (event) {
      this.$emit('deleted', event);
    },
    onDelete: function (event) {
      this.$emit('delete', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onClosed: function (event) {
      this.$emit('closed', event);
    },
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onOpened: function (event) {
      this.$emit('opened', event);
    },
    onSwipeout: function (event) {
      this.$emit('swipeout', event);
    },
    onChange: function (event) {
      this.$emit('change', event);
    }
  }
};

var ListItemContent = {
  render: function (c) {
    var titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl;
    var self = this;
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
        }
      });
    }
    // Media
    if (self.media || self.checkbox || self.radio && self.$theme.material) {
      inputIconEl = '<i class="icon icon-form-' +(self.radio ? 'radio' : 'checkbox')+ '"></i>';
      if (self.checkbox || self.radio && self.$theme.material) {
        mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: inputIconEl + (self.media ? self.media : '')}});
      }
      else {
        mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: self.media}});
      }
    }
    // Inner Elements
    if (self.title) {
      titleEl = c('div', {'class': {'item-title': true}, domProps: {innerHTML: self.title}}, [self.title]);
    }
    if (self.subtitle) {
      subtitleEl = c('div', {'class': {'item-subtitle': true}, domProps: {innerHTML: self.subtitle}}, [self.subtitle]);
    }
    if (self.text) {
      textEl = c('div', {'class': {'item-text': true}, domProps: {innerHTML: self.text}});
    }
    if (self.after || self.badge) {
      if (self.after) {
        afterEl = c('span', {domProps: {innerHTML: self.after}});
      }
      if (self.badge) {
        badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, [self.badge]);
      }
      afterWrapEl = c('div', {'class': {'item-after': true}}, [afterEl, badgeEl]);
    }
    if (self.mediaList) {
      titleRowEl = c('div', {'class': {'item-title-row': true}}, [titleEl, afterWrapEl]);
    }
    innerEl = c('div', {'class': {'item-inner': true}}, self.mediaList ? [titleRowEl, subtitleEl, textEl, self.$slots.default] : [titleEl, afterWrapEl, self.$slots.default]);
    // Finalize
    return c((self.checkbox || self.radio) ? 'label': 'div', {'class': {'item-content': true, 'label-checkbox': self.checkbox, 'label-radio': self.radio}, on: {click: self.onClick, change: self.onChange}}, [inputEl, mediaEl, innerEl]);
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
    'value': [String, Number],
    'readonly': Boolean,
    'required': Boolean,
    'disabled': Boolean
  },
  data: function () {
    return {};
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

var ListItemSwipeoutActions = {render: function(){with(this){return _h('div',{class:'swipeout-actions-' + sideComputed},[_t("default")])}},staticRenderFns: [],
  props: {
      'left': Boolean,
      'right': Boolean,
      'side': String,
      'sideComputed': String
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

var ListItemSwipeoutButton = {render: function(){with(this){return _h('a',{class:classObject,attrs:{"href":"#"},on:{"click":onClick}},[_t("default")])}},staticRenderFns: [],
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

var ListButton = {render: function(){with(this){return _h('li',[(title)?_h('a',{staticClass:"item-link list-button",class:classesObject,attrs:{"href":(typeof link !== 'string' ? '#' : link),"data-panel":typeof openPanel === 'string' ? openPanel : false,"data-popup":typeof openPopup === 'string' ? openPopup : false,"data-popover":typeof openPopover === 'string' ? openPopover : false,"data-picker":typeof openPicker === 'string' ? openPicker : false,"data-login-screen":typeof openLoginScreen === 'string' ? openLoginScreen : false,"data-sortable":typeof openSortable === 'string' ? openSortable : (typeof toggleSortable === 'string' ? toggleSortable : false),"data-tab":typeof tabLink === 'string' ? tabLink : false},domProps:{"innerHTML":_s(title)}}):_h('a',{staticClass:"item-link list-button",class:classesObject,attrs:{"href":(typeof link !== 'string' ? '#' : link),"data-panel":typeof openPanel === 'string' ? openPanel : false,"data-popup":typeof openPopup === 'string' ? openPopup : false,"data-popover":typeof openPopover === 'string' ? openPopover : false,"data-picker":typeof openPicker === 'string' ? openPicker : false,"data-login-screen":typeof openLoginScreen === 'string' ? openLoginScreen : false,"data-sortable":typeof openSortable === 'string' ? openSortable : (typeof toggleSortable === 'string' ? toggleSortable : false),"data-tab":typeof tabLink === 'string' ? tabLink : false}},[_t("default")])])}},staticRenderFns: [],
  props: {
    'title': [String, Number],
    'link': [String, Boolean],
    'external': Boolean,
    'link-external': Boolean,
    'back': Boolean,

    // View
    view: String,

    // Panel
    openPanel: [String, Boolean],
    closePanel: Boolean,

    // Popup
    openPopup: [String, Boolean],
    closePopup: Boolean,

    // Popover
    openPopover: [String, Boolean],
    closePopover: Boolean,

    // Login Screen
    openLoginScreen: [String, Boolean],
    closeLoginScreen: Boolean,

    // Picker
    openPicker: [String, Boolean],
    closePicker: Boolean,

    // Tab
    tabLink: [Boolean, String],

    // Sortable
    openSortable: [String, Boolean],
    closeSortable: Boolean,
    toggleSortable: [String, Boolean],
  },
  computed: {
    classesObject: function () {
      var self = this;
      var co = {
        'external': self.external || self.linkExternal,
        'back': self.back
      };

      // Panel
      if (self.closePanel) { co['close-panel'] = true; }
      if (self.openPanel) { co['open-panel'] = true; }

      // Popup
      if (self.closePopup) { co['close-popup'] = true; }
      if (self.openPopup) { co['open-popup'] = true; }

      // Popover
      if (self.closePopover) { co['close-popover'] = true; }
      if (self.openPopover) { co['open-popover'] = true; }

      // Picker
      if (self.closePicker) { co['close-picker'] = true; }
      if (self.openPicker) { co['open-picker'] = true; }

      // Login Screen
      if (self.closeLoginScreen) { co['close-login-screen'] = true; }
      if (self.openLoginScreen) { co['open-login-screen'] = true; }

      // Sortable
      if (self.closeSortable) { co['close-sortable'] = true; }
      if (self.openSortable) { co['open-sortable'] = true; }
      if (self.toggleSortable) { co['toggle-sortable'] = true; }

      // Tab
      if (self.tabLink) { co['tab-link'] = true; }

      return co;
    }
  },
  methods: {
    onClick: function (event) {
      this.$emit('click', event);
    }
  }
};

var ListLabel = {render: function(){with(this){return _h('div',{staticClass:"list-block-label"},[_t("default")])}},staticRenderFns: [],};

var AccordionItem = {render: function(){with(this){return _h('div',{staticClass:"accordion-item",on:{"open":onOpen,"opened":onOpened,"close":onClose,"closed":onClosed}},[_t("default")])}},staticRenderFns: [],
  methods: {
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onOpened: function (event) {
      this.$emit('opened', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onClosed: function (event) {
      this.$emit('closed', event);
    }
  }
};

var AccordionToggle = {render: function(){with(this){return _h('div',{staticClass:"accordion-item-toggle"},[_t("default")])}},staticRenderFns: [],};

var AccordionContent = {render: function(){with(this){return _h('div',{staticClass:"accordion-item-content"},[_t("default")])}},staticRenderFns: [],};

var ButtonsSegmented = {render: function(){with(this){return _h('div',{staticClass:"buttons-row",class:(colorComputed ? 'theme-' + colorComputed : '')},[_t("default")])}},staticRenderFns: [],
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
    openPanel: [String, Boolean],
    closePanel: Boolean,

    // Popup
    openPopup: [String, Boolean],
    closePopup: Boolean,

    // Popover
    openPopover: [String, Boolean],
    closePopover: Boolean,

    // Login Screen
    openLoginScreen: [String, Boolean],
    closeLoginScreen: Boolean,

    // Picker
    openPicker: [String, Boolean],
    closePicker: Boolean,

    // Tab
    tabLink: [Boolean, String],

    // Sortable
    openSortable: [String, Boolean],
    closeSortable: Boolean,
    toggleSortable: [String, Boolean],

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

      if (typeof self.openPanel === 'string') { ao['data-panel'] = self.openPanel; }
      if (typeof self.openPopup === 'string') { ao['data-popup'] = self.openPopup; }
      if (typeof self.openPopover === 'string') { ao['data-popover'] = self.openPopover; }
      if (typeof self.openPicker === 'string') { ao['data-picker'] = self.openPicker; }
      if (typeof self.openLoginScreen === 'string') { ao['data-login-screen'] = self.openLoginScreen; }
      if (typeof self.openSortable === 'string') { ao['data-sortable'] = self.openSortable; }
      if (typeof self.toggleSortable === 'string') { ao['data-sortable'] = self.toggleSortable; }
      if (typeof self.tabLink === 'string') { ao['data-tab'] = self.tabLink; }
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
      if (self.back) { co['back'] = true; }
      if (self.external) { co['external'] = true; }

      // Button
      ['round', 'fill', 'big', 'raised'].forEach(function (prop, index) {
        if (self[prop]) { co['button-' + prop] = true; }
      });

      // Active
      if (self.active) { co['active'] = true; }

      // Panel
      if (self.closePanel) { co['close-panel'] = true; }
      if (self.openPanel) { co['open-panel'] = true; }

      // Popup
      if (self.closePopup) { co['close-popup'] = true; }
      if (self.openPopup) { co['open-popup'] = true; }

      // Popover
      if (self.closePopover) { co['close-popover'] = true; }
      if (self.openPopover) { co['open-popover'] = true; }

      // Picker
      if (self.closePicker) { co['close-picker'] = true; }
      if (self.openPicker) { co['open-picker'] = true; }

      // Login Screen
      if (self.closeLoginScreen) { co['close-login-screen'] = true; }
      if (self.openLoginScreen) { co['open-login-screen'] = true; }

      // Sortable
      if (self.closeSortable) { co['close-sortable'] = true; }
      if (self.openSortable) { co['open-sortable'] = true; }
      if (self.toggleSortable) { co['toggle-sortable'] = true; }

      // Tab
      if (self.tabLink) { co['tab-link'] = true; }

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
    isTabbarLabel = self.tabLink && self.$parent && self.$parent.tabbar && self.$parent.labels;
    if (self.text) {
      if (self.badge) { badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.badge); }
      textEl = c('span', {class: {'tabbar-label': isTabbarLabel}}, [self.text, badgeEl]);
    }
    if (self.icon || self.iconMaterial || self.iconIon || self.iconFa) {
      if (self.iconBadge) { iconBadgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.iconBadge); }
      iconEl = c('f7-icon', {props: {
        material: self.iconMaterial,
        ion: self.iconIon,
        fa: self.iconFa,
        f7: self.iconF7,
        icon: self.icon
      }}, [iconBadgeEl]);
    }
    if (!self.text && self.$slots.default && self.$slots.default.length === 0 || self.iconOnly || !self.text && !self.$slots.default) {
      self.classesObject['icon-only'] = true;
    }
    self.classesObject['link'] = self.noLinkClass || isTabbarLabel ? false : true;
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
    if (self.icon || self.iconMaterial || self.iconIon || self.iconFa) {
      iconEl = c('f7-icon', {props: {
        material: self.iconMaterial,
        ion: self.iconIon,
        fa: self.iconFa,
        icon: self.icon
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

var GridRow = {render: function(){with(this){return _h('div',{staticClass:"row",class:{'no-gutter': noGutter}},[_t("default")])}},staticRenderFns: [],
  props: {
    'no-gutter': Boolean
  },
  data: function () {
    return {};
  }
};

var GridCol = {render: function(){with(this){return _h('div',{class:('col-' + width) + (tabletWidth ? ' tablet-' + tabletWidth : '')},[_t("default")])}},staticRenderFns: [],
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

var Preloader = {render: function(){with(this){return _h('span',{staticClass:"preloader",class:(color ? ('color-' + color + ' preloader-' + color) : ''),style:((sizeComputed ? 'width:' + (sizeComputed) + 'px; height:' + (sizeComputed) + 'px' : ''))})}},staticRenderFns: [],
  props: {
    'color': String,
    'size': [Number, String],
    'sizeComputed': Number
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

var Progressbar = {render: function(){with(this){return _h('span',{staticClass:"progressbar",class:[(color ? ('color-' + color + ' preloader-' + color) : ''), (infinite ? 'progressbar-infinite' : '')].join(' '),attrs:{"data-progress":progress}},[_h('span',{style:((progress ? 'translate3d(' + (-100 + progress) + '%,0,0)' : ''))})])}},staticRenderFns: [],
  props: {
    'color': String,
    'progress': Number,
    'infinite': Boolean
  }
};

var FormLabel = {render: function(){with(this){return _h('div',{staticClass:"item-title",class:{'label': !floating, 'floating-label' : floating}},[_t("default")])}},staticRenderFns: [],
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
      value: self.value,
      size: self.size,
      accept: self.accept,
      autocomplete: self.autocomplete,
      autofocus: self.autofocus,
      autosave: self.autosave,
      checked: self.checked,
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
      color: self.color
    };
    var on = {
      focus: self.onFocus,
      blur: self.onBlur,
      input: self.onInput,
      change: self.onChange,
      click: self.onClick
    };
    if (self.type === 'select' || self.type === 'textarea') {
      if (self.type === 'select') {
        inputEl = c('select', {attrs: attrs, on: on}, self.$slots.default);
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
      if(self.$slots.default && self.$slots.default.length > 0) {
        inputEl = self.$slots.default;
      }
      else {
        if (self.type === 'switch') {
          inputEl = c('f7-switch', {props: attrs, on: on});
        }
        else if (self.type === 'range') {
          inputEl = c('f7-range', {props: attrs, on: on});
        }
        else { inputEl = c('input', {attrs: attrs, on: on}); }
      }
    }

    var itemInput = self.wrap ? c('div', {'class': {'item-input': true}}, [inputEl]) : inputEl;
    return itemInput;
  },
  props: {
    // Inputs
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    placeholder: String,
    id: String,
    value: [String, Number],
    size: [String, Number],
    accept: [String, Number],
    autocomplete: [String],
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

    // Components
    color: String,
    wrap: {
      type: Boolean,
      default: true
    }
  },
  methods: (function () {
    var eventMethods = {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    };
    'Focus Blur Change Click'.split(' ').forEach(function (ev) {
      eventMethods['on' + ev] = function (event) {
        this.$emit(ev.toLowerCase(), event);
      };
    });
    return eventMethods
  })()
};

var FormSwitch = {render: function(){with(this){return _h('label',{staticClass:"label-switch",class:color ? 'color-' + color : '',on:{"click":onClick}},[_h('input',{style:(style),attrs:{"type":"checkbox","name":name,"id":id,"disabled":disabled,"readonly":readonly,"required":required},domProps:{"value":value,"checked":checked},on:{"input":onInput,"change":onChange}}),_m(0)])}},staticRenderFns: [function(){with(this){return _h('div',{staticClass:"checkbox"})}}],
  props: {
    name: String,
    id: String,
    value: [String, Number],
    checked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    style: String,

    color: String
  },
  methods: (function () {
    var eventMethods = {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    };
    'Change Click'.split(' ').forEach(function (ev) {
      eventMethods['on' + ev] = function (event) {
        this.$emit(ev.toLowerCase(), event);
      };
    });
    return eventMethods
  })()
};

var FormRange = {render: function(){with(this){return _h('div',{staticClass:"range-slider",class:color ? 'color-' + color : ''},[_h('input',{style:(style),attrs:{"type":"range","name":name,"id":id,"disabled":disabled,"readonly":readonly,"required":required,"max":max,"min":min,"step":step},domProps:{"value":value},on:{"input":onInput,"change":onChange,"click":onClick}})])}},staticRenderFns: [],
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
  methods: (function () {
    var eventMethods = {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    };
    'Change Click'.split(' ').forEach(function (ev) {
      eventMethods['on' + ev] = function (event) {
        this.$emit(ev.toLowerCase(), event);
      };
    });
    return eventMethods
  })()
};

var Chip = {render: function(){with(this){return _h('span',{staticClass:"chip",class:chipClassObject,on:{"click":onClick}},[(media)?_h('span',{staticClass:"chip-media",class:mediaClassObject,domProps:{"innerHTML":_s(media)}}):_e()," ",(text)?_h('span',{staticClass:"chip-label",domProps:{"innerHTML":_s(text)}}):_e()," ",(deleteable)?_h('a',{staticClass:"chip-delete",attrs:{"href":"#"},on:{"click":onDeleteClick}}):_e()])}},staticRenderFns: [],
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

var Fab = {render: function(){with(this){return _h('a',{staticClass:"floating-button",class:color ? 'color-' + color : false,attrs:{"href":"#"},on:{"click":onClick}},[_t("default")])}},staticRenderFns: [],
  props: {
    color: String
  },
  methods: {
    onClick: function (event) {
      this.$emit('click', event);
    }
  }
};

var FabSpeedDial = {render: function(){with(this){return _h('div',{staticClass:"speed-dial",class:theme ? 'theme-' + theme : false},[_t("default")])}},staticRenderFns: [],
  props: {
    theme: String
  }
};

var FabActions = {render: function(){with(this){return _h('div',{staticClass:"speed-dial-buttons",class:theme ? 'theme-' + theme : false},[_t("default")])}},staticRenderFns: [],
  props: {
    theme: String
  }
};

var FabAction = {render: function(){with(this){return _h('a',{class:color ? 'color-' + color : false,attrs:{"href":"#"},on:{"click":onClick}},[_t("default")])}},staticRenderFns: [],
  props: {
    color: String
  },
  methods: {
    onClick: function (event) {
      this.$emit('click', event);
    }
  }
};

var Swiper = {render: function(){with(this){return _h('div',{staticClass:"swiper-container"},[_h('div',{staticClass:"swiper-wrapper"},[_t("default")]),(paginationComputed === true)?_h('div',{staticClass:"swiper-pagination"}):_e(),(scrollbarComputed === true)?_h('div',{staticClass:"swiper-scrollbar"}):_e(),(nextButtonComputed === true)?_h('div',{staticClass:"swiper-button-next"}):_e(),(prevButtonComputed === true)?_h('div',{staticClass:"swiper-button-prev"}):_e()])}},staticRenderFns: [],
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
      if (this.pagination) {
        this.paramsComputed.pagination = '.swiper-pagination';
        return true;
      }
      return false;
    },
    scrollbarComputed: function () {
      if (this.scrollbar) {
        this.paramsComputed.scrollbar = '.swiper-scrollbar';
        return true;
      }
      return false;
    },
    nextButtonComputed: function () {
      if (this.nextButton) {
        this.paramsComputed.nextButton = '.swiper-button-next';
        return true;
      }
      return false;
    },
    prevButtonComputed: function () {
      if (this.prevButton) {
        this.paramsComputed.prevButton = '.swiper-button-prev';
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

var SwiperSlide = {render: function(){with(this){return _h('div',{staticClass:"swiper-slide"},[(zoom)?_h('div',{staticClass:"swiper-zoom-container"},[_t("default")]):_t("default")])}},staticRenderFns: [],
  props: {
    'zoom': Boolean
  }
};

var Messages = {render: function(){with(this){return _h('div',{staticClass:"messages",class:{}},[_t("default")])}},staticRenderFns: [],
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

var Message = {render: function(){with(this){return _h('div',{class:classesObject,on:{"click":onClick}},[_s(day)+" ",(time)?_h('span',[_s(time)]):_e(),(name)?_h('div',{staticClass:"message-name",on:{"click":onNameClick}},[_s(name)]):_e(),_h('div',{staticClass:"message-text",on:{"click":onTextClick}},[_t("default",[_s(text)]),(date)?_h('div',{staticClass:"message-date"},[_s(date)]):_e()]),(avatar)?_h('div',{staticClass:"message-avatar",style:('background-image:url(' + avatar + ')'),on:{"click":onAvatarClick}}):_e(),(label)?_h('div',{staticClass:"message-label"},[_s(label)]):_e(),_t("after")])}},staticRenderFns: [],
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

var Messagebar = {render: function(){with(this){return _h('div',{staticClass:"toolbar messagebar"},[_h('div',{staticClass:"toolbar-inner"},[_t("before"),_t("default",[_h('textarea',{ref:"area",attrs:{"placeholder":placeholder},on:{"input":onInput,"change":onChange,"focus":onFocus,"blur":onBlur}},[_s(value)]),(sendLink)?_h('f7-link',{on:{"click":onClick}},[_s(sendLink)]):_e()]),_t("after")])])}},staticRenderFns: [],
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
    value: [String, Number]
  },
  methods: {
    onChange: function (event) {
      this.$emit('change', event);
    },
    onInput: function (event) {
      this.$emit('click', event.target.value);
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

var Searchbar = {render: function(){with(this){return _h('form',{staticClass:"searchbar",on:{"search":onSearch,"enablesearch":onEnable,"disablesearch":onDisable,"clearsearch":onClear}},[_t("default",[_h('div',{staticClass:"searchbar-input"},[_h('input',{attrs:{"type":"search","placeholder":placeholder},on:{"input":onInput,"change":onChange,"focus":onFocus,"blur":onBlur}})," ",(clear)?_h('a',{staticClass:"searchbar-clear",attrs:{"href":"#"},on:{"click":onClearClick}}):_e()]),(cancelLink && !$theme.material)?_h('a',{staticClass:"searchbar-cancel",attrs:{"href":"#"},on:{"click":onCancelClick}},[_s(cancelLink)]):_e()])])}},staticRenderFns: [],
  beforeDestroy: function () {
    if (this.f7Searchbar && this.f7Searchbar.destroy) { this.f7Searchbar.destroy(); }
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    cancelLink: String,
    clear: {
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
  methods: {
    onChange: function (event) {
      this.$emit('change', event);
    },
    onInput: function (event) {
      this.$emit('click', event.target.value);
    },
    onFocus: function (event) {
      this.$emit('focus', event);
    },
    onBlur: function (event) {
      this.$emit('blur', event);
    },
    onSearch: function (event) {
      if(!event.detail) { return; }
      this.$emit('search', event.detail.query, event.detail.foundItems);
    },
    onClear: function (event) {
      this.$emit('clear', event);
    },
    onEnable: function (event) {
      this.$emit('enable', event);
    },
    onDisable: function (event) {
      this.$emit('disable', event);
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
    var tabs = c('div', {class: {tabs: true}}, [self.$slots.default]);
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

var Tab = {render: function(){with(this){return _h('div',{staticClass:"tab",class:active ? 'active' : false},[_t("default")])}},staticRenderFns: [],
  props: {
    'active': Boolean
  }
};

var Popover = {render: function(){with(this){return _h('div',{staticClass:"popover",on:{"open":onOpen,"opened":onOpened,"close":onClose,"closed":onClosed}},[_m(0),_h('div',{staticClass:"popover-content"},[_t("default")])])}},staticRenderFns: [function(){with(this){return _h('div',{staticClass:"popover-angle"})}}],
  methods: {
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onOpened: function (event) {
      this.$emit('opened', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onClosed: function (event) {
      this.$emit('closed', event);
    },
  }
};

var Popup = {render: function(){with(this){return _h('div',{staticClass:"popup",class:classesObject,style:(opened ? 'display: block' : false),on:{"open":onOpen,"opened":onOpened,"close":onClose,"closed":onClosed}},[_t("default")])}},staticRenderFns: [],
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
        'modal-in': this.opened
      };
      if (this.theme) { co['theme-' + this.theme] = true; }
      if (this.layout) { co['layout-' + this.layout] = true; }
      return co;
    }
  },
  methods: {
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onOpened: function (event) {
      this.$emit('opened', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onClosed: function (event) {
      this.$emit('closed', event);
    },
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
      class: {
        'picker-modal-inner': true
      },
    }, staticList);

    return c('div', {
      class: self.classesObject,
      attrs: {
        style: self.opened ? 'display: block' : false
      }
    }, [fixedList, innerEl]);
  },
  props: {
    'opened': Boolean,
    'theme': String,
    'layout': String,
  },
  computed: {
    classesObject: function () {
      var co = {
        'picker-modal': true,
        'opened': this.opened
      };
      if (this.theme) { co['theme-' + this.theme] = true; }
      if (this.opened) { co['modal-in'] = this.opened; }
      if (this.layout) { co['layout-' + this.layout] = true; }
      return co;
    }
  }
};

var LoginScreen = {render: function(){with(this){return _h('div',{staticClass:"login-screen",class:classesObject,style:(opened ? 'display: block' : false),on:{"open":onOpen,"opened":onOpened,"close":onClose,"closed":onClosed}},[_t("default")])}},staticRenderFns: [],
  props: {
    theme: String,
    layout: String,
    opened: Boolean
  },
  computed: {
    classesObject: function () {
      var co = {
        'modal-in': this.opened
      };
      if (this.theme) { co['theme-' + this.theme] = true; }
      if (this.layout) { co['layout-' + this.layout] = true; }
      return co;
    }
  },
  methods: {
    onOpen: function (event) {
      this.$emit('open', event);
    },
    onOpened: function (event) {
      this.$emit('opened', event);
    },
    onClose: function (event) {
      this.$emit('close', event);
    },
    onClosed: function (event) {
      this.$emit('closed', event);
    },
  }
};

var LoginScreenTitle = {render: function(){with(this){return _h('div',{staticClass:"login-screen-title"},[_t("default")])}},staticRenderFns: [],};

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
    function preroute(view, params, routes) {
      var url = params.url;
      var pageElement = params.pageElement;

      if (url && pageElement || !url || url === '#') {
        return true;
      }
      var matchingRoute = findMatchingRoute(url, routes);
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
      Vue.nextTick(function () {
          var newPage = view.pagesContainer.querySelector('.page:last-child');
          pagesVue.pages[id].pageElement = newPage;
          params.pageElement = newPage;
          if (params.isBack) {
            view.router.back(params);
          }
          else {
            view.router.load(params);
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

      // Add Panel Overlay
      if ($$('.panel').length > 0 && $$('.panel-overlay').length === 0) {
        if ($$('.statusbar-overlay').length > 0) {
          $$('<div class="panel-overlay"></div>').insertAfter('.statusbar-overlay');
        }
        else { $$(f7Params.root).prepend('<div class="panel-overlay"></div>'); }
      }

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
        if (self.$parent && self.$parent.$parent && self.$parent.$parent.$route) { self.$route = self.$parent.$parent.$route; }
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
        'f7-photo-browser': PhotoBrowser,
        'f7-picker-modal': PickerModal,
        't7-template': Template7Template,
      }
    });
  }
};

return framework7Vue;

})));

//# sourceMappingURL=framework7-vue.js.map
