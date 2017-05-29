<template>
  <div class="item-input">
    <input type="text" :name="name" :value="value">
  </div>
</template>
<script>
  import CalendarDatePickerMixin from '../mixins/calendar-date-picker.vue';
  export default {
    mixins: [CalendarDatePickerMixin],
    props: {
      name: String,
    },
    methods: {
      onF7Init(f7) {
        var self = this;
        var $$ = self.$$;
        var input = $$(self.$el).find('input')
        var params = Object.assign(self.$options.propsData, {
          input,
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
