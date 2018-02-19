<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const PageContentProps = Utils.extend({
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
  }, Mixins.colorProps);

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
    props: PageContentProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          tab: self.tab,
          'tab-active': self.tabActive,
          'ptr-content': self.ptr,
          'infinite-scroll-content': self.infinite,
          'infinite-scroll-top': self.infiniteTop,
          'hide-bars-on-scroll': self.hideBarsOnScroll,
          'hide-navbar-on-scroll': self.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': self.hideToolbarOnScroll,
          'messages-content': self.messagesContent,
          'login-screen-content': self.loginScreen,
        }, Mixins.colorClasses(self));
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
        this.$emit('ptr:refresh', event, event.detail);
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
