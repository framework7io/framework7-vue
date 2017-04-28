<template>
  <label class="label-switch" :class="color ? 'color-' + color : ''" @click="onClick">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      :value="valueComputed"
      :checked="checkedComputed"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :style="inputStyle"

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
      value: [String, Number, Boolean, Array],
      inputValue: [String, Number],
      checked: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      inputStyle: String,

      color: String
    },
    computed: {
      hasCheckboxModel: function () {
        return typeof this.value === 'boolean' || Array.isArray(this.value);
      },
      valueComputed: function () {
        var self = this;
        if (self.inputValue) return self.inputValue;
        else if (self.hasCheckboxModel) return undefined;
        else if (self.$options.propsData && self.$options.propsData.value) return self.value;
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
        else return self.checked;
      }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event);
      },
      onChange: function (event) {
        var self = this;
        if (self.hasCheckboxModel) {
          if (Array.isArray(self.value)) {
            if (event.target.checked) self.value.push(event.target.value);
            else self.value.splice(self.value.indexOf(event.target.value), 1);
            self.$emit('change', event);
          }
          else {
            self.$emit('input', event.target.checked);
          }
        }
        else {
          self.$emit('change', event);
        }
      },
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>
