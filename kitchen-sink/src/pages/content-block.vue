<template>
  <f7-page>
    <f7-navbar title="Content Block" back-link="Back"></f7-navbar>
    <p>This paragraph is outside of content block. Not cool, but useful for any custom elements with custom styling.</p>

    <div class="block">
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>

    <div class="block block-strong">
      <p>Here comes another text block with additional "block-strong" class. Praesent nec imperdiet diam. Maecenas vel lectus porttitor, consectetur magna nec, viverra sem. Aliquam sed risus dolor. Morbi tincidunt ut libero id sodales. Integer blandit varius nisi quis consectetur. </p>
    </div>

    <f7-block-title>Block title</f7-block-title>
    <div class="block">
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>

    <f7-block-title>Another ultra long content block title</f7-block-title>
    <div class="block block-strong">
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>

    <f7-block-title>Inset</f7-block-title>
    <div class="block block-strong inset">
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>

    <f7-block-title>Tablet Inset</f7-block-title>
    <div class="block block-strong tablet-inset">
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>

    <div class="block-title">With Header & Footer</div>
    <div class="block">
      <div class="block-header">Block Header</div>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      <div class="block-footer">Block Footer</div>
    </div>

    <div class="block-header">Block Header</div>
    <div class="block">
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>
    <div class="block-footer">Block Footer</div>

    <div class="block block-strong">
      <div class="block-header">Block Header</div>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      <div class="block-footer">Block Footer</div>
    </div>

    <div class="block-header">Block Header</div>
    <div class="block block-strong">
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </div>
    <div class="block-footer">Block Footer</div>
  </f7-page>
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
