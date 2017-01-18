<template>
  <label class="label-switch" :class="color ? 'color-' + color : ''" @click="onClick">
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

      @input="onInput"
      @change="onChange"
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
    methods: {
      onInput: function (event) {
        this.$emit('input', event);
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