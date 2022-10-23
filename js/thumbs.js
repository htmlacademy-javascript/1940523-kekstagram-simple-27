import {getPhotosList} from './data.js';

const makeNewThumb = (photoInfo, parentElement) => {
  const thumbnailTemplate = document.querySelector('#picture').content;
  const newThumbTemplate = thumbnailTemplate.querySelector('.picture');
  const thumbnail = newThumbTemplate.cloneNode(true);
  const thumbImg = thumbnail.querySelector('.picture__img');
  const thumbLikes = thumbnail.querySelector('.picture__likes');
  const thumbComments = thumbnail.querySelector('.picture__comments');

  thumbImg.src = photoInfo.url;
  thumbLikes.textContent = photoInfo.likes;
  thumbComments.textContent = photoInfo.comments;

  parentElement.appendChild(thumbnail);
};

const makeThumbs = () => {
  const thumbList = getPhotosList();
  const thumbnailsContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  for (const thumb of thumbList) {
    makeNewThumb(thumb, fragment);
  }

  thumbnailsContainer.appendChild(fragment);
};

export {makeThumbs};

