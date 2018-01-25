<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const TabProps = Utils.extend({
    tabActive: Boolean,
    id: String,
  }, Mixins.colorProps);

  export default {
    name: 'f7-tab',
    props: TabProps,
    data() {
      return {
        tabContent: null,
      };
    },
    render(c) {
      const self = this;

      return c(
        'div', {
          staticClass: 'tab',
          attrs: {
            id: self.id,
          },
          class: Utils.extend({
            'tab-active': self.tabActive,
          }, Mixins.colorClasses(self)),
          on: {
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [self.tabContent ? c(self.tabContent.component, { tag: 'component', props: self.tabContent.params, key: self.tabContent.id }) : self.$slots.default]
      );
    },
    methods: {
      show(animate) {
        if (!this.$f7) return;
        this.$f7.tab.show(this.$el, animate);
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
