import Framework7 from 'framework7';
import Vue from 'vue';
import Panel from './components/panel.vue';
import Views from './components/views.vue';
import View from './components/view.vue';
import Pages from './components/pages.vue';
import Page from './components/page.vue';
import Navbar from './components/navbar.vue';
import NavbarCenter from './components/navbar-center.vue';
import NavbarLeft from './components/navbar-left.vue';
import NavbarRight from './components/navbar-right.vue';
import Toolbar from './components/toolbar.vue';
import Card from './components/card.vue';
import CardHeader from './components/card-header.vue';
import CardFooter from './components/card-footer.vue';
import CardContent from './components/card-content.vue';
import ContentBlock from './components/content-block.vue';
import ContentBlockTitle from './components/content-block-title.vue';
import ListBlock from './components/list-block.vue';
import ListBlockItem from './components/list-block-item.vue';

new Vue({
    el: '#app',
    mounted: function () {
        this.f7 = new window.Framework7();
    },
    components: {
        'views': Views,
        'panel': Panel,
        'single-view': View,
        'pages': Pages,
        'page': Page,
        'navbar': Navbar,
        'navbar-left': NavbarLeft,
        'navbar-center': NavbarCenter,
        'navbar-right': NavbarRight,
        'toolbar': Toolbar,
        'block-title': ContentBlockTitle,
        'content-block-title': ContentBlockTitle,
        'list-block-title': ContentBlockTitle,
        'content-block': ContentBlock,
        'card': Card,
        'card-header': CardHeader,
        'card-footer': CardFooter,
        'card-content': CardContent,
        'list-block': ListBlock,
        'list-block-item': ListBlockItem
    },
    data: {
        items: ['1','2','3']
    }
});

