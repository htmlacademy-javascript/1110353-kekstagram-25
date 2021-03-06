import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img');
const photoDescription = bigPictureModal.querySelector('.social__caption');
const likesCount = bigPictureModal.querySelector('.likes-count');
const loadedCommentsCount = bigPictureModal.querySelector('.social__loaded-comments-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const socialCommentsList = bigPictureModal.querySelector('.social__comments');
const commentsShowMore = bigPictureModal.querySelector('.comments-loader');
const bigPictureClose = bigPictureModal.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureBlockClick();
  }
};

function openBigPictureBlock () {
  body.classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');

  bigPictureClose.addEventListener('click', onBigPictureBlockClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);
}

function onBigPictureBlockClick () {
  body.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  commentsShowMore.classList.remove('hidden');

  bigPictureClose.removeEventListener('click', onBigPictureBlockClick);
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

const renderBigPictureBlock = (smallPicture) => {
  bigPictureImg.querySelector('img').src = smallPicture.url;
  likesCount.textContent = smallPicture.likes;
  photoDescription.textContent = smallPicture.description;

  const {comments} = smallPicture;
  commentsCount.textContent = comments.length;
  socialCommentsList.innerHTML = '';

  let renderedComments = 0;

  const renderComments = (commentsArray) => {
    const commentElementsFragment = document.createDocumentFragment();

    commentsArray.forEach((comment) => {

      const newComment = commentTemplate.cloneNode(true);
      const socialCommentImg = newComment.querySelector('.social__picture');
      const socialCommentText = newComment.querySelector('.social__text');

      socialCommentImg.src = comment.avatar;
      socialCommentImg.alt = comment.name;
      socialCommentText.textContent = comment.message;

      commentElementsFragment.append(newComment);

      renderedComments += 1;
      loadedCommentsCount.textContent = renderedComments;
      if (renderedComments === comments.length) {
        commentsShowMore.classList.add('hidden');
      }
    });

    socialCommentsList.append(commentElementsFragment);
  };

  const onShowCommentsClick = () => {
    const neededComments = comments.slice(renderedComments, renderedComments + 5);
    renderComments(neededComments);
  };

  onShowCommentsClick();
  commentsShowMore.addEventListener('click', onShowCommentsClick);
  bigPictureClose.addEventListener('click', () => commentsShowMore.removeEventListener('click', onShowCommentsClick));
};

export {body, renderBigPictureBlock, openBigPictureBlock};
