<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7NavLeft from './nav-left.vue';
  import f7NavTitle from './nav-title.vue';

  const NavbarProps = Utils.extend({
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: {
      type: Boolean,
      default: true,
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
  }, Mixins.colorProps);

  export default {
    name: 'f7-navbar',
    components: {
      f7NavLeft,
      f7NavTitle,
    },
    render(c) {
      const self = this;
      let innerEl;
      let leftEl;
      let titleEl;
      if (self.inner) {
        if (self.backLink) {
          leftEl = c('f7-nav-left', {
            props: {
              backLink: self.backLink,
              backLinkUrl: self.backLinkUrl,
              backLinkForce: self.backLinkForce,
            },
            on: {
              'back-click': self.onBackClick,
            },
          });
        }
        if (self.title || self.subtitle) {
          titleEl = c('f7-nav-title', {
            props: {
              title: self.title,
              subtitle: self.subtitle,
            },
          });
        }
        innerEl = c('div', { ref: 'inner', staticClass: 'navbar-inner', class: { sliding: self.sliding } }, [leftEl, titleEl, self.$slots.default]);
      }
      return c('div', {
        staticClass: 'navbar',
        class: self.classes,
      }, [self.$slots['before-inner'], innerEl, self.$slots['after-inner']]);
    },
    updated() {
      const self = this;
      if (!self.$f7) return;
      self.$nextTick(() => {
        if (self.$el && self.$el.children && self.$el.children.length) {
          self.$f7.navbar.size(self.$el);
        } else if (self.$refs.inner) {
          self.$f7.navbar.size(self.$refs.inner);
        }
      });
    },
    props: NavbarProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'navbar-hidden': self.hidden,
          'no-shadow': self.noShadow,
          'no-hairline': self.noHairline,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      hide(animate) {
        const self = this;
        if (!self.$f7) return;
        self.$f7.navbar.hide(self.$el, animate);
      },
      show(animate) {
        const self = this;
        if (!self.$f7) return;
        self.$f7.navbar.show(self.$el, animate);
      },
      size() {
        const self = this;
        if (!self.$f7) return;
        self.$f7.navbar.size(self.$el);
      },
      onBackClick(e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      },
    },
  };
</script>
