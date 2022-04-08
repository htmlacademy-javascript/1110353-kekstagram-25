import {imgForm} from './form.js';
import {isPristineValid} from './form-validate.js';
import {openImgOverlay, closeImgOverlay} from './form-upload-close.js';

const imgUploadInput = imgForm.querySelector('.img-upload__input');
const imgFormSubmit = imgForm.querySelector('.img-upload__submit');
const imgFormClose = imgForm.querySelector('.img-upload__cancel');

// Валидация формы

const submitForm = () => {

  imgForm.addEventListener('submit', (evt) => {

    if (!isPristineValid) {
      evt.preventDefault();
    }
    // не срабатывает
    imgFormSubmit.setAttribute('disabled');
    // imgFormSubmit.disabled = true;

    const formData = new FormData(evt.target);
    fetch(
      'https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          // onSuccessPopup();

          // не срабатывает
          imgFormSubmit.removeAttribute('disabled');
          // imgFormSubmit.disabled = false;
        }
        throw new Error(`${response.status} ${response.statusText}`);
      })
      .catch(() => {
        // onErrorPopup();
        // не срабатывает
        imgFormSubmit.removeAttribute('disabled');
        // imgFormSubmit.disabled = false;
      });

  });
};

// Инициализация формы

const initializeForm = () => {
  imgUploadInput.addEventListener('change', openImgOverlay);
  imgFormClose.addEventListener('click', closeImgOverlay);
  submitForm();
};

export {initializeForm};
