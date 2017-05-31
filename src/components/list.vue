<script>
  export default {
    beforeDestroy: function () {
      var self = this;
      if (!(self.virtual && self.virtualInit && self.f7VirtualList)) return;
      if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
    },
    watch: {
      virtualItems: function () {
        // Items Updated
        var self = this;
        if (!(self.virtual && self.virtualInit && self.f7VirtualList)) return;
        self.f7VirtualList.replaceAllItems(self.virtualItems);
      },
    },
    render: function (c) {
      var blockEl, blockChildren;
      var self = this;

      blockChildren = self.grouped ? self.$slots.default : c('ul', {}, self.$slots.default)
      var outOfList = [], ulSlots = [];
      if (self.$slots.default) {
        for (var i = 0; i < self.$slots.default.length; i++) {
          var tag = self.$slots.default[i].tag;
          if (tag && !(tag == 'li' || tag.indexOf('list-item')>=0 || tag.indexOf('list-button')>=0)) {
            outOfList.push(self.$slots.default[i]);
          }
          else {
            ulSlots.push(self.$slots.default[i]);
          }
        }
      }
      blockEl = c(
        self.form ? 'form' : 'div',
        {
          staticClass: 'list-block',
          'class': {
            'inset': self.inset,
            'tablet-inset': self.tabletInset,
            'media-list': self.mediaList,
            'sortable': self.sortable,
            'accordion-list': self.accordion,
            'contacts-block': self.contacts,
            'virtual-list': self.virtual,
            'tab': self.tab,
            'active': self.active,
            'no-hairlines': self.noHairlines,
            'no-hairlines-between': self.noHairlinesBetween,
            'store-data': self.storeData
          },
          on: {
            'sortable:open': self.onSortableOpen,
            'sortable:close': self.onSortableClose,
            'sortable:sort': self.onSortableSort,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide
          }
        },
        [
          ulSlots.length > 0 ? [c('ul', {}, ulSlots), outOfList] : outOfList
        ]
      );
      return blockEl;
    },
    props: {
      'inset': Boolean,
      'tablet-inset': Boolean,
      'media-list': Boolean,
      'grouped': Boolean,
      'sortable': Boolean,
      'label': String,
      'accordion': Boolean,
      'contacts': Boolean,

      'no-hairlines': Boolean,
      'no-hairlines-between': Boolean,

      // Tab
      'tab': Boolean,
      'active': Boolean,

      // Form
      'form': Boolean,
      'store-data': Boolean,

      // Virtual List
      'virtual': Boolean,
      'virtual-init': {
        type: Boolean,
        default: true
      },
      'virtual-items': [Array, Object],
      'virtual-height': [Number, Function],
      'virtual-rows-before': Number,
      'virtual-rows-after': Number,
      'virtual-cols': {
        type: Number,
        default: 1
      },
      'virtual-cache': {
        type: Boolean,
        default: true
      },
      'virtual-filtered-only': {
        type: Boolean,
        default: false
      },
      'virtual-search-by-item': Function,
      'virtual-search-all': Function,
      'virtual-render-item': Function,
      'virtual-empty-template': String,
      'virtual-render-external': Function,
    },
    methods: {
      onSortableOpen: function (event) {
        this.$emit('sortable:open', event)
      },
      onSortableClose: function (event) {
        this.$emit('sortable:close', event)
      },
      onSortableSort: function (event) {
        this.$emit('sortable:sort', event, event.detail)
      },
      onTabShow: function (e) {
        this.$emit('tab:show', e);
      },
      onTabHide: function (e) {
        this.$emit('tab:hide', e);
      },
      onF7Init: function (f7) {
        var self = this;
        // Init Virtual List
        if (!(self.virtual && self.virtualInit)) return;
        var $$ = self.$$;
        var $el = $$(self.$el);
        var templateScript = $el.find('script');
        var template = templateScript.html();
        if(!template && templateScript.length > 0){
          template = templateScript[0].outerHTML;
          template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
        }
        if (!template && !self.virtualRenderItem && !self.virtualRenderExternal) return;
        if (template) template = self.$t7.compile(template);

        self.f7VirtualList = f7.virtualList(self.$el, {
          items: self.virtualItems || [],
          template: template,
          height: self.virtualHeight || undefined,
          cols: self.virtualCols,
          rowsBefore: self.virtualRowsBefore || undefined,
          rowsAfter: self.virtualRowsAfter || undefined,
          showFilteredItemsOnly: self.virtualFilteredOnly,
          searchByItem: self.virtualSearchByItem,
          searchAll: self.virtualSearchAll,
          renderItem: self.virtualRenderItem,
          renderExternal: self.virtualRenderExternal,
          emptyTemplate: self.virtualEmptyTemplate,
          onItemBeforeInsert: function (list, item) {
            self.$emit('virtual:itembeforeinsert', list, item);
          },
          onBeforeClear: function (list, fragment) {
            self.$emit('virtual:beforeclear', list, fragment);
          },
          onItemsBeforeInsert: function (list, fragment) {
            self.$emit('virtual:itemsbeforeinsert', list, fragment);
          },
          onItemsAfterInsert: function (list, fragment) {
            self.$emit('virtual:itemsafterinsert', list, fragment);
          },
        })
      }
    }
  }
</script>
