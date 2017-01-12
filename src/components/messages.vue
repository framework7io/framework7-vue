<template>
  <div class="messages"><slot></slot></div>
</template>
<script>
  export default {
    beforeDestroy: function () {
      if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
    },
    beforeUpdate: function (a,b) {
      var self = this;
      if (!self.init) return;
      self.$children.forEach(function (el) {
        self.$$(el.$el).addClass('message-appeared');
      });
    },
    updated: function (a,b) {
      var self = this;
      if (!self.init) return;
      self.$children.forEach(function (el) {
        var $el = self.$$(el.$el);
        if (!$el.hasClass('message-appeared')) {
          $el.addClass('message-appear-from-bottom');
        }
      });
      if (this.f7Messages && this.f7Messages.layout && this.autoLayout) {
        this.f7Messages.layout();
      }
      if (this.f7Messages && this.f7Messages.layout && this.autoLayout) {
        this.f7Messages.scrollMessages();
      }
    },
    props: {
      autoLayout: {
        type: Boolean,
        default: true
      },
      newMessagesFirst: Boolean,
      messages: Array,
      scrollMessages: {
        type: Boolean,
        default: true
      },
      scrollMessagesOnlyOnEdge: Boolean,
      init: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      addMessage: function (messageParameters, method, animate) {
        if (!this.f7Messages) return;
        return this.f7Messages.addMessage(messageParameters, method, animate)
      },
      appendMessage: function (messageParameters, animate) {
        if (!this.f7Messages) return;
        return this.f7Messages.appendMessage(messageParameters, animate)
      },
      prependMessage: function (messageParameters, animate) {
        if (!this.f7Messages) return;
        return this.f7Messages.prependMessage(messageParameters, animate)
      },
      addMessages: function (messages, method, animate) {
        if (!this.f7Messages) return;
        return this.f7Messages.addMessages(messages, method, animate)
      },
      removeMessage: function (message) {
        if (!this.f7Messages) return;
        return this.f7Messages.removeMessage(message)
      },
      removeMessages: function (messages) {
        if (!this.f7Messages) return;
        return this.f7Messages.removeMessages(messages)
      },
      scroll: function () {
        if (!this.f7Messages) return;
        return this.f7Messages.scrollMessages()
      },
      layout: function () {
        if (!this.f7Messages) return;
        return this.f7Messages.layout()
      },
      clean: function () {
        if (!this.f7Messages) return;
        return this.f7Messages.clean()
      },
      onF7Init: function (f7) {
        var self = this;
        if (!self.init) return;
        self.f7Messages = f7.messages(self.$el, {
          autoLayout:  self.autoLayout,
          newMessagesFirst: self.newMessagesFirst,
          messages: self.messages,
          scrollMessages: self.scrollMessages,
          scrollMessagesOnlyOnEdge: self.scrollMessagesOnlyOnEdge,
        })
      }
    }
  }
</script>