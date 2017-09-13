<script>
  export default {
    render(c) {
      let pageContentEl;
      let ptrEl;
      let infiniteEl;
      const fixedList = [];
      const staticList = [];
      const self = this;

      if (self.ptr && (self.ptrPreloader)) {
        ptrEl = c('div', { staticClass: 'ptr-preloader' }, [
          c('div', { staticClass: 'preloader' }),
          c('div', { staticClass: 'ptr-arrow' }),
        ]);
      }
      if ((self.infinite) && self.infinitePreloader) {
        infiniteEl = c('div', { staticClass: 'preloader infinite-scroll-preloader' });
      }

      const fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab').split(' ');

      let tag;
      let child;
      let withSubnavbar;
      let withMessages;
      let withSearchbar;

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue;
          }
          let isFixed = false;
          if (tag.indexOf('messages') >= 0) withMessages = true;
          if (tag.indexOf('subnavbar') >= 0) withSubnavbar = true;
          if (tag.indexOf('searchbar') >= 0) withSearchbar = true;
          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixed = true;
            }
          }
          if (isFixed) fixedList.push(child);
          else staticList.push(child);
        }
      }

      if (fixedList.length > 0 && withSearchbar) {
        fixedList.push(c('div', { class: { 'searchbar-overlay': true } }));
      }
      if (withMessages) self.classesPageContent['messages-content'] = true;
      if (!self.noPageContent) {
        pageContentEl = c('div', {
          staticClass: 'page-content',
          class: self.classesPageContent,
          attrs: {
            'data-ptr-distance': self.ptrDistance,
            'data-infinite-distance': self.infiniteDistance,
          },
          on: {
            'ptr:pullstart': self.onPtrPullStart,
            'ptr:pullmove': self.onPtrPullMove,
            'ptr:pullend': self.onPtrPullEnd,
            'ptr:refresh': self.onPtrRefresh,
            'ptr:done': self.onPtrRefreshDone,
            infinite: self.onInfinite,
          },
        }, (self.infiniteTop ? [ptrEl, infiniteEl, self.$slots.static, staticList] : [ptrEl, self.$slots.static, staticList, infiniteEl]));
      } else {
        pageContentEl = [];
        if (self.$slots.default && fixedList.length > 0) {
          for (let i = 0; i < self.$slots.default.length; i += 1) {
            if (fixedList.indexOf(self.$slots.default[i]) < 0) {
              pageContentEl.push(self.$slots.default[i]);
            }
          }
        } else {
          pageContentEl = [self.$slots.default];
        }
      }
      fixedList.push(self.$slots.fixed);

      if (withSubnavbar) self.classesPage['with-subnavbar'] = true;
      const pageEl = c('div', {
        staticClass: 'page',
        class: self.classesPage,
        attrs: {
          'data-name': self.name,
        },
        on: {
          'page:mounted': self.onPageMounted,
          'page:init': self.onPageInit,
          'page:reinit': self.onPageReinit,
          'page:beforein': self.onPageBeforeIn,
          'page:afterain': self.onPageAfterIn,
          'page:beforeout': self.onPageBeforeOut,
          'page:afterout': self.onPageAfterOut,
          'page:beforeremove': self.onPageBeforeRemove,
        },
      }, [fixedList, pageContentEl]);

      return pageEl;
    },
    props: {
      name: String,
      stacked: Boolean,
      'with-subnavbar': Boolean,
      subnavbar: Boolean,
      'no-navbar': Boolean,
      'no-toolbar': Boolean,
      'no-tabbar': Boolean,
      ptr: Boolean,
      'ptr-distance': Number,
      'ptr-preloader': {
        type: Boolean,
        default: true,
      },
      infinite: Boolean,
      'infinite-top': Boolean,
      'infinite-distance': Number,
      'infinite-preloader': {
        type: Boolean,
        default: true,
      },
      'hide-bars-on-scroll': Boolean,
      'hide-navbar-on-scroll': Boolean,
      'hide-toolbar-on-scroll': Boolean,
      messagesContent: Boolean,
      tabs: Boolean,
      'no-page-content': Boolean,
      'login-screen': Boolean,
      colorTheme: String,
      'no-swipeback': Boolean,
    },
    computed: {
      classesPage() {
        const co = {
          stacked: this.stacked,
          tabs: this.tabs,
          'page-with-subnavbar': this.subnavbar || this.withSubnavbar,
          'no-navbar': this.noNavbar,
          'no-toolbar': this.noToolbar,
          'no-tabbar': this.noTabbar,
          'no-swipeback': this.noSwipeback,
        };
        if (this.theme) co[`color-theme-${this.colorTheme}`] = true;
        return co;
      },
      classesPageContent() {
        return {
          'ptr-content': this.ptr,
          'infinite-scroll-content': this.infinite,
          'infinite-scroll-top': this.infiniteTop,
          'hide-bars-on-scroll': this.hideBarsOnScroll,
          'hide-navbar-on-scroll': this.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': this.hideToolbarOnScroll,
          'messages-content': this.messagesContent,
          'login-screen-content': this.loginScreen,
        };
      },
    },
    methods: {
      onPtrPullStart(event) {
        this.$emit('ptr:pullstart', event);
      },
      onPtrPullMove(event) {
        this.$emit('ptr:pullmove', event);
      },
      onPtrPullEnd(event) {
        this.$emit('ptr:pullend', event);
      },
      onPtrRefresh(event) {
        this.$emit('ptr:refresh', event.detail);
      },
      onPtrRefreshDone(event) {
        this.$emit('ptr:done', event);
      },
      onInfinite(event) {
        this.$emit('infinite', event);
      },
      onPageMounted(event) {
        this.$emit('page:mounted', event, event.detail);
      },
      onPageInit(event) {
        this.$emit('page:init', event, event.detail);
      },
      onPageReinit(event) {
        this.$emit('page:reinit', event, event.detail);
      },
      onPageBeforeIn(event) {
        this.$emit('page:beforein', event, event.detail);
      },
      onPageBeforeOut(event) {
        this.$emit('page:beforeout', event, event.detail);
      },
      onPageAfterOut(event) {
        this.$emit('page:afterout', event, event.detail);
      },
      onPageAfterIn(event) {
        this.$emit('page:afteranimation', event, event.detail);
      },
      onPageBeforeRemove(event) {
        this.$emit('page:beforeremove', event, event.detail);
      },
    },
  };
</script>
