import {renderPictures} from './render-pictures.js';
import {getData} from './data-api.js';

// import './full-size-modal.js';
import './form.js';
import './form-elements.js';
import './scale-form.js';
import './slider-form.js';

import {showErrorBlockGetData} from './messages.js';

getData((posts) => {
  renderPictures(posts);
}, showErrorBlockGetData);

