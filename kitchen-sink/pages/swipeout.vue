<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Swipeout" sliding></f7-navbar>

    <f7-block-title>Swipe To Delete</f7-block-title>
    <f7-list>
      <f7-list-item swipeout
        v-for="n in 3"
        :title="'Item ' + n"
        @swipeout:deleted="onSwipeoutDeleted"
      >
        <f7-swipeout-actions>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Multiple Actions</f7-block-title>
    <f7-list>
      <f7-list-item swipeout
        v-for="n in 3"
        :title="'Item ' + n"
        @swipeout:deleted="onSwipeoutDeleted"
      >
        <f7-swipeout-actions>
          <f7-swipeout-button close color="green">Close</f7-swipeout-button>
          <f7-swipeout-button delete overswipe>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Actions On Left</f7-block-title>
    <f7-list>
      <f7-list-item swipeout
        v-for="n in 3"
        :title="'Item ' + n"
        @swipeout:deleted="onSwipeoutDeleted"
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button close color="blue">Reply</f7-swipeout-button>
          <f7-swipeout-button close color="green">Close</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Actions On Both Sides</f7-block-title>
    <f7-list media-list>
      <f7-list-item swipeout
        v-for="n in 2"
        :title="'Item ' + n"
        :subtitle="'Subtitle ' + n"
        :media="'<img src=\'http://lorempixel.com/160/160/people/' + n + '\' width=\'80\'>'"
        text="Some text goes here"
        after="After"
        link="http://google.com"
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button close color="blue">Reply</f7-swipeout-button>
          <f7-swipeout-button close color="green">Close</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button close color="orange">More</f7-swipeout-button>
          <f7-swipeout-button delete overswipe>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    methods: {
      onSwipeoutDeleted: function (event){
          console.log('swipeout deleted');
      }
    }
  }
</script>