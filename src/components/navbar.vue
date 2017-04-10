<script>
  export default {
    render: function (c) {
      var self = this, innerEl, leftEl, centerEl;
      if (self.inner) {
        if (self.backLink) {
          leftEl = c('f7-nav-left', {
            props: {
              backLink: self.backLink,
              sliding: self.sliding,
              backLinkHref: self.backLinkUrl || self.backLinkHref
            }
          })
        }
        if (self.title) {
          centerEl = c('f7-nav-center', {
            props: {
              title: self.title,
              sliding: self.sliding
            }
          })
        }
        innerEl = c('div', {staticClass: 'navbar-inner'}, [leftEl, centerEl, self.$slots.default]);
      }
      return c('div', {
        staticClass: 'navbar',
        class: self.classesObject,
        on: {
          'navbar:beforeinit': self.onBeforeInit,
          'navbar:init': self.onInit,
          'navbar:reinit': self.onReinit,
          'navbar:beforeremove': self.onBeforeRemove,
        },
      }, [self.$slots['before-inner'], innerEl, self.$slots['after-inner']]);
    },
    updated: function () {
      var self = this;
      self.$nextTick(function () {
          self.$f7.sizeNavbars();
      });
    },
    props: {
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkHref: String,
      sliding: Boolean,
      title: String,
      theme: String,
      layout: String,
      hidden: Boolean,
      noShadow: Boolean,
      inner: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        var co = {
          'navbar-hidden': this.hidden
        }
        if (this.theme) co['theme-' + this.theme] = true;
        if (this.layout) co['layout-' + this.layout] = true;
        if (this.noShadow) co['no-shadow'] = true;
        return co;
      }
    },
    methods: {
      hide: function (animated) {
        if (!this.$f7) return;
        return this.$f7.hideNavbar(this.$el, animated);
      },
      show: function (animated) {
        if (!this.$f7) return;
        return this.$f7.showNavbar(this.$el, animated);
      },
      size: function () {
        if (!this.$f7 || this.$theme.material) return;
        return this.$f7.sizeNavbars();
      },
      onBeforeInit: function (e) {
        this.$emit('navbar:beforeinit', e);
      },
      onInit: function (e) {
        this.$emit('navbar:init', e);
      },
      onReinit: function (e) {
        this.$emit('navbar:reinit', e);
      },
      onBeforeRemove: function (e) {
        this.$emit('navbar:beforeremove', e);
      },
      onBackClick: function (e) {
        this.$emit('back-click', e);
        this.$emit('click:back', e);
      }
    }
  }
</script>
