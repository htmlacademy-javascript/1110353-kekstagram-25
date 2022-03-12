
const NOTES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Анастасия', 'Кирилл', 'Надежда', 'Ирина', 'Сергей'];
const POSTS_COUNT = 25;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const checkId = (array) => {
  let number = getRandomInteger (1, 100);
  for(let i = 0; i <= array.length - 1; i++) {

    for (let j = 0; j <= array[i].comments.length - 1; j++) {
      const innerArray = array[i].comments;

      // В этом цикле перебираем здесь каждый объект в массиве comments
      // Айдишники собираем в новый массив ids, есди такого еще нет
      // В самый первый элемент массива записываем первое значение number
      // Если это не первый цикл первого цикла и значение в новом массиве не равно number, то добавляем в этот массив новый элемент и number оставляем неизменяемым
      // А если не подходит условию, то вызываем снова функцию getRandomInteger(1,100) для number

      const ids = [];

      if (i === 0 && j === 0) {
        ids[0] = number;
      }

      const isExistingId = ids.some((value) => value === number);

      if(!(i === 0 && j === 0) && !isExistingId) {
        number = getRandomInteger (1, 100);
      } else {
        ids.push(innerArray[j].id);
      }
    }
  }
  return number;
};

const posts = [];

for (let i = 1; i <= POSTS_COUNT; i++) {
  const post = {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'Как же прекрасно это время года!',
    likes: getRandomInteger(15, 200),
    comments: [
      {
        id: checkId(posts),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(NOTES),
        name: getRandomArrayElement(NAMES),
      },
    ],
  };
  posts.push(post);
}

console.log(posts);
