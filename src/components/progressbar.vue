<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  const ProgressbarProps = Utils.extend({
    progress: Number,
    infinite: Boolean,
  }, Mixins.colorProps);

  export default {
    name: 'f7-progressbar',
    render(c) {
      const self = this;
      const { progress } = self;
      return c('span', {
        staticClass: 'progressbar',
        class: self.classes,
        attrs: {
          'data-progress': progress,
        },
      }, [
        c('span', {
          style: {
            transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
            '-webkit-transform': progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
          },
        }),
      ]);
    },
    props: ProgressbarProps,
    computed: {
      classes() {
        return Utils.extend({
          'progressbar-infinite': this.infinite,
        }, Mixins.colorClasses(this));
      },
    },
    methods: {
      set(progress, speed) {
        const self = this;
        if (!self.$f7) return;
        self.$f7.progressbar.set(self.$el, progress, speed);
      },
    },
  };
</script>
