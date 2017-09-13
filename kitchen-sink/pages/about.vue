<template>
  <f7-page ptr>
    <f7-navbar title="Hello">
      <f7-nav-right>Nice</f7-nav-right>
      <f7-subnavbar>Hello!</f7-subnavbar>
    </f7-navbar>
    <f7-toolbar>
      <a href="" class="link">Link 1</a>
      <a href="" class="link">Link 2</a>
    </f7-toolbar>
    <f7-block-title>Title</f7-block-title>
    <f7-block strong>
      <f7-block-header>Header</f7-block-header>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem reprehenderit, fuga iusto tenetur odit sint magni quidem laboriosam dolores ullam dolorem nostrum id blanditiis ipsum nulla quam praesentium non odio.</p>
      <f7-block-footer>Footer</f7-block-footer>
    </f7-block>
    <f7-card title="Hello" content="Text content goes here" footer="Footer text"></f7-card>
    <f7-card>
      <p slot="header">I am header</p>
      <p slot="content">I am content</p>
      <p slot="footer">I am footer</p>
    </f7-card>
    <f7-block-title>Chips</f7-block-title>
    <f7-block>
      <f7-chip text="Example Chip"></f7-chip>
      <f7-chip text="Another Chip" bg-color="red" text-color="white"></f7-chip>
      <f7-chip text="One More Chip" bg-color="green" text-color="white"></f7-chip>
      <f7-chip text="Jane Doe">
        <img slot="media" src="http://lorempixel.com/100/100/people/9/">
      </f7-chip>
      <f7-chip text="John Doe" bg-color="orange">
        <img slot="media" src="http://lorempixel.com/100/100/people/3/">
      </f7-chip>
      <f7-chip text="Another Chip" deleteable></f7-chip>
      <f7-chip text="John Doe" deleteable>
        <img slot="media" src="http://lorempixel.com/100/100/people/3/">
      </f7-chip>
    </f7-block>
    <f7-block>
      <f7-icon if-ios="f7:home" if-md="material:test"></f7-icon>
    </f7-block>
    <f7-block>
      <f7-row>
        <f7-col width="50" tablet-width="33" desktop-width="25">1</f7-col>
        <f7-col width="50" tablet-width="33" desktop-width="25">2</f7-col>
      </f7-row>
    </f7-block>
    <f7-block>
      <p><f7-badge>45</f7-badge> <f7-badge color="red">Red</f7-badge></p>
    </f7-block>
    <f7-block>
      <f7-preloader></f7-preloader>
      <f7-preloader color="red" :size="44"></f7-preloader>
      <f7-preloader color="multi"></f7-preloader>
      <f7-preloader color="blue"></f7-preloader>
    </f7-block>
    <f7-block-title>Tabs</f7-block-title>
    <f7-block>
      <a href="./" class="tab-link" data-route-tab-id="tab-1">Tab 1</a>
      <a href="./tab-2/" class="tab-link" data-route-tab-id="tab-2">Tab 2</a>
      <a href="./tab-3/" class="tab-link" data-route-tab-id="tab-3">Tab 3</a>
      <f7-tabs>
        <f7-tab id="tab-1" style="height:100px"></f7-tab>
        <f7-tab id="tab-2" style="height:100px"></f7-tab>
        <f7-tab id="tab-3" style="height:100px"></f7-tab>
      </f7-tabs>
    </f7-block>
    <f7-block>
      <p><f7-progressbar :progress="10"></f7-progressbar></p>
      <p><f7-progressbar :progress="50" color="red"></f7-progressbar></p>
      <p><f7-progressbar :progress="90" color="green"></f7-progressbar></p>
      <p><f7-progressbar infinite color="multi"></f7-progressbar></p>
    </f7-block>

    <f7-fab>
      <span>+</span>
      <f7-fab-buttons>
        <f7-fab-button fab-close>1</f7-fab-button>
        <f7-fab-button fab-close>2</f7-fab-button>
        <f7-fab-button fab-close>3</f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavRight, f7Block, f7BlockHeader, f7BlockFooter, f7BlockTitle, f7Card, f7Chip, f7Icon, f7Row, f7Col, f7Badge, f7Preloader, f7Subnavbar, f7Tabs, f7Tab, f7Progressbar, f7Toolbar, f7Fab, f7FabButtons, f7FabButton } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7Block,
      f7BlockHeader,
      f7BlockFooter,
      f7BlockTitle,
      f7Card,
      f7Chip,
      f7Icon,
      f7Row,
      f7Col,
      f7Badge,
      f7NavRight,
      f7Preloader,
      f7Subnavbar,
      f7Tabs,
      f7Tab,
      f7Progressbar,
      f7Toolbar,
      f7Fab,
      f7FabButtons,
      f7FabButton,
    },
    mounted() {
    },
  };
</script>
