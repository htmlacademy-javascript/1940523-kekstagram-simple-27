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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const checkLengthString = (str, length) => str.length <= length;

export {getRandomInteger, getRandomArrayElement, checkLengthString};
