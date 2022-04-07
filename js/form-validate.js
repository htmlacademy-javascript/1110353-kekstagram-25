import {imgForm, onImgOverlayEscKeydown} from './form.js';

// Примеры правильного хэштега по шаблону
// #хэштег
// #домМилыйДом
// #weWillRockYou

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const EMPTY_SPACES_PATTERN = /\s+/g;
const MAX_HASHTAGS = 5;

const imgTextBlock = imgForm.querySelector('.img-upload__text');
const imgTextFields = imgForm.querySelectorAll('.text__item');
const descriptionTextarea = imgForm.querySelector('.text__description');
const hashtagsInput = imgForm.querySelector('.text__hashtags');

// Создание оберток для полей ввода в форме для работы pristine

const createTextContainers = () => {
  imgTextFields.forEach((field) => {
    const textFieldContainer  = document.createElement('div');
    textFieldContainer.classList.add('text__container');
    imgTextBlock.appendChild(textFieldContainer);
    textFieldContainer.appendChild(field);
  });
};

createTextContainers();

// pristine

const pristine = new Pristine(
  imgForm,
  { classTo: 'text__container', errorTextParent: 'text__container' },
  false
);

// Валидация хэштегов

const getSplitedHashtags = () => hashtagsInput.value.toLowerCase().trim().split(EMPTY_SPACES_PATTERN);

const getUniqueHashtags = () => {
  const uniqueHashtags = new Set(Array.from(getSplitedHashtags()));
  return [...uniqueHashtags].join(',');
};

const checkEachHashtagPattern = (hashtags) => hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const validateHashtags = (fieldValue) => {
  if (!fieldValue) {
    return true;
  }
  return (checkEachHashtagPattern(getSplitedHashtags()) && (getSplitedHashtags()).length <= MAX_HASHTAGS);
};

const getHashtagsErrorMessage = () => {
  if (getSplitedHashtags().length > MAX_HASHTAGS) {
    return 'Кол-во хэштегом не должно превышать 5';
  }
  if (!checkEachHashtagPattern(getSplitedHashtags())) {
    return 'Неправильно введен хэштег';
  }
};

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);

// Валидация комментария

function validateComments(value) {
  return value.length <= 140;
}

pristine.addValidator(
  descriptionTextarea,
  validateComments,
  'Максимальная длина комментария - 140 символов'
);

// Валидация при отправки формы

imgForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  } else {
    hashtagsInput.value = getUniqueHashtags(hashtagsInput.value);
  }
});

// Отмена обработчика Esc при фокусе

hashtagsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
});

hashtagsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onImgOverlayEscKeydown);
});

descriptionTextarea.addEventListener('focus', () => {
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
});

descriptionTextarea.addEventListener('blur', () => {
  document.addEventListener('keydown', onImgOverlayEscKeydown);
});
