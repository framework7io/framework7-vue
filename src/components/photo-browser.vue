<script>
  import Utils from '../utils/utils';

  export default {
    name: 'f7-photo-browser',
    render() {},
    beforeDestroy() {
      const self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
    },
    watch: {
      photos(newValue) {
        const self = this;
        const pb = self.f7PhotoBrowser;
        if (!pb) return;
        self.f7PhotoBrowser.photos = newValue;
        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      },
    },
    props: {
      init: {
        type: Boolean,
        default: true,
      },
      params: Object,
      photos: Array,
      exposition: Boolean,
      expositionHideCaptions: Boolean,
      type: String,
      navbar: Boolean,
      toolbar: Boolean,
      theme: String,
      captionsTheme: String,
      swipeToClose: Boolean,
      backLinkText: String,
      navbarOfText: String,
      iconsColor: String,
      swiper: Object,
      url: String,
      view: [String, Object],
      routableModals: Boolean,
      renderNavbar: Function,
      renderToolbar: Function,
      renderCaption: Function,
      renderObject: Function,
      renderLazyPhoto: Function,
      renderPhoto: Function,
      renderPage: Function,
      renderPopup: Function,
      renderStandalone: Function,
    },
    methods: {
      open(index) {
        return this.f7PhotoBrowser.open(index);
      },
      close() {
        return this.f7PhotoBrowser.close();
      },
      expositionToggle() {
        return this.f7PhotoBrowser.expositionToggle();
      },
      expositionEnable() {
        return this.f7PhotoBrowser.expositionEnable();
      },
      expositionDisable() {
        return this.f7PhotoBrowser.expositionDisable();
      },
      onF7Init(f7) {
        const self = this;
        // Init Virtual List
        if (!self.init) return;
        let params;

        if (typeof self.params !== 'undefined') params = self.params;
        else params = self.$options.propsData;

        params = Utils.extend({}, params, {
          on: {
            open() {
              self.$emit('photobrowser:open');
            },
            close() {
              self.$emit('photobrowser:close');
            },
            opened() {
              self.$emit('photobrowser:opened');
            },
            closed() {
              self.$emit('photobrowser:closed');
            },
            swipeToClose() {
              self.$emit('photobrowser:swipetoclose');
            },
          },
        });

        self.f7PhotoBrowser = f7.photoBrowser.create(params);
      },
    },
  };
</script>
