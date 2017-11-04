<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7CardHeader from './card-header.vue';
  import f7CardContent from './card-content.vue';
  import f7CardFooter from './card-footer.vue';

  const CardProps = Utils.extend(
    {
      title: [String, Number],
      content: [String, Number],
      footer: [String, Number],
      padding: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-card',
    components: {
      f7CardHeader,
      f7CardContent,
      f7CardFooter,
    },
    props: CardProps,
    render(c) {
      const self = this;
      let headerEl;
      let contentEl;
      let footerEl;

      if (self.title || (self.$slots && self.$slots.header)) {
        headerEl = c('f7-card-header', [self.title, self.$slots.header]);
      }
      if (self.content || (self.$slots && self.$slots.content)) {
        contentEl = c('f7-card-content', { props: { padding: self.padding } }, [self.content, self.$slots.content]);
      }
      if (self.footer || (self.$slots && self.$slots.footer)) {
        footerEl = c('f7-card-footer', [self.footer, self.$slots.footer]);
      }
      return c('div', { staticClass: 'card', class: self.classes }, [headerEl, contentEl, footerEl, self.$slots.default]);
    },
    computed: {
      classes() {
        const self = this;
        return Mixins.colorClasses(self);
      },
    },
  };
</script>
