<template>
  <div class="calendar-inline"></div>
</template>
<script>
  import CalendarDatePickerMixin from '../mixins/calendar-date-picker.vue';
  export default {
    mixins: [CalendarDatePickerMixin],
    methods: {
      onF7Init(f7) {
        var self = this;
        if (typeof self.$options.propsData.footer === 'undefined') {
          self.$options.propsData.footer = false;
        }
        if (typeof self.$options.propsData.header === 'undefined') {
          self.$options.propsData.header = false;
        }
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
