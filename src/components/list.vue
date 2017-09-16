<script>
  export default {
    beforeDestroy() {
      const self = this;
      if (!(self.virtual && self.virtualInit && self.f7VirtualList)) return;
      if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
    },
    watch: {
      'virtualListParams.items': function onItemsChange() {
        // Items Updated
        const self = this;
        if (!(self.virtual && self.virtualInit && self.f7VirtualList)) return;
        self.f7VirtualList.replaceAllItems(self.virtualListParams.items);
      },
    },
    render(c) {
      const self = this;

      const listChildren = [];
      const ulChildren = [];

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          const tag = self.$slots.default[i].tag;
          if (tag && !(tag === 'li' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
            listChildren.push(self.$slots.default[i]);
          } else {
            ulChildren.push(self.$slots.default[i]);
          }
        }
      }
      const blockEl = c(
        self.form ? 'form' : 'div',
        {
          staticClass: 'list',
          class: {
            inset: self.inset,
            'tablet-inset': self.tabletInset,
            'media-list': self.mediaList,
            'simple-list': self.simpleList,
            'links-list': self.linksList,
            sortable: self.sortable,
            'accordion-list': self.accordionList,
            'contacts-block': self.contactsList,
            'virtual-list': self.virtualList,
            tab: self.tab,
            'tab-active': self.tabActive,
            'no-hairlines': self.noHairlines,
            'no-hairlines-between': self.noHairlinesBetween,
            'form-store-data': self.formStoreData,
          },
          on: {
            'sortable:enable': self.onSortableEnable,
            'sortable:disable': self.onSortableDisable,
            'sortable:sort': self.onSortableSort,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [
          ulChildren.length > 0 ? [c('ul', {}, ulChildren), listChildren] : listChildren,
        ]
      );
      return blockEl;
    },
    props: {
      inset: Boolean,
      tabletInset: Boolean,
      mediaList: Boolean,
      grouped: Boolean,
      sortable: Boolean,
      accordionList: Boolean,
      contactsList: Boolean,

      noHairlines: Boolean,
      noHairlinesBetween: Boolean,

      // Tab
      tab: Boolean,
      tabActive: Boolean,

      // Form
      form: Boolean,
      formStoreData: Boolean,

      // Virtual List
      virtualList: Boolean,
      virtualListInit: {
        type: Boolean,
        default: true,
      },
      virtualListParams: Object,
    },
    methods: {
      onSortableEnable(event) {
        this.$emit('sortable:enable', event);
      },
      onSortableDisable(event) {
        this.$emit('sortable:disable', event);
      },
      onSortableSort(event) {
        this.$emit('sortable:sort', event, event.detail);
      },
      onTabShow(e) {
        this.$emit('tab:show', e);
      },
      onTabHide(e) {
        this.$emit('tab:hide', e);
      },
      onF7Ready(f7) {
        const self = this;
        // Init Virtual List
        if (!(self.virtual && self.virtualInit)) return;
        const $$ = self.$$;
        const $el = $$(self.$el);
        const templateScript = $el.find('script');
        let template = templateScript.html();
        if (!template && templateScript.length > 0) {
          template = templateScript[0].outerHTML;
          template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
        }
        if (!template && !self.virtualRenderItem && !self.virtualRenderExternal) return;
        if (template) template = self.$t7.compile(template);

        self.f7VirtualList = f7.virtualList(self.$el, {
          items: self.virtualItems || [],
          template,
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
          onItemBeforeInsert(list, item) {
            self.$emit('virtual:itembeforeinsert', list, item);
          },
          onBeforeClear(list, fragment) {
            self.$emit('virtual:beforeclear', list, fragment);
          },
          onItemsBeforeInsert(list, fragment) {
            self.$emit('virtual:itemsbeforeinsert', list, fragment);
          },
          onItemsAfterInsert(list, fragment) {
            self.$emit('virtual:itemsafterinsert', list, fragment);
          },
        });
      },
    },
  };
</script>
