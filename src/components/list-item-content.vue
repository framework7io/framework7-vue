<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7Badge from './badge.vue';

  const ListItemContentProps = Utils.extend(
    {
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
      itemInput: Boolean,
      itemInputWithInfo: Boolean,
      inlineLabel: Boolean,

      checkbox: Boolean,
      checked: Boolean,
      radio: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-list-item-content',
    components: {
      f7Badge,
    },
    props: ListItemContentProps,
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
      const slotsMedia = [];
      const slotsBeforeTitle = [];
      const slotsTitle = [];
      const slotsAfterTitle = [];
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
          if (slotName === 'media') slotsMedia.push(self.$slots.default[i]);
          if (slotName === 'inner-start') slotsInnerStart.push(self.$slots.default[i]);
          if (slotName === 'inner-end') slotsInnerEnd.push(self.$slots.default[i]);
          if (slotName === 'before-title') slotsBeforeTitle.push(self.$slots.default[i]);
          if (slotName === 'title') slotsTitle.push(self.$slots.default[i]);
          if (slotName === 'after-title') slotsAfterTitle.push(self.$slots.default[i]);
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
            value: self.value,
            name: self.name,
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
      if (self.media || slotsMedia.length) {
        let mediaImgEl;
        if (self.media) {
          mediaImgEl = c('img', { attrs: { src: self.media } });
        }
        mediaEl = c('div', { staticClass: 'item-media' }, [mediaImgEl, slotsMedia]);
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
        titleRowEl = c('div', { staticClass: 'item-title-row' }, [slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl]);
      }
      innerEl = c('div', { staticClass: 'item-inner' }, self.mediaList ? [slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd] : [slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd]);

      // Finalize
      return c((self.checkbox || self.radio) ? 'label' : 'div', {
        staticClass: 'item-content',
        class: Utils.extend(
          {
            'item-checkbox': self.checkbox,
            'item-radio': self.radio,
            'item-input': self.itemInput || self.itemInputForced,
            'inline-label': self.inlineLabel || self.inlineLabelForced,
            'item-input-with-info': self.itemInputWithInfo || self.itemInputWithInfoForced,
          },
          Mixins.colorClasses(self)
        ),
        on: {
          click: self.onClick,
        },
      }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
    },
    data() {
      return {
        itemInputForced: false,
        inlineLabelForced: false,
        itemInputWithInfoForced: false,
      };
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
