<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Timeline Vertical" sliding></f7-navbar>

    <f7-block-title>Default</f7-block-title>
    <f7-timeline>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
      <f7-timeline-item day="23" month="DEC" inner content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?"></f7-timeline-item>
      <f7-timeline-item day="24" month="DEC" inner content="One more text here"></f7-timeline-item>
    </f7-timeline>

    <f7-block-title>Side By Side</f7-block-title>
    <f7-timeline sides>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
      <f7-timeline-item day="23" month="DEC" inner content="Just plain text"></f7-timeline-item>
      <f7-timeline-item day="24" month="DEC" inner content="One more text here"></f7-timeline-item>
    </f7-timeline>

    <f7-block-title>Only Tablet Side By Side</f7-block-title>
    <f7-timeline tablet-sides>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
      <f7-timeline-item day="23" month="DEC" inner content="Just plain text"></f7-timeline-item>
      <f7-timeline-item day="24" month="DEC" inner content="One more text here"></f7-timeline-item>
    </f7-timeline>

    <f7-block-title>Forced Sides</f7-block-title>
    <f7-timeline sides>
      <f7-timeline-item side="right" day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item side="right" day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
      <f7-timeline-item side="left" day="23" month="DEC" inner content="Just plain text"></f7-timeline-item>
      <f7-timeline-item side="left" day="24" month="DEC" inner content="One more text here"></f7-timeline-item>
    </f7-timeline>

    <f7-block-title>Rich Content</f7-block-title>
    <f7-timeline>
      <f7-timeline-item
        day="21"
        month="DEC"
        inner
        time="12:56"
        title="Item Title"
        subtitle="Item Subtitle"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?"
      ></f7-timeline-item>
      <f7-timeline-item
        day="22"
        month="DEC"
        inner
        time="15:07"
        title="Item Title"
        subtitle="Item Subtitle"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?"
      ></f7-timeline-item>
      <f7-timeline-item
        day="23"
        month="DEC"
      >
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
        day="24"
        month="DEC"
      >
        <f7-card title="Card Header" content="Card Content" footer="Card Footer"></f7-card>
      </f7-timeline-item>
      <f7-timeline-item
        day="25"
        month="DEC"
      >
        Plain text
      </f7-timeline-item>
    </f7-timeline>

    <f7-block-title>Inside Content Block</f7-block-title>
    <f7-block inner>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
      <f7-timeline-item day="23" month="DEC" inner content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?"></f7-timeline-item>
      <f7-timeline-item day="24" month="DEC" inner content="One more text here"></f7-timeline-item>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {}
</script>