<script>
  import LinkMixin from '../mixins/link.vue';
  export default {
    mixins: [LinkMixin],
    render: function (c) {
      var iconEl, textEl, self = this;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon) {
        var iconClass = {'icon': true};
        iconClass[self.icon] = true;
        iconEl = c('i', {class:iconClass})
      }
      if (!self.text && self.$slots.default && self.$slots.default.length === 0) {
        self.classesObject['icon-only'] = true;
      }
      self.classesObject['link'] = self.noLinkClass ? false : true;
      var linkEl = c('a', {
        class: self.classesObject,
        attrs: self.attrsObject,
        on: {
          click: self.onClick
        }
      }, [iconEl, textEl, self.$slots.default]);
      return linkEl;
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>