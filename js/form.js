import {isKeyEscape} from './util.js';

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
}

imgUploadInput.addEventListener('change', openImgOverlay);
imgOverlayClose.addEventListener('click', closeImgOverlay);

export {imgForm, onImgOverlayEscKeydown};
