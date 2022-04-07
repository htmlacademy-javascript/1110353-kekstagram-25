import {isEscapeKey} from './util.js';
const main = document.querySelector('main');

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

const showErrorBlockGetData = () => {
  const errorBlock = document.createElement('div');
  const errorMessage = document.createElement('p');

  errorMessage.classList.add('error__message');
  errorMessage.textContent = 'Упс, что-то пошло не так :( Попробуй проверить соединение';
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

// export { createCard, showSuccessBlock, showErrorBlock, showErrorBlockGetData };
export {showErrorBlockGetData};
