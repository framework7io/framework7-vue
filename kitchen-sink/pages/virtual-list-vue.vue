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
    <f7-list id="search-list" class="searchbar-found" media-list virtual :virtual-items="items" :virtual-render-external="renderVL" :virtual-height="63" :virtual-search-all="searchAll">
      <ul>
        <f7-list-item v-for="item in vlData.items" :key="item.title" media-item link="#" :title="item.title" :subtitle="item.subtitle" :style="'top:' + vlData.topPosition + 'px'"></f7-list-item>
      </ul>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    const items = [];
    for (let i = 1; i <= 10000; i += 1) {
      items.push({
        title: `Item ${i}`,
        subtitle: `Subtitle ${i}`,
      });
    }
    return {
      items,
      vlData: {},
    };
  },
  methods: {
    renderVL(vl, renderData) {
      const self = this;
      self.vlData = renderData;
    },
    addNewItem() {
      const self = this;
      self.items.push({
        title: `Item ${self.items.length + 1}`,
        subtitle: `Subtitle ${self.items.length + 1}`,
      });
    },
    searchAll(query) {
      const self = this;
      const found = [];
      for (let i = 0; i < self.items.length; i += 1) {
        if (self.items[i].title.indexOf(query) >= 0 || query.trim() === '') found.push(i);
      }
      return found;
    },
  },
};
</script>
