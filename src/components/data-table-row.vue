<script>
  export default {
    render: function (c) {
      var self = this;
      var checkboxEl;
      if(self.selectable) {
        checkboxEl = c('f7-table-cell', {props: {checkbox: true}}, [
          c('label', {staticClass: 'form-checkbox'}, [
            c('input', {
              attrs: {
                type: 'checkbox'
              },
              domProps: {
                checked: self.selected
              },
              on: {
                change: self.onChange
              }
            }),
            c('i')
          ])
        ]);
      }
      return c('tr', {
        class: {
          'data-table-row-selected': self.selected
        }
      }, [checkboxEl, self.$slots.default]);
    },
    props: {
      heading: Boolean,
      selectable: Boolean,
      selected: Boolean
    },
    methods: {
      onChange: function (event) {
        var self = this;
        self.$emit('change', event);
      }
    }
  }
</script>
