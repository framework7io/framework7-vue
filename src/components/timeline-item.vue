<script>
  export default {
    render: function (c) {
      var self = this;
      var timeEl, titleEl, subtitleEl, textEl, dateEl, dividerEl, contentEl, innerEl;
      if (self.day || self.month) {
        dateEl = c('div', {staticClass:'timeline-item-date', domProps: {innerHTML: [self.day, '<small>' + self.month + '</small>'].join(' ')}});
      }
      else {
        dateEl = c('div', {staticClass:'timeline-item-date', domProps: {innerHTML: self.date}});
      }

      dividerEl = c('div', {staticClass:'timeline-item-divider'});

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

      if (self.inner) {
        if (self.content) {
          innerEl = c('div', {staticClass:'timeline-item-inner', domProps:{innerHTML: self.content}});
        }
        else {
          innerEl = c('div', {staticClass:'timeline-item-inner'}, [timeEl, titleEl, subtitleEl, textEl, self.$slots.default]);
        }
      }
      else {
        innerEl = [timeEl, titleEl, subtitleEl, textEl, self.$slots.default];
      }
      if (self.content && !self.inner) {
        contentEl = c('div', {staticClass:'timeline-item-content', domProps: {innerHTML: self.content}});
      }
      else {
        contentEl = c('div', {staticClass:'timeline-item-content'}, [innerEl]);
      }
      return c('div', {
        staticClass: 'timeline-item',
        class: {
          'timeline-item-left': self.side === 'left',
          'timeline-item-right': self.side === 'right'
        }
      }, [dateEl, dividerEl, contentEl])
    },
    props: {
      date: [String, Number, Date],
      day: [String, Number],
      month: [String, Number],
      inner: Boolean,
      content: String,
      side: String,
      time: String,
      title: String,
      subtitle: String,
      text: String
    }
  }
</script>