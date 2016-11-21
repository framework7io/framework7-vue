<script>
  export default {
    render: function (c) {
      var inputEl;
      var self = this;
      var attrs = {
        name: self.name,
        type: self.type,
        placeholder: self.placeholder,
        id: self.id,
        value: self.value,
        size: self.size,
        accept: self.accept,
        autocomplete: self.autocomplete,
        autofocus: self.autofocus,
        autosave: self.autosave,
        checked: self.checked,
        disabled: self.disabled,
        max: self.max,
        maxlength: self.maxlength,
        min: self.min,
        minlength: self.minlength,
        step: self.step,
        multiple: self.multiple,
        readonly: self.readonly,
        required: self.required,
        style: self.style,
        color: self.color
      }
      var on = {
        focus: self.onFocus,
        blur: self.onBlur,
        input: self.onInput,
        change: self.onChange,
        click: self.onClick
      }
      if (self.type === 'select' || self.type === 'textarea') {
        if (self.type === 'select') {
          inputEl = c('select', {attrs: attrs, on: on}, self.$slots.default);
        }
        else {
          var textareaChildren = self.$slots.default;
          if (self.value) {
            delete attrs.value;
            textareaChildren = self.value;
          }

          inputEl = c('textarea', {attrs: attrs, on: on}, textareaChildren);
        }
      }
      else {
        if(self.$slots.default && self.$slots.default.length > 0) {
          inputEl = self.$slots.default;
        }
        else {
          if (self.type === 'switch') {
            inputEl = c('f7-switch', {props: attrs, on: on});
          }
          else if (self.type === 'range') {
            inputEl = c('f7-range', {props: attrs, on: on});
          }
          else inputEl = c('input', {attrs: attrs, on: on});
        }
      }

      var itemInput = self.wrap ? c('div', {'class': {'item-input': true}}, [inputEl]) : inputEl;
      return itemInput;
    },
    props: {
      // Inputs
      type: String,
      name: String,
      placeholder: String,
      id: String,
      value: [String, Number],
      size: [String, Number],
      accept: [String, Number],
      autocomplete: [String],
      autofocus: Boolean,
      autosave: String,
      checked: Boolean,
      disabled: Boolean,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],
      maxlength: [String, Number],
      minlength: [String, Number],
      multiple: Boolean,
      readonly: Boolean,
      required: Boolean,
      style: String,

      // Components
      color: String,
      wrap: {
        type: Boolean,
        default: true
      }
    },
    methods: (function () {
      var eventMethods = {
        onInput: function (event) {
          this.$emit('input', event.target.value);
        }
      };
      'Focus Blur Change Click'.split(' ').forEach(function (ev) {
        eventMethods['on' + ev] = function (event) {
          this.$emit(ev.toLowerCase(), event)
        }
      });
      return eventMethods
    })()
  }
</script>