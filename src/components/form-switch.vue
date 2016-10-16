<template>
  <label class="label-switch" :class="color ? 'color-' + color : ''">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :style="style"

      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @change="onChange"
      @click="onClick"
    >
    <div class="checkbox"></div>
  </label>
</template>
<script>
  export default {
    props: {
      name: String,
      id: String,
      value: [String, Number],
      checked: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      style: String,

      color: String
    },
    methods: (function () {
      var eventMethods = {};
      'Focus Blur Input Change Click'.split(' ').forEach(function (ev) {
        eventMethods['on' + ev] = function (event) {
          this.$emit(ev.toLowerCase(), event, event.target)
        }
      });
      return eventMethods
    })()
  }
</script>