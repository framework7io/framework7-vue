<script>
  export default {
    render: function (c) {
      var titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl;
      var self = this;
      var slotsContent = [],
          slotsInner = [],
          slotsAfter = [],
          slotsMedia = [];
      if (self.$slots.default && self.$slots.default.length > 0) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var slotName = self.$slots.default[i].data ? self.$slots.default[i].data.slot : undefined;
          if (slotName && slotName === 'content') slotsContent.push(self.$slots.default[i]);
          if (slotName && slotName === 'after') slotsAfter.push(self.$slots.default[i]);
          if (slotName && slotName === 'media') slotsMedia.push(self.$slots.default[i]);
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
          }
        });
      }
      // Media
      if (self.media || self.checkbox || self.radio && self.$theme.material || slotsMedia.length) {
        if (self.checkbox || self.radio && self.$theme.material) {
          if (self.media) {
            inputIconEl = '<i class="icon icon-form-' +(self.radio ? 'radio' : 'checkbox')+ '"></i>'
            mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: inputIconEl + (self.media ? self.media : '')}});
          }
          else {
            var iconClasses = {'icon': true};
            iconClasses['icon-form-' + (self.radio ? 'radio' : 'checkbox')] = true;
            inputIconEl = c('i', {'class': iconClasses})
            mediaEl = c('div', {'class': {'item-media': true}}, [inputIconEl, slotsMedia]);
          }
        }
        else {
          if (self.media) mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: self.media}});
          else mediaEl = c('div', {'class': {'item-media': true}}, [slotsMedia]);
        }
      }
      // Inner Elements
      if (self.title) {
        titleEl = c('div', {'class': {'item-title': true}, domProps: {innerHTML: self.title}}, [self.title]);
      }
      if (self.subtitle) {
        subtitleEl = c('div', {'class': {'item-subtitle': true}, domProps: {innerHTML: self.subtitle}}, [self.subtitle]);
      }
      if (self.text) {
        textEl = c('div', {'class': {'item-text': true}, domProps: {innerHTML: self.text}});
      }
      if (self.after || self.badge || slotsAfter.length) {
        if (self.after) {
          afterEl = c('span', {domProps: {innerHTML: self.after}})
        }
        if (self.badge) {
          badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, [self.badge])
        }
        afterWrapEl = c('div', {'class': {'item-after': true}}, [afterEl, badgeEl, slotsAfter]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', {'class': {'item-title-row': true}}, [titleEl, afterWrapEl])
      }
      innerEl = c('div', {'class': {'item-inner': true}}, self.mediaList ? [titleRowEl, subtitleEl, textEl, self.$slots.inner] : [titleEl, afterWrapEl, slotsInner]);
      // Finalize
      return c((self.checkbox || self.radio) ? 'label': 'div', {'class': {'item-content': true, 'label-checkbox': self.checkbox, 'label-radio': self.radio}, on: {click: self.onClick}}, [inputEl, mediaEl, innerEl, slotsContent]);
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
      'value': [String, Number],
      'readonly': Boolean,
      'required': Boolean,
      'disabled': Boolean
    },
    data: function () {
      return {};
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      },
      onChange: function (event) {
        this.$emit('change', event)
      }
    }
  }
</script>