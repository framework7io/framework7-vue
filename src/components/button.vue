<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7Icon from './icon.vue';

  const ButtonProps = Utils.extend(
    {
      noFastclick: Boolean,
      noFastClick: Boolean,
      text: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      href: {
        type: [String, Boolean],
        default: '#',
      },

      round: Boolean,
      roundMd: Boolean,
      roundIos: Boolean,
      fill: Boolean,
      fillMd: Boolean,
      fillIos: Boolean,
      big: Boolean,
      bigMd: Boolean,
      bigIos: Boolean,
      small: Boolean,
      smallMd: Boolean,
      smallIos: Boolean,
      raised: Boolean,
      outline: Boolean,
      active: Boolean,
      disabled: Boolean,
    },
    Mixins.colorProps,
    Mixins.linkIconProps,
    Mixins.linkRouterProps,
    Mixins.linkActionsProps
  );

  export default {
    name: 'f7-button',
    components: {
      f7Icon,
    },
    props: ButtonProps,
    render(c) {
      const self = this;
      let iconEl;
      let textEl;
      if (self.text) {
        textEl = c('span', {}, self.text);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7 || self.iconIfMd || self.iconIfIos) {
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
        });
      }
      self.classes.button = true;
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
          round,
          roundIos,
          roundMd,
          fill,
          fillIos,
          fillMd,
          big,
          bigIos,
          bigMd,
          small,
          smallIos,
          smallMd,
          raised,
          active,
          outline,
          disabled,
        } = self;

        return Utils.extend(
          {
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive,
            'no-fastclick': noFastclick || noFastClick,

            'button-round': round,
            'button-round-ios': roundIos,
            'button-round-md': roundMd,
            'button-fill': fill,
            'button-fill-ios': fillIos,
            'button-fill-md': fillMd,
            'button-big': big,
            'button-big-ios': bigIos,
            'button-big-md': bigMd,
            'button-small': small,
            'button-small-ios': smallIos,
            'button-small-md': smallMd,
            'button-raised': raised,
            'button-active': active,
            'button-outline': outline,

            disabled,
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
