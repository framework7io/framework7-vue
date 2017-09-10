<script>
  export default {
    render(c) {
      const self = this;
      const pages = self.pages.map((page) => {
        return c(page.component, {
          tag: 'component',
          props: page.params ? page.params || {} : {},
          key: page.id,
        });
      });
      return c('div',
        {
          staticClass: 'view',
          ref: 'view',
          class: self.classesObject,
        },
        [
          self.$slots.default,
          pages
        ]
      );
    },
    beforeDestroy: function () {
      var self = this;
      if (self.f7View && self.f7View.destroy) self.f7View.destroy();
    },
    props: {
      'main': Boolean,
      'tab': Boolean,
      'tab-active': Boolean,

      url: String,
      main: Boolean,
      stackPages: String,
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
      animateWithJS: Boolean,
      // iOS Dynamic Navbar
      iosDynamicNavbar: Boolean,
      iosSeparateDynamicNavbar: Boolean,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: Boolean,
      // MD Theme delay
      materialPageLoadDelay: Number,

      init: {
        type: Boolean,
        default: true
      },

      'color-theme': String,
    },
    data() {
      return {
        pages: [],
      };
    },
    computed: {
      classesObject: function () {
        var co = {
          'view-main': this.main,
          'tab-active': this.tabActive,
          'tab': this.tab,
        }
        if (this.colorTheme) co['color-theme-' + this.colorTheme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        return co;
      },
    },
    methods: {
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) return;

        // Init View
        self.f7View = f7.views.create(self.$el, self.$options.propsData);
      },
      onSwipeBackMove: function (event) {
        this.$emit('swipeback:move', event, event.detail);
      },
      onSwipeBackBeforeChange: function (event) {
        this.$emit('swipeback:beforechange', event, event.detail);
      },
      onSwipeBackAfterChange: function (event) {
        this.$emit('swipeback:afterchange', event, event.detail);
      },
      onSwipeBackBeforeReset: function (event) {
        this.$emit('swipeback:beforereset', event, event.detail);
      },
      onSwipeBackAfterReset: function (event) {
        this.$emit('swipeback:afterreset', event, event.detail);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      }
    }
  }
</script>
