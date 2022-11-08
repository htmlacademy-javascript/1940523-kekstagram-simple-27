import {getRandomInteger, getRandomArrayElement} from './util.js';

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

const getPhotoInfo = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: getRandomInteger(0, 200),
});

const IDS_LENGTH = 25;
const getPhotosList = () => Array.from({length: IDS_LENGTH}, (el, i) => getPhotoInfo(i + 1));

export {getPhotosList};
