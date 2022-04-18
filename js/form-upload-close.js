import {isEscapeKey} from './util.js';
import {body} from './render-fullsize.js';
import {imgForm, imgChooser, descriptionTextarea, hashtagsInput} from './form.js';
import {resetFields} from './form-validate.js';
import {effectsList, onEffectButtonClick, resetSlider} from './slider-form.js';
import {activateDecreaseButton, deactivateScaleButtons, resetScale} from './scale-form.js';

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
  effectsList.addEventListener('change', onEffectButtonClick);
  activateDecreaseButton();
}

function closeImgOverlay() {
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgChooser.value = '';
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
  resetScale();
  deactivateScaleButtons();
  resetSlider();
  effectsList.removeEventListener('change', onEffectButtonClick);
  resetFields();
  putFormElementsOffFocus();
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

