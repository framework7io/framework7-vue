<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const RadioProps = Utils.extend({
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-radio',
    props: RadioProps,
    render(c) {
      const self = this;

      const inputEl = c('input', {
        attrs: {
          type: 'radio',
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

      const iconEl = c('i', { staticClass: 'icon-radio' });

      return c('label', {
        staticClass: 'radio',
        class: Utils.extend({
          disabled: self.disabled,
        }, Mixins.colorClasses(self)),
      }, [inputEl, iconEl, self.$slots.default]);
    },
    methods: {
      onChange(event) {
        this.$emit('change', event);
      },
    },
  };
</script>
