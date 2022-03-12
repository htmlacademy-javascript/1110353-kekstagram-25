
// function checkStringLength(string, maxLength) {
//   return string.length <= maxLength;
// }

// checkStringLength('Привет', 10);

const NOTES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Анастасия', 'Кирилл', 'Надежда', 'Ирина', 'Сергей'];
const RANDOM_POSTS_COUNT = 25;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createPost = () => ({
  id: getRandomInteger(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: 'Как же прекрасно это время года!',
  likes: getRandomInteger(15, 200),
  comments: [
    {
      id: 135,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(NOTES),
      name: getRandomArrayElement(NAMES),
    },
  ],
});

const randomPosts = Array.from({length: RANDOM_POSTS_COUNT}, createPost);

// Определение кол-ва комментариев

// const createComment = () => ({
//   id: 135,
//   avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
//   message: getRandomArrayElement(NOTES),
//   name: getRandomArrayElement(NAMES),
// });

// const createCommentsNumber = function () {
//   return Array.from({length: getRandomInteger(1, 5)}, createComment);
// };

// const createPost = () => ({
//   id: getRandomInteger(1, 25),
//   url: `photos/${getRandomInteger(1, 25)}.jpg`,
//   description: 'Как же прекрасно это время года!',
//   likes: getRandomInteger(15, 200),
//   comments: createCommentsNumber(),
// });

// const randomPosts = Array.from({length: RANDOM_POSTS_COUNT}, createPost);
// console.log(randomPosts);
