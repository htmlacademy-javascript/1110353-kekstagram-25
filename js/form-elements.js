import {imgForm, onImgOverlayEscKeydown} from './form.js';

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

const checkHashtagsDuplicates = (hashtags) => {
  const uniqueHashtags = new Set(hashtags);
  return (hashtags.length === uniqueHashtags.size);
};

const checkEachHashtagPattern = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (!HASHTAG_PATTERN.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtags = (fieldValue) => {
  if (!fieldValue) {
    return true;
  }

  const splitedHashtags = fieldValue.toLowerCase().trim().replace(EMPTY_SPACES_PATTERN,' ').split(' ');
  return (checkHashtagsDuplicates(splitedHashtags) && checkEachHashtagPattern(splitedHashtags) && splitedHashtags.length <= MAX_HASHTAGS);
};

const getHashtagsErrorMessage = () => {
  const splitedHashtags = hashtagsInput.value.toLowerCase().trim().replace(EMPTY_SPACES_PATTERN,' ').split(' ');
  if (splitedHashtags.length > MAX_HASHTAGS) {
    return 'Кол-во хэштегом не должно превышать 5';
  }
  if (!checkHashtagsDuplicates(splitedHashtags)) {
    return 'Хэштеги повторяются';
  }
  if (!checkEachHashtagPattern(splitedHashtags)) {
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
  evt.preventDefault();
  pristine.validate();
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
