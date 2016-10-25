<template>
  <f7-page infinite-scroll @infinite="onInfinite">
    <f7-navbar back-link="Back" title="Infinite Scroll" sliding></f7-navbar>

    <f7-block>Scroll list down to load new items</f7-block>
    <f7-block-title>Infinite Scroll</f7-block-title>
    <f7-list>
      <f7-list-item v-for="item in items" :title="item"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  var timeout;
  export default {
    data: function () {
      return {
        counter: 26,
        items: (function () {
          var it = [];
          for (var i = 0; i < 25; i++) it.push(i+1);
            return it;
        })()
      }
    },
    methods: {
      onInfinite: function (event) {
        var self = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          for (var i = self.counter; i < self.counter + 25; i++) {
            self.items.push(i);
          }
          self.counter = i;
        }, 500);
      }
    }
  }
</script>