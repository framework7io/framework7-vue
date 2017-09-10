<script>
  export default {
    props: {
      value: [String, Array, Number],
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
      toolbarTemplate: String,
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
