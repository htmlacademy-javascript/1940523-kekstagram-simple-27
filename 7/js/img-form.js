import {initTransformImage} from './transform-img.js';

const imageForm = document.querySelector('.img-upload__form');
const imageLoad = imageForm.querySelector('#upload-file');
const modalOpen = imageForm.querySelector('.img-upload__overlay');
const modalClose = imageForm.querySelector('#upload-cancel');
const body = document.querySelector('body');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__description-text',
});

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

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
  if (!modalOpen.classList.contains('hidden') && evt.key === 'Escape') {
    evt.preventDefault();
    onCloseModal();
  }
};

imageLoad.addEventListener('change', onOpenModal);

document.addEventListener('keydown', onModalPressedEsc);

modalClose.addEventListener('click', onCloseModal);

imageForm.addEventListener('submit', onFormSubmit);
