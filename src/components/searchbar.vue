<template>
  <form class="searchbar" @search="onSearch" @enableSearch="onEnable" @disableSearch="onDisable" @clearSearch="onClear">
    <slot>
      <div class="searchbar-input">
        <input type="search"
        :placeholder="placeholder"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        >
        <a href="#" class="searchbar-clear" @click="onClearClick" v-if="clear"></a>
      </div>
      <a href="#" class="searchbar-cancel" @click="onCancelClick" v-if="cancelLink && !material">{{cancelLink}}</a>
    </slot>
  </form>
</template>
<script>
  export default {
    beforeDestroy: function () {
      if (this.f7Searchbar && this.f7Searchbar.destroy) this.f7Searchbar.destroy();
    },
    props: {
      placeholder: {
        type: String,
        default: 'Search'
      },
      cancelLink: String,
      clear: {
        type: Boolean,
        default: true
      },

      // SB Params
      params: Object,
      searchList: [String, Object],
      searchIn: {
        type: String,
        default: '.item-title'
      },
      searchBy: String,
      found: [String, Object],
      notFound: [String, Object],
      overlay: [String, Object],
      ignore: {
        type: String,
        default: '.searchbar-ignore'
      },
      customSearch: {
        type: Boolean,
        default: false
      },
      removeDiacritics: {
        type: Boolean,
        default: false
      },
      hideDividers: {
        type: Boolean,
        default: true
      },
      hideGroups: {
        type: Boolean,
        default: true
      },
      init: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      material: function () {
        var mt = false;
        if ((this.$f7 && this.$f7.params.material) || (this.$root.$options.framework7 && this.$root.$options.framework7.material)) mt = true;
        return mt;
      }
    },
    methods: {
      onChange: function (event) {
        this.$emit('change', event);
      },
      onInput: function (event) {
        this.$emit('click', event.target.value);
      },
      onFocus: function (event) {
        this.$emit('focus', event);
      },
      onBlur: function (event) {
        this.$emit('blur', event);
      },
      onSearch: function (event) {
        this.$emit('search', event.detail.query, event.detail.foundItems);
      },
      onClear: function (event) {
        this.$emit('clear', event);
      },
      onEnable: function (event) {
        this.$emit('enable', event);
      },
      onDisable: function (event) {
        this.$emit('disable', event);
      },
      onClearClick: function (event) {
        this.$emit('click:clear', event);
      },
      onCancelClick: function (event) {
        this.$emit('click:cancel', event);
      },
      onF7Init: function () {
        var self = this;
        if (!self.init) return;
        self.f7Searchbar = self.$f7.searchbar(self.$el, self.params || {
          searchList: self.searchList,
          searchIn: self.searchIn,
          searchBy: self.searchBy,
          found: self.found,
          notFound: self.notFound,
          overlay: self.overlay,
          ignore: self.ignore,
          customSearch: self.customSearch,
          removeDiacritics: self.removeDiacritics,
          hideDividers: self.hideDividers,
          hideGroups: self.hideGroups
        });
      }
    }
  }
</script>