<template>
  <f7-page toolbar-fixed>
    <f7-navbar back-link="Back" title="Messages" sliding></f7-navbar>
    <f7-subnavbar>
      <input type="text" v-model="name" placeholder="Your name" :value="name">
    </f7-subnavbar>
    <f7-messages>
      <f7-message v-for="message in messages"
        :text="message.text"
        :label="message.label"
        :date="message.date"
        :name="message.name"
        :avatar="message.avatar"
        :type="message.type"
        :day="message.day"
        :time="message.time"
        @click="onClick"
        @click:text="onTextClick"
        @click:name="onNameClick"
        @click:avatar="onAvatarClick"
      ></f7-message>
    </f7-messages>
    <f7-messagebar placeholder="Message" send-link="Send" @submit="onSubmit"></f7-messagebar>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        name: 'Vladimir',
        messages: [
          {
            day: 'Wendesday',
            time: '13:34'
          },
          {
            name: 'Vladimir',
            text: 'How are you?',
            label: 'Sent in good mood :)',
            avatar: 'http://lorempixel.com/100/100/people/3',
            date: 'Yesterday 13:34'
          },
          {
            name: 'Jane',
            text: 'I\'m good, thank you!',
            type: 'received',
            avatar: 'http://lorempixel.com/100/100/people/9',
            date: 'Yesterday at 13:50'
          }
        ]
      }
    },
    methods: {
      onClick: function (event) {
        console.log('click');
      },
      onAvatarClick: function () {
        console.log('avatar-click');
      },
      onTextClick: function () {
        console.log('text-click');
      },
      onNameClick: function () {
        console.log('name-click');
      },
      onSubmit: function (text, clear) {
        if (text.trim().length === 0) return;
        this.messages.push({
          name: this.name,
          avatar: 'http://lorempixel.com/100/100/people/3',
          text: text,
          date: (function () {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            return hours + ':' + minutes;
          })()
        });
        clear();
      }
    }
  }
</script>