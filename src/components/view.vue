<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ViewProps = Utils.extend(
    {
      tab: Boolean,
      tabActive: Boolean,

      name: String,
      router: Boolean,
      linksView: [Object, String],
      url: String,
      main: Boolean,
      stackPages: Boolean,
      xhrCache: String,
      xhrCacheIgnore: Array,
      xhrCacheIgnoreGetParameters: Boolean,
      xhrCacheDuration: Number,
      preloadPreviousPage: Boolean,
      uniqueHistory: Boolean,
      uniqueHistoryIgnoreGetParameters: Boolean,
      allowDuplicateUrls: Boolean,
      reloadPages: Boolean,
      removeElements: Boolean,
      removeElementsWithTimeout: Boolean,
      removeElementsTimeout: Number,
      restoreScrollTopOnBack: Boolean,
      // Swipe Back
      iosSwipeBack: Boolean,
      iosSwipeBackAnimateShadow: Boolean,
      iosSwipeBackAnimateOpacity: Boolean,
      iosSwipeBackActiveArea: Number,
      iosSwipeBackThreshold: Number,
      // Push State
      pushState: Boolean,
      pushStateRoot: String,
      pushStateAnimate: Boolean,
      pushStateAnimateOnLoad: Boolean,
      pushStateSeparator: String,
      pushStateOnLoad: Boolean,
      // Animate Pages
      animate: Boolean,
      // iOS Dynamic Navbar
      iosDynamicNavbar: Boolean,
      iosSeparateDynamicNavbar: Boolean,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: Boolean,
      // MD Theme delay
      materialPageLoadDelay: Number,

      passRouteQueryToRequest: Boolean,
      passRouteParamsToRequest: Boolean,
      routes: Array,
      routesAdd: Array,

      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-view',
    props: ViewProps,
    render(c) {
      const self = this;
      const pages = self.pages.map(page => c(page.component, {
        tag: 'component',
        props: page.params ? page.params || {} : {},
        key: page.id,
      }));
      return c(
        'div',
        {
          staticClass: 'view',
          ref: 'view',
          class: self.classes,
          on: {
            'swipeback:move': self.onSwipeBackMove,
            'swipeback:beforechange': self.onSwipeBackBeforeChange,
            'swipeback:afterchange': self.onSwipeBackAfterChange,
            'swipeback:beforereset': self.onSwipeBackBeforeReset,
            'swipeback:afterreset': self.onSwipeBackAfterReset,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [
          self.$slots.default,
          pages,
        ]
      );
    },
    beforeDestroy() {
      const self = this;
      if (self.f7View && self.f7View.destroy) self.f7View.destroy();
    },
    data() {
      return {
        pages: [],
      };
    },
    computed: {
      classes() {
        return Utils.extend(
          {
            'view-main': this.main,
            'tab-active': this.tabActive,
            tab: this.tab,
          },
          Mixins.colorClasses(this)
        );
      },
    },
    methods: {
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;

        // Init View
        self.f7View = f7.views.create(self.$el, self.$options.propsData);
      },
      onSwipeBackMove(event) {
        this.$emit('swipeback:move', event, event.detail);
      },
      onSwipeBackBeforeChange(event) {
        this.$emit('swipeback:beforechange', event, event.detail);
      },
      onSwipeBackAfterChange(event) {
        this.$emit('swipeback:afterchange', event, event.detail);
      },
      onSwipeBackBeforeReset(event) {
        this.$emit('swipeback:beforereset', event, event.detail);
      },
      onSwipeBackAfterReset(event) {
        this.$emit('swipeback:afterreset', event, event.detail);
      },
      onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide(e) {
        this.$emit('tab:hide', e);
      },
    },
  };
</script>
