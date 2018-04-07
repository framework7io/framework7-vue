<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ListProps = Utils.extend(
    {
      inset: Boolean,
      tabletInset: Boolean,
      mediaList: Boolean,
      sortable: Boolean,
      sortableEnabled: Boolean,
      accordionList: Boolean,
      contactsList: Boolean,
      simpleList: Boolean,
      linksList: Boolean,

      noHairlines: Boolean,
      noHairlinesBetween: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesBetweenMd: Boolean,
      noHairlinesIos: Boolean,
      noHairlinesBetweenIos: Boolean,

      // Tab
      tab: Boolean,
      tabActive: Boolean,

      // Form
      form: Boolean,
      formStoreData: Boolean,
      inlineLabels: Boolean,

      // Virtual List
      virtualList: Boolean,
      virtualListParams: Object,
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-list',
    props: ListProps,
    beforeDestroy() {
      const self = this;
      if (!(self.virtualList && self.f7VirtualList)) return;
      if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
    },
    render(c) {
      const self = this;

      const listChildren = [];
      const ulChildren = self.$slots.list || [];

      if (self.$slots.default) {
        for (let i = 0; i < self.$slots.default.length; i += 1) {
          const tag = self.$slots.default[i].tag;
          if (tag && !(tag === 'li' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
            listChildren.push(self.$slots.default[i]);
          } else if (tag) {
            ulChildren.push(self.$slots.default[i]);
          }
        }
      }
      const blockEl = c(
        self.form ? 'form' : 'div',
        {
          staticClass: 'list',
          class: Utils.extend(
            {
              inset: self.inset,
              'tablet-inset': self.tabletInset,
              'media-list': self.mediaList,
              'simple-list': self.simpleList,
              'links-list': self.linksList,
              sortable: self.sortable,
              'accordion-list': self.accordionList,
              'contacts-list': self.contactsList,
              'virtual-list': self.virtualList,
              'sortable-enabled': self.sortableEnabled,
              tab: self.tab,
              'tab-active': self.tabActive,
              'no-hairlines': self.noHairlines,
              'no-hairlines-between': self.noHairlinesBetween,
              'no-hairlines-md': self.noHairlinesMd,
              'no-hairlines-between-md': self.noHairlinesBetweenMd,
              'no-hairlines-ios': self.noHairlinesIos,
              'no-hairlines-between-ios': self.noHairlinesBetweenIos,
              'form-store-data': self.formStoreData,
              'inline-labels': self.inlineLabels,
            },
            Mixins.colorClasses(self)
          ),
          on: {
            'sortable:enable': self.onSortableEnable,
            'sortable:disable': self.onSortableDisable,
            'sortable:sort': self.onSortableSort,
            'tab:show': self.onTabShow,
            'tab:hide': self.onTabHide,
          },
        },
        [
          ulChildren.length > 0 ?
            [
              self.$slots['before-list'],
              c('ul', {}, ulChildren),
              self.$slots['after-list'],
              listChildren,
            ] :
            [
              self.$slots['before-list'],
              listChildren,
              self.$slots['after-list'],
            ],
        ]
      );
      return blockEl;
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
        if (!self.virtualList) return;
        const $$ = self.$$;
        const $el = $$(self.$el);
        const templateScript = $el.find('script');
        let template = templateScript.html();
        if (!template && templateScript.length > 0) {
          template = templateScript[0].outerHTML;
          // eslint-disable-next-line
          template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
        }
        const vlParams = self.virtualListParams || {};
        if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
        if (template) template = self.$t7.compile(template);

        self.f7VirtualList = f7.virtualList.create(Utils.extend(
          {
            el: self.$el,
            itemTemplate: template,
            on: {
              itemBeforeInsert(itemEl, item) {
                const vl = this;
                self.$emit('virtual:itembeforeinsert', vl, itemEl, item);
              },
              beforeClear(fragment) {
                const vl = this;
                self.$emit('virtual:beforeclear', vl, fragment);
              },
              itemsBeforeInsert(fragment) {
                const vl = this;
                self.$emit('virtual:itemsbeforeinsert', vl, fragment);
              },
              itemsAfterInsert(fragment) {
                const vl = this;
                self.$emit('virtual:itemsafterinsert', vl, fragment);
              },
            },
          },
          vlParams
        ));
      },
    },
  };
</script>
