<script>
  export default {
    render: function (c) {
      var self = this;
      var timeEl, titleEl, subtitleEl, textEl;

      if (self.time) {
        timeEl = c('div', {staticClass:'timeline-item-time', domProps: {innerHTML: self.time}})
      }
      if (self.title) {
        titleEl = c('div', {staticClass:'timeline-item-title', domProps: {innerHTML: self.title}})
      }
      if (self.subtitle) {
        subtitleEl = c('div', {staticClass:'timeline-item-subtitle', domProps: {innerHTML: self.subtitle}})
      }
      if (self.text) {
        textEl = c('div', {staticClass:'timeline-item-text', domProps: {innerHTML: self.text}})
      }

      if (self.content) {
        return c('div', {
          class: {
            'timeline-item-inner': self.inner,
            'timeline-item-child': !self.inner
          },
          domProps: {
            innerHTML: self.content
          }
        })
      }
      else {
        return c('div', {
          class: {
            'timeline-item-inner': self.inner,
            'timeline-item-child': !self.inner
          }
        }, [timeEl, titleEl, subtitleEl, textEl, self.$slots.default])
      }
    },
    props: {
      inner: Boolean,
      content: String,
      time: String,
      title: String,
      subtitle: String,
      text: String
    }
  }
</script>