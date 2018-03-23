<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const ActionsButtonProps = Utils.extend(
    {
      bold: Boolean,
      close: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-actions-button',
    render(c) {
      const self = this;
      let mediaEl;
      if (self.$slots.media && self.$slots.media.length) {
        mediaEl = c('div', {
          staticClass: 'actions-button-media',
        }, self.$slots.media);
      }
      const textEl = c('div', {
        staticClass: 'actions-button-text',
      }, self.$slots.default);

      return c('div', {
        staticClass: 'actions-button',
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [mediaEl, textEl]);
    },
    props: ActionsButtonProps,
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
        const self = this;
        const $$ = self.$$;
        if (self.close && self.$f7) {
          self.$f7.actions.close($$(self.$el).parents('.actions-modal'));
        }
        self.$emit('click', event);
      },
    },
  };
</script>
