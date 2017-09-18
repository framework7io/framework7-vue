<script>
  import f7Badge from './badge.vue';

  export default {
    components: {
      f7Badge,
    },
    render(c) {
      const self = this;
      const slotsContentStart = [];
      const slotsContent = [];
      const slotsContentEnd = [];
      const slotsInnerStart = [];
      const slotsInner = [];
      const slotsInnerEnd = [];
      const slotsAfterStart = [];
      const slotsAfter = [];
      const slotsAfterEnd = [];
      const slotsMediaStart = [];
      const slotsMedia = [];
      const slotsMediaEnd = [];
      const slotsTitle = [];
      const slotsSubtitle = [];
      const slotsText = [];
      const slotsHeader = [];
      const slotsFooter = [];

      let [titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl, headerEl, footerEl] = [];

      if (self.$slots.default && self.$slots.default.length > 0) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          const slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
          if (!slotName || (slotName === 'inner')) slotsInner.push(self.$slots.default[i]);
          if (slotName === 'content-start') slotsContentStart.push(self.$slots.default[i]);
          if (slotName === 'content') slotsContent.push(self.$slots.default[i]);
          if (slotName === 'content-end') slotsContentEnd.push(self.$slots.default[i]);
          if (slotName === 'after-start') slotsAfterStart.push(self.$slots.default[i]);
          if (slotName === 'after') slotsAfter.push(self.$slots.default[i]);
          if (slotName === 'after-end') slotsAfterEnd.push(self.$slots.default[i]);
          if (slotName === 'media-start') slotsMediaStart.push(self.$slots.default[i]);
          if (slotName === 'media') slotsMedia.push(self.$slots.default[i]);
          if (slotName === 'media-end') slotsMediaEnd.push(self.$slots.default[i]);
          if (slotName === 'inner-start') slotsInnerStart.push(self.$slots.default[i]);
          if (slotName === 'inner-end') slotsInnerEnd.push(self.$slots.default[i]);
          if (slotName === 'title') slotsTitle.push(self.$slots.default[i]);
          if (slotName === 'subtitle') slotsSubtitle.push(self.$slots.default[i]);
          if (slotName === 'text') slotsText.push(self.$slots.default[i]);
          if (slotName === 'header') slotsHeader.push(self.$slots.default[i]);
          if (slotName === 'footer') slotsFooter.push(self.$slots.default[i]);
        }
      }

      // Input
      if (self.radio || self.checkbox) {
        inputEl = c('input', {
          attrs: {
            value: self.inputValue,
            name: self.inputName,
            checked: self.checked,
            readonly: self.readonly,
            disabled: self.disabled,
            required: self.required,
            type: self.radio ? 'radio' : 'checkbox',
          },
          on: {
            change: self.onChange,
          },
          domProps: {
            checked: self.checked,
            disabled: self.disabled,
            required: self.required,
          },
        });
        inputIconEl = c('i', { staticClass: `icon icon-${self.radio ? 'radio' : 'checkbox'}` });
      }
      // Media
      if (self.media || slotsMediaStart.length || slotsMedia.length || slotsMediaEnd.length) {
        mediaEl = c('div', { staticClass: 'item-media' }, [slotsMediaStart, slotsMedia, slotsMediaEnd]);
      }
      // Inner Elements
      if (self.header || slotsHeader.length) {
        headerEl = c('div', { staticClass: 'item-header' }, [self.header, slotsHeader]);
      }
      if (self.footer || slotsFooter.length) {
        footerEl = c('div', { staticClass: 'item-footer' }, [self.footer, slotsFooter]);
      }
      if (self.title || slotsTitle.length) {
        titleEl = c('div', { staticClass: 'item-title' }, [!self.mediaList && headerEl, self.title, slotsTitle, !self.mediaList && footerEl]);
      }
      if (self.subtitle || slotsSubtitle.length) {
        subtitleEl = c('div', { staticClass: 'item-subtitle' }, [self.subtitle, slotsSubtitle]);
      }
      if (self.text || slotsText.length) {
        textEl = c('div', { staticClass: 'item-text' }, [self.text, slotsText]);
      }
      if (self.after || self.badge || slotsAfter.length) {
        if (self.after) {
          afterEl = c('span', [self.after]);
        }
        if (self.badge) {
          badgeEl = c('f7-badge', { props: { color: self.badgeColor } }, [self.badge]);
        }
        afterWrapEl = c('div', { staticClass: 'item-after' }, [slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', { staticClass: 'item-title-row' }, [titleEl, afterWrapEl]);
      }
      innerEl = c('div', { staticClass: 'item-inner' }, self.mediaList ? [slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd] : [slotsInnerStart, titleEl, afterWrapEl, slotsInner, slotsInnerEnd]);

      // Finalize
      return c((self.checkbox || self.radio) ? 'label' : 'div', {
        staticClass: 'item-content',
        class: {
          'item-checkbox': self.checkbox,
          'item-radio': self.radio,
        },
        on: {
          click: self.onClick,
        },
      }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
    },
    props: {
      title: [String, Number],
      text: [String, Number],
      media: String,
      subtitle: [String, Number],
      header: [String, Number],
      footer: [String, Number],
      after: [String, Number],
      badge: [String, Number],
      badgeColor: String,
      mediaList: Boolean,

      checkbox: Boolean,
      checked: Boolean,
      radio: Boolean,
      inputName: String,
      inputValue: [String, Number, Boolean, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
      onChange(event) {
        this.$emit('change', event);
      },
      onInput(event) {
        this.$emit('input', event);
      },
    },
  };
</script>
