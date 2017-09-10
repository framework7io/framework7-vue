<script>
  export default {
    render: function (c) {
      var self = this;
      var headerEl, titleEl;
      if (self.title) {
        titleEl = c('div', {
          class: {
            'data-table-title': !self.selected,
            'data-table-title-selected': self.selected,
          }
        }, [self.title])
      }

      if (self.$slots.default) {
        self.$slots.default.map((el)=>{
          var tag = el.componentOptions && el.componentOptions.tag;
          if (tag === 'f7-table-title' && el.componentOptions.propsData) el.componentOptions.propsData.selected = self.selected;
        })
      }

      headerEl = c('div',
        {
          class: {
            'data-table-header': !self.selected,
            'data-table-header-selected': self.selected,
          }
        },
        [titleEl, self.$slots.default]
      );

      return c('div', {staticClass: 'card-header'}, [headerEl]);
    },
    props: {
      title: String,
      selected: Boolean
    }
  }
</script>
