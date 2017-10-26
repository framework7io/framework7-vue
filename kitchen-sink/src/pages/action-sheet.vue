<template>
  <f7-page>
    <f7-navbar title="Action Sheet" back-link="Back"></f7-navbar>
      <f7-block class="row">
        <f7-col>
          <f7-button raised @click="openDemo1">One group</f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised @click="openDemo2">Two groups</f7-button>
        </f7-col>
      </f7-block>

      <f7-block>
        <f7-button raised @click="openGrid">Action Grid</f7-button>
      </f7-block>

      <f7-block-title>Action Sheet To Popover</f7-block-title>
      <f7-block strong>
        <p>Action Sheet can be automatically converted to Popover (for tablets). This button will open Popover on tablets and Action Sheet on phones: <f7-button style="display:inline-block" class="button-to-popover" @click="openActionsPopover">Actions</f7-button></p>
      </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Col, f7Link, f7Button } from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7Col,
    f7Link,
    f7Button,
  },
  methods: {
    openDemo1() {
      const self = this;
      self.actions1.open();
    },
    openDemo2() {
      const self = this;
      self.actions2.open();
    },
    openGrid() {
      const self = this;
      self.actionsGrid.open();
    },
    openActionsPopover() {
      const self = this;
      self.actionsToPopover.open();
    },
  },
  on: {
    pageBeforeRemove() {
      const self = this;
      self.actions1.destroy();
      self.actions2.destroy();
      self.actionsGrid.destroy();
      self.actionsToPopover.destroy();
    },
    pageInit() {
      const self = this;

      // 1 Group
      const buttons1 = [
        {
          text: 'Do something',
          label: true,
        },
        {
          text: 'Button 1',
          bold: true,
        },
        {
          text: 'Button 2',
        },
        {
          text: 'Cancel',
          color: 'red',
        },
      ];

      // 2 Groups
      const buttons2 = [
        // First Group
        [
          {
            text: 'Do something',
            label: true,
          },
          {
            text: 'Button 1',
            bold: true,
          },
          {
            text: 'Button 2',
          },
        ],
        // Second Group
        [
          {
            text: 'Cancel',
            color: 'red',
          },
        ],
      ];

      // Grid buttons with icons/images
      const gridButtons = [
        [
          {
            text: 'Button 1',
            icon: '<img src="http://lorempixel.com/96/96/people/1" width="48"/>',
          },
          {
            text: 'Button 2',
            icon: '<img src="http://lorempixel.com/96/96/people/2" width="48">',
          },
          {
            text: 'Button 3',
            icon: '<img src="http://lorempixel.com/96/96/people/3" width="48">',
          },
        ],
        [
          {
            text: 'Button 1',
            icon: '<img src="http://lorempixel.com/96/96/fashion/4" width="48"/>',
          },
          {
            text: 'Button 2',
            icon: '<img src="http://lorempixel.com/96/96/fashion/5" width="48">',
          },
          {
            text: 'Button 3',
            icon: '<img src="http://lorempixel.com/96/96/fashion/6" width="48">',
          },
        ],
      ];

      self.actions1 = self.$f7.actions.create({ buttons: buttons1 });
      self.actions2 = self.$f7.actions.create({ buttons: buttons2 });
      self.actionsGrid = self.$f7.actions.create({ buttons: gridButtons, grid: true });

      // Actions To Popover
      self.actionsToPopover = self.$f7.actions.create({
        buttons: buttons1,
        // Need to specify popover target
        targetEl: self.$el.querySelector('.button-to-popover'),
      });
    },
  },
};
</script>
