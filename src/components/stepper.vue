<template>
  <div class="stepper" :class="classes">
    <div class="stepper-button-minus" @click="onMinusClick"></div>
    <div class="stepper-input-wrap" v-if="input && !buttonsOnly">
      <input
        :type="inputType"
        :min="inputType === 'number' ? min : undefined"
        :max="inputType === 'number' ? max : undefined"
        :step="inputType === 'number' ? step : undefined"
        :value="value"
        :readonly="inputReadonly"
        @input="onInput">
    </div>
    <div class="stepper-value" v-if="!input && !buttonsOnly">{{value}}</div>
    <div class="stepper-button-plus" @click="onPlusClick"></div>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const StepperProps = Utils.extend({
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    formatValue: Function,
    input: {
      type: Boolean,
      default: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputReadonly: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    buttonsOnly: Boolean,

    round: Boolean,
    fill: Boolean,
    big: Boolean,
    small: Boolean,
    raised: Boolean,
  }, Mixins.colorProps);

  export default {
    props: StepperProps,
    computed: {
      classes() {
        const self = this;
        const { round, fill, small, big, raised } = self;

        return Utils.extend({
          disabled: self.disabled,
          'stepper-round': round,
          'stepper-fill': fill,
          'stepper-small': small,
          'stepper-big': big,
          'stepper-raised': raised,
        }, Mixins.colorClasses(self));
      },
    },
    beforeDestroy() {
      if (!this.init) return;
      if (this.f7Stepper && this.f7Stepper.destroy) {
        this.f7Stepper.destroy();
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e, this.f7Stepper)
      },
      onMinusClick(e) {
        this.$emit('stepper:minusclick', e, this.f7Stepper);
      },
      onPlusClick(e) {
        this.$emit('stepper:plusclick', e, this.f7Stepper);
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        const {
          min, max, value, step, formatValue, $el,
        } = self;
        self.f7Stepper = f7.stepper.create({
          el: $el,
          min,
          max,
          value,
          step,
          formatValue,
          on: {
            change(stepper, newValue) {
              self.$emit('stepper:change', newValue);
            },
          },
        });
      },
    },
  }
</script>
