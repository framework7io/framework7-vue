<template>
  <li>
    <a v-if="title"
      class="item-link list-button"
      :href="(typeof link !== 'string' ? '#' : link)"
      :class="classesObject"
      :data-panel="typeof openPanel === 'string' ? openPanel : false"
      :data-popup="typeof openPopup === 'string' ? openPopup : false"
      :data-popover="typeof openPopover === 'string' ? openPopover : false"
      :data-picker="typeof openPicker === 'string' ? openPicker : false"
      :data-login-screen="typeof openLoginScreen === 'string' ? openLoginScreen : false"
      :data-sortable="typeof openSortable === 'string' ? openSortable : (typeof toggleSortable === 'string' ? toggleSortable : false)"
      :data-tab="typeof tabLink === 'string' ? tabLink : false"
      v-html="title"
      @click="onClick"
      ></a>
    <a v-else
      class="item-link list-button"
      :href="(typeof link !== 'string' ? '#' : link)"
      :class="classesObject"
      :data-panel="typeof openPanel === 'string' ? openPanel : false"
      :data-popup="typeof openPopup === 'string' ? openPopup : false"
      :data-popover="typeof openPopover === 'string' ? openPopover : false"
      :data-picker="typeof openPicker === 'string' ? openPicker : false"
      :data-login-screen="typeof openLoginScreen === 'string' ? openLoginScreen : false"
      :data-sortable="typeof openSortable === 'string' ? openSortable : (typeof toggleSortable === 'string' ? toggleSortable : false)"
      :data-tab="typeof tabLink === 'string' ? tabLink : false"
      @click="onClick"
      ><slot></slot></a>
  </li>
</template>
<script>
  export default {
    props: {
      'title': [String, Number],
      'link': [String, Boolean],
      'external': Boolean,
      'link-external': Boolean,
      'back': Boolean,
      'link-back': Boolean,
      'no-fastclick': Boolean,
      'link-no-fastlick': Boolean,

      // View
      view: String,

      // Panel
      openPanel: [String, Boolean],
      closePanel: Boolean,

      // Popup
      openPopup: [String, Boolean],
      closePopup: Boolean,

      // Popover
      openPopover: [String, Boolean],
      closePopover: Boolean,

      // Login Screen
      openLoginScreen: [String, Boolean],
      closeLoginScreen: Boolean,

      // Picker
      openPicker: [String, Boolean],
      closePicker: Boolean,

      // Tab
      tabLink: [Boolean, String],

      // Sortable
      openSortable: [String, Boolean],
      closeSortable: Boolean,
      toggleSortable: [String, Boolean],
    },
    computed: {
      classesObject: function () {
        var self = this;
        var co = {
          'external': self.external || self.linkExternal,
          'back': self.back || self.linkBack
          'no-fastclick': self.noFastclick || self.linkNoFastclick
        };

        // Panel
        if (self.closePanel) co['close-panel'] = true;
        if (self.openPanel) co['open-panel'] = true;

        // Popup
        if (self.closePopup) co['close-popup'] = true;
        if (self.openPopup) co['open-popup'] = true;

        // Popover
        if (self.closePopover) co['close-popover'] = true;
        if (self.openPopover) co['open-popover'] = true;

        // Picker
        if (self.closePicker) co['close-picker'] = true;
        if (self.openPicker) co['open-picker'] = true;

        // Login Screen
        if (self.closeLoginScreen) co['close-login-screen'] = true;
        if (self.openLoginScreen) co['open-login-screen'] = true;

        // Sortable
        if (self.closeSortable) co['close-sortable'] = true;
        if (self.openSortable) co['open-sortable'] = true;
        if (self.toggleSortable) co['toggle-sortable'] = true;

        // Tab
        if (self.tabLink) co['tab-link'] = true;

        return co;
      }
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event)
      }
    }
  }
</script>