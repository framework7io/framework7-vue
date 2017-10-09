<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ListButtonProps = Utils.extend(
    {
      noFastclick: Boolean,
      title: [String, Number],
      text: [String, Number],
      tabLink: [Boolean, String],
      link: [Boolean, String],
      href: [Boolean, String],
      tabindex: [Number, String],
      color: String,
      rippleColor: String,
      textColor: String,
    },
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  export default {
    name: 'f7-list-button',
    render(c) {
      const self = this;
      const linkEl = c('a', {
        staticClass: 'item-link list-button',
        attrs: self.attrs,
        class: self.classes,
        on: {
          click: self.onClick,
        },
      }, [self.title, self.$slots.default]);
      return c('li', {}, [linkEl]);
    },
    props: ListButtonProps,
    computed: {
      attrs() {
        const self = this;
        // Link Props
        const {
          link,
          href,
          target,
          tabLink,
        } = self;

        return Utils.extend(
          {
            href: ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href)),
            target,
            'data-tab': Utils.isStringProp(tabLink),
          },
          Mixins.linkRouterAttrs(self),
          Mixins.linkActionsAttrs(self)
        );
      },
      classes() {
        const self = this;

        const {
          noFastclick,
          tabLink,
          rippleColor,
          color,
          textColor,
        } = self;

        return Utils.extend(
          {
            [`color-${color}`]: color,
            [`ripple-color-${rippleColor}`]: rippleColor,
            [`text-color-${textColor}`]: textColor,
            'tab-link': tabLink || tabLink === '',
            'no-fastclick': noFastclick,
          },
          Mixins.linkRouterClasses(self),
          Mixins.linkActionsClasses(self)
        );
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
