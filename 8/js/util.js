const showLoadingError = () => {
  const body = document.querySelector('body');
  const errorPopupTemplate = document.querySelector('#loading-error').content.querySelector('.error');
  const errorPopup = errorPopupTemplate.cloneNode(true);
  body.appendChild(errorPopup);
};

export {showLoadingError};
