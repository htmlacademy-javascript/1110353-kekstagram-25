import {isEscapeKey} from './util.js';
import {body} from './render-fullsize.js';

const ALERT_SHOW_TIME = 5000;

// Ошибка на получение данных
const showErrorBlockGetData = (err) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = `${err} - Упс, попробуй проверить соединение :(`;

  body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


// Сообщения на отправку данных
function onSuccessErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup();
  }
}

const onSuccessErrorClick = (evt) => {
  const successOrErrorPopup = body.lastElementChild.querySelector('div');
  const closeButton = body.lastElementChild.querySelector('button');
  if(!successOrErrorPopup.contains(evt.target) || closeButton.contains(evt.target)) {
    removePopup();
  }
};

function removePopup() {
  body.lastElementChild.remove();
  document.removeEventListener('click', onSuccessErrorClick);
  document.removeEventListener('keydown', onSuccessErrorEscKeydown);
}

const showSendDataSuccess = () => {
  const successPopup = document.querySelector('#success').content.cloneNode(true);
  body.append(successPopup);
  document.addEventListener('click', onSuccessErrorClick);
  document.addEventListener('keydown', onSuccessErrorEscKeydown);
};

function showSendDataError() {
  const errorPopup = document.querySelector('#error').content.cloneNode(true);
  body.append(errorPopup);
  document.addEventListener('click', onSuccessErrorClick);
  document.addEventListener('keydown', onSuccessErrorEscKeydown);
}

export {showErrorBlockGetData, showSendDataSuccess, showSendDataError};
