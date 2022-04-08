
import {imgForm, descriptionTextarea, hashtagsInput} from './form.js';

// Примеры правильного хэштега по шаблону
// #хэштег
// #домМилыйДом
// #weWillRockYou

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const EMPTY_SPACES_PATTERN = /\s+/g;
const MAX_HASHTAGS = 5;
const MAX_HASHTAGS_LENGTH = 20;
const MAX_COMMENTS_LENGTH = 140;

const imgTextBlock = imgForm.querySelector('.img-upload__text');
const imgTextFields = imgForm.querySelectorAll('.text__item');

// Создание оберток для полей ввода в форме для работы pristine

const createTextContainers = () => {
  imgTextFields.forEach((field) => {
    const textFieldContainer  = document.createElement('div');
    textFieldContainer.classList.add('text__container');
    imgTextBlock.append(textFieldContainer);
    textFieldContainer.append(field);
  });
};

createTextContainers();

// Валидация формы

const pristine = new Pristine(
  imgForm,
  { classTo: 'text__container', errorTextParent: 'text__container' }
);

const getSplitedHashtags = () => hashtagsInput.value.toLowerCase().trim().split(EMPTY_SPACES_PATTERN);

// На пустом массиве ведь должно срабатывать true c методом every
const checkBeginning = () => getSplitedHashtags().every((item) => item[0] === '#');
const checkHashtagMaxlength = () => getSplitedHashtags().every((item) => item.length <= MAX_HASHTAGS_LENGTH);
const checkCount = () => getSplitedHashtags().length <= MAX_HASHTAGS;
const checkUniq = () => getSplitedHashtags().length === new Set(getSplitedHashtags()).size;
// На пустом массиве ведь должно срабатывать true c методом every
const checkSymbols = () => getSplitedHashtags().every((item) => HASHTAG_PATTERN.test(item));
const  checkComments = () => descriptionTextarea.value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(hashtagsInput, checkBeginning, 'хэштег должен начинаться с #');
pristine.addValidator(hashtagsInput, checkHashtagMaxlength, `максимальная длина хэштега ${MAX_HASHTAGS_LENGTH} символов`);
pristine.addValidator(hashtagsInput, checkCount, `кол-во хэштегов не должно быть больше ${MAX_HASHTAGS}ти`);
pristine.addValidator(hashtagsInput, checkUniq, 'этот хэштег уже существует');
pristine.addValidator(hashtagsInput, checkSymbols, 'неправильный формат хэштега');
pristine.addValidator(descriptionTextarea, checkComments, `макс. длина комментария - ${MAX_COMMENTS_LENGTH} символов`);

const isPristineValid = pristine.validate();

export {isPristineValid};
