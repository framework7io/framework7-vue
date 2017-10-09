<script>
  export default {
    name: 'f7-fab',
    render(c) {
      const self = this;

      const linkChildren = [];
      const fabChildren = [];

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          const child = self.$slots.default[i];
          if (child.tag.indexOf('fab-buttons') >= 0) {
            fabChildren.push(child);
          } else {
            linkChildren.push(child);
          }
        }
      }

      const linkEl = c('a', {
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
    props: {
      color: String,
      morphTo: String,
      position: {
        type: String,
        default: 'right-bottom',
      },
    },
    computed: {
      classes() {
        const self = this;
        return {
          'fab-morph': self.morphTo,
          [`fab-${self.position}`]: true,
          [`color-${self.color}`]: self.color,
        };
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
