import {isEscapeKey} from './util.js';
import {body} from './render-fullsize.js';

const main = document.querySelector('main');

// Ошибка на получение данных

const closeBlock = (block) => {
  block.addEventListener('click', () => {
    block.remove();
  });

  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      block.remove();
    }
  });
};

const showErrorBlockGetData = (err) => {
  const errorBlock = document.createElement('div');
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error__message');
  errorMessage.textContent = `${err} - Упс, что-то пошло не так :( Попробуй проверить соединение`;
  errorBlock.style.display = 'flex';
  errorBlock.style.background = '#E3264C';
  errorMessage.style.height = '40px';
  errorMessage.style.margin = 'auto';
  errorMessage.style.lineHeight = '40px';
  errorMessage.style.fontWeight = 'bold';
  errorBlock.append(errorMessage);
  main.append(errorBlock);
  closeBlock(errorBlock);
};

// Сообщения на отправку данных

function onSuccessErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup();
  }
}

const closeSuccessOrErrorPopup = (evt) => {
  const successOrErrorPopup = body.lastElementChild.querySelector('div');
  const closeButton = body.lastElementChild.querySelector('button');
  if(!successOrErrorPopup.contains(evt.target) || closeButton.contains(evt.target)) {
    removePopup();
  }
};

function removePopup() {
  body.lastElementChild.remove();
  document.removeEventListener('click', closeSuccessOrErrorPopup);
  document.removeEventListener('keydown', onSuccessErrorEscKeydown);
}

const showSendDataSuccess = () => {
  const successPopup = document.querySelector('#success').content.cloneNode(true);
  body.append(successPopup);
  document.addEventListener('click', closeSuccessOrErrorPopup);
  document.addEventListener('keydown', onSuccessErrorEscKeydown);
};

function showSendDataError() {
  const errorPopup = document.querySelector('#error').content.cloneNode(true);
  body.append(errorPopup);
  document.addEventListener('click', closeSuccessOrErrorPopup);
  document.addEventListener('keydown', onSuccessErrorEscKeydown);
}

export {showErrorBlockGetData, showSendDataSuccess, showSendDataError};
