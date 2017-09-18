<template>
<div class="page">
  <f7-navbar title="Toggle" back-link="Back"></f7-navbar>
  <div class="page-content">
    <f7-block-title>Super Heroes</f7-block-title>
    <div class="list simple-list">
      <ul>
        <li>
          <span>Batman</span>
          <label class="toggle">
            <input type="checkbox" checked>
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Aquaman</span>
          <label class="toggle color-cyan">
            <input type="checkbox" checked>
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Superman</span>
          <label class="toggle color-red">
            <input type="checkbox" checked>
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Hulk</span>
          <label class="toggle color-lightgreen">
            <input type="checkbox">
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Spiderman (Disabled)</span>
          <label class="toggle disabled">
            <input type="checkbox">
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Ironman (Disabled)</span>
          <label class="toggle">
            <input type="checkbox" checked disabled>
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Thor</span>
          <label class="toggle color-orange">
            <input type="checkbox" checked>
            <span class="toggle-icon"></span>
          </label>
        </li>
        <li>
          <span>Wonder Woman</span>
          <label class="toggle color-pink">
            <input type="checkbox">
            <span class="toggle-icon"></span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    }
  }
</script>
