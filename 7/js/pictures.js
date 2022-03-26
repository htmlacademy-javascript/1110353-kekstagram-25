import {createPictures} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictures = createPictures();
const similarPicturesFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments})=> {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments;

  similarPicturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(similarPicturesFragment);
