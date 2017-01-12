<script>
  export default {
    render: function (c) {
      var self = this;
      var color = self.color;
      var progress = self.progress;
      var infinite = self.infinite;
      return c('span', {
        staticClass: 'progressbar',
        class: [(color ? ('color-' + color + ' progressbar-' + color) : ''), (infinite ? 'progressbar-infinite' : '')].join(' ')
      }, [
        c('span', {
          style: {
            'transform': progress ? 'translate3d(' + (-100 + progress) + '%,0,0)' : ''
          }
        })
      ]);
    },
    props: {
      'color': String,
      'progress': Number,
      'infinite': Boolean
    },
    methods: {
      set: function (progress, speed) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.setProgressbar(self.$el, progress, speed);
      },
      show: function (container, progress, color) {
        var self = this;
        if (!self.$f7) return;
        return self.$f7.showProgressbar(container, progress, color);
      }
    }
  }
</script>