<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7Toggle from './toggle.vue';
  import f7Range from './range.vue';

  const InputProps = Utils.extend(
    {
      // Inputs
      type: String,
      name: String,
      value: [String, Number, Array],
      placeholder: String,
      id: String,
      size: [String, Number],
      accept: [String, Number],
      autocomplete: [String],
      autocorrect: [String],
      autocapitalize: [String],
      spellcheck: [String],
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
      inputStyle: String,
      pattern: String,
      validate: Boolean,
      tabindex: [String, Number],
      resizable: Boolean,
      clearButton: Boolean,

      // Error, Info
      errorMessage: String,
      info: String,

      // Components
      wrap: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-input',
    components: {
      f7Toggle,
      f7Range,
    },
    props: InputProps,
    render(c) {
      let inputEl;
      const self = this;
      const attrs = {
        name: self.name,
        type: self.type,
        placeholder: self.placeholder,
        id: self.id,
        value: self.value,
        size: self.size,
        accept: self.accept,
        autocomplete: self.autocomplete,
        autocorrect: self.autocorrect,
        autocapitalize: self.autocapitalize,
        spellcheck: self.spellcheck,
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
        pattern: self.pattern,
        validate: self.validate,
        tabindex: self.tabindex,
        'data-error-message': self.errorMessage,
      };
      const on = {
        focus: self.onFocus,
        blur: self.onBlur,
        input: self.onInput,
        change: self.onChange,
        'textarea:resize': self.onTextareaResize,
        'input:notempty': self.onInputNotEmpty,
        'input:empty': self.onInputEmpty,
        'input:clear': self.onInputClear,
      };
      if (self.type === 'select' || self.type === 'textarea' || self.type === 'file') {
        delete attrs.value;
        if (self.type === 'select') {
          inputEl = c('select', {
            attrs, on, style: self.inputStyle, domProps: { value: self.value },
          }, self.$slots.default);
        } else if (self.type === 'file') {
          inputEl = c('input', { attrs, style: self.inputStyle, on }, self.$slots.default);
        } else {
          inputEl = c('textarea', {
            attrs,
            style: self.inputStyle,
            on,
            class: { resizable: self.resizable },
            domProps: { value: self.value },
          }, self.$slots.default);
        }
      } else if ((self.$slots.default && self.$slots.default.length > 0) || !self.type) {
        inputEl = self.$slots.default;
      } else if (self.type === 'toggle') {
        inputEl = c('f7-toggle', { props: attrs, on, attrs: { id: attrs.id } });
      } else if (self.type === 'range') {
        on['range:change'] = self.onChange;
        inputEl = c('f7-range', { props: attrs, on, attrs: { id: attrs.id } });
      } else {
        inputEl = c('input', {
          attrs,
          style: self.inputStyle,
          on,
          domProps: { value: self.value, checked: self.checked },
        });
      }

      let clearButtonEl;
      if (self.clearButton) {
        clearButtonEl = c('span', { staticClass: 'input-clear-button' });
      }

      let $parent = self.$parent;
      let foundItemContent;
      while ($parent && !foundItemContent) {
        const tag = $parent.$vnode && $parent.$vnode.tag;
        if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
          foundItemContent = $parent;
        }
        $parent = $parent.$parent;
      }
      if (foundItemContent) foundItemContent.itemInputForced = true;
      if (foundItemContent && (self.info || (self.$slots.info && self.$slots.info.length))) foundItemContent.itemInputWithInfoForced = true;

      let infoEl;
      if (self.info || (self.$slots.info && self.$slots.info.length)) {
        infoEl = c('div', { staticClass: 'item-input-info' }, [self.info, self.$slots.info]);
      }

      const itemInput = self.wrap ? c('div', { staticClass: 'item-input-wrap', class: self.classes }, [inputEl, clearButtonEl, infoEl]) : inputEl;
      return itemInput;
    },
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    watch: {
      value() {
        const self = this;
        if (self.type === 'range' || self.type === 'toggle') return;
        const f7 = self.$f7;
        if (!f7) return;
        const inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
        self.$nextTick(() => {
          f7.input.checkEmptyState(inputEl);
          if (self.validate) {
            f7.input.validate(inputEl);
          }
          if (self.resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        });
      },
    },
    methods: {
      onF7Ready(f7) {
        const self = this;
        const inputEl = self.wrap ? self.$el.querySelector('input, select, textarea') : self.$el;
        f7.input.checkEmptyState(inputEl);
        if (self.validate) {
          f7.input.validate(inputEl);
        }
        if (self.resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      },
      onTextareaResize(event) {
        this.$emit('textarea:resize', event);
      },
      onInputNotEmpty(event) {
        this.$emit('input:notempty', event);
      },
      onInputEmpty(event) {
        this.$emit('input:empty', event);
      },
      onInputClear(event) {
        this.$emit('input:clear', event);
      },
      onInput(event) {
        this.$emit('input', event);
      },
      onFocus(event) {
        this.$emit('focus', event);
      },
      onBlur(event) {
        this.$emit('blur', event);
      },
      onChange(event) {
        const self = this;
        self.$emit('change', event);
      },
    },
  };
</script>
