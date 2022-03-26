function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isKeyEscape = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, isKeyEscape};
