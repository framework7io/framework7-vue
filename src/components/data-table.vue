<script>
  export default {
    render: function (c) {
      var self = this;

      // Split Rows into thead and tbody
      var theadEl = [];
      var theadEls = [];
      var tbodyEl = [];
      var tbodyEls = [];
      for (var i = 0; i < self.$slots.default.length; i++) {
        var child = self.$slots.default[i];
        var tag = child.componentOptions && child.componentOptions.tag;
        if (tag === 'f7-table-row') {
          var childProps = child.componentOptions.propsData;
          if (childProps.heading === '' || childProps.heading === true) {
            theadEls.push(child);
          }
          else {
            tbodyEls.push(child);
          }
          if (self.selectable && !('selectable' in childProps)) childProps.selectable = true;
        }
      }
      if (theadEls.length > 0) {
        theadEl = c('thead', {}, theadEls);
      }
      tbodyEl = c('tbody', {}, tbodyEls);

      // Table
      var tableEl = c('table', {}, [theadEl, tbodyEl]);

      return c('div', {
        staticClass: 'data-table',
        class: {
          'data-table-collapsible': self.collapsible,
          'card': self.card
        }
      },[tableEl]);
    },
    props: {
      card: Boolean,
      collapsible: Boolean,
      selectable: Boolean,
    }
  }
</script>
