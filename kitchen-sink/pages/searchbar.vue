<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Searchbar" sliding></f7-navbar>
    <f7-searchbar cancel-link="Cancel" search-list="#search-list" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear"></f7-searchbar>

    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list class="searchbar-found" id="search-list">
      <f7-list-item v-for="item in items" :title="'Item ' + item" :key="item"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      items: (function () {
        const it = [];
        for (let i = 0; i < 100; i += 1) it.push(i + 1);
        return it;
      }()),
    };
  },
  methods: {
    onSearch(query, found) {
      console.log('search', query, found);
    },
    onClear() {
      console.log('clear');
    },
    onEnable() {
      console.log('enable');
    },
    onDisable() {
      console.log('disable');
    },
  },
};
</script>
