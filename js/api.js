const LOADING_PHOTOS_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const UPLOADING_PHOTO_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

const getPhotos = (onSuccess, onFail) => {
  fetch(LOADING_PHOTOS_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Fetching error');
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
};

const sendPhoto = (onSuccess, onFail, body) => {
  fetch(
    UPLOADING_PHOTO_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Fetching error');
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getPhotos, sendPhoto};
