<script>
  import LinkMixin from '../mixins/link.vue';
  export default {
    render: function (c) {
      var iconEl, textEl, self = this;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7  || self.iconIfMaterial || self.iconIfIos) {
        iconEl = c('f7-icon', {props: {
          material: self.iconMaterial,
          ion: self.iconIon,
          fa: self.iconFa,
          f7: self.iconF7,
          icon: self.icon,
          ifMaterial: self.iconIfMaterial,
          ifIos: self.iconIfIos,
          size: self.iconSize
        }})
      }
      self.classesObject['button'] = true;
      var linkEl = c('a', {
        class: self.classesObject,
        attrs: self.attrsObject,
        on: {
          click: self.onClick
        }
      }, [iconEl, textEl, self.$slots.default]);

      return linkEl;
    },
    mixins: [LinkMixin],
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>