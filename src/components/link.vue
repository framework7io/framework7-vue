<script>
  import f7Badge from './badge.vue';
  import f7Icon from './icon.vue';
  import LinkMixin from '../mixins/link.vue';

  export default {
    components: {
      f7Badge,
      f7Icon,
    },
    mixins: [LinkMixin],
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
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
