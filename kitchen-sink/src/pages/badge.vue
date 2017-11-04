<template>
  <f7-page>
    <f7-navbar sliding back-link="Back" title="Badge">
      <f7-nav-right>
        <f7-link icon-only>
          <f7-icon if-ios="f7:person_fill" if-md="material:person" class="icon f7-icons ios-only">
            <f7-badge color="red">5</f7-badge>
          </f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels>
      <f7-link tab-link="#tab-1" tab-link-active>
        <f7-icon class="icon-fill" if-ios="f7:email_fill" if-md="material:email">
          <f7-badge color="green">5</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Inbox</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon if-ios="f7:today" if-md="material:today">
          <f7-badge color="red">7</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Calendar</span>
      </f7-link>
      <f7-link tab-link="#tab-3">
        <f7-icon if-ios="f7:cloud" if-md="material:file_upload">
          <f7-badge color="red">1</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Upload</span>
      </f7-link>
    </f7-toolbar>

    <div class="list">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">Foo Bar</div>
              <div class="item-after"><span class="badge">0</span></div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">Ivan Petrov</div>
              <div class="item-after"><span class="badge color-blue">CEO</span></div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">John Doe</div>
              <div class="item-after"><span class="badge color-green">5</span></div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">Jane Doe</div>
              <div class="item-after"><span class="badge color-orange">NEW</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7NavRight, f7Toolbar, f7Page, f7Link, f7Badge, f7List, f7ListItem, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavRight,
      f7Toolbar,
      f7Link,
      f7Badge,
      f7List,
      f7ListItem,
      f7Icon,
    },
  };
</script>
