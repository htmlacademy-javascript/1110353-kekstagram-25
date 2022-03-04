function getRandomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(2, 6);

function checkLengthOfString (string, maxLength) {
  return string.length <= maxLength;
}

checkLengthOfString('Привет', 10);
