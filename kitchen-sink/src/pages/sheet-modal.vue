<template>
  <f7-page>
    <f7-navbar title="Sheet Modal" back-link="Back"></f7-navbar>
    <div class="block">
      <p>Sheet Modals slide up from the bottom of the screen to reveal more content. Such modals allow to create custom overlays with custom content.</p>
      <p class="row">
        <a class="col button button-raised sheet-open" data-sheet=".demo-sheet">Open Sheet</a>
        <a class="col button button-raised" @click="createSheet">Create Dynamic Sheet</a>
      </p>
    </div>
    <div class="sheet-modal demo-sheet">
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="left"></div>
          <div class="right">
            <a class="link sheet-close">Close</a>
          </div>
        </div>
      </div>
      <div class="sheet-modal-inner">
        <div class="page-content">
          <div class="block">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in tempora harum sequi corporis alias ex adipisci.</p>
            <p>Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed, similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt soluta alias magnam. Consequatur, nisi, enim.</p>
            <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae adipisci vel voluptatum, autem libero minus dignissimos repellat.</p>
            <p>Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?</p>
            <p>Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente repellendus nesciunt praesentium velit ipsa illo iusto.</p>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
export default {
  methods: {
    createSheet: function () {
      var self = this;
      var $ = self.$$;
      // Create sheet modal
      if (!self.sheet) {
        self.sheet = self.$f7.sheet.create({
          content: '\
            <div class="sheet-modal">\
              <div class="toolbar">\
                <div class="toolbar-inner justify-content-flex-end">\
                  <a href="#" class="link sheet-close">Close</a>\
                </div>\
              </div>\
              <div class="sheet-modal-inner">\
                <div class="page-content">\
                  <div class="block">\
                    <p>This sheet modal was created dynamically</p>\
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>\
                  </div>\
                </div>\
              </div>\
            </div>\
          '
        });
      }
      // Close inline sheet
      if ($('.demo-sheet.modal-in').length > 0) self.$f7.sheet.close('.demo-sheet');
      // Open it
      self.sheet.open();
    },
  },
  on: {
    pageBeforeOut: function () {
      var self = this;
      // Close opened sheets on page out
      self.$f7.sheet.close();
    },
    pageBeforeRemove: function () {
      var self = this;
      // Destroy sheet modal when page removed
      if (self.sheet) self.sheet.destroy();
    },
  }
}
</script>
