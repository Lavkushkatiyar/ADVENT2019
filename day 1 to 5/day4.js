// range 256310-732736
const minRange = 256310;
const maxRange = 699999;
const digitInIncreasingOrSame = (digits) => {
  const digit = digits + "";
  for (let i = 0; i < digit.length - 1; i++) {
    const first = +digit[i];
    const second = +digit[i + 1];
    if (first > second) return false;
  }
  return true;
};
const isOnlyTwoTimes = (first, digit) => {
  let count = 0;
  for (let i = 0; i < digit.length; i++) {
    if (digit[i] == first) count++;
  }
  return count == 2;
};
const AtleastOneAdjacent = (digits) => {
  const digit = digits + "";
  for (let i = 0; i < digit.length - 1; i++) {
    const first = +digit[i];
    const second = +digit[i + 1];
    if (first === second) {
      if (isOnlyTwoTimes(first, digit)) {
        return true;
      }
    }
  }
  return false;
};

let count = 0;
for (let i = minRange; i <= maxRange; i++) {
  if (digitInIncreasingOrSame(i) && AtleastOneAdjacent(i)) {
    console.log(i);
    count++;
  }
}
console.log(count);
