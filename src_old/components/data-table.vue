<script>
  export default {
    render: function (c) {
      var self = this;

      // Split Rows into thead and tbody
      var theadEl = [];
      var theadEls = [];
      var tbodyEl = [];
      var tbodyEls = [];
      var beforeTableEls = [];
      var afterTableEls = [];

      var cells;
      if (self.headings) {
        cells = [];
        self.headings.forEach(function (heading, index) {
          var isNumeric = self.columns[index] && self.items[0][self.columns[index]] * 1 === parseFloat(self.items[0][self.columns[index]]);
          cells.push(c('f7-table-cell', {
            props: {
              label: index === 0 && !isNumeric,
              numeric: isNumeric
            }
          }, [heading]))
        })
        theadEls.push(c('f7-table-row', {
          props: {
            heading: true,
            selectable: self.selectable
          }
        }, cells))
      }
      if (self.items) {
        cells = [];
        self.items.forEach(function (item) {
          var cells = [];
          self.columns.forEach(function (column, index) {
            var isNumeric = item[column] * 1 === parseFloat(item[column]);
            cells.push(c('f7-table-cell', {
              props: {
                label: index === 0 && !isNumeric,
                numeric: isNumeric
              }
            }, [item[column]]))
          })
          tbodyEls.push(c('f7-table-row', {
            props: {
              selectable: self.selectable
            }
          }, cells))
        });
      }

      if (self.title) {
        beforeTableEls.push(c('f7-table-header', {props: {title: self.title}}))
      }

      var children = self.$slots.default || [];
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var tag = child.componentOptions && child.componentOptions.tag;
        var childProps = child.componentOptions && child.componentOptions.propsData;

        if (tag === 'f7-table-row') {
          if (childProps.heading === '' || childProps.heading === true) {
            theadEls.push(child);
          }
          else {
            tbodyEls.push(child);
          }
          if (self.selectable && !('selectable' in childProps)) childProps.selectable = true;
        }
        else {
          beforeTableEls.push(child);
        }

        if (tag === 'f7-table-header') {
          self.hasSelected = childProps.selected;
        }
      }
      if (theadEls.length > 0) {
        theadEl = c('thead', {}, theadEls);
      }
      tbodyEl = c('tbody', {}, tbodyEls);

      // Before Table
      beforeTableEls.push(self.$slots['before-table']);

      // After Table
      afterTableEls.push(self.$slots['after-table']);

      // Table
      var tableEl = c('table', {}, [theadEl, tbodyEl]);

      return c('div', {
        staticClass: 'data-table',
        class: {
          'data-table-collapsible': self.collapsible,
          'data-table-has-checked': self.hasSelected,
          'data-table-has-selected': self.hasSelected,
          'card': self.card
        }
      },[beforeTableEls, tableEl, afterTableEls]);
    },
    props: {
      card: Boolean,
      collapsible: Boolean,
      selectable: Boolean,
      items: Array,
      title: String,
      headings: Array,
      columns: Array
    }
  }
</script>
