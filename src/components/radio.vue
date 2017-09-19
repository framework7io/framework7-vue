<script>
  export default {
    props: {
      color: String,
      checked: Boolean,
      name: [Number, String],
      value: [Number, String, Boolean],
      disabled: Boolean,
      readonly: Boolean,
    },
    render(c) {
      const self = this;

      const inputEl = c('input', {
        attrs: {
          type: 'radio',
          name: self.name,
        },
        domProps: {
          value: self.value,
          disabled: self.disabled,
          readonly: self.readonly,
          checked: self.checked,
        },
        on: {
          change: self.onChange,
        },
      });

      const iconEl = c('i', { staticClass: 'icon-radio' });

      return c('label', {
        staticClass: 'radio',
        class: {
          disabled: self.disabled,
          [`color-${self.color}`]: self.color,
        },
      }, [inputEl, iconEl, self.$slots.default]);
    },
    methods: {
      onChange(event) {
        this.$emit('change', event);
      }
    },
  };
</script>
