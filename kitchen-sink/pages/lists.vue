<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Lists" sliding></f7-navbar>

    <f7-block-title>List</f7-block-title>
    <f7-list>
      <f7-list-item
        v-for="n in 5"
        :title="n === 3 ? 'Divider' : 'Item ' + n"
        badge="3"
        badge-color="red"
        :divider="n === 3"
      ></f7-list-item>
      <f7-list-label>Hello I'm List Label</f7-list-label>
    </f7-list>

    <f7-block-title>Grouped List</f7-block-title>
    <f7-list>
      <f7-list-group v-for="n in 2">
        <f7-list-item
          v-for="n in 3"
          :title="n === 1 ? 'Group Title' : 'Group Item ' + (n - 1)"
          :group-title="n === 1"
        ></f7-list-item>
      </f7-list-group>
      <f7-list-label>Hello I'm List Label</f7-list-label>
    </f7-list>

    <f7-block-title>Media List</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        v-for="n in 2"
        :title="'Item ' + n"
        :subtitle="'Subtitle ' + n"
        :media="'<img src=\'http://lorempixel.com/160/160/people/' + n + '\' width=\'80\'>'"
        text="Some text goes here"
        after="After"
        link="http://google.com"
      ></f7-list-item>
    </f7-list>

    <f7-block-title>Buttons List</f7-block-title>
    <f7-list inset>
      <f7-list-button v-for="n in 3" :title="'List Button ' + n" link="http://google.com"></f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {}
</script>