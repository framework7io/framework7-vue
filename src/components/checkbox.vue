<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const CheckboxProps = Utils.extend({
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-checkbox',
    props: CheckboxProps,
    render(c) {
      const self = this;

      const inputEl = c('input', {
        attrs: {
          type: 'checkbox',
          name: self.name,
        },
        domProps: {
          value: self.value,
          disabled: self.disabled,
          readonly: self.readonly,
          checked: self.checked,
        },
        on: {
          change: self.onChange,
        },
      });

      const iconEl = c('i', { staticClass: 'icon-checkbox' });

      return c('label', {
        staticClass: 'checkbox',
        class: self.classes,
      }, [inputEl, iconEl, self.$slots.default]);
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            disabled: self.disabled,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onChange(event) {
        this.$emit('change', event);
      },
    },
  };
</script>
