import {isKeyEscape} from './util.js';
// import {effectsList, applyEffect} from './slider-form.js';

const imgForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgForm.querySelector('.img-upload__input');
const imgOverlay = imgForm.querySelector('.img-upload__overlay');
const imgOverlayClose = imgForm.querySelector('.img-upload__cancel');

const onImgOverlayEscKeydown = (evt) => {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    closeImgOverlay();
  }
};

function openImgOverlay () {
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgOverlayEscKeydown);
}

function closeImgOverlay () {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
  imgForm.reset();
  // effectsList.removeEventListener('change', applyEffect);
}

imgUploadInput.addEventListener('change', openImgOverlay);
imgOverlayClose.addEventListener('click', closeImgOverlay);

// Потом удалить из эспорта openImgOverlay
export {imgForm, onImgOverlayEscKeydown, openImgOverlay};
