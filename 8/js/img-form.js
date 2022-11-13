import {initTransformImage} from './transform-img.js';
import {sendPhoto} from './api.js';

const body = document.querySelector('body');
const imageForm = body.querySelector('.img-upload__form');
const imageLoad = imageForm.querySelector('#upload-file');
const modalOpen = imageForm.querySelector('.img-upload__overlay');
const modalClose = imageForm.querySelector('#upload-cancel');
const submitButton = imageForm.querySelector('#upload-submit');

const createSuccessPopup = () => {
  const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  const successPopup = successPopupTemplate.cloneNode(true);
  const successButton = successPopup.querySelector('.success__button');
  body.appendChild(successPopup);

  const onSuccessPopupClick = (evt) => {
    if (evt.target === successPopup || evt.target === successButton) {
      successPopup.removeEventListener('click', onSuccessPopupClick);
      successPopup.remove();
    }
  };

  successPopup.addEventListener('click', onSuccessPopupClick);
};

const createErrorPopup = () => {
  const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorPopup = errorPopupTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector('.error__button');
  body.appendChild(errorPopup);

  const onErrorPopupClick = (evt) => {
    if (evt.target === errorPopup || evt.target === errorButton) {
      errorPopup.removeEventListener('click', onErrorPopupClick);
      errorPopup.remove();
    }
  };

  errorPopup.addEventListener('click', onErrorPopupClick);
};

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__description-text',
});

const onOpenModal = () => {
  modalOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  initTransformImage();
};

const onCloseModal = () => {
  imageForm.reset();
  pristine.reset();
  modalOpen.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onModalPressedEsc = (evt) => {
  if (evt.key === 'Escape') {
    const successPopup = body.querySelector('section.success');
    const errorPopup = body.querySelector('section.error');

    if (!modalOpen.classList.contains('hidden')) {
      evt.preventDefault();
      onCloseModal();
    }

    if (successPopup) {
      evt.preventDefault();
      successPopup.remove();
    }

    if (errorPopup) {
      evt.preventDefault();
      errorPopup.remove();
    }
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

imageLoad.addEventListener('change', onOpenModal);

document.addEventListener('keydown', onModalPressedEsc);

modalClose.addEventListener('click', onCloseModal);

const setUserFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendPhoto(
        () => {
          onSuccess();
          unblockSubmitButton();
          createSuccessPopup();
        },
        () => {
          unblockSubmitButton();
          createErrorPopup();
        },
        formData
      );
    }
  });
};

export {setUserFormSubmit, onCloseModal};
