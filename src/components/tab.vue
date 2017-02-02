<script>
  export default {
    props: {
      'active': Boolean,
      'routeTabId': String
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
        class: {
          'active': (activeTab) ? activeTab.tabId === self.routeTabId : self.active
        },        
        on: {
          'tab:show': self.onTabShow,
          'tab:hide': self.onTabHide
        }
      },
        [activeTab && activeTab.tabId === self.routeTabId ? c(activeTab.component, {tag: 'component'}) : self.$slots.default]
      );
    },    
    methods: {
      show: function () {
        if (!this.$f7) return;
        this.$f7.showTab(this.$el);
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
          const thisTabId = this.routeTabId;          

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