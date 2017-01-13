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
        style: self.style,
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
          else inputEl = c('input', {attrs: attrs, on: on});
        }
      }

      var itemInput = self.wrap ? c('div', {staticClass: 'item-input'}, [inputEl]) : inputEl;
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
      style: String,
	    pattern: String,

      // Components
      color: String,
      wrap: {
        "type": Boolean,
        "default": true
      }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onChange: function (event) {
        this.$emit('change', event);
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