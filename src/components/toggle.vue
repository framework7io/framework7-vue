<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ToggleProps = Utils.extend({
    init: {
      type: Boolean,
      default: true,
    },
    checked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array],
  }, Mixins.colorProps);

  export default {
    name: 'f7-toggle',
    render(c) {
      const self = this;

      return c('label', {
        staticClass: 'toggle',
        class: Utils.extend(
          {
            disabled: self.disabled,
          },
          Mixins.colorClasses(self)
        ),
      }, [
        c('input', {
          attrs: {
            type: 'checkbox',
            name: self.name,
          },
          domProps: {
            disabled: self.disabled,
            readonly: self.readonly,
            checked: self.checked,
            value: self.value,
          },
          on: {
            change: self.onChange,
          },
        }),
        c('span', { staticClass: 'toggle-icon' }),
      ]);
    },
    props: ToggleProps,
    watch: {
      checked(newValue) {
        const self = this;
        if (!self.f7Toggle) return;
        self.f7Toggle.checked = newValue;
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
    },
    methods: {
      toggle() {
        const self = this;
        if (self.f7Toggle && self.f7Toggle.setValue) self.f7Toggle.toggle();
      },
      onChange(e) {
        const self = this;
        self.$emit('change', e);
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        self.$nextTick(() => {
          self.f7Toggle = f7.toggle.create({
            el: self.$el,
            on: {
              change(toggle) {
                self.$emit('toggle:change', toggle.checked);
              },
            },
          });
        });
      },
    },
  };
</script>
