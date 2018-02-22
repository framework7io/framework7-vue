<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const FabProps = Utils.extend(
    {
      morphTo: String,
      href: [Boolean, String],
      position: {
        type: String,
        default: 'right-bottom',
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-fab',
    props: FabProps,
    render(c) {
      const self = this;

      let href = self.href;
      if (href === true) href = '#';
      if (href === false) href = undefined; // no href attribute

      const linkChildren = [];
      const fabChildren = [];

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          const child = self.$slots.default[i];
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) {
            fabChildren.push(child);
          } else {
            linkChildren.push(child);
          }
        }
      }

      const linkEl = c('a', {
        attrs: {
          href,
        },
        on: {
          click: self.onClick,
        },
      }, linkChildren);

      fabChildren.push(linkEl);

      return c('div', {
        staticClass: 'fab',
        class: self.classes,
        attrs: {
          'data-morph-to': self.morphTo,
        },
      }, fabChildren);
    },
    computed: {
      classes() {
        const self = this;
        return Utils.extend(
          {
            'fab-morph': self.morphTo,
            [`fab-${self.position}`]: true,
          },
          Mixins.colorClasses(self)
        );
      },
    },
    methods: {
      onClick(event) {
        const self = this;
        self.$emit('click', event);
      },
    },
  };
</script>
