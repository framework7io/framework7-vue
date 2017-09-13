<template>
  <f7-page infinite-scroll @infinite="onInfinite">
    <f7-navbar back-link="Back" title="Infinite Scroll" sliding></f7-navbar>

    <f7-block>Scroll list down to load new items</f7-block>
    <f7-block-title>Infinite Scroll</f7-block-title>
    <f7-list>
      <f7-list-item v-for="item in items" :title="item" :key="item"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
let timeout;
export default {
  data() {
    return {
      counter: 26,
      items: (function () {
        const it = [];
        for (let i = 0; i < 25; i += 1) it.push(i + 1);
        return it;
      }()),
    };
  },
  methods: {
    onInfinite() {
      const self = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let i;
        for (i = self.counter; i < self.counter + 25; i += 1) {
          self.items.push(i);
        }
        self.counter = i;
      }, 500);
    },
  },
};
</script>
