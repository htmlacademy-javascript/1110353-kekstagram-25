import {imgForm, imgPreview} from './form.js';

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const buttonDecrease = imgForm.querySelector('.scale__control--smaller');
const buttonIncrease = imgForm.querySelector('.scale__control--bigger');
const scaleValueiInput = imgForm.querySelector('.scale__control--value');

scaleValueiInput.value = '100%';

function onButtonDecreaseImageClick() {
  scaleValueiInput.value = `${parseFloat(scaleValueiInput.value) - SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${scaleValueiInput.value})`;
  buttonIncrease.addEventListener('click', onButtonIncreaseImageClick);

  if (scaleValueiInput.value === `${SCALE_STEP}%`) {
    buttonDecrease.removeEventListener('click', onButtonDecreaseImageClick);
  }
}

function onButtonIncreaseImageClick() {
  scaleValueiInput.value = `${parseFloat(scaleValueiInput.value) + SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${scaleValueiInput.value})`;
  buttonDecrease.addEventListener('click', onButtonDecreaseImageClick);

  if (scaleValueiInput.value === `${MAX_SCALE}%`) {
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
  scaleValueiInput.value = '100%';
  imgPreview.style.transform = 'scale(1)';
};

export {activateDecreaseButton, deactivateScaleButtons, resetScale};
