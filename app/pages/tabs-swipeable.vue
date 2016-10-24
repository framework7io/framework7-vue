<template>
  <f7-page with-subnavbar no-page-content>
    <f7-navbar back-link="Back" title="Tabs Swipeable" sliding>
      <f7-subnavbar sliding>
        <f7-buttons>
          <f7-button tab-link="#tab1" active>Tab 1</f7-button>
          <f7-button tab-link="#tab2">Tab 2</f7-button>
          <f7-button tab-link="#tab3">Tab 3</f7-button>
          <f7-button tab-link="#tab4">Tab 4</f7-button>
        </f7-buttons>
      </f7-subnavbar>
    </f7-navbar>

    <f7-tabs swipeable>
      <f7-page-content id="tab1" tab active>
        <f7-block>
          <p>Tab 1</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio dolor, soluta reprehenderit, corporis officia earum corrupti amet ea aspernatur praesentium, distinctio ipsa atque officiis. Recusandae ab error, atque natus.</p>
          <p>Quibusdam repellendus, repudiandae nulla commodi ut nemo eum, quia dolorum dicta voluptate reprehenderit. Omnis, temporibus iure quia ad sit incidunt similique et quaerat dicta delectus aspernatur, unde illo cum ipsam?</p>
          <p>Officia alias inventore soluta illo, omnis tempore obcaecati at, harum impedit nemo enim, iure fugit est explicabo commodi ipsam distinctio architecto voluptatum reprehenderit, aperiam dolorem praesentium repellendus repudiandae ducimus saepe.</p>
          <p>Autem ullam tempore suscipit consectetur, odit soluta. Neque quasi mollitia culpa autem, quis ab nostrum non distinctio illo magni perspiciatis et consequuntur possimus aliquam reprehenderit reiciendis praesentium consectetur, voluptas obcaecati?</p>
          <p>Quae repellendus aut iste provident consectetur inventore voluptatibus, saepe ad dolorem voluptatum recusandae praesentium animi harum officiis error nulla ullam nobis? Mollitia possimus voluptatum pariatur omnis quibusdam, quidem recusandae velit.</p>
        </f7-block>
      </f7-page-content>
      <f7-page-content id="tab2" tab>
         <f7-block>
          <p>Tab 2</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio dolor, soluta reprehenderit, corporis officia earum corrupti amet ea aspernatur praesentium, distinctio ipsa atque officiis. Recusandae ab error, atque natus.</p>
          <p>Quibusdam repellendus, repudiandae nulla commodi ut nemo eum, quia dolorum dicta voluptate reprehenderit. Omnis, temporibus iure quia ad sit incidunt similique et quaerat dicta delectus aspernatur, unde illo cum ipsam?</p>
          <p>Officia alias inventore soluta illo, omnis tempore obcaecati at, harum impedit nemo enim, iure fugit est explicabo commodi ipsam distinctio architecto voluptatum reprehenderit, aperiam dolorem praesentium repellendus repudiandae ducimus saepe.</p>
          <p>Autem ullam tempore suscipit consectetur, odit soluta. Neque quasi mollitia culpa autem, quis ab nostrum non distinctio illo magni perspiciatis et consequuntur possimus aliquam reprehenderit reiciendis praesentium consectetur, voluptas obcaecati?</p>
          <p>Quae repellendus aut iste provident consectetur inventore voluptatibus, saepe ad dolorem voluptatum recusandae praesentium animi harum officiis error nulla ullam nobis? Mollitia possimus voluptatum pariatur omnis quibusdam, quidem recusandae velit.</p>
        </f7-block>
      </f7-page-content>
      <f7-page-content id="tab3" tab>
         <f7-block>
          <p>Tab 3</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio dolor, soluta reprehenderit, corporis officia earum corrupti amet ea aspernatur praesentium, distinctio ipsa atque officiis. Recusandae ab error, atque natus.</p>
          <p>Quibusdam repellendus, repudiandae nulla commodi ut nemo eum, quia dolorum dicta voluptate reprehenderit. Omnis, temporibus iure quia ad sit incidunt similique et quaerat dicta delectus aspernatur, unde illo cum ipsam?</p>
          <p>Officia alias inventore soluta illo, omnis tempore obcaecati at, harum impedit nemo enim, iure fugit est explicabo commodi ipsam distinctio architecto voluptatum reprehenderit, aperiam dolorem praesentium repellendus repudiandae ducimus saepe.</p>
          <p>Autem ullam tempore suscipit consectetur, odit soluta. Neque quasi mollitia culpa autem, quis ab nostrum non distinctio illo magni perspiciatis et consequuntur possimus aliquam reprehenderit reiciendis praesentium consectetur, voluptas obcaecati?</p>
          <p>Quae repellendus aut iste provident consectetur inventore voluptatibus, saepe ad dolorem voluptatum recusandae praesentium animi harum officiis error nulla ullam nobis? Mollitia possimus voluptatum pariatur omnis quibusdam, quidem recusandae velit.</p>
        </f7-block>
      </f7-page-content>
      <f7-page-content id="tab4" tab>
         <f7-block>
          <p>Tab 4</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio dolor, soluta reprehenderit, corporis officia earum corrupti amet ea aspernatur praesentium, distinctio ipsa atque officiis. Recusandae ab error, atque natus.</p>
          <p>Quibusdam repellendus, repudiandae nulla commodi ut nemo eum, quia dolorum dicta voluptate reprehenderit. Omnis, temporibus iure quia ad sit incidunt similique et quaerat dicta delectus aspernatur, unde illo cum ipsam?</p>
          <p>Officia alias inventore soluta illo, omnis tempore obcaecati at, harum impedit nemo enim, iure fugit est explicabo commodi ipsam distinctio architecto voluptatum reprehenderit, aperiam dolorem praesentium repellendus repudiandae ducimus saepe.</p>
          <p>Autem ullam tempore suscipit consectetur, odit soluta. Neque quasi mollitia culpa autem, quis ab nostrum non distinctio illo magni perspiciatis et consequuntur possimus aliquam reprehenderit reiciendis praesentium consectetur, voluptas obcaecati?</p>
          <p>Quae repellendus aut iste provident consectetur inventore voluptatibus, saepe ad dolorem voluptatum recusandae praesentium animi harum officiis error nulla ullam nobis? Mollitia possimus voluptatum pariatur omnis quibusdam, quidem recusandae velit.</p>
        </f7-block>
      </f7-page-content>
    </f7-tabs>
  </f7-page>
</template>
<script>
  export default {}
</script>