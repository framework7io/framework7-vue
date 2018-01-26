<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const MessagesProps = Utils.extend(
    {
      autoLayout: {
        type: Boolean,
        default: false,
      },
      messages: {
        type: Array,
        default() {
          return [];
        },
      },
      newMessagesFirst: {
        type: Boolean,
        default: false,
      },
      scrollMessages: {
        type: Boolean,
        default: true,
      },
      scrollMessagesOnEdge: {
        type: Boolean,
        default: true,
      },
      firstMessageRule: Function,
      lastMessageRule: Function,
      tailMessageRule: Function,
      sameNameMessageRule: Function,
      sameHeaderMessageRule: Function,
      sameFooterMessageRule: Function,
      sameAvatarMessageRule: Function,
      customClassMessageRule: Function,
      renderMessage: Function,

      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );
  export default {
    name: 'f7-messages',
    render(c) {
      const self = this;
      return c('div', {
        staticClass: 'messages',
        class: Mixins.colorClasses(self),
      }, self.$slots.default);
    },
    props: MessagesProps,
    beforeDestroy() {
      if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
    },
    beforeUpdate() {
      const self = this;
      if (!self.init) return;
      self.$children.forEach((el) => {
        self.$$(el.$el).addClass('message-appeared');
      });
    },
    updated() {
      const self = this;
      if (!self.init) return;
      self.$children.forEach((el) => {
        const $el = self.$$(el.$el);
        if (!$el.hasClass('message-appeared')) {
          $el.addClass('message-appear-from-bottom');
        }
      });
      if (self.f7Messages && self.f7Messages.layout && self.autoLayout) {
        self.f7Messages.layout();
      }
      if (self.f7Messages && self.f7Messages.scroll && self.scrollMessages) {
        self.f7Messages.scroll();
      }
    },

    methods: {
      renderMessages(messagesToRender, method) {
        if (!this.f7Messages) return undefined;
        return this.renderMessages(messagesToRender, method);
      },
      layout() {
        if (!this.f7Messages) return undefined;
        return this.layout();
      },
      scroll(duration, scrollTop) {
        if (!this.f7Messages) return undefined;
        return this.scroll(duration, scrollTop);
      },
      clear() {
        if (!this.f7Messages) return undefined;
        return this.clear();
      },
      removeMessage(messageToRemove, layout) {
        if (!this.f7Messages) return undefined;
        return this.removeMessage(messageToRemove, layout);
      },
      removeMessages(messagesToRemove, layout) {
        if (!this.f7Messages) return undefined;
        return this.removeMessages(messagesToRemove, layout);
      },
      addMessage(...args) {
        if (!this.f7Messages) return undefined;
        return this.addMessage(...args);
      },
      addMessages(...args) {
        if (!this.f7Messages) return undefined;
        return this.addMessages(...args);
      },
      showTyping(message) {
        if (!this.f7Messages) return undefined;
        return this.showTyping(message);
      },
      hideTyping() {
        if (!this.f7Messages) return undefined;
        return this.hideTyping();
      },
      destroy() {
        if (!this.f7Messages) return undefined;
        return this.destroy();
      },
      onF7Ready(f7) {
        const self = this;
        if (!self.init) return;
        self.f7Messages = f7.messages.create({
          el: self.$el,
          autoLayout: self.autoLayout,
          messages: self.messages,
          newMessagesFirst: self.newMessagesFirst,
          scrollMessages: self.scrollMessages,
          scrollMessagesOnEdge: self.scrollMessagesOnEdge,
          firstMessageRule: self.firstMessageRule,
          lastMessageRule: self.lastMessageRule,
          tailMessageRule: self.tailMessageRule,
          sameNameMessageRule: self.sameNameMessageRule,
          sameHeaderMessageRule: self.sameHeaderMessageRule,
          sameFooterMessageRule: self.sameFooterMessageRule,
          sameAvatarMessageRule: self.sameAvatarMessageRule,
          customClassMessageRule: self.customClassMessageRule,
          renderMessage: self.renderMessage,
        });
      },
    },
  };
</script>
