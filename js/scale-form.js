import {imgForm, openImgOverlay} from './form.js';

const SCALE_STEP = 25;
const buttonSmaller = imgForm.querySelector('.scale__control--smaller');
const buttonBigger = imgForm.querySelector('.scale__control--bigger');
const scaleValueiInput = imgForm.querySelector('.scale__control--value');
const imgPreview = imgForm.querySelector('.img-upload__preview');

openImgOverlay();

scaleValueiInput.value = '100%';
let scaleNumber = Number(scaleValueiInput.value.slice(0, -1));
scaleValueiInput.value = `${scaleNumber}%`;

const makeSmaller= () => {
  if (scaleNumber - SCALE_STEP < 25) {
    buttonSmaller.setAttribute('disabled');
  }
  else {
    buttonSmaller.removeAttribute('disabled');
    scaleNumber -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scaleNumber/100})`;
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
    imgPreview.style.transform = `scale(${scaleNumber/100})`;
    scaleValueiInput.value = `${scaleNumber}%`;
  }
};

buttonSmaller.addEventListener('click', makeSmaller);
buttonBigger.addEventListener('click', makeBigger);
