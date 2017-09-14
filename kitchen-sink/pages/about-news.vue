<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="title">About News</div>
      </div>
    </div>
    <p>About News</p>
    <ul>
      <li>
        <a href="/about/">About</a>
      </li>
      <li>
        <a href="/about-news/">About News</a>
      </li>
      <li>
        <a href="/about-services/">About Services</a>
      </li>
      <li>
        <a href="/about-contacts/">About Contacts</a>
      </li>
    </ul>
    <p><a href="" class="back">Back</a></p>
    <p><a href="/about/" class="back" data-force="true">Back To Home</a></p>
  </div>
</template>
<script>
  import { f7Page } from '../../src/framework7-vue';

  export default {
    components: {
      f7Page,
    },
  };
</script>
