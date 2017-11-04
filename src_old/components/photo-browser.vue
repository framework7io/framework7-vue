<script>
  export default {
    render: function () {},
    beforeDestroy: function () {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
    },
    props: {
      init: {
        type: Boolean,
        default: true
      },
      params: Object,
      photos: Array,
      initialSlide: Number,
      spaceBetween: Number,
      speed: Number,
      zoom: Boolean,
      zoomMax: Number,
      zoomMin: Number,
      exposition: Boolean,
      expositionHideCaptions: Boolean,
      type: String,
      navbar: Boolean,
      toolbar: Boolean,
      theme: String,
      captionsTheme: String,
      swipeToClose: Boolean,
      backLinkText: String,
      ofText: String,
      loop: Boolean,
      lazyLoading: Boolean,
      lazyLoadingInPrevNext: Boolean,
      lazyLoadingOnTransitionStart: Boolean,
    },
    methods: {
      open: function (index) {
        return this.f7PhotoBrowser.open(index)
      },
      close: function () {
        return this.f7PhotoBrowser.close()
      },
      toggleZoom: function () {
        return this.f7PhotoBrowser.toggleZoom()
      },
      toggleExposition: function () {
        return this.f7PhotoBrowser.toggleExposition()
      },
      enableExposition: function () {
        return this.f7PhotoBrowser.enableExposition()
      },
      disableExposition: function () {
        return this.f7PhotoBrowser.disableExposition()
      },
      onF7Init: function (f7) {
        var self = this;
        // Init Virtual List
        if (!self.init) return;
        var params = self.$options.propsData;
        self.f7PhotoBrowser = f7.photoBrowser(self.params || {
          photos: params.photos,
          initialSlide: params.initialSlide,
          spaceBetween: params.spaceBetween,
          speed: params.speed,
          zoom: params.zoom,
          zoomMax: params.zoomMax,
          zoomMin: params.zoomMin,
          exposition: params.exposition,
          expositionHideCaptions: params.expositionHideCaptions,
          type: params.type,
          navbar: params.navbar,
          toolbar: params.toolbar,
          theme: params.theme,
          captionsTheme: params.captionsTheme,
          swipeToClose: params.swipeToClose,
          backLinkText: params.backLinkText,
          ofText: params.ofText,
          loop: params.loop,
          lazyLoading: params.lazyLoading,
          lazyLoadingInPrevNext: params.lazyLoadingInPrevNext,
          lazyLoadingOnTransitionStart: params.lazyLoadingOnTransitionStart,
          onOpen: function (pb) {
            self.$emit('open', pb)
          },
          onClose: function (pb) {
            self.$emit('close', pb)
          },
          onSwipeToClose: function (pb) {
            self.$emit('swipeToClose', pb)
          },
          onSlideChangeStart: function (swiper) {
            self.$emit('slideChangeStart', swiper)
          },
          onSlideChangeEnd: function (swiper) {
            self.$emit('slideChangeEnd', swiper)
          },
          onTransitionStart: function (swiper) {
            self.$emit('transitionStart', swiper)
          },
          onTransitionEnd: function (swiper) {
            self.$emit('transitionEnd', swiper)
          },
          onClick: function (swiper, event) {
            self.$emit('click', swiper, event)
          },
          onTap: function (swiper, event) {
            self.$emit('tap', swiper, event)
          },
          onDoubleTap: function (swiper, event) {
            self.$emit('doubleTap', swiper, event)
          },
          onLazyImageLoad: function (swiper, event) {
            self.$emit('lazyImageLoad', swiper, event)
          },
          onLazyImageReady: function (swiper, event) {
            self.$emit('lazyImageReady', swiper, event)
          }
        });
      }
    }
  }
</script>