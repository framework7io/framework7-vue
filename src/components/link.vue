<script>
  import LinkMixin from '../mixins/link.vue';
  export default {
    mixins: [LinkMixin],
    render: function (c) {
      var iconEl, textEl, isTabbarLabel, badgeEl, iconBadgeEl, self = this;
      isTabbarLabel = (self.tabLink || self.tabLink === '') && self.$parent && self.$parent.tabbar && self.$parent.labels;
      if (self.text) {
        if (self.badge) badgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.badge);
        textEl = c('span', {class: {'tabbar-label': isTabbarLabel}}, [self.text, badgeEl]);
      }
      if (self.icon || self.iconMaterial || self.iconIon || self.iconFa || self.iconF7  || (self.iconIfMaterial && self.$theme.material) || (self.iconIfIos && self.$theme.ios)) {
        if (self.iconBadge) iconBadgeEl = c('f7-badge', {props: {color: self.badgeColor}}, self.iconBadge);
        iconEl = c('f7-icon', {props: {
          material: self.iconMaterial,
          ion: self.iconIon,
          fa: self.iconFa,
          f7: self.iconF7,
          icon: self.icon,
          ifMaterial: self.iconIfMaterial,
          ifIos: self.iconIfIos,
          size: self.iconSize
        }}, [iconBadgeEl])
      }
      if (!self.text && self.$slots.default && self.$slots.default.length === 0 || self.iconOnly || !self.text && !self.$slots.default) {
        self.classesObject['icon-only'] = true;
      }
      self.classesObject.link = self.noLinkClass || isTabbarLabel ? false : true;
      var linkEl = c('a', {
        class: self.classesObject,
        attrs: self.attrsObject,
        on: {
          click: self.onClick
        }
      }, [iconEl, textEl, self.$slots.default]);
      return linkEl;
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      }
    }
  }
</script>