<template>
  <div class="page-content" :class="classes" @tab:show="onTabShow" @tab:hide="onTabHide"><slot></slot></div>
</template>
<script>
  export default {
    name: 'f7-page-content',
    render(c) {
      const self = this;

      let ptrEl;
      let infiniteEl;

      if (self.ptr && (self.ptrPreloader)) {
        ptrEl = c('div', { staticClass: 'ptr-preloader' }, [
          c('div', { staticClass: 'preloader' }),
          c('div', { staticClass: 'ptr-arrow' }),
        ]);
      }
      if ((self.infinite) && self.infinitePreloader) {
        infiniteEl = c('div', { staticClass: 'preloader infinite-scroll-preloader' });
      }
      return c('div', {
        staticClass: 'page-content',
        class: self.classes,
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
          'tab:show': self.onTabShow,
          'tab:hide': self.onTabHide,
        },
      }, (self.infiniteTop ? [ptrEl, infiniteEl, self.$slots.default] : [ptrEl, self.$slots.default, infiniteEl]));
    },
    props: {
      tab: Boolean,
      tabActive: Boolean,
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
        const self = this;
        return {
          tab: self.tab,
          'tab-active': self.tabActive,
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
      onTabShow(e) {
        const self = this;
        self.$emit('tab:show', e);
      },
      onTabHide(e) {
        const self = this;
        self.$emit('tab:hide', e);
      },
    },
  };
</script>
