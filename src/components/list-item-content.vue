<script>
  export default {
    render: function (c) {
      var titleEl, afterWrapEl, afterEl, badgeEl, innerEl, titleRowEl, subtitleEl, textEl, mediaEl, inputEl, inputIconEl;
      var self = this;
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
          }
        });
      }
      // Media
      if (self.media || self.checkbox || self.radio && self.$material) {
        inputIconEl = '<i class="icon icon-form-' +(self.radio ? 'radio' : 'checkbox')+ '"></i>'
        if (self.checkbox || self.radio && self.$material) {
          mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: inputIconEl + (self.media ? self.media : '')}});
        }
        else {
          mediaEl = c('div', {'class': {'item-media': true}, domProps: {innerHTML: self.media}});
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
      if (self.after || self.badge) {
        if (self.after) {
          afterEl = c('span', {domProps: {innerHTML: self.after}})
        }
        if (self.badge) {
          badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, [self.badge])
        }
        afterWrapEl = c('div', {'class': {'item-after': true}}, [afterEl, badgeEl]);
      }
      if (self.mediaList) {
        titleRowEl = c('div', {'class': {'item-title-row': true}}, [titleEl, afterWrapEl])
      }
      innerEl = c('div', {'class': {'item-inner': true}}, self.mediaList ? [titleRowEl, subtitleEl, textEl, self.$slots.default] : [titleEl, afterWrapEl, self.$slots.default]);
      // Finalize
      return c((self.checkbox || self.radio) ? 'label': 'div', {'class': {'item-content': true, 'label-checkbox': self.checkbox, 'label-radio': self.radio}, on: {click: self.onClick, change: self.onChange}}, [inputEl, mediaEl, innerEl]);
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