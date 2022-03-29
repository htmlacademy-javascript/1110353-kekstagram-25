import {createPictures} from './data.js';
import {getRandomArrayElement} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const socialComments = bigPictureModal.querySelector('.social__comments');
const photoDescription = bigPictureModal.querySelector('.social__caption');

const commentsCountBlock = bigPictureModal.querySelector('.social__comment-count');
const showMore = bigPictureModal.querySelector('.comments-loader');

// Временно решила выбирать рандомный объект в массиве объектов для отображении его данных в блоке полного изображения
const fullSizePicture = getRandomArrayElement(createPictures());

commentsCountBlock.classList.add('hidden');
showMore.classList.add('hidden');


const createCommentsFragment = (picture) => {
  const pictureElementsFragment = document.createDocumentFragment();

  picture.comments.forEach((comment) => {
    const socialComment = document.createElement('li');
    const socialImg = document.createElement('img');
    const socialText = document.createElement('p');

    socialComment.classList.add('social__comment');
    socialImg.classList.add('social__picture');
    socialText.classList.add('social__text');

    socialImg.src = comment.avatar;
    socialImg.alt = comment.name;
    socialImg.width = 35;
    socialImg.height = 35;
    socialText.textContent = comment.message;

    socialComment.append(socialImg);
    socialComment.append(socialText);
    pictureElementsFragment.append(socialComment);
  });
  return pictureElementsFragment;
};

const drawBigPictureBlock = (picture) => {
  bigPictureImg.querySelector('img').src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialComments.innerHTML = '';
  socialComments.append(createCommentsFragment(picture));
  photoDescription.textContent = picture.description;
};

drawBigPictureBlock(fullSizePicture);

export {bigPictureModal};
