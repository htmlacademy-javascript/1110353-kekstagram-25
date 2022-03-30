import {imgForm} from './form.js';
import {imgPreviewContainer} from './scale-form.js';

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
const imgPreview = imgPreviewContainer.querySelector('img');
const effectsRadios = imgForm.querySelectorAll('.effects__radio');
const sliderElement = imgForm.querySelector('.effect-level__slider');
const effectValueHidden = imgForm.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

const controlEffect = (effect, measure = '') => {
  sliderElement.noUiSlider.on('update', () => {
    effectValueHidden.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${effect}(${effectValueHidden.value}${measure})`;
  });
};

const applyEffect = (evt) => {
  const targetButton = evt.target;
  sliderElement.classList.remove('hidden');

  for (let i = 0; i < effectsRadios.length; i++) {
    if(effectsRadios[i] !== targetButton) {
      const classRemoved = `effects__preview--${effectsRadios[i].value}`;
      imgPreview.classList.remove(classRemoved);
    }

    const classAdded = `effects__preview--${targetButton.value}`;
    imgPreview.classList.add(classAdded);

    // С оператором SWITCH

    const getEffect = (effect) => {
      switch (effect) {
        case 'chrome':
          controlEffect('grayscale');
          break;
        case 'sepia':
          controlEffect('sepia');
          break;
        case 'marvin':
          controlEffect('invert', '%');
          break;
        case 'phobos':
          controlEffect('blur', 'px');
          break;
        case 'heat':
          controlEffect('brightness');
          break;
        default:
          sliderElement.classList.add('hidden');
          effectValueHidden.value = '';
          imgPreview.style.filter = 'initial';
      }
    };

    sliderElement.noUiSlider.updateOptions(Effects[getEffect(targetButton.value).toUpperCase()]);


    // Рабочий вариант

    // if (targetButton.value === 'chrome') {
    //   sliderElement.noUiSlider.updateOptions(Effects.CHROME);
    //   controlEffect('grayscale');
    // } else if (targetButton.value === 'sepia') {
    //   sliderElement.noUiSlider.updateOptions(Effects.SEPIA);
    //   controlEffect('sepia');
    // } else if (targetButton.value === 'marvin') {
    //   sliderElement.noUiSlider.updateOptions(Effects.MARVIN);
    //   controlEffect('invert', '%');
    // } else if (targetButton.value === 'phobos') {
    //   sliderElement.noUiSlider.updateOptions(Effects.PHOBOS);
    //   controlEffect('blur', 'px');
    // } else if (targetButton.value === 'heat') {
    //   sliderElement.noUiSlider.updateOptions(Effects.HEAT);
    //   controlEffect('brightness');
    // } else {
    //   // Почему не срабатывает?
    //   // sliderElement.setAttribute('hidden');
    //   sliderElement.classList.add('hidden');
    //   effectValueHidden.value = '';
    //   imgPreview.style.filter = 'initial';
    // }
  }
};

effectsList.addEventListener('change', applyEffect);

// Убрать стили в html 60ст
