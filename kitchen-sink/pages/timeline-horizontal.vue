<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Timeline Horizontal" sliding></f7-navbar>

    <f7-timeline horizontal col="33" tablet-col="20">
      <f7-timeline-item
        day="21"
        month="DEC"
      >
        <f7-timeline-item-child
          inner
          time="12:56"
          title="Title 1"
          subtitle="Subtitle 1"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
        ></f7-timeline-item-child>
        <f7-timeline-item-child
          inner
          time="13:15"
          title="Title 2"
          subtitle="Subtitle 2"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
        ></f7-timeline-item-child>
        <f7-timeline-item-child
          inner
          time="16:22"
          text="Do something"
        ></f7-timeline-item-child>
      </f7-timeline-item>
      <f7-timeline-item
        day="22"
        month="DEC">
        Plain text goes here
      </f7-timeline-item>
      <f7-timeline-item
        day="23"
        month="DEC">
        <f7-card title="Card Header" content="Card Content" footer="Card Footer"></f7-card>
        <f7-card content="Another Card Content"></f7-card>
      </f7-timeline-item>
      <f7-timeline-item
        day="24"
        month="DEC">
        <f7-list inset>
          <f7-list-item
            link="#"
            title="Item 1"
          ></f7-list-item>
          <f7-list-item
            link="#"
            title="Item 2"
          ></f7-list-item>
          <f7-list-item
            link="#"
            title="Item 3"
          ></f7-list-item>
        </f7-list>
      </f7-timeline-item>
      <f7-timeline-item
        day="25"
        month="DEC"
      >
        <f7-timeline-item-child inner time="12:56" text="Task 1" ></f7-timeline-item-child>
        <f7-timeline-item-child inner time="13:15" text="Task 2" ></f7-timeline-item-child>
        <f7-timeline-item-child inner time="16:22" text="Task 3" ></f7-timeline-item-child>
      </f7-timeline-item>
    </f7-timeline>

  </f7-page>
</template>
<script>
  export default {}
</script>