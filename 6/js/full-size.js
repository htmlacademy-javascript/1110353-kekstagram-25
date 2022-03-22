import {createPictures} from './data.js';
import {getRandomArrayElement} from './util.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img');
const likesCount = bigPictureBlock.querySelector('.likes-count');
const commentsCount = bigPictureBlock.querySelector('.comments-count');
const socialComments = bigPictureBlock.querySelector('.social__comments');
const photoDescription = bigPictureBlock.querySelector('.social__caption');

const commentsCountBlock = bigPictureBlock.querySelector('.social__comment-count');
const showMore = bigPictureBlock.querySelector('.comments-loader');

const fullSizePicture = getRandomArrayElement(createPictures());

bigPictureBlock.classList.remove('hidden');
document.body.classList.add('modal-open');
commentsCountBlock.classList.add('hidden');
showMore.classList.add('hidden');


const createSocialComments = (picture) => {
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
    socialComments.append(socialComment);
  });
  return socialComments;
};

const drawBigPictureBlock = (picture) => {
  bigPictureImg.querySelector('img').src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialComments.innerHtml = '';
  socialComments.innerHtml = createSocialComments(picture);
  photoDescription.textContent = picture.description;
};

drawBigPictureBlock(fullSizePicture);

export {bigPictureBlock};
