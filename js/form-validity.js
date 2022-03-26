import {imgForm, onImgOverlayEscKeydown} from './form.js';

const descriptionTextarea = document.querySelector('.text__description');
const hashtagsInput = document.querySelector('.text__hashtags');
const reHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
}
, false
);

// Валидация хэштегов

// Не срабатывает валидация для хэштегов при нажатии кнопки submit
const checkHashtags = () => {
  const hashtagsArray = hashtagsInput.value.trim().split(' ');
  return hashtagsArray.every((value) => reHashtag.test(value) && hashtagsArray.length <= 5);
};

pristine.addValidator(
  hashtagsInput,
  checkHashtags,
  'Неправильно введен хэштег или больше 5ти хэштегов'
);
//

// Валидация комментария

function validateComments(value) {
  return value.length <= 140;
}

pristine.addValidator(
  descriptionTextarea,
  validateComments,
  'Максимальная длина комментария - 140 символов'
);
//

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Потом добавить required на 37 строку

// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
// Как воспользоваться stopPropagation? он не работал ранее

hashtagsInput.addEventListener('focus', ()=> {
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
});

hashtagsInput.addEventListener('blur', ()=> {
  document.addEventListener('keydown', onImgOverlayEscKeydown);
});

descriptionTextarea.addEventListener('focus', ()=> {
  document.removeEventListener('keydown', onImgOverlayEscKeydown);
});

descriptionTextarea.addEventListener('blur', ()=> {
  document.addEventListener('keydown', onImgOverlayEscKeydown);
});
