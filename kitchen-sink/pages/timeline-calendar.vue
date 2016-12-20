<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Timeline Calendar" sliding></f7-navbar>

    <f7-timeline horizontal col="33" tablet-col="15">
      <f7-timeline-year title="2016">
        <f7-timeline-month title="December">
          <f7-timeline-item v-for="n in 11" :date="n + 20">
            <f7-timeline-item-child
              v-for="m in Math.round(Math.random()*3)"
              inner
              :time="Math.round(Math.random()*23) + ':00'"
              :text="'Task ' + m"
            ></f7-timeline-item-child>
          </f7-timeline-item>
        </f7-timeline-month>
      </f7-timeline-year>
      <f7-timeline-year title="2017">
        <f7-timeline-month title="January">
          <f7-timeline-item v-for="n in 31" :date="n">
            <f7-timeline-item-child
              v-for="m in Math.round(Math.random()*3)"
              inner
              :time="Math.round(Math.random()*23) + ':00'"
              :text="'Task ' + m"
            ></f7-timeline-item-child>
          </f7-timeline-item>
        </f7-timeline-month>
        <f7-timeline-month title="February">
          <f7-timeline-item v-for="n in 28" :date="n">
            <f7-timeline-item-child
              v-for="m in Math.round(Math.random()*3)"
              inner
              :time="Math.round(Math.random()*23) + ':00'"
              :text="'Task ' + m"
            ></f7-timeline-item-child>
          </f7-timeline-item>
        </f7-timeline-month>
      </f7-timeline-year>
    </f7-timeline>

  </f7-page>
</template>
<script>
  export default {}
</script>