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
      :style="style"
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
      style: String,
      max: [String, Number],
      min: [String, Number],
      step: [String, Number],

      color: String
    },
    methods: (function () {
      var eventMethods = {};
      'Input Change Click'.split(' ').forEach(function (ev) {
        eventMethods['on' + ev] = function (event) {
          this.$emit(ev.toLowerCase(), event)
        }
      });
      return eventMethods
    })()
  }
</script>