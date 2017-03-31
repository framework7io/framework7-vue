<template>
  <div class="item-input">
    <input type="text" :name="name" :value="value">
  </div>
</template>
<script>
  export default {
    props: {
      value: [String, Array, Number],
      name: String,
      monthNames: Array,
      monthNamesShort: Array,
      dayNames: Array,
      dayNamesShort: Array,
      firstDay: Number, // First day of the week, Monday
      weekendDays: Array, // Sunday and Saturday
      multiple: Boolean,
      rangePicker: Boolean,
      dateFormat: String,
      direction: String, // or 'vertical'
      minDate: [Date, String, Number],
      maxDate: [Date, String, Number],
      disabled: [Array, Function, Object], // dates range of disabled days
      events: [Array, Function, Object], // dates range of days with events
      rangesClasses: [Array, Function, Object], //array with custom classes date ranges
      touchMove: Boolean,
      animate: Boolean,
      closeOnSelect: Boolean,
      monthPicker: Boolean,
      yearPicker: Boolean,
      weekHeader: Boolean,
      // Common settings
      closeByOutsideClick: Boolean,
      scrollToInput: Boolean,
      inputReadOnly: Boolean,
      convertToPopover: Boolean,
      onlyInPopover: Boolean,
      toolbar: Boolean,
      toolbarCloseText: String,
      headerPlaceholder: String,
      header: Boolean,
      footer: Boolean,
    },
    computed: {
      calendarValue () {
        var self = this;
        if (self.value && !Array.isArray(self.value)) {
          return [self.value];
        }
        return self.value;
      }
    },
    watch: {
      value() {
        var self = this;
        if (self.f7Calendar) {
          var newValue = self.value;
          if (!Array.isArray(self.value)) newValue = [self.value]
          self.$nextTick(function () {
            self.f7Calendar.setValue(newValue);
          });
        }
      }
    },
    beforeDestroy() {
      var self = this;
      if (self.f7Calendar && self.f7Calendar.destroy) {
        self.f7Calendar.destroy();
      }
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
      },
      getValue() {
        if (!this.f7Calendar) return;
        return this.f7Calendar.value;
      },
      setValue(values) {
        if (!this.f7Calendar) return;
        return this.f7Calendar.setValue(values)

      },
      nextMonth(duration) {
        if (!this.f7Calendar) return;
        return this.f7Calendar.nextMonth(duration);

      },
      prevMonth(duration) {
        if (!this.f7Calendar) return;
        return this.f7Calendar.prevMonth(duration);

      },
      nextYear() {
        if (!this.f7Calendar) return;
        return this.f7Calendar.nextYear();

      },
      prevYear() {
        if (!this.f7Calendar) return;
        return this.f7Calendar.prevYear();

      },
      setYearMonth(year, month, duration) {
        if (!this.f7Calendar) return;
        return this.f7Calendar.setYearMonth(year, month, duration);
      },
      open() {
        if (!this.f7Calendar) return;
        return this.f7Calendar.open();
      },
      close() {
        if (!this.f7Calendar) return;
        return this.f7Calendar.close();

      },
    }
  }
</script>
