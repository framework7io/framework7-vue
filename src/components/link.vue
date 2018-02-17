<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7Badge from './badge.vue';
  import f7Icon from './icon.vue';

  const LinkProps = Utils.extend(
    {
      noLinkClass: Boolean,
      noFastClick: Boolean,
      noFastclick: Boolean,
      text: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      iconOnly: Boolean,
      badge: [String, Number],
      badgeColor: [String],
      iconBadge: [String, Number],
      href: {
        type: [String, Boolean],
        default: '#',
      },
    },
    Mixins.colorProps,
    Mixins.linkIconProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  export default {
    name: 'f7-link',
    components: {
      f7Badge,
      f7Icon,
    },
    props: LinkProps,
    render(c) {
      const self = this;
      const isTabbarLabel = (self.tabLink || self.tabLink === '') && self.$parent && self.$parent.tabbar && self.$parent.labels;

      let iconEl;
      let textEl;
      let badgeEl;
      let iconBadgeEl;

      if (self.text) {
        if (self.badge) badgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.badge);
        textEl = c('span', { class: { 'tabbar-label': isTabbarLabel } }, [self.text, badgeEl]);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || (self.iconIfMd && self.$theme.md) || (self.iconIfIos && self.$theme.ios)) {
        if (self.iconBadge) iconBadgeEl = c('f7-badge', { props: { color: self.badgeColor } }, self.iconBadge);
        iconEl = c('f7-icon', {
          props: {
            material: self.iconMaterial,
            ion: self.iconIon,
            fa: self.iconFa,
            f7: self.iconF7,
            icon: self.icon,
            ifMd: self.iconIfMd,
            ifIos: self.iconIfIos,
            color: self.iconColor,
            size: self.iconSize,
          },
        }, [iconBadgeEl]);
      }
      if (
        self.iconOnly ||
        (!self.text && self.$slots.default && self.$slots.default.length === 0) ||
        (!self.text && !self.$slots.default)
      ) {
        self.classes['icon-only'] = true;
      }
      self.classes.link = !(self.noLinkClass || isTabbarLabel);
      const linkEl = c('a', {
        class: self.classes,
        attrs: self.attrs,
        on: {
          click: self.onClick,
        },
      }, [iconEl, textEl, self.$slots.default]);
      return linkEl;
    },
    computed: {
      attrs() {
        const self = this;
        const { href, target, tabLink } = self;
        let hrefComputed = href;
        if (href === true) hrefComputed = '#';
        if (href === false) hrefComputed = undefined; // no href attribute
        return Utils.extend(
          {
            href: hrefComputed,
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
