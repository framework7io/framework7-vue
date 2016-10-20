<script>
  export default {
    render: function (c) {
      var pageEl, pageContentEl, ptrEl, infiniteEl, fixedList = [], staticList = [];
      var self = this;

      if (self.pullToRefresh) {
        ptrEl = c('div', {class: {'pull-to-refresh-layer': true}} ,[
          c('div', {class: {'preloader': true}}),
          c('div', {class: {'pull-to-refresh-arrow': true}})
        ]);
      }
      if (self.infiniteScroll) {
        infiniteEl = c('div', {class: {'infinite-scroll-preloader': true}} ,[
          c('div', {class: {'preloader': true}})
        ]);
      }

      var fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab speed-dial floating-button').split(' ');
      var tag, child;
      for (var i = 0; i < self.$slots.default.length; i++) {
        child = self.$slots.default[i];
        tag = child.tag;
        if (!tag) {
          staticList.push(child);
          continue;
        }
        var isFixed = false, withSubnavbar, withMessages, withSearchbar;
        if (tag.indexOf('messages') >= 0) withMessages = true;
        if (tag.indexOf('subnavbar') >= 0) withSubnavbar = true;
        if (tag.indexOf('searchbar') >= 0) withSearchbar = true;
        for (var j = 0; j < fixedTags.length; j++) {
          if (tag.indexOf(fixedTags[j]) >= 0) {
            isFixed = true;
          }
        }
        if (isFixed) fixedList.push(child);
        else staticList.push(child);
      }
      if (fixedList.length > 0 && withSearchbar) {
        fixedList.push(c('div', {class:{'searchbar-overlay': true}}));
      }
      if (withMessages) self.classesObjectPageContent['messages-content'] = true;
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
      }, (self.infiniteScroll === 'top' ? [ptrEl, infiniteEl, self.$slots.static, staticList] : [ptrEl, self.$slots.static, staticList, infiniteEl]))

      fixedList.push(self.$slots.fixed);

      if (withSubnavbar) self.classesObjectPage['with-subnavbar'] = true;
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
      'pull-to-refresh': Boolean,
      'pull-to-refresh-distance': Number,
      'ptr-distance': Number,
      'infinite-scroll': [Boolean, String],
      'infinite-scroll-distance': Number,
      'hide-bars-on-scroll': Boolean,
      'hide-navbar-on-scroll': Boolean,
      'hide-toolbar-on-scroll': Boolean,
      'hide-tabbar-on-scroll': Boolean,
      'messages': Boolean
    },
    computed: {
      classesObjectPage: function () {
        return {
          'page': true,
          'cached': this.cached,
          'navbar-fixed': this.navbarFixed,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough,
          'with-subnavbar': this.subnavbar || this.withSubnavbar
        }
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
          'messages-content': this.messages
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
  }
</script>