import {bigPictureBlock} from './full-size.js';

const bigPictureBlockClose = document.querySelector('.big-picture__cancel');

window.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27){
    if(!(bigPictureBlock.classList.contains('hidden'))) {
      evt.preventDefault();
      bigPictureBlock.classList.add('hidden');
    }
  }
});

bigPictureBlockClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPictureBlock.classList.add('hidden');
});
