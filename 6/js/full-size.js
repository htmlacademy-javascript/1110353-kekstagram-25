import {createPictures} from './data.js';
const newPictures = createPictures();

const bigPictureBlock = document.querySelector('.big-picture');
bigPictureBlock.classList.remove('hidden');

const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img');
const likesCount = bigPictureBlock.querySelector('.likes-count');
const commentsCount = bigPictureBlock.querySelector('.comments-count');
const socialComments = bigPictureBlock.querySelector('.social__comments');
const photoDescription = bigPictureBlock.querySelector('.social__caption');

const createSocialComments = (pictures) => {

  pictures.forEach((picture) => {
    const socialComment = document.createElement('li');
    const socialImg = document.createElement('img');
    const socialText = document.createElement('p');

    socialComment.classList.add('social__comment');
    socialImg.classList.add('social__picture');
    socialText.classList.add('social__text');

    picture.comments.forEach((comment) => {
      socialImg.src = comment.avatar;
      socialImg.alt = comment.name;
      socialImg.width = 35;
      socialImg.height = 35;
      socialText.textContent = comment.message;

      socialComment.append(socialImg);
      socialComment.append(socialText);
    });

    socialComments.append(socialComment);
  });

  return socialComments;
};

const drawBigPictureBlock = (pictures) => {
  bigPictureImg.src = pictures.url;
  likesCount.textContent = pictures.likes;
  commentsCount.textContent = pictures.comments;
  socialComments.innerHtml = '';
  socialComments.innerHtml = createSocialComments(pictures);
  photoDescription.textContent = pictures.description;
};

drawBigPictureBlock(newPictures);
