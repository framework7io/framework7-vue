<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const RangeProps = Utils.extend({
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
  }, Mixins.colorProps);

  export default {
    name: 'f7-range',
    render(c) {
      const self = this;

      return c('div', {
        staticClass: 'range-slider',
        class: Utils.extend({
          disabled: self.disabled,
        }, Mixins.colorClasses(self)),
      });
    },
    props: RangeProps,
    watch: {
      value(newValue) {
        const self = this;
        if (!self.f7Range) return;
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
      getValue() {
        const self = this;
        if (self.f7Range && self.f7Range.getValue) {
          return self.f7Range.getValue();
        }
        return undefined;
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        self.$nextTick(() => {
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
        });
      },
    },
  };
</script>
