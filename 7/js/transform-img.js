//scale
const overlayImage = document.querySelector('.img-upload__overlay');
const buttonScaleSmaller = overlayImage.querySelector('.scale__control--smaller');
const buttonScaleBigger = overlayImage.querySelector('.scale__control--bigger');
const scaleControl = overlayImage.querySelector('.scale__control--value');
const previewImage = overlayImage.querySelector('.img-upload__preview');
const changedPicture = previewImage.querySelector('img');
//effects
const effectsList = overlayImage.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const sliderElement = overlayImage.querySelector('.effect-level__slider');
const effectValueInput = overlayImage.querySelector('.effect-level__value');
const slider = overlayImage.querySelector('.img-upload__effect-level');
const noneEffectInput = effectsList.querySelector('input.effects__radio[value="none"]');

const defaultEffectValue = 100;
const defaultScale = 100;
const maxScale = 100;
const minScale = 25;
const stepScale = 25;

const setEffect = () => {
  const selectedEffectInput = effectsList.querySelector('input.effects__radio[name="effect"]:checked');
  const effect = selectedEffectInput ? selectedEffectInput.value : '';

  switch (effect) {
    case 'chrome':
      changedPicture.style.filter = `grayscale(${effectValueInput.value})`;
      break;
    case 'sepia':
      changedPicture.style.filter = `sepia(${effectValueInput.value})`;
      break;
    case 'marvin':
      changedPicture.style.filter = `invert(${effectValueInput.value}%)`;
      break;
    case 'phobos':
      changedPicture.style.filter = `blur(${effectValueInput.value}px)`;
      break;
    case 'heat':
      changedPicture.style.filter = `brightness(${effectValueInput.value})`;
      break;
    default:
      changedPicture.style.filter = '';
  }
};

const setScale = (value) => {
  scaleControl.value = `${value}%`;
  changedPicture.style.transform = `scale(${value / 100})`;
};

const initScale = () => {
  setScale(defaultScale);
};

const onChangeScale = (value) => {
  const scaleValue = parseInt(scaleControl.value, 10);
  const newScaleValue = scaleValue + value;

  if ((newScaleValue >= minScale) && (newScaleValue <= maxScale)) {
    setScale(newScaleValue);
  }
};

buttonScaleSmaller.addEventListener('click', () => {
  onChangeScale(-stepScale);
});

buttonScaleBigger.addEventListener('click', () => {
  onChangeScale(stepScale);
});

function hideSlider() {
  slider.classList.add('hidden');
}

function showSlider() {
  slider.classList.remove('hidden');
}

function deepEffectPicture(evt) {
  let currentMin = 0;
  let currentMax = 100;
  let currentStart = 100;
  let currentStep = 1;

  switch (evt.target.value) {
    case 'chrome':
      currentMin = 0;
      currentMax = 1;
      currentStep = 0.1;
      currentStart = 1;
      break;
    case 'sepia':
      currentMin = 0;
      currentMax = 1;
      currentStep = 0.1;
      currentStart = 1;
      break;
    case 'marvin':
      currentMin = 0;
      currentMax = 100;
      currentStep = 1;
      currentStart = 100;
      break;
    case 'phobos':
      currentMin = 0;
      currentMax = 3;
      currentStep = 0.1;
      currentStart = 3;
      break;
    case 'heat':
      currentMin = 1;
      currentMax = 3;
      currentStep = 0.1;
      currentStart = 3;
      break;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentMin,
      max: currentMax
    },
    start: currentStart,
    step: currentStep
  });
  setEffect();
}

effectsItems.forEach((item) => {
  const chosenEffectInput = item.querySelector('input[name="effect"]');
  chosenEffectInput.addEventListener('change', deepEffectPicture);

  item.addEventListener('click', (evt) => {
    if (evt.target.value !== 'none') {
      showSlider();
    } else {
      hideSlider();
    }
  });
});

const initTransformImage = () => {
  effectValueInput.value = defaultEffectValue;

  if (noneEffectInput.hasAttribute('checked')) {
    hideSlider();
  }

  initScale();
  setEffect();
};

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });

  sliderElement.noUiSlider.on('update', () => {
    effectValueInput.value = sliderElement.noUiSlider.get();
    setEffect();
  });
};

initSlider();
initTransformImage();

export {initTransformImage};

