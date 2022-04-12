import {imgForm, imgChooser} from './form.js';
import {sendData} from './data-api.js';
import {isPristineValid} from './form-validate.js';
import {openImgOverlay, closeImgOverlay} from './form-upload-close.js';
import {imgLoad} from './img-load.js';
import {showSendDataSuccess, showSendDataError} from './messages.js';

const imgFormSubmit = imgForm.querySelector('.img-upload__submit');
const imgFormClose = imgForm.querySelector('.img-upload__cancel');

// Валидация формы
const submitForm = () => {

  imgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isPristineValid()) {
      imgFormSubmit.disabled = true;

      const formData = new FormData(evt.target);
      sendData(
        () => {
          imgFormSubmit.disabled = false;
          closeImgOverlay();
          showSendDataSuccess();
        },
        () => {
          imgFormSubmit.disabled = false;
          closeImgOverlay();
          showSendDataError();
        },
        formData
      );
    }
  });
};

// Инициализация формы
const initializeForm = () => {
  imgLoad();
  imgChooser.addEventListener('change', openImgOverlay);
  submitForm();
  imgFormClose.addEventListener('click', closeImgOverlay);
};

export {initializeForm};
