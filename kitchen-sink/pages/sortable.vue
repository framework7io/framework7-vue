<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Sortable" sliding>
      <f7-nav-right>
        <f7-link toggle-sortable="#sortable">{{sorting ? 'Done' : 'Open'}}</f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Sortable List</f7-block-title>
    <f7-list id="sortable" sortable @sortable:sort="onSort" @sortable:open="onOpen" @sortable:close="onClose">
      <f7-list-item
        v-for="items in items"
        :title="'Item ' + items"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        sorting: false,
        items: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onOpen: function () {
        this.sorting = !this.sorting;
      },
      onClose: function () {
        this.sorting = !this.sorting;
      },
      onSort: function (event, indexes) {
          console.log('sort', indexes);
      },
    }
  }
</script>