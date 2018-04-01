<template>
  <div class="message" :class="classes" @click="onClick">
    <slot name="start"></slot>
    <div class="message-avatar" v-if="avatar || $slots.avatar" :style="{'background-image': avatar && 'url(' + avatar + ')'}" @click="onAvatarClick"></div>
    <div class="message-content">
      <slot name="content-start"></slot>
      <div class="message-name" v-if="name || $slots.name" @click="onNameClick"><slot name="name">{{name}}</slot></div>
      <div class="message-header" v-if="header || $slots.header" @click="onHeaderClick"><slot name="header">{{header}}</slot></div>
      <div class="message-bubble" @click="onBubbleClick">
        <slot name="bubble-start"></slot>
        <div class="message-image" v-if="image || $slots.image"><slot name="image"><img :src="image"></slot></div>
        <div class="message-text-header" v-if="textHeader || $slots['text-header']"><slot name="text-header">{{textHeader}}</slot></div>
        <div class="message-text" v-if="text || $slots.text || typing" @click="onTextClick">
          <slot name="text">{{text}}</slot>
          <div v-if="typing" class="message-typing-indicator">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="message-text-footer" v-if="textFooter || $slots['text-footer']"><slot name="text-footer">{{textFooter}}</slot></div>
        <slot name="bubble-end"></slot>
        <slot></slot>
      </div>
      <div class="message-footer" v-if="footer || $slots.footer" @click="onFooterClick"><slot name="footer">{{footer}}</slot></div>
      <slot name="content-end"></slot>
    </div>
    <slot name="end"></slot>
  </div>
</template>
<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const MessageProps = Utils.extend(
    {
      text: String,
      name: String,
      avatar: String,
      type: {
        type: String,
        default: 'sent',
      },
      image: String,
      header: String,
      footer: String,
      textHeader: String,
      textFooter: String,
      first: Boolean,
      last: Boolean,
      tail: Boolean,
      sameName: Boolean,
      sameHeader: Boolean,
      sameFooter: Boolean,
      sameAvatar: Boolean,
      typing: Boolean,
    },
    Mixins.colorProps
  );
  export default {
    name: 'f7-message',
    props: MessageProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'message-sent': self.type === 'sent',
          'message-received': self.type === 'received',
          'message-typing': self.typing,
          'message-first': self.first,
          'message-last': self.last,
          'message-tail': self.tail,
          'message-same-name': self.sameName,
          'message-same-header': self.sameHeader,
          'message-same-footer': self.sameFooter,
          'message-same-avatar': self.sameAvatar,
        }, Mixins.colorClasses(self));
      },
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
      onNameClick(event) {
        this.$emit('click:name', event);
      },
      onTextClick(event) {
        this.$emit('click:text', event);
      },
      onAvatarClick(event) {
        this.$emit('click:avatar', event);
      },
      onHeaderClick(event) {
        this.$emit('click:header', event);
      },
      onFooterClick(event) {
        this.$emit('click:footer', event);
      },
      onBubbleClick(event) {
        this.$emit('click:bubble', event);
      },
    },
  };
</script>
