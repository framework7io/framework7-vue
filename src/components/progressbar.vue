<script>
  export default {
    render(c) {
      const self = this;
      const { color, progress, infinite } = self;
      return c('span', {
        staticClass: 'progressbar',
        class: [(color ? `color-${color}` : ''), (infinite ? 'progressbar-infinite' : '')].join(' '),
        attrs: {
          'data-progress': progress,
        },
      }, [
        c('span', {
          style: {
            transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
          },
        }),
      ]);
    },
    props: {
      color: String,
      progress: Number,
      infinite: Boolean,
    },
    methods: {
      set(progress, speed) {
        const self = this;
        if (self.$f7) return undefined;
        return self.$f7.progressbar.set(self.$el, progress, speed);
      },
      show(progress, color) {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.progress.show(self.$el, progress, color);
      },
      hide() {
        const self = this;
        if (!self.$f7) return undefined;
        return self.$f7.progress.hide(self.$el);
      },
    },
  };
</script>
