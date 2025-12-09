import { permutations } from "jsr:@std/collections";

let isFirstTime = true;
let arr = [];
const storeOutput = [];
let flag = true;

const parser = (input) => {
  input = input.toString().padStart(5, "0");
  const op = input.slice(-2);
  return [op, input[2], input[1], input[0]];
};

const getTheFirst = (input, signal) => {
  input = [...input];

  let i = 0;
  while (i < input.length) {
    const [opcode, modeFirst, modeSecond, modeThird] = parser(input[i]);
    const firstNum = +input[i + 1];
    const secondNum = +input[i + 2];
    const location = +input[i + 3];

    const modeChecker = (p, m) => (m === "0" ? +input[p] : +p);

    if (opcode === "99") break;

    if (opcode === "01") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir + sec;
      i += 4;
      continue;
    }

    if (opcode === "02") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir * sec;
      i += 4;
      continue;
    }

    if (opcode === "03") {
      let valIn = 0;
      if (flag) {
        valIn = signal;
        flag = false;
      } else {
        if (isFirstTime) {
          valIn = 0;
          isFirstTime = false;
        } else valIn = arr[arr.length - 1];
        flag = true;
      }
      input[firstNum] = valIn;
      i += 2;
      continue;
    }

    if (opcode === "04") {
      arr.push(modeChecker(firstNum, modeFirst));
      i += 2;
      continue;
    }

    if (opcode === "05") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      if (fir !== 0) {
        i = sec;
        continue;
      }
      i += 3;
      continue;
    }

    if (opcode === "06") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      if (fir === 0) {
        i = sec;
        continue;
      }
      i += 3;
      continue;
    }

    if (opcode === "07") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir < sec ? 1 : 0;
      i += 4;
      continue;
    }

    if (opcode === "08") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir === sec ? 1 : 0;
      i += 4;
      continue;
    }
  }
  return input;
};

const permut = permutations([0, 1, 2, 3, 4]);

for (const a of permut) {
  const signals = a;

  arr = [];
  flag = true;
  isFirstTime = true;

  for (let i = 0; i < signals.length; i++) {
    const inputSignal = signals[i];

    getTheFirst([...input], inputSignal);
  }

  storeOutput.push(arr[arr.length - 1]);
}

console.log(storeOutput.sort((a, b) => b - a)[0]);
