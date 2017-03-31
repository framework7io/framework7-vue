<template>
  <div class="calendar-inline"></div>
</template>
<script>
  import CalendarMixin from '../mixins/calendar-datepicker.vue';
  export default {
    mixins: [CalendarMixin],
    methods: {
      onF7Init(f7) {
        var self = this;
        var params = Object.assign(self.$options.propsData, {
          container: self.$el,
          value: self.calendarValue,
          onChange(c, values, displayValues){
            self.$emit('change', c, values, displayValues);
          },
          onMonthAdd(c, monthContainer){
            self.$emit('monthAdd', c, monthContainer);
          },
          onDayClick(c, dayContainer, year, month, day){
            self.$emit('dayClick', c, dayContainer, year, month, day);
          },
          onMonthYearChangeStart(c, year, month){
            self.$emit('monthYearChangeStart', c, year, month);
          },
          onMonthYearChangeEnd(c, year, month){
            self.$emit('monthYearChangeEnd', c, year, month);
          },
          onOpen(c){
            self.$emit('open', c)
          },
          onClose(c){
            self.$emit('close', c)
          },
        });
        self.f7Calendar = f7.calendar(params)
      }
    }
  }
</script>
