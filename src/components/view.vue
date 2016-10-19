<template>
  <div class="view"
    :class="classObject"
    @swipeBackMove="onSwipeBackMove"
    @swipeBackBeforeChange="onSwipeBackBeforeChange"
    @swipeBackAfterChange="onSwipeBackAfterChange"
    @swipeBackBeforeReset="onSwipeBackBeforeReset"
    @swipeBackAfterReset="onSwipeBackAfterReset"
    >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    beforeDestroy: function () {
      this.f7View.destroy();
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

      'url': String,
    },
    computed: {
      classObject: function () {
        return {
          'view-main': this.main,
          'navbar-fixed': this.navbarFixed,
          'navbar-through': this.navbarThrough,
          'toolbar-fixed': this.toolbarFixed,
          'toolbar-through': this.toolbarThrough,
          'tabbar-fixed': this.tabbarFixed,
          'tabbar-through': this.tabbarThrough,
          'tabbar-labels-fixed': this.tabbarLabelsFixed,
          'tabbar-labels-through': this.tabbarLabesThrough,
        }
      },

    },
    methods: {
      onF7Init: function (f7) {
        var self = this;
        var params = {
          domCache: true,
          url: self.url,
          dynamicNavbar: true
        }
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
  }
</script>