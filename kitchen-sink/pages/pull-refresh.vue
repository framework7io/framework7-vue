<template>
  <f7-page pull-to-refresh @ptr:refresh="onRefresh">
    <f7-navbar back-link="Back" title="Pull To Refresh" sliding></f7-navbar>

    <f7-block-title>Pull To Refresh</f7-block-title>
    <f7-list>
      <f7-list-item v-for="item in items" :title="item"></f7-list-item>
      <f7-list-label>Pull list down to refresh items</f7-list-label>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        counter: 6,
        items: [1,2,3,4,5]
      }
    },
    methods: {
      onRefresh: function (event, done) {
        var self = this;
        setTimeout(function () {
          self.items.push(self.counter);
          self.counter++;
          done();
        }, 2000);
      }
    }
  }
</script>