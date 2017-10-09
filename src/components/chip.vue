<script>
  export default {
    name: 'f7-chip',
    render(c) {
      const self = this;
      let mediaEl;
      let labelEl;
      let deleteEl;
      if (self.$slots && self.$slots.media) {
        mediaEl = c('div', { staticClass: 'chip-media', class: self.mediaClasses }, self.$slots.media);
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
        class: self.chipClasses,
      }, [mediaEl, labelEl, deleteEl]);
    },
    props: {
      media: String,
      text: [String, Number],
      deleteable: Boolean,
      color: String,
      bgColor: String,
      textColor: String,
      mediaBgColor: String,
      mediaTextColor: String,
    },
    computed: {
      mediaClasses() {
        const c = {};
        if (this.mediaTextColor) c[`text-color-${this.mediaTextColor}`] = true;
        if (this.mediaBgColor) c[`bg-color-${this.mediaBgColor}`] = true;
        return c;
      },
      chipClasses() {
        const c = {};
        if (this.color) c[`color-${this.color}`] = true;
        if (this.bgColor) c[`bg-color-${this.bgColor}`] = true;
        if (this.textColor) c[`text-color-${this.textColor}`] = true;
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
