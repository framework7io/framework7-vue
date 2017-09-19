<script>
  export default {
    render(c) {
      const self = this;

      return c('div', {
        staticClass: 'range-slider',
        class: {
          disabled: self.disabled,
          [`color-${self.color}`]: self.color,
        },
      });
    },
    props: {
      init: {
        type: Boolean,
        default: true,
      },
      value: [Number, Array, String],
      min: [Number, String],
      max: [Number, String],
      step: {
        type: [Number, String],
        default: 1,
      },
      label: Boolean,
      dual: Boolean,
      disabled: Boolean,
      color: String,
    },
    watch: {
      value(newValue) {
        const self = this;
        if (!self.f7Range) return;
        console.log(newValue);
        self.f7Range.setValue(newValue);
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Range && self.f7Range.destroy) self.f7Range.destroy();
    },
    methods: {
      setValue(newValue) {
        const self = this;
        if (self.f7Range && self.f7Range.setValue) self.f7Range.setValue(newValue);
      },
      getValue(newValue) {
        const self = this;
        if (self.f7Range && self.f7Range.getValue) {
          return self.f7Range.getValue(newValue);
        }
        return undefined;
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;

        self.f7Range = f7.range.create({
          el: self.$el,
          value: self.value,
          min: self.min,
          max: self.max,
          step: self.step,
          label: self.label,
          dual: self.dual,
          on: {
            change(range, value) {
              self.$emit('range:change', value);
            },
          },
        });
      },
    },
  };
</script>
