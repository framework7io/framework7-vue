<script>
  export default {
    props: {
      'active': Boolean,
      'id': String
    },
    data: function () {
      return {
        routeInfo: {
          activeTab: this.$route && this.$route.route.tab
        }
      };
    },
    render: function (c) {
      var self = this;

      const activeTab = self.routeInfo.activeTab;

      return c('div', {
        staticClass: 'tab',
        attrs: {
          id: self.id
        },
        class: {
          'active': (activeTab) ? activeTab.tabId === self.id : self.active
        },
        on: {
          'tab:show': self.onTabShow,
          'tab:hide': self.onTabHide
        }
      },
        [activeTab && activeTab.tabId === self.id ? c(activeTab.component, {tag: 'component', props: self.$route.params}) : self.$slots.default]
      );
    },
    methods: {
      show: function (animated) {
        if (!this.$f7) return;
        this.$f7.showTab(this.$el, animated);
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      },
      onRouteChange: function (e) {
        if (e.route.tab) {
          const currentlyActiveTabId = this.routeInfo.activeTab && this.routeInfo.activeTab.tabId;
          const nextActiveTabId = e.route.tab.tabId;
          const thisTabId = this.id;

          if (thisTabId === currentlyActiveTabId && nextActiveTabId !== thisTabId) {
            this.$$(this.$el).trigger('tab:hide');
          } else if (thisTabId !== currentlyActiveTabId && nextActiveTabId === thisTabId) {
            this.$$(this.$el).trigger('tab:show');
          }

          this.$set(this.routeInfo, 'activeTab', e.route.tab);
        }
      }
    }
  }
</script>
