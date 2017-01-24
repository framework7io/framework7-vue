<script>
  export default {
    render: function (c) {
      var titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl;
      var self = this;
      var slotsContentStart = [],
          slotsContent = [],
          slotsInnerStart = [],
          slotsInner = [],
          slotsAfterStart = [],
          slotsAfter = [],
          slotsMediaStart = [],
          slotsMedia = [];
      if (self.$slots.default && self.$slots.default.length > 0) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
          if (slotName && slotName === 'content-start') slotsContentStart.push(self.$slots.default[i]);
          if (slotName && slotName === 'content') slotsContent.push(self.$slots.default[i]);
          if (slotName && slotName === 'after-start') slotsAfterStart.push(self.$slots.default[i]);
          if (slotName && slotName === 'after') slotsAfter.push(self.$slots.default[i]);
          if (slotName && slotName === 'media-start') slotsMediaStart.push(self.$slots.default[i]);
          if (slotName && slotName === 'media') slotsMedia.push(self.$slots.default[i]);
          if (slotName && slotName === 'inner-start') slotsInnerStart.push(self.$slots.default[i]);
          if (!slotName || slotName && slotName === 'inner') slotsInner.push(self.$slots.default[i]);
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
            type: self.radio ? 'radio' : 'checkbox'
          },
          on: {
            change: self.onChange
          },
          domProps: {
            checked: self.checked
          }
        });
      }
      // Media
      if (self.media || self.checkbox || self.radio && self.$theme.material || slotsMediaStart.length || slotsMedia.length) {
        if (self.checkbox || self.radio && self.$theme.material) {
          if (self.media) {
            inputIconEl = '<i class="icon icon-form-' +(self.radio ? 'radio' : 'checkbox')+ '"></i>'
            mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: inputIconEl + (self.media ? self.media : '')}});
          }
          else {
            var iconClasses = {'icon': true};
            iconClasses['icon-form-' + (self.radio ? 'radio' : 'checkbox')] = true;
            inputIconEl = c('i', {'class': iconClasses})
            mediaEl = c('div', {'class': {'item-media': true}}, [slotsMediaStart, inputIconEl, slotsMedia]);
          }
        }
        else {
          if (self.media) mediaEl = c('div', {staticClass: 'item-media', domProps: {innerHTML: self.media}});
          else mediaEl = c('div', {staticClass: 'item-media'}, [slotsMediaStart, slotsMedia]);
        }
      }
      // Inner Elements
      if (self.title) {
        titleEl = c('div', {staticClass: 'item-title', domProps: {innerHTML: self.title}}, [self.title]);
      }
      if (self.subtitle) {
        subtitleEl = c('div', {staticClass: 'item-subtitle', domProps: {innerHTML: self.subtitle}}, [self.subtitle]);
      }
      if (self.text) {
        textEl = c('div', {staticClass: 'item-text', domProps: {innerHTML: self.text}});
      }
      if (self.after || self.badge || slotsAfter.length) {
        if (self.after) {
          afterEl = c('span', {domProps: {innerHTML: self.after}})
        }
        if (self.badge) {
          badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, [self.badge])
        }
        afterWrapEl = c('div', {staticClass: 'item-after'}, [slotsAfterStart, afterEl, badgeEl, slotsAfter]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', {staticClass: 'item-title-row'}, [titleEl, afterWrapEl])
      }
      innerEl = c('div', {staticClass: 'item-inner'}, self.mediaList ? [slotsInnerStart, titleRowEl, subtitleEl, textEl, slotsInner] : [slotsInnerStart, titleEl, afterWrapEl, slotsInner]);
      // Finalize
      return c((self.checkbox || self.radio) ? 'label': 'div', {staticClass: 'item-content', 'class': {'label-checkbox': self.checkbox, 'label-radio': self.radio}, on: {click: self.onClick}}, [slotsContentStart, inputEl, mediaEl, innerEl, slotsContent]);
    },
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],
      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-list': Boolean,

      'checkbox': Boolean,
      'checked': Boolean,
      'radio': Boolean,
      'name': String,
      'value': [String, Number, Boolean, Array],
      'input-value': [String, Number],
      'readonly': Boolean,
      'required': Boolean,
      'disabled': Boolean
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      },
      onChange: function (event) {
        this.$emit('change', event);
      }
    }
  }
</script>