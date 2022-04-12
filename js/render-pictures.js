import {renderBigPictureBlock, openBigPictureBlock} from './render-fullsize.js';
import {debounce, shuffleArray} from './util.js';
import {getData} from './data-api.js';
import {showErrorBlockGetData} from './messages.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURES = 10;
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterMenuContainer = document.querySelector('.img-filters');
const filterDefaultButton = filterMenuContainer.querySelector('#filter-default');
const filterRandomButton = filterMenuContainer.querySelector('#filter-random');
const filterDiscussedButton = filterMenuContainer.querySelector('#filter-discussed');

const clearPicturesContainer = () => {
  const elements = picturesContainer.querySelectorAll('.picture');
  elements.forEach((item) => item.remove());
};

const renderPictures = (posts) => {
  clearPicturesContainer();

  const similarPicturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;

    pictureElement.addEventListener('click', () => {
      renderBigPictureBlock(post);
      openBigPictureBlock();
    });

    similarPicturesFragment.append(pictureElement);
  });

  picturesContainer.append(similarPicturesFragment);
};

const showFilteredPictures = (posts) => {
  filterMenuContainer.classList.remove('img-filters--inactive');

  filterMenuContainer.addEventListener('click', debounce((evt) => {
    if (evt.target === filterDefaultButton) {
      filterDefaultButton.classList.add('img-filters__button--active');
      filterRandomButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      renderPictures(posts);
    }
    if (evt.target === filterRandomButton) {
      filterDefaultButton.classList.remove('img-filters__button--active');
      filterRandomButton.classList.add('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      const randomPictures = shuffleArray([...posts]).slice(0, RANDOM_PICTURES);
      renderPictures(randomPictures);
    }
    if (evt.target === filterDiscussedButton) {
      filterDefaultButton.classList.remove('img-filters__button--active');
      filterRandomButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.add('img-filters__button--active');
      const discussedPictures = posts.slice().sort((a, b) => b.comments.length - a.comments.length);
      renderPictures(discussedPictures);
    }

  }, RERENDER_DELAY));
};

const getDataAndRenderPictures = () => {
  getData((posts) => {
    renderPictures(posts);
    showFilteredPictures(posts);
  }, showErrorBlockGetData);
};

export {getDataAndRenderPictures};
