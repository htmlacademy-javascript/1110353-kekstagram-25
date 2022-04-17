import {imgForm, imgPreview} from './form.js';

const Effects = {
  CHROME: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  HEAT: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const effectsList = imgForm.querySelector('.effects__list');
const effectsRadios = imgForm.querySelectorAll('.effects__radio');
const sliderContainer = imgForm.querySelector('.img-upload__effect-level');
const sliderElement = imgForm.querySelector('.effect-level__slider');
const effectValueHidden = imgForm.querySelector('.effect-level__value');

sliderContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

// Переменная для хранения состояния выбранного эффекта и его измерения
let selectedFilter = {
  name: 'initial',
  ending: ''
};

const updateEffect = (effect, measure = '') => {
  effectValueHidden.value = sliderElement.noUiSlider.get();
  imgPreview.style.filter = `${effect}(${effectValueHidden.value}${measure})`;
  selectedFilter = { name: effect, ending: measure };
};

const getEffect = (effect) => {
  switch (effect) {
    case 'chrome':
      updateEffect('grayscale');
      return effect;
    case 'sepia':
      updateEffect('sepia');
      return effect;
    case 'marvin':
      updateEffect('invert', '%');
      return effect;
    case 'phobos':
      updateEffect('blur', 'px');
      return effect;
    case 'heat':
      updateEffect('brightness');
      return effect;
    default:
      sliderContainer.classList.add('hidden');
      effectValueHidden.value = '';
      imgPreview.style.filter = 'none';
  }
};

const onEffectButtonClick = (evt) => {
  const targetButton = evt.target;
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.on('update', () => {
    effectValueHidden.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${selectedFilter.name}(${effectValueHidden.value}${selectedFilter.ending})`;
  });

  for (const effectsRadio of effectsRadios) {
    const classEffectsRadio = `effects__preview--${effectsRadio.value}`;

    if(effectsRadio !== targetButton) {
      imgPreview.classList.remove(classEffectsRadio);
    }

    imgPreview.classList.add(classEffectsRadio);

    const currentEffect  = getEffect(targetButton.value);
    if (Effects[targetButton.value.toUpperCase()] !== undefined) {
      sliderElement.noUiSlider.updateOptions(Effects[currentEffect.toUpperCase()]);
    }
  }

};

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
  sliderContainer.classList.add('hidden');
  imgPreview.style.filter = 'initial';
  document.querySelector('#effect-none').checked = true;
};

export {effectsList, onEffectButtonClick, resetSlider};
