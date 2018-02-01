<script>
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  import f7Input from './input.vue';
  import f7Link from './link.vue';

  const MessagebarProps = Utils.extend(
    {
      sheetVisible: Boolean,
      attachmentsVisible: Boolean,
      top: Boolean,
      resizable: {
        type: Boolean,
        default: true,
      },
      bottomOffset: {
        type: Number,
        default: 0,
      },
      topOffset: {
        type: Number,
        default: 0,
      },
      maxHeight: Number,
      sendLink: String,
      value: [String, Number, Array],
      disabled: Boolean,
      readonly: Boolean,
      name: String,
      placeholder: {
        type: String,
        default: 'Message',
      },
      init: {
        type: Boolean,
        default: true,
      },
    },
    Mixins.colorProps
  );

  export default {
    name: 'f7-messagebar',
    components: {
      f7Input,
      f7Link,
    },
    render(c) {
      const self = this;
      const beforeInnerEls = [];
      const afterInnerEls = [];
      const innerStartEls = [];
      const innerEndEls = []; // add send link here
      const beforeAreaEls = []; // add attachments here
      const afterAreaEls = [];

      let linkEl;
      if ((self.sendLink && self.sendLink.length > 0) || self.$slots['send-link']) {
        linkEl = c('f7-link', {
          on: {
            click: self.onClick,
          },
        }, [self.sendLink ? self.sendLink : self.$slots['send-link']]);
        innerEndEls.push(linkEl);
      }

      if (self.$slots['before-inner']) {
        self.$slots['before-inner'].forEach((el) => {
          beforeInnerEls.push(el);
        });
      }
      if (self.$slots['after-inner']) {
        self.$slots['after-inner'].forEach((el) => {
          afterInnerEls.push(el);
        });
      }
      if (self.$slots['inner-start']) {
        self.$slots['inner-start'].forEach((el) => {
          innerStartEls.push(el);
        });
      }
      if (self.$slots['inner-end']) {
        self.$slots['inner-end'].forEach((el) => {
          innerEndEls.push(el);
        });
      }
      if (self.$slots['before-area']) {
        self.$slots['before-area'].forEach((el) => {
          beforeAreaEls.push(el);
        });
      }
      if (self.$slots['after-area']) {
        self.$slots['after-area'].forEach((el) => {
          afterAreaEls.push(el);
        });
      }
      if (self.$slots.default) {
        self.$slots.default.forEach((el) => {
          const tag = el.tag;
          if (tag && tag.indexOf('messagebar-attachments') >= 0) {
            beforeAreaEls.push(el);
          } else if (tag && tag.indexOf('messagebar-sheet') >= 0) {
            afterInnerEls.push(el);
          } else {
            innerEndEls.push(el);
          }
        });
      }

      const inputEl = c('f7-input', {
        props: {
          type: 'textarea',
          wrap: false,
          placeholder: self.placeholder,
          disabled: self.disabled,
          name: self.name,
          readonly: self.readonly,
          resizable: self.resizable,
          value: self.value,
        },
        ref: 'area',
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur,
        },
      });

      const areaEl = c('div', {
        staticClass: 'messagebar-area',
      }, [
        beforeAreaEls,
        inputEl,
        afterAreaEls,
      ]);

      const innerEl = c('div', {
        staticClass: 'toolbar-inner',
      }, [
        innerStartEls,
        areaEl,
        innerEndEls,
      ]);

      return c('div', {
        staticClass: 'toolbar messagebar',
        class: self.classes,
        on: {
          'messagebar:attachmentdelete': self.onDeleteAttachment,
          'messagebar:attachmentclick': self.onClickAttachment,
          'messagebar:resizepage': self.onResizePage,
        },
      }, [
        beforeInnerEls,
        innerEl,
        afterInnerEls,
      ]);
    },
    props: MessagebarProps,
    computed: {
      classes() {
        const self = this;
        return Utils.extend({
          'messagebar-attachments-visible': self.attachmentsVisible,
          'messagebar-sheet-visible': self.sheetVisible,
        }, Mixins.colorClasses);
      },
    },
    watch: {
      sheetVisible() {
        const self = this;
        if (!self.resizable) return;
        self.$nextTick(() => {
          if (!self.f7Messagebar) return;
          self.f7Messagebar.sheetVisible = self.sheetVisible;
          self.f7Messagebar.resizePage();
        });
      },
      attachmentsVisible() {
        const self = this;
        if (!self.resizable) return;
        self.$nextTick(() => {
          if (!self.f7Messagebar) return;
          self.f7Messagebar.attachmentsVisible = self.attachmentsVisible;
          self.f7Messagebar.resizePage();
        });
      },
    },
    beforeDestroy() {
      if (this.f7Messagebar && this.f7Messagebar.destroy) this.f7Messagebar.destroy();
    },
    methods: {
      clear(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.clear(...args);
      },
      getValue(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.getValue(...args);
      },
      setValue(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.setValue(...args);
      },
      setPlaceholder(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.setPlaceholder(...args);
      },
      resizePage(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.resizePage(...args);
      },
      focus(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.focus(...args);
      },
      blur(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.blur(...args);
      },
      attachmentsShow(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.attachmentsShow(...args);
      },
      attachmentsHide(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.attachmentsHide(...args);
      },
      attachmentsToggle(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.attachmentsToggle(...args);
      },
      sheetShow(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.sheetShow(...args);
      },
      sheetHide(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.sheetHide(...args);
      },
      sheetToggle(...args) {
        if (!this.f7Messagebar) return undefined;
        return this.f7Messagebar.sheetToggle(...args);
      },
      onChange(event) {
        this.$emit('change', event);
      },
      onInput(event) {
        this.$emit('input', event);
      },
      onFocus(event) {
        this.$emit('focus', event);
      },
      onBlur(event) {
        this.$emit('blur', event);
      },
      onClick(event) {
        const self = this;
        const value = self.$refs.area.$el.value;
        const clear = self.f7Messagebar ? self.f7Messagebar.clear : () => {};
        this.$emit('submit', value, clear);
        this.$emit('send', value, clear);
        this.$emit('click', event);
      },
      onDeleteAttachment(e) {
        this.$emit('messagebar:attachmentdelete', e);
      },
      onClickAttachment(e) {
        this.$emit('messagebar:attachmentclick', e);
      },
      onResizePage(e) {
        this.$emit('messagebar:resizepage', e);
      },
      onF7Ready() {
        const self = this;
        if (!self.init) return;
        self.f7Messagebar = self.$f7.messagebar.create({
          el: self.$el,
          top: self.top,
          resizePage: self.resizable,
          bottomOffset: self.bottomOffset,
          topOffset: self.topOffset,
          maxHeight: self.maxHeight,
        });
      },
    },
  };
</script>
