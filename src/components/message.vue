<template>
  <div :class="classesObject" @click="onClick">
    {{day}} <span v-if="time">{{time}}</span>
    <slot name="start"></slot>
    <div class="message-name" v-if="name" @click="onNameClick">{{name}}</div>
    <div class="message-text" @click="onTextClick">
      <slot>{{text}}</slot>
      <div class="message-date" v-if="date">{{date}}</div>
    </div>
    <div class="message-avatar" v-if="avatar" :style="{'background-image': 'url(' + avatar + ')'}" @click="onAvatarClick"></div>
    <div class="message-label" v-if="label">{{label}}</div>
    <slot name="end"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
      name: String,
      avatar: String,
      type: {
        type: String,
        default: 'sent'
      },
      label: String,
      day: String,
      date: String,
      time: String,
      last: {
        type: Boolean,
        default: true
      },
      first: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classesObject: function () {
        var co = {};
        var self = this;
        if (self.day || self.time) {
          co['messages-date'] = self.day || self.time;
        }
        else {
          var newPosition = 'bottom';
          if(self.$parent.newFirst) {
            newPosition = 'top';
          }
          // co['message-appear-from-' + newPosition] = true;
          co['message-date'] = self.day || self.time;
          co['message'] = !(self.day || self.time);
          co['message-' + self.type] = true;
          co['message-with-avatar'] = self.avatar;
          co['message-first'] = self.first;
          co['message-last'] = self.last;
          co['message-with-tail'] = self.last;
        }
        return co;
      },
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      onNameClick: function (event) {
        this.$emit('click:name', event);
      },
      onTextClick: function (event) {
        this.$emit('click:text', event);
      },
      onAvatarClick: function (event) {
        this.$emit('click:avatar', event);
      },
    }
  }
</script>