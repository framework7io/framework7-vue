<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ChipProps = Utils.extend({
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
  }, Mixins.colorProps);

  export default {
    name: 'f7-chip',
    props: ChipProps,
    render(c) {
      const self = this;
      let mediaEl;
      let labelEl;
      let deleteEl;
      if (self.media || (self.$slots && self.$slots.media)) {
        mediaEl = c('div', { staticClass: 'chip-media', class: self.mediaClasses }, self.media || self.$slots.media);
      }
      if (self.text || (self.$slots && self.$slots.text)) {
        labelEl = c('div', { staticClass: 'chip-label' }, [self.text, self.$slots.text]);
      }
      if (self.deleteable) {
        deleteEl = c('a', {
          staticClass: 'chip-delete',
          attrs: {
            href: '#',
          },
          on: {
            click: self.onDeleteClick,
          },
        });
      }
      return c('div', {
        staticClass: 'chip',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [mediaEl, labelEl, deleteEl]);
    },
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
      mediaClasses() {
        const c = {};
        if (this.mediaTextColor) c[`text-color-${this.mediaTextColor}`] = true;
        if (this.mediaBgColor) c[`bg-color-${this.mediaBgColor}`] = true;
        return c;
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
      onDeleteClick(event) {
        this.$emit('delete', event);
      },
    },
  };
</script>
