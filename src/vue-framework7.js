import Vue from 'vue';

import StatusBar from './components/statusbar.vue';
import Panel from './components/panel.vue';
import Views from './components/views.vue';
import View from './components/view.vue';
import Pages from './components/pages.vue';
import Page from './components/page.vue';
import Navbar from './components/navbar.vue';
import NavbarCenter from './components/navbar-center.vue';
import NavbarLeft from './components/navbar-left.vue';
import NavbarRight from './components/navbar-right.vue';
import Subnavbar from './components/subnavbar.vue';
import Toolbar from './components/toolbar.vue';
import Card from './components/card.vue';
import CardHeader from './components/card-header.vue';
import CardFooter from './components/card-footer.vue';
import CardContent from './components/card-content.vue';
import ContentBlock from './components/content-block.vue';
import ContentBlockTitle from './components/content-block-title.vue';
import Badge from './components/badge.vue';
import List from './components/list.vue';
import ListGroup from './components/list-group.vue';
import ListItem from './components/list-item.vue';
import ListItemContent from './components/list-item-content.vue';
import ListItemSwipeoutActions from './components/list-item-swipeout-actions.vue';
import ListItemSwipeoutButton from './components/list-item-swipeout-button.vue';
import ListButton from './components/list-button.vue';
import ListLabel from './components/list-label.vue';
import AccordionItem from './components/accordion-item.vue';
import AccordionToggle from './components/accordion-toggle.vue';
import AccordionContent from './components/accordion-content.vue';
import ButtonsSegmented from './components/buttons-segmented.vue';
import Button from './components/button.vue';
import GridRow from './components/grid-row.vue';
import GridCol from './components/grid-col.vue';
import Preloader from './components/preloader.vue';
import Progressbar from './components/progressbar.vue';
import FormLabel from './components/form-label.vue';
import FormInput from './components/form-input.vue';
import FormSwitch from './components/form-switch.vue';
import FormRange from './components/form-range.vue';
import Chip from './components/chip.vue';
import Swiper from './components/swiper.vue';
import SwiperSlide from './components/swiper-slide.vue';

export default {
  install: function (Vue, parameters) {
    var eventHub = new Vue();
    var f7Ready = false;
    Vue.mixin({
      mounted: function () {
        var self = this;
        if (f7Ready) {
          if (self.onF7Init) self.onF7Init();
          return;
        }
        eventHub.$on('f7init', function (f7) {
          if (self.onF7Init) self.onF7Init(f7);
        });
        if (self === self.$root) {
          var f7 = new window.Framework7(self.$options.framework7);
          window.f7 = f7;
          self.f7 = f7;
          self.Dom7 = window.Dom7;
          self.Swiper = window.Swiper;
          self.Template7 = window.Template7;
          f7Ready = true;
          eventHub.$emit('f7init', self.f7 );
        }
      },
      components: {
        'f7-statusbar': StatusBar,
        'f7-views': Views,
        'f7-panel': Panel,
        'f7-view': View,
        'f7-pages': Pages,
        'f7-page': Page,
        'f7-navbar': Navbar,
        'f7-navbar-left': NavbarLeft,
        'f7-navbar-center': NavbarCenter,
        'f7-navbar-right': NavbarRight,
        'f7-subnavbar': Subnavbar,
        'f7-toolbar': Toolbar,
        'f7-block-title': ContentBlockTitle,
        'f7-content-block-title': ContentBlockTitle,
        'f7-list-block-title': ContentBlockTitle,
        'f7-content-block': ContentBlock,
        'f7-card': Card,
        'f7-card-header': CardHeader,
        'f7-card-footer': CardFooter,
        'f7-card-content': CardContent,
        'f7-list': List,
        'f7-list-group': ListGroup,
        'f7-list-item': ListItem,
        'f7-list-item-content': ListItemContent,
        'f7-list-button': ListButton,
        'f7-list-label': ListLabel,
        'f7-swipeout-actions': ListItemSwipeoutActions,
        'f7-swipeout-button': ListItemSwipeoutButton,
        'f7-accordion-item': AccordionItem,
        'f7-accordion-toggle': AccordionToggle,
        'f7-accordion-content': AccordionContent,
        'f7-badge': Badge,
        'f7-buttons': ButtonsSegmented,
        'f7-segmented': ButtonsSegmented,
        'f7-button': Button,
        'f7-grid': GridRow,
        'f7-col': GridCol,
        'f7-preloader': Preloader,
        'f7-progressbar': Progressbar,
        'f7-label': FormLabel,
        'f7-input': FormInput,
        'f7-switch': FormSwitch,
        'f7-range': FormRange,
        'f7-chip': Chip,
        'f7-swiper': Swiper,
        'f7-swiper-slide': SwiperSlide,
      }
    });
  }
};