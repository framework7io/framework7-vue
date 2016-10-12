<template>
  <li :class="{'item-divider' : divider, 'list-group-title': groupTitle, 'swipeout': swipeout}" @open="onOpen" @opened="onOpened" @close="onClose" @closed="onClosed" @delete="onDelete" @deleted="onDeleted" @swipeout="onSwipeout">
    <span v-if="dividerOrGroupTitle"><slot>{{title}}</slot></span>
    <div class="swipeout-content" v-if="swipeout">
      <a v-if="link && !dividerOrGroupTitle" :href="link === true ? '#' : link" class="item-link" :class="{'external': linkExternal}" @click="onClick">
        <f7-list-item-content
          :title="title"
          :text="text"
          :media="media"
          :subtitle="subtitle"
          :after="after"
          :badge="badge"
          :badge-color="badgeColor"
          :media-list="mediaListComputed"
        ></f7-list-item-content>
      </a>
      <f7-list-item-content v-else v-if="!dividerOrGroupTitle"
        @click="onClick"
        :title="title"
        :text="text"
        :media="media"
        :subtitle="subtitle"
        :after="after"
        :badge="badge"
        :badge-color="badgeColor"
        :media-list="mediaListComputed"
      ></f7-list-item-content>
    </div>
    <a v-if="link && !dividerOrGroupTitle && !swipeout" :href="link === true ? '#' : link" class="item-link" :class="{'external': linkExternal}" @click="onClick">
      <f7-list-item-content
        :title="title"
        :text="text"
        :media="media"
        :subtitle="subtitle"
        :after="after"
        :badge="badge"
        :badge-color="badgeColor"
        :media-list="mediaListComputed"
      ></f7-list-item-content>
    </a>
    <f7-list-item-content v-else v-if="!dividerOrGroupTitle && !swipeout"
      @click="onClick"
      :title="title"
      :text="text"
      :media="media"
      :subtitle="subtitle"
      :after="after"
      :badge="badge"
      :badge-color="badgeColor"
      :media-list="mediaListComputed"
    ></f7-list-item-content>
    <div v-if="sortableComputed && !dividerOrGroupTitle" class="sortable-handler"></div>
    <slot></slot>
  </li>
</template>
<script>
  import ListItemContent from './list-item-content.vue'
  export default {
    props: {
      'title': [String, Number],
      'text': [String, Number],
      'media': String,
      'subtitle': [String, Number],
      'link': [String, Boolean],
      'link-external': Boolean,
      'after': [String, Number],
      'badge': [String, Number],
      'badge-color': String,
      'media-list-item': Boolean,
      'media-list': Boolean,
      'media-list-computed': Boolean,
      'divider': Boolean,
      'group-title': Boolean,
      'divider-or-group-title': Boolean,
      'swipeout': Boolean,
      'sortable': Boolean,
      'sortable-computed': Boolean
    },
    computed: {
      dividerOrGroupTitle: function () {
        return this.divider || this.groupTitle;
      },
      sortableComputed: function () {
        return this.sortable || this.$parent.sortable || this.$parent.sortableComputed;
      },
      mediaListComputed: function () {
        return this.mediaList || this.$parent.mediaList || this.$parent.mediaListComputed;
      }
    },
    data: function () {
      return {};
    },
    components: {
      'f7-list-item-content': ListItemContent
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event, event.target)
      },
      onDeleted: function (event) {
        this.$emit('deleted', event, event.target)
      },
      onDelete: function (event) {
        this.$emit('delete', event, event.target)
      },
      onClose: function (event) {
        this.$emit('close', event, event.target)
      },
      onClosed: function (event) {
        this.$emit('closed', event, event.target)
      },
      onOpen: function (event) {
        this.$emit('open', event, event.target)
      },
      onOpened: function (event) {
        this.$emit('opened', event, event.target)
      },
      onSwipeout: function (event) {
        this.$emit('swipeout', event, event.target)
      }
    }
  }
</script>