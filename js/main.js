import {renderPictures} from './render-pictures.js';
import {getData} from './data-api.js';
import {initializeForm} from './form-init.js';
import {showErrorBlockGetData} from './messages.js';

getData((posts) => {
  renderPictures(posts);
}, showErrorBlockGetData);

initializeForm();
