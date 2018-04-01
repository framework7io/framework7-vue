<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  export default {
    name: 'f7-routable-modals',
    data() {
      return {
        modals: [],
      };
    },
    render(c) {
      const self = this;
      const modals = self.modals.map(modal => c(modal.component, {
        tag: 'component',
        props: modal.params ? modal.params || {} : {},
        key: modal.id,
      }));
      return c(
        'div',
        {
          staticClass: 'framework7-modals',
          ref: 'routableModals',
        },
        modals
      );
    },
  };
</script>
