<script>
  export default {
    render: function (c) {
      var self = this;
      var headerEl, contentEl, contentChildEl, footerEl;

      if (self.title) {
        headerEl = c('f7-card-header', {domProps: {innerHTML: self.title}});
      }
      if (self.content) {
        contentChildEl = c('div', {domProps: {innerHTML: self.content}});
        contentEl = c('f7-card-content', {props: {inner: self.inner}}, [contentChildEl]);
      }
      if (self.footer) {
        footerEl = c('f7-card-footer', {domProps: {innerHTML: self.footer}});
      }

      return c('div', {staticClass: 'card'}, [headerEl, contentEl, footerEl, self.$slots.default]);
    },
    props: {
      'title': [String, Number],
      'content': [String, Number],
      'footer': [String, Number],
      'inner': {
        type: Boolean,
        default: true
      }
    }
  }
</script>