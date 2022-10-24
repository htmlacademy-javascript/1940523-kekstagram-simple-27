const makeNewThumb = ({url, likes, comments}, parentElement) => {
  const newThumbTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnail = newThumbTemplate.cloneNode(true);
  const thumbImg = thumbnail.querySelector('.picture__img');
  const thumbLikes = thumbnail.querySelector('.picture__likes');
  const thumbComments = thumbnail.querySelector('.picture__comments');

  thumbImg.src = url;
  thumbLikes.textContent = likes;
  thumbComments.textContent = comments;

  parentElement.appendChild(thumbnail);
};

const makeThumbs = (thumbList) => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  thumbList.forEach((thumb) => {
    makeNewThumb(thumb, fragment);
  });

  thumbnailsContainer.appendChild(fragment);
};

export {makeThumbs};

