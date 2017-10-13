<template>
<f7-page>
  <f7-navbar title="List View" back-link="Back"></f7-navbar>
  <div class="block">
    <p>Framework7 allows you to be flexible with list views (table views). You can make them as navigation menus, you can use there icons, inputs, and any elements inside of the list, and even make them nested:</p>
  </div>
  <f7-block-title>Simple List</f7-block-title>
  <div class="list simple-list">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
  <f7-block-title>Simple Links List</f7-block-title>
  <div class="list links-list">
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
    </ul>
  </div>
  <div class="block-title">Data list, with icons</div>
  <div class="list">
    <ul>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
            <div class="item-after">CEO</div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">John Doe</div>
            <div class="item-after"> <span class="badge">5</span></div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Jenna Smith</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <f7-block-title>Links</f7-block-title>
  <div class="list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
            <div class="item-after">CEO</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">John Doe</div>
            <div class="item-after">Cleaner</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Jenna Smith</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="block-title">Links, Header, Footer</div>
  <div class="list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">Name</div>
              John Doe
            </div>
            <div class="item-after">Edit</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">Phone</div>
              +7 90 111-22-3344
            </div>
            <div class="item-after">Edit</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">Email</div>
              john@doe
              <div class="item-footer">Home</div>
            </div>
            <div class="item-after">Edit</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">Email</div>
              john@framework7
              <div class="item-footer">Work</div>
            </div>
            <div class="item-after">Edit</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="block-title">Links, no icons</div>
  <div class="list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title">John Doe</div>
          </div>
        </a>
      </li>
      <li class="item-divider">Divider Here</li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title">Jenna Smith</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <f7-block-title>Grouped with sticky titles</f7-block-title>
  <div class="list">
    <div class="list-group">
      <ul>
        <li class="list-group-title">A</li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Aaron </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Abbie</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Adam</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list-group">
      <ul>
        <li class="list-group-title">B</li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Bailey</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Barclay</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Bartolo</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list-group">
      <ul>
        <li class="list-group-title">C</li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Caiden</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Calvin</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Candy</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <f7-block-title>Mixed and nested</f7-block-title>
  <div class="list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
            <div class="item-after">CEO</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Two icons here</div>
          </div>
        </a>
      </li>
      <li>
        <div class="item-content">
          <div class="item-inner">
            <div class="item-title">No icons here</div>
          </div>
        </div>
        <ul>
          <li>
            <a href="#" class="item-link item-content">
              <div class="item-media"><i class="icon icon-f7"></i></div>
              <div class="item-inner">
                <div class="item-title">Ivan Petrov</div>
                <div class="item-after">CEO</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#" class="item-link item-content">
              <div class="item-media"><i class="icon icon-f7"></i><i class="icon icon-f7"></i></div>
              <div class="item-inner">
                <div class="item-title">Two icons here</div>
              </div>
            </a>
          </li>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">No icons here</div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="item-link item-content">
              <div class="item-media"><i class="icon icon-f7"></i></div>
              <div class="item-inner">
                <div class="item-title">Ultra long text goes here, no, it is really really long</div>
              </div>
            </a>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-f7"></i></div>
              <div class="item-inner">
                <div class="item-title">With toggle</div>
                <div class="item-after">
                  <label class="toggle">
                    <input type="checkbox">
                    <span class="checkbox"></span>
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ultra long text goes here, no, it is really really long</div>
          </div>
        </a>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">With toggle</div>
            <div class="item-after">
              <label class="toggle">
                <input type="checkbox"/>
                <div class="checkbox"></div>
              </label>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="block-title">Mixed, inset</div>
  <div class="list inset">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
            <div class="item-after">CEO</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Two icons here</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ultra long text goes here, no, it is really really long</div>
          </div>
        </a>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">With toggle</div>
            <div class="item-after">
              <label class="toggle">
                <input type="checkbox"/>
                <div class="checkbox"></div>
              </label>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="block-footer">
      <p>Here comes some useful information about list above</p>
    </div>
  </div>
  <f7-block-title>Tablet inset</f7-block-title>
  <div class="list tablet-inset">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ivan Petrov</div>
            <div class="item-after">CEO</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Two icons here</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">Ultra long text goes here, no, it is really really long</div>
          </div>
        </a>
      </li>
    </ul>
    <div class="block-footer">
      <p>This list block will look like "inset" only on tablets (iPad)</p>
    </div>
  </div>

  <f7-block-title>Media Lists</f7-block-title>
  <div class="block">
    <p>Media Lists are almost the same as Data Lists, but with a more flexible layout for visualization of more complex data, like products, services, userc, etc.</p>
  </div>
  <f7-block-title>Songs</f7-block-title>
  <div class="list media-list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/160/160/people/1" width="80"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Yellow Submarine</div>
              <div class="item-after">$15</div>
            </div>
            <div class="item-subtitle">Beatles</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div></a></li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/160/160/people/2" width="80"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Don't Stop Me Now</div>
              <div class="item-after">$22</div>
            </div>
            <div class="item-subtitle">Queen</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/160/160/people/3" width="80"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Billie Jean</div>
              <div class="item-after">$16</div>
            </div>
            <div class="item-subtitle">Michael Jackson</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <f7-block-title>Mail App</f7-block-title>
  <div class="list media-list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Facebook</div>
              <div class="item-after">17:14</div>
            </div>
            <div class="item-subtitle">New messages from John Doe</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">John Doe (via Twitter)</div>
              <div class="item-after">17:11</div>
            </div>
            <div class="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Facebook</div>
              <div class="item-after">16:48</div>
            </div>
            <div class="item-subtitle">New messages from John Doe</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">John Doe (via Twitter)</div>
              <div class="item-after">15:32</div>
            </div>
            <div class="item-subtitle">John Doe (@_johndoe) mentioned you on Twitter!</div>
            <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <f7-block-title>Something more simple</f7-block-title>
  <div class="list media-list">
    <ul>
      <li>
        <div class="item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/1" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Yellow Submarine</div>
            </div>
            <div class="item-subtitle">Beatles</div>
          </div>
        </div>
      </li>
      <li><a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/2" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Don't Stop Me Now</div>
            </div>
            <div class="item-subtitle">Queen</div>
          </div>
        </a>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/3" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Billie Jean</div>
            </div>
            <div class="item-subtitle">Michael Jackson</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <f7-block-title>Inset</f7-block-title>
  <div class="list media-list inset">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/4" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Yellow Submarine</div>
            </div>
            <div class="item-subtitle">Beatles</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/5" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Don't Stop Me Now</div>
            </div>
            <div class="item-subtitle">Queen</div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-media"><img src="http://lorempixel.com/88/88/fashion/6" width="44"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Billie Jean</div>
            </div>
            <div class="item-subtitle">Michael Jackson</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="block-title">Custom Table-like Layout</div>
  <div class="list">
    <ul>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner item-cell">
            <div class="item-row">
              <div class="item-cell">Cell 1-1</div>
              <div class="item-cell">Cell 1-2</div>
              <div class="item-cell">Cell 1-3</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 2-1</div>
              <div class="item-cell">Cell 2-2</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 3-1</div>
              <div class="item-cell">
                <div class="item-row">
                  Cell 3-2
                </div>
                <div class="item-row">
                  Cell 3-3
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner item-cell">
            <div class="item-row">
              <div class="item-cell">Cell 1-1</div>
              <div class="item-cell">Cell 1-2</div>
              <div class="item-cell">Cell 1-3</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 2-1</div>
              <div class="item-cell">Cell 2-2</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 3-1</div>
              <div class="item-cell">
                <div class="item-row">
                  Cell 3-2
                </div>
                <div class="item-row">
                  Cell 3-3
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    }
  }
</script>
