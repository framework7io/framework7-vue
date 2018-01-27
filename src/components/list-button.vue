<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ListButtonProps = Utils.extend(
    {
      noFastclick: Boolean,
      noFastClick: Boolean,
      title: [String, Number],
      text: [String, Number],
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      link: [Boolean, String],
      href: [Boolean, String],
      target: String,
    },
    Mixins.colorProps,
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
      }, [self.title || self.text, self.$slots.default]);
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
            'data-tab': Utils.isStringProp(tabLink) && tabLink,
          },
          Mixins.linkRouterAttrs(self),
          Mixins.linkActionsAttrs(self)
        );
      },
      classes() {
        const self = this;

        const {
          noFastclick,
          noFastClick,
          tabLink,
          tabLinkActive,
        } = self;

        return Utils.extend(
          {
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive,
            'no-fastclick': noFastclick || noFastClick,
          },
          Mixins.colorClasses(self),
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
