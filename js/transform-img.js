const DEFAULT_EFFECT_VALUE = 100;
const DEFAULT_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const defaultOptions = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1
};
const effectsOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

//scale
const overlayImage = document.querySelector('.img-upload__overlay');
const buttonScaleSmaller = overlayImage.querySelector('.scale__control--smaller');
const buttonScaleBigger = overlayImage.querySelector('.scale__control--bigger');
const scaleControl = overlayImage.querySelector('.scale__control--value');
const previewImage = overlayImage.querySelector('.img-upload__preview');
const changedPicture = previewImage.querySelector('img');
//effects
const effects = overlayImage.querySelector('.img-upload__effects');
const effectsList = overlayImage.querySelector('.effects__list');
const sliderElement = overlayImage.querySelector('.effect-level__slider');
const effectValueInput = overlayImage.querySelector('.effect-level__value');
const slider = overlayImage.querySelector('.img-upload__effect-level');
const noneEffectInput = effectsList.querySelector('input.effects__radio[value="none"]');

const setEffect = () => {
  const selectedEffectInput = effectsList.querySelector('input.effects__radio[name="effect"]:checked');
  const effect = selectedEffectInput.value || '';

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
  setScale(DEFAULT_SCALE);
};

const onChangeScale = (value) => {
  const scaleValue = parseInt(scaleControl.value, 10);
  const newScaleValue = scaleValue + value;

  if (newScaleValue >= MIN_SCALE && (newScaleValue <= MAX_SCALE)) {
    setScale(newScaleValue);
  }
};

buttonScaleSmaller.addEventListener('click', () => {
  onChangeScale(-STEP_SCALE);
});

buttonScaleBigger.addEventListener('click', () => {
  onChangeScale(STEP_SCALE);
});

const hideSlider = () => {
  slider.classList.add('hidden');
};

const showSlider = () => {
  slider.classList.remove('hidden');
};

const onDeepEffectPicture = (evt) => {
  if (evt.target.value !== 'none') {
    showSlider();
  } else {
    hideSlider();
  }

  sliderElement.noUiSlider.updateOptions(effectsOptions[evt.target.value] || defaultOptions);
  setEffect();
};

effects.addEventListener('change', onDeepEffectPicture);

const initTransformImage = () => {
  effectValueInput.value = DEFAULT_EFFECT_VALUE;

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

