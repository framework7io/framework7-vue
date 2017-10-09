<script>
  import f7PageContent from './page-content.vue';

  export default {
    name: 'f7-page',
    components: {
      f7PageContent,
    },
    render(c) {
      const fixedList = [];
      const staticList = [];
      const self = this;

      let pageContentEl;

      const fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab').split(' ');

      let tag;
      let child;
      let withSubnavbar;
      let withSearchbar;

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          child = self.$slots.default[i];
          tag = child.tag;
          if (!tag) {
            staticList.push(child);
            continue; // eslint-disable-line
          }
          let isFixed = false;
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
      if (self.pageContent) {
        pageContentEl = c('f7-page-content', {
          props: {
            ptr: self.ptr,
            ptrDistance: self.ptrDistance,
            ptrPreloader: self.ptrPreloader,
            infinite: self.infinite,
            infiniteTop: self.infiniteTop,
            infiniteDistance: self.infiniteDistance,
            infinitePreloader: self.infinitePreloader,
            hideBarsOnScroll: self.hideBarsOnScroll,
            hideNavbarOnScroll: self.hideNavbarOnScroll,
            hideToolbarOnScroll: self.hideToolbarOnScroll,
            messagesContent: self.messagesContent,
            loginScreen: self.loginScreen,
          },
          on: {
            'ptr:pullstart': self.onPtrPullStart,
            'ptr:pullmove': self.onPtrPullMove,
            'ptr:pullend': self.onPtrPullEnd,
            'ptr:refresh': self.onPtrRefresh,
            'ptr:done': self.onPtrRefreshDone,
            infinite: self.onInfinite,
          },
        }, [self.$slots.static, staticList]);
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

      if (withSubnavbar) self.classes['page-with-subnavbar'] = true;

      const pageEl = c('div', {
        staticClass: 'page',
        class: self.classes,
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
      withSubnavbar: Boolean,
      subnavbar: Boolean,
      noNavbar: Boolean,
      noToolbar: Boolean,
      tabs: Boolean,
      pageContent: {
        type: Boolean,
        default: true,
      },
      colorTheme: String,
      noSwipeback: Boolean,
      // Page Content Props
      ptr: Boolean,
      ptrDistance: Number,
      ptrPreloader: {
        type: Boolean,
        default: true,
      },
      infinite: Boolean,
      infiniteTop: Boolean,
      infiniteDistance: Number,
      infinitePreloader: {
        type: Boolean,
        default: true,
      },
      hideBarsOnScroll: Boolean,
      hideNavbarOnScroll: Boolean,
      hideToolbarOnScroll: Boolean,
      messagesContent: Boolean,
      loginScreen: Boolean,
    },
    computed: {
      classes() {
        const co = {
          stacked: this.stacked,
          tabs: this.tabs,
          'page-with-subnavbar': this.subnavbar || this.withSubnavbar,
          'no-navbar': this.noNavbar,
          'no-toolbar': this.noToolbar,
          'no-swipeback': this.noSwipeback,
        };
        if (this.theme) co[`color-theme-${this.colorTheme}`] = true;
        return co;
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
