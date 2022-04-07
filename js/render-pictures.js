import {renderBigPictureBlock, openBigPictureBlock} from './render-fullsize.js';
// import {body} from './render-fullsize.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (posts) => {
  const similarPicturesFragment = document.createDocumentFragment();

  posts.forEach((post)=> {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;

    pictureElement.addEventListener('click', () => {
      renderBigPictureBlock(post);
      openBigPictureBlock();
    });

    similarPicturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(similarPicturesFragment);
};

export {renderPictures};
