import {isEscapeKey} from './util.js';
import {body} from './render-fullsize.js';
import {imgForm, imgUploadInput, descriptionTextarea, hashtagsInput} from './form.js';
import {resetFields} from './form-validate.js';
import {effectsList, applyEffect, resetSlider} from './slider-form.js';
import {activateScaleButtons, deactivateScaleButtons, resetScale} from './scale-form.js';

const imgOverlay = imgForm.querySelector('.img-upload__overlay');

const onImgOverlayEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgOverlay();
  }
};

function openImgOverlay() {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onImgOverlayEscKeydown);
  putFormElementsOnFocus();
  effectsList.addEventListener('change', applyEffect);
  activateScaleButtons();
}

function closeImgOverlay() {
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
  putFormElementsOffFocus();
  effectsList.removeEventListener('change', applyEffect);
  deactivateScaleButtons();
  imgUploadInput.value = '';
  resetScale();
  resetSlider();
  resetFields();
}

// Отмена обработчика Esc при фокусе
function putFormElementsOnFocus() {
  hashtagsInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onImgOverlayEscKeydown);
  });
  descriptionTextarea.addEventListener('focus', () => {
    document.removeEventListener('keydown', onImgOverlayEscKeydown);
  });
  hashtagsInput.removeEventListener('blur', () => {
    document.addEventListener('keydown', onImgOverlayEscKeydown);
  });
  descriptionTextarea.removeEventListener('blur', () => {
    document.addEventListener('keydown', onImgOverlayEscKeydown);
  });
}

function putFormElementsOffFocus() {
  hashtagsInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onImgOverlayEscKeydown);
  });
  descriptionTextarea.addEventListener('blur', () => {
    document.addEventListener('keydown', onImgOverlayEscKeydown);
  });
  hashtagsInput.removeEventListener('focus', () => {
    document.removeEventListener('keydown', onImgOverlayEscKeydown);
  });
  descriptionTextarea.removeEventListener('focus', () => {
    document.removeEventListener('keydown', onImgOverlayEscKeydown);
  });
}

export {openImgOverlay, closeImgOverlay};

