<template>
  <div class="toolbar messagebar">
    <slot name="before-inner"></slot>
    <div class="toolbar-inner">
      <slot name="before-textarea"></slot>
      <textarea
        ref="area"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :readonly="readonly"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >{{value}}</textarea>
      <slot name="after-textarea"></slot>
      <f7-link v-if="sendLink && sendLink.indexOf('<') >= 0" @click="onClick" v-html="sendLink"></f7-link>
      <f7-link v-else="sendLink || $slots['send-link']" @click="onClick"><slot name="send-link">{{sendLink}}</slot></f7-link>
      <slot></slot>
    </div>
    <slot name="after-inner"></slot>
  </div>
</template>
<script>
  export default {
    beforeDestroy: function () {
      if (this.f7Messagebar && this.f7Messagebar.destroy) this.f7Messagebar.destroy();
    },
    props: {
      placeholder: {
        type: String,
        default: 'Message'
      },
      init: {
        type: Boolean,
        default: true
      },
      maxHeight: Number,
      sendLink: String,
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      name: String
    },
    methods: {
      getValue: function () {
        if (!this.f7Messagebar) return;
        return this.f7Messagebar.value();
      },
      setValue: function (newValue) {
        if (!this.f7Messagebar) return;
        return this.f7Messagebar.value(newValue);
      },
      clear: function () {
        if (!this.f7Messagebar) return;
        return this.f7Messagebar.clear();
      },
      onChange: function (event) {
        this.$emit('change', event);
      },
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onClick: function (event) {
        var value = this.$refs.area.value;
        var clear = this.f7Messagebar ? this.f7Messagebar.clear : function () {};
        this.$emit('submit', value, clear);
        this.$emit('click', event);
      },
      onF7Init: function () {
        var self = this;
        if (!self.init) return;
        self.f7Messagebar = self.$f7.messagebar(self.$el, {
          maxHeight: self.maxHeight
        });
      }
    }
  }
</script>