<script>
  export default {
    render: function (c) {
      var self = this;
      var heading = self.$parent && self.$parent.heading;
      return c(
        heading ? 'th' : 'td',
        {
          attrs: {
            'data-collapsible-title': self.collapsibleTitle
          },
          class: self.classesObject,
          on: {
            click: self.onClick
          }
        },
        [self.$slots.default]
      );

    },
    props: {
      label: Boolean,
      numeric: Boolean,
      actions: Boolean,
      sortable: Boolean,
      checkbox: Boolean,
      order: {
        type: String,
        default: 'asc'
      },
      'sortable-active': Boolean,
      'collapsible-title': String,
      'active-sorting': Boolean,
      'tablet-only': Boolean,
      'tablet-landscape-only': Boolean,
    },
    computed: {
      classesObject () {
        var self = this;
        return {
          'checkbox-cell': self.checkbox,
          'label-cell': self.label,
          'numeric-cell': self.numeric,
          'actions-cell': self.actions,
          'sortable-cell': self.sortable,
          'sortable-asc': self.order === 'asc',
          'sortable-desc': self.order === 'desc',
          'sortable-active': self.sortableActive,
          'tablet-only': self.tabletOnly,
          'tablet-landscape-only': self.tabletLandscapeOnly,
        }
      }
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      }
    }
  }
</script>
