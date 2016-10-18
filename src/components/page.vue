<template>
  <div class="page"
    :data-page="name"
    :class="classObject"
    @pageBeforeInit="onPageBeforeInit"
    @pageInit="onPageInit"
    @pageReinit="onPageReinit"
    @pageBeforeAnimation="onPageBeforeAnimation"
    @pageAfterAnimation="onPageAfterAnimation"
    @pageBeforeRemove="onPageBeforeRemove"
    @pageBack="onPageBack"
    @pageAfterBack="onPageAfterBack"
    >
    <slot name="fixed-bars"></slot>
    <div class="page-content"
      :class="classObjectPageContent"
      :data-ptr-distance="pullToRefreshDistance || ptrDistance"
      :data-distance="infiniteScrollDistance"
      @pullstart="onPullstart"
      @pullmove="onPullmove"
      @pullend="onPullend"
      @refresh="onRefresh"
      @refreshdone="onRefreshdone"
      @infinite="onInfinite"
    >
      <div class="pull-to-refresh-layer" v-if="pullToRefresh">
        <div class="preloader"></div>
        <div class="pull-to-refresh-arrow"></div>
      </div>
      <div class="infinite-scroll-preloader" v-if="infiniteScroll && infiniteScroll === 'top'">
        <div class="preloader"></div>
      </div>
      <slot></slot>
      <div class="infinite-scroll-preloader" v-if="infiniteScroll && infiniteScroll !== 'top'">
        <div class="preloader"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      'name': String,
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
      'hide-tabbar-on-scroll': Boolean
    },
    computed: {
      classObject: function () {
        return {
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
      classObjectPageContent: function () {
        return {
          'pull-to-refresh-content': this.pullToRefresh,
          'infinite-scroll': this.infiniteScroll,
          'infinite-scroll-top': this.infiniteScroll === 'top',
          'hide-bars-on-scroll': this.hideBarsOnScroll,
          'hide-navbar-on-scroll': this.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': this.hideToolbarOnScroll,
          'hide-tabbar-on-scroll': this.hideTabbarOnScroll
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