import {imgForm, imgPreview} from './form.js';

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const buttonDecrease = imgForm.querySelector('.scale__control--smaller');
const buttonIncrease = imgForm.querySelector('.scale__control--bigger');
const scaleValueInput = imgForm.querySelector('.scale__control--value');

scaleValueInput.value = '100%';

function onButtonDecreaseImageClick() {
  scaleValueInput.value = `${parseFloat(scaleValueInput.value) - SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${scaleValueInput.value})`;
  buttonIncrease.addEventListener('click', onButtonIncreaseImageClick);

  if (scaleValueInput.value === `${SCALE_STEP}%`) {
    buttonDecrease.removeEventListener('click', onButtonDecreaseImageClick);
  }
}

function onButtonIncreaseImageClick() {
  scaleValueInput.value = `${parseFloat(scaleValueInput.value) + SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${scaleValueInput.value})`;
  buttonDecrease.addEventListener('click', onButtonDecreaseImageClick);

  if (scaleValueInput.value === `${MAX_SCALE}%`) {
    buttonIncrease.removeEventListener('click', onButtonIncreaseImageClick);
  }
}

const activateDecreaseButton = () => {
  buttonDecrease.addEventListener('click', onButtonDecreaseImageClick);
};

const deactivateScaleButtons = () => {
  buttonDecrease.removeEventListener('click', onButtonDecreaseImageClick);
  buttonIncrease.removeEventListener('click', onButtonIncreaseImageClick);
};

const resetScale = () => {
  scaleValueInput.value = '100%';
  imgPreview.style.transform = 'scale(1)';
};

export {activateDecreaseButton, deactivateScaleButtons, resetScale};
