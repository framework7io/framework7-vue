<template>
<f7-page>
  <f7-navbar title="Tabs" back-link="Back"></f7-navbar>
  <div class="page-content">
    <div class="list">
      <ul>
        <li>
          <a href="/tabs-static/" class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">Static Tabs</div>
            </div>
          </a>
        </li>
        <li>
          <a href="/tabs-animated/" class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">Animated Tabs</div>
            </div>
          </a>
        </li>
        <li>
          <a href="/tabs-swipeable/" class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">Swipeable Tabs</div>
            </div>
          </a>
        </li>
        <li>
          <a href="/tabs-routable/" class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">Routable Tabs</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</f7-page>
</template>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {}
</script>
