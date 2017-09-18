<script>
  import f7Icon from './icon.vue';
  import LinkMixin from '../mixins/link.vue';

  export default {
    components: {
      f7Icon,
    },
    mixins: [LinkMixin],
    render(c) {
      const self = this;
      let iconEl;
      let textEl;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || self.iconIfMd || self.iconIfIos) {
        iconEl = c('f7-icon', {
          props: {
            material: self.iconMaterial,
            ion: self.iconIon,
            fa: self.iconFa,
            f7: self.iconF7,
            icon: self.icon,
            ifMd: self.iconIfMd,
            ifIos: self.iconIfIos,
            size: self.iconSize,
          },
        });
      }
      self.classes.button = true;
      const linkEl = c('a', {
        class: self.classes,
        attrs: self.attrs,
        on: {
          click: self.onClick,
        },
      }, [iconEl, textEl, self.$slots.default]);

      return linkEl;
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
