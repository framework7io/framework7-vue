<template>
  <div class="range-slider" :class="color ? 'color-' + color : ''">
    <input
      type="range"
      :name="name"
      :id="id"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :style="inputStyle"
      :max="max"
      :min="min"
      :step="step"

      @input="onInput"
      @change="onChange"
      @click="onClick"
    >
  </div>
</template>
<script>
  export default {
    props: {
      name: String,
      id: String,
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      inputStyle: String,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],

      color: String
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>
