<label class="toggle">
  <input type="checkbox" checked>
  <span class="toggle-icon"></span>
</label>
<script>
  export default {
    render(c) {
      const self = this;

      return c('label', {
        staticClass: 'toggle',
        class: {
          disabled: self.disabled,
          [`color-${self.color}`]: self.color,
        },
      }, [
        c('input', {
          attrs: {
            type: 'checkbox',
          },
          domProps: {
            disabled: self.disabled,
            readonly: self.readonly,
            checked: self.checked,
          },
        }),
        c('span', { staticClass: 'toggle-icon' }),
      ]);
    },
    props: {
      init: {
        type: Boolean,
        default: true,
      },
      checked: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      color: String,
    },
    watch: {
      checked(newValue) {
        const self = this;
        if (!self.f7Toggle) return;
        self.f7Toggle.checked = newValue;
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Toggle && self.f7Toggle.destroy) self.f7Toggle.destroy();
    },
    methods: {
      toggle() {
        const self = this;
        if (self.f7Toggle && self.f7Toggle.setValue) self.f7Toggle.toggle();
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;

        self.f7Toggle = f7.toggle.create({
          el: self.$el,
          on: {
            change(toggle) {
              self.$emit('toggle:change', toggle.checked);
            },
          },
        });
      },
    },
  };
</script>
