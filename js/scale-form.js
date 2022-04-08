import {imgForm} from './form.js';

const SCALE_STEP = 25;
const buttonSmaller = imgForm.querySelector('.scale__control--smaller');
const buttonBigger = imgForm.querySelector('.scale__control--bigger');
const scaleValueiInput = imgForm.querySelector('.scale__control--value');
const imgPreviewContainer = imgForm.querySelector('.img-upload__preview');

scaleValueiInput.value = '100%';
// Почему после закрытия формы при открытии нового изображения - 55% значение
let scaleNumber = Number(scaleValueiInput.value.slice(0, -1));

const makeSmaller = () => {
  if (scaleNumber - SCALE_STEP < SCALE_STEP) {
    buttonSmaller.setAttribute('disabled');
  }
  else {
    buttonSmaller.removeAttribute('disabled');
    scaleNumber -= SCALE_STEP;
    imgPreviewContainer.style.transform = `scale(${scaleNumber/100})`;
    scaleValueiInput.value = `${scaleNumber}%`;
  }
};

const makeBigger = () => {
  if (scaleNumber + SCALE_STEP > 100) {
    buttonBigger.setAttribute('disabled');
  }
  else {
    buttonBigger.removeAttribute('disabled');
    scaleNumber += SCALE_STEP;
    imgPreviewContainer.style.transform = `scale(${scaleNumber/100})`;
    scaleValueiInput.value = `${scaleNumber}%`;
  }
};

const activateScaleButtons = () => {
  buttonSmaller.addEventListener('click', makeSmaller);
  buttonBigger.addEventListener('click', makeBigger);
};

const deactivateScaleButtons = () => {
  buttonSmaller.addEventListener('click', makeSmaller);
  buttonBigger.addEventListener('click', makeBigger);
};

const resetScale = () => {
  // не срабатывает сброс на 100 проц
  scaleValueiInput.value = '100%';
};

export {imgPreviewContainer, activateScaleButtons, deactivateScaleButtons, resetScale};
