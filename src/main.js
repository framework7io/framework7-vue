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
import ListItemSwipeoutActions from './components/list-item-swipeout-actions.vue';
import ListItemSwipeoutButton from './components/list-item-swipeout-button.vue';
import ListButton from './components/list-button.vue';
import ButtonsSegmented from './components/buttons-segmented.vue';
import Button from './components/button.vue';
import GridRow from './components/grid-row.vue';
import GridCol from './components/grid-col.vue';

new Vue({
    el: '#app',
    mounted: function () {
        window.f7 = new window.Framework7();
    },
    components: {
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
        'f7-list-button': ListButton,
        'f7-swipeout-actions': ListItemSwipeoutActions,
        'f7-swipeout-button': ListItemSwipeoutButton,
        'f7-badge': Badge,
        'f7-buttons': ButtonsSegmented,
        'f7-segmented': ButtonsSegmented,
        'f7-button': Button,
        'f7-grid': GridRow,
        'f7-col': GridCol,
    },
    data: {
        items: [
            {
                title: 1,
            },
            {
                title: 2
            }
        ]
    },
    methods: {
        swipeoutDeleted: function (el){
            console.log('swipeoutDeleted');
        },
        sort: function (e, el) {
            console.log('sort');
        }
    }
});

