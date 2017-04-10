<script>
  export default {
    render: function (c) {
      var self = this;
      var heading = self.$parent && self.$parent.heading;
      return c(
        heading ? 'th' : 'td',
        {
          class: self.classesObject
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
      sorting: {
        type: String,
        default: 'asc'
      },
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
        }
      }
    },
  }
</script>
