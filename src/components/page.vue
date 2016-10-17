<template>
  <div class="page" :data-page="name" :class="{'navbar-fixed': navbar === 'fixed', 'navbar-through': navbar === 'through', 'toolbar-fixed': toolbar === 'fixed', 'toolbar-through' : toolbar === 'through', 'with-subnavbar': subnavbar || withSubnavbar}">
    <slot name="fixed-bars"></slot>
    <div class="page-content"
      :class="{'pull-to-refresh-content' : pullToRefresh, 'infinite-scroll': infiniteScroll, 'infinite-scroll-top': infiniteScroll === 'top'}"
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
      'navbar': String,
      'toolbar': String,
      'with-subnavbar': Boolean,
      'subnavbar': Boolean,
      'pull-to-refresh': Boolean,
      'pull-to-refresh-distance': Number,
      'ptr-distance': Number,
      'infinite-scroll': [Boolean, String],
      'infinite-scroll-distance': Number
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