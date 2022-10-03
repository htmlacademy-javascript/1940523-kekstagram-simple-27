function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

function randomInteger(min, max) {
  if (!isNumber(min) || !isNumber(max) || min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

