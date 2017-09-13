<script>
  export default {
    props: {
      tabActive: Boolean,
      id: String,
    },
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
          class: {
            active: self.tabActive,
          },
          on: {
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [self.tabContent ? c(self.tabContent.component, { tag: 'component', props: self.tabContent.params, key: self.tabContent.id }) : self.$slots.default]
      );
    },
    methods: {
      show(animated) {
        if (!this.$f7) return;
        this.$f7.tab.show(this.$el, animated);
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
