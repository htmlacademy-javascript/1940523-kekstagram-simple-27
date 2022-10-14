const isNumber = (num) => typeof num === 'number' && !isNaN(num);

const getRandomInteger = (minArg, maxArg) => {
  let min = minArg;
  let max = maxArg;
  const isValid = isNumber(min) && isNumber(max) && min >= 0 && max >= 0 && min !== max;

  if (!isValid) {
    throw new RangeError('The arguments must be positive not equal numbers.');
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

const checkLengthString = (str, length) => str.length <= length;

checkLengthString('hello', 5);

const DESCRIPTIONS = [
  'home',
  'sun',
  'sea',
  'family',
  'moon',
  'car',
  'cat',
  'dog',
  'friend',
  'sport',
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getPhotoInfo = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: getRandomInteger(0, 200),
});

const IDS_LENGTH = 25;
const getPhotosList = () => Array.from({length: IDS_LENGTH}, (el, i) => getPhotoInfo(i + 1));

getPhotosList();
