
import {getRandomInteger, getRandomArrayElement} from './util.js';

const NOTES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Анастасия', 'Кирилл', 'Надежда', 'Ирина', 'Сергей'];
const PICTURES_COUNT = 25;

const generateComments = (count) => {
  const commentsArray = [];

  for (let i = 1; i <= count; i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(NOTES),
      name: getRandomArrayElement(NAMES),
    };
    commentsArray.push(comment);
  }
  return commentsArray;
};

const createPictures = () => {
  const picturesArray = [];

  for (let i = 1; i <= PICTURES_COUNT; i++) {
    const img = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Как же прекрасно это время года!',
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(1, 5)),
    };
    picturesArray.push(img);
  }
  return picturesArray;
};

export {createPictures};
