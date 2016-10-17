<template>
  <div class="page" :data-page="name" :class="classObject">
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
        this.$emit('pullstart', event, event.target);
      },
      onPullmove: function (event) {
        this.$emit('pullmove', event, event.target);
      },
      onPullend: function (event) {
        this.$emit('pullend', event, event.target);
      },
      onRefresh: function (event) {
        this.$emit('refresh', event, event.target);
      },
      onRefreshdone: function (event) {
        this.$emit('refreshdone', event, event.target);
      },
      onInfinite: function (event) {
        this.$emit('infinite', event, event.target);
      }
    }
  }
</script>