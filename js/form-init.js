import {imgForm, imgUploadInput} from './form.js';
import {sendData} from './data-api.js';
import {isPristineValid} from './form-validate.js';
import {openImgOverlay, closeImgOverlay} from './form-upload-close.js';
import {showSendDataSuccess, showSendDataError} from './messages.js';

const imgFormSubmit = imgForm.querySelector('.img-upload__submit');
const imgFormClose = imgForm.querySelector('.img-upload__cancel');

// Валидация формы
const submitForm = () => {

  imgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isPristineValid()) {
      // не срабатывает разблокировка кнопки
      imgFormSubmit.disabled = true;

      const formData = new FormData(evt.target);
      sendData(
        () => {
        // не срабатывает блокировка кнопки
          imgFormSubmit.disabled = false;
          closeImgOverlay();
          showSendDataSuccess();
        },
        () => {
        // не срабатывает блокировка кнопки
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
  imgUploadInput.addEventListener('change', openImgOverlay);
  imgFormClose.addEventListener('click', closeImgOverlay);
  submitForm();
};

export {initializeForm};
