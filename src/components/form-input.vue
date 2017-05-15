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
        value: self.valueComputed,
        size: self.size,
        accept: self.accept,
        autocomplete: self.autocomplete,
        autocorrect: self.autocorrect,
        autocapitalize: self.autocapitalize,
        spellcheck: self.spellcheck,
        autofocus: self.autofocus,
        autosave: self.autosave,
        checked: self.checkedComputed,
        disabled: self.disabled,
        max: self.max,
        maxlength: self.maxlength,
        min: self.min,
        minlength: self.minlength,
        step: self.step,
        multiple: self.multiple,
        readonly: self.readonly,
        required: self.required,
        color: self.color,
	      pattern: self.pattern
      }
      var on = {
        focus: self.onFocus,
        blur: self.onBlur,
        input: self.onInput,
        change: self.onChange,
        click: self.onClick,
	      keypress: self.onKeyPress,
	      keyup: self.onKeyUp,
	      keydown: self.onKeyDown,
	      beforeinput: self.onBeforeInput,
	      compositionstart: self.onCompositionStart,
	      compositionupdate: self.onCompositionUpdate,
	      compositionend: self.onCompositionEnd,
	      focusin: self.onFocusIn,
	      focusout: self.onFocusOut,
	      dblclick: self.onDblClick,
	      mousedown: self.onMouseDown,
	      mouseenter: self.onMouseEnter,
	      mouseleave: self.onMouseLeave,
	      mousemove: self.onMouseMove,
	      mouseout: self.onMouseOut,
	      mouseover: self.onMouseOver,
	      mouseup: self.onMouseUp,
	      wheel: self.onWheel,
	      select: self.onSelect
      }
      if (self.type === 'select' || self.type === 'textarea' || self.type === 'file') {
        delete attrs.value;
        if (self.type === 'select') {
          if (self.hasSelectModel) {
            inputEl = c('select', {attrs: attrs, on: on, style: self.inputStyle}, self.$slots.default);
          }
          else {
            inputEl = c('select', {attrs: attrs, on: on, style: self.inputStyle, domProps: {value: self.valueComputed}}, self.$slots.default);
          }
        }
        else if (self.type === 'file') {
          inputEl = c('input', {attrs: attrs, style: self.inputStyle, on: on}, self.$slots.default);
        }
        else {
          inputEl = c('textarea', {attrs: attrs, style: self.inputStyle, on: on, class: {resizable: self.resizable}, domProps: {value: self.valueComputed}}, self.$slots.default);
        }
      }
      else {
        if(self.$slots.default && self.$slots.default.length > 0 || !self.type) {
          inputEl = self.$slots.default;
        }
        else {
          if (self.type === 'switch') {
            inputEl = c('f7-switch', {props: attrs, on: on});
          }
          else if (self.type === 'range') {
            inputEl = c('f7-range', {props: attrs, on: on});
          }
          else inputEl = c('input', {attrs: attrs, style: self.inputStyle, on: on, domProps: {value: self.valueComputed, checked: self.checkedComputed}});
        }
      }

      var itemInput = self.wrap ? c('div', {staticClass: 'item-input'}, [inputEl]) : inputEl;
      return itemInput;
    },
    watch: {
      value: function () {
        var self = this;
        if (!self.hasSelectModel) return;
        var $$ = self.$$;
        $$(self.$el).find('option').each(function (index, option) {
          if (self.value.indexOf(option.value) >= 0) option.selected = true;
          else option.selected = false;
        });
      }
    },
    mounted: function () {
      var self = this;
      if (!self.hasSelectModel) return;
      var $$ = self.$$;
      $$(self.$el).find('option').each(function (index, option) {
        if (self.value.indexOf(option.value) >= 0) option.selected = true;
        else option.selected = false;
      });
    },
    props: {
      // Inputs
      type: String,
      name: String,
      placeholder: String,
      id: String,
      value: [String, Number, Boolean, Array, Object],
      inputValue: [String, Number],
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
      resizable: Boolean,

      // Components
      color: String,
      wrap: {
        "type": Boolean,
        "default": true
      }
    },
    computed: {
      hasCheckboxModel: function () {
        var self = this;
        return (self.type === 'checkbox' || self.type === 'switch') && (typeof self.$options.propsData.value !== 'undefined' && typeof self.value === 'boolean' || Array.isArray(self.value));
      },
      hasRadioModel: function () {
        var self = this;
        return self.type === 'radio' && typeof self.inputValue !== 'undefined';
      },
      hasSelectModel: function () {
        var self = this;
        return self.type === 'select' && Array.isArray(self.value);
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) return self.inputValue;
        else if (self.hasCheckboxModel) return undefined;
        else if (self.$options.propsData && self.$options.propsData.value !== undefined) return self.value;
        else if (!self.hasCheckboxModel && !self.hasRadioModel && !self.hasSelectModel && 'value' in self.$options.propsData) return self.value;
        return undefined;
      },
      checkedComputed: function () {
        var self = this;
        if (self.hasCheckboxModel) {
          if (self.inputValue && Array.isArray(self.value)) {
            return self.value.indexOf(self.inputValue) >= 0;
          }
          return self.value;
        }
        else if (self.hasRadioModel) {
          if (typeof self.value !== typeof self.inputValue) {
            return self.value.toString() === self.inputValue.toString();
          }
          return self.value === self.inputValue;
        }
        else return self.checked;
      }
    },
    methods: {
      onInput: function (event) {
        if (this.hasSelectModel) return;
        if (event && event.type && event.type === 'input') {
          this.$emit('input', event.target.value);
        }
        else {
          this.$emit('input', event);
        }
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) self.value.push(event.target.value);
            else self.value.splice(self.value.indexOf(event.target.value), 1);
          }
          else {
            self.$emit('input', event.target.checked);
          }
          self.$emit('change', event);
        }
        else if (self.hasRadioModel) {
          self.$emit('input', event.target.value);
        }
        else if (self.hasSelectModel) {
          var values = Array.prototype.filter.call(event.target.options, function(option) {
            return option.selected;
          }).map(function(option) {
            var val = "_value" in option ? option._value : option.value;
            return val
          })
          self.$emit('input', values);
        }
        else {
          self.$emit('change', event);
        }
      },
      onClick: function (event) {
        this.$emit('click', event);
      },
	    onKeyPress: function(event) {
      	this.$emit('keypress', event);
	    },
	    onKeyUp: function(event) {
		    this.$emit('keyup', event);
	    },
	    onKeyDown: function(event) {
		    this.$emit('keydown', event);
	    },
	    onBeforeInput: function(event) {
      	this.$emit('beforeinput', event);
	    },
	    onCompositionStart: function(event) {
      	this.$emit('compositionstart', event);
	    },
	    onCompositionUpdate: function(event) {
      	this.$emit('compositionupdate', event);
	    },
	    onCompositionEnd: function(event) {
		    this.$emit('compositionend', event);
	    },
	    onFocusIn: function(event) {
		    this.$emit('focusin', event);
	    },
	    onFocusOut: function(event) {
		    this.$emit('focusout', event);
	    },
	    onDblClick: function(event) {
		    this.$emit('dblclick', event);
	    },
	    onMouseDown: function(event) {
		    this.$emit('mousedown', event)
	    },
	    onMouseEnter: function(event) {
		    this.$emit('mouseenter', event)
	    },
	    onMouseLeave: function(event) {
		    this.$emit('mouseleave', event)
	    },
	    onMouseMove: function(event) {
		    this.$emit('mousemove', event)
	    },
	    onMouseOut: function(event) {
		    this.$emit('mouseout', event)
	    },
	    onMouseOver: function(event) {
		    this.$emit('mouseover', event)
	    },
	    onMouseUp: function(event) {
		    this.$emit('mouseup', event)
	    },
	    onWheel: function(event) {
		    this.$emit('wheel', event)
	    },
	    onSelect: function(event) {
		    this.$emit('select', event)
	    }
    }
  }
</script>
