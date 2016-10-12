<template>
  <div class="item-content" @onClick="onClick">
    <div v-if="media" class="item-media" v-html="media"></div>
    <div class="item-inner" v-if="mediaList">
      <div v-if="title || after || badge" class="item-title-row">
        <div v-if="title" class="item-title" v-html="title"></div>
        <div v-if="after || badge" class="item-after"><span v-html="after" v-if="after"></span><f7-badge v-if="badge" :color="badgeColor">{{badge}}</f7-badge></div>
      </div>
      <div v-if="subtitle" class="item-subtitle" v-html="subtitle"></div>
      <div v-if="text" class="item-text" v-html="text"></div>
    </div>
    <div class="item-inner" v-else>
      <div v-if="title" class="item-title" v-html="title"></div>
      <div v-if="after || badge" class="item-after"><span v-html="after" v-if="after"></span><f7-badge v-if="badge" :color="badgeColor">{{badge}}</f7-badge></div>
    </div>
  </div>
</template>
<script>
  import Badge from './badge.vue'
  export default {
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],
      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-list': Boolean
    },
    data: function () {
      return {};
    },
    components: {
      'f7-badge': Badge
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event, event.target)
      }
    }
  }
</script>