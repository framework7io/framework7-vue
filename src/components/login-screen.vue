<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const LoginScreenProps = Utils.extend(
    {
      opened: Boolean,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-login-screen',
    render(c) {
      const self = this;
      return c('div', {
        staticClass: 'login-screen',
        class: self.classes,
        on: {
          'loginscreen:open': self.onOpen,
          'loginscreen:opened': self.onOpened,
          'loginscreen:close': self.onClose,
          'loginscreen:closed': self.onClosed,
        },
      }, self.$slots.default);
    },
    watch: {
      opened(opened) {
        const self = this;
        if (!self.f7LoginScreen) return;
        if (opened) {
          self.f7LoginScreen.open();
        } else {
          self.f7LoginScreen.close();
        }
      },
    },
    props: LoginScreenProps,
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
    beforeDestroy() {
      const self = this;
      if (self.f7LoginScreen) self.f7LoginScreen.destroy();
    },
    methods: {
      onOpen(event) {
        this.$emit('loginscreen:open', event);
      },
      onOpened(event) {
        this.$emit('loginscreen:opened', event);
      },
      onClose(event) {
        this.$emit('loginscreen:close', event);
      },
      onClosed(event) {
        this.$emit('loginscreen:closed', event);
      },
      open(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.loginScreen.open(self.$el, animate);
      },
      close(animate) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.loginScreen.close(self.$el, animate);
      },
      onF7Ready() {
        const self = this;
        self.f7LoginScreen = self.$f7.loginScreen.create({
          el: self.$el,
        });
        if (self.opened) {
          self.f7LoginScreen.open(false);
        }
      },
    },
  };
</script>
