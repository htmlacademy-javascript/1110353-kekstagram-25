import {imgForm, imgPreview} from './form.js';

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const buttonDecrease = imgForm.querySelector('.scale__control--smaller');
const buttonIncrease = imgForm.querySelector('.scale__control--bigger');
const scaleValueInput = imgForm.querySelector('.scale__control--value');

const setInputValue = (value) => {
  scaleValueInput.value = value;
  scaleValueInput.setAttribute('value', scaleValueInput.value);
};

setInputValue('100%');

function onButtonDecreaseImageClick() {
  setInputValue(`${Math.max(parseFloat(scaleValueInput.value) - SCALE_STEP, 0)}%`);
  imgPreview.style.transform = `scale(${scaleValueInput.value})`;
  buttonIncrease.addEventListener('click', onButtonIncreaseImageClick);

  if (scaleValueInput.value === `${SCALE_STEP}%`) {
    buttonDecrease.removeEventListener('click', onButtonDecreaseImageClick);
  }
}

function onButtonIncreaseImageClick() {
  setInputValue(`${Math.max(parseFloat(scaleValueInput.value) + SCALE_STEP, 0)}%`);
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
  setInputValue('100%');
  imgPreview.style.transform = 'scale(1)';
};

export {activateDecreaseButton, deactivateScaleButtons, resetScale};
