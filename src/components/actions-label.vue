<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const ActionsLabelProps = Utils.extend(
    {
      bold: Boolean,
    },
    Mixins.colorProps
  );
  export default {
    name: 'f7-actions-label',
    render(c) {
      const self = this;
      return c('div', {
        staticClass: 'actions-label',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, self.$slots.default);
    },
    props: ActionsLabelProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'actions-button-bold': self.bold,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
