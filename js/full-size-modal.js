import {bigPictureModal} from './full-size.js';
import {isKeyEscape} from './util.js';

const modalClose = document.querySelector('.big-picture__cancel');
// Временно написала открытие полного изображения при нажатии на первую миниатюру
const smallPicture = document.querySelector('.picture');

const onModalEscKeydown = (evt) => {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal () {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
}

function closeModal () {
  bigPictureModal.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
}

smallPicture.addEventListener('click', openModal);

modalClose.addEventListener('click', closeModal);
