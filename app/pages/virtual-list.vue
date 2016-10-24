<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Virtual List" sliding>
      <f7-nav-right>
        <f7-link @click="addNewItem">New Item</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-searchbar cancel-link="Cancel" search-list="#search-list"></f7-searchbar>
    <f7-block>
      <p>Virtual List allows to render lists with huge amount of elements without loss of performance. And it is fully compatible with all Framework7 list components such as Search Bar, Infinite Scroll, Pull To Refresh, Swipeouts (swipe-to-delete) and Sortable.</p>
      <p>Here is the example of virtual list with 10 000 items:</p>
    </f7-block>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list
      id="search-list"
      class="searchbar-found"
      media-list
      virtual
      :virtual-items="items"
      :virtual-height="63"
      :virtual-search-all="searchAll"
      >
      <t7-template>
        <f7-list-item media-item link="#" :title="'{{title}}'" :subtitle="'{{subtitle}}' "></f7-list-item>
      </t7-template>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      var items = [];
      for (var i = 1; i <= 10000; i++) {
        items.push({
          title: 'Item ' + i,
          subtitle: 'Subtitle ' + i
        })
      }
      return {
        items: items
      }
    },
    methods: {
      addNewItem: function () {
        var self = this;
        self.items.push({
          title: 'Item ' + (self.items.length + 1),
          subtitle: 'Subtitle ' + (self.items.length + 1),
        })
      },
      searchAll: function (query) {
        var self = this;
        var found = [];
        for (var i = 0; i < self.items.length; i++) {
            if (self.items[i].title.indexOf(query) >= 0 || query.trim() === '') found.push(i);
        }
        return found;
      }
    }
  }
</script>