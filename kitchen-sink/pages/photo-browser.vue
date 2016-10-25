<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Photo Browser" sliding></f7-navbar>

    <f7-photo-browser
      ref="pb"
      :photos="photos"
      theme="dark"
      @open="onOpen"
      @close="onClose"
      ></f7-photo-browser>

    <f7-link v-for="(photo, index) in photos" @click="openPhotoBrowser(index)">
      <img :src="photo.url || photo"  style="width: 20%; height: 20vw">
    </f7-link>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        photos: [
          {
            url: 'http://lorempixel.com/400/400/nature/1/',
            caption: 'Amazing beach in Goa, India'
          },
          'http://placekitten.com/600/600',
          'http://lorempixel.com/400/400/nature/2/',
          {
              url: 'http://lorempixel.com/400/400/nature/3/',
              caption: 'I met this monkey in Chinese mountains'
          },
          {
              url: 'http://lorempixel.com/400/400/nature/4/',
              caption: 'Beautiful mountains in Zhangjiajie, China'
          }
        ]
      }
    },
    methods: {
      openPhotoBrowser: function (index) {
        this.$refs.pb.open(index)
      },
      onOpen: function (pb) {
        console.log('Photo Browser Opened');
      },
      onClose: function (pb) {
        console.log('Photo Browser Closed');
      },
    }
  }
</script>