import { permutations } from "jsr:@std/collections";

const input = [
  3,
  23,
  3,
  24,
  1002,
  24,
  10,
  24,
  1002,
  23,
  -1,
  23,
  101,
  5,
  23,
  23,
  1,
  24,
  23,
  23,
  4,
  23,
  99,
  0,
  0,
];

let isFirstTime = true;
let arr = [];
const storeOutput = [];
let flag = true;

const parser = (input) => {
  input = input.toString().padStart(5, "0");
  const op = input.slice(-2);
  return [op, input[2], input[1], input[0]];
};

let inputRef;

const modeChecker = (p, m) => (m === "0" ? +inputRef[p] : +p);

const opCode01 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  input[nums.location] = fir + sec;
  return index + 4;
};

const opCode02 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  input[nums.location] = fir * sec;
  return index + 4;
};

const opCode03 = (input, modes, nums, index, signal) => {
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
  input[nums.firstNum] = valIn;
  return index + 2;
};

const opCode04 = (input, modes, nums, index) => {
  console.log(modeChecker(nums.firstNum, modes.modeFirst));
  return index + 2;
};

const opCode05 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  if (fir !== 0) return sec;
  return index + 3;
};

const opCode06 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  if (fir === 0) return sec;
  return index + 3;
};

const opCode07 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  input[nums.location] = fir < sec ? 1 : 0;
  return index + 4;
};

const opCode08 = (input, modes, nums, index) => {
  const fir = modeChecker(nums.firstNum, modes.modeFirst);
  const sec = modeChecker(nums.secondNum, modes.modeSecond);
  input[nums.location] = fir === sec ? 1 : 0;
  return index + 4;
};

const opcodeCompass = {
  "01": opCode01,
  "02": opCode02,
  "03": opCode03,
  "04": opCode04,
  "05": opCode05,
  "06": opCode06,
  "07": opCode07,
  "08": opCode08,
};

const IntCodeSoftware = (input, signal) => {
  input = [...input];
  inputRef = input;

  let i = 0;
  while (i < input.length) {
    const [opcode, modeFirst, modeSecond, modeThird] = parser(input[i]);
    const [firstNum, secondNum, location] = [
      +input[i + 1],
      +input[i + 2],
      +input[i + 3],
    ];

    if (opcode === "99") break;

    i = opcodeCompass[opcode](
      input,
      { opcode, modeFirst, modeSecond, modeThird },
      { firstNum, secondNum, location },
      i,
      signal,
    );
  }

  return input;
};

const permut = permutations([0, 1, 2, 3, 4]);
console.log(permut);
// const permut = [[0, 1, 2, 3, 4]];
for (const a of permut) {
  const signals = a;

  arr = [];
  flag = true;
  isFirstTime = true;

  for (let i = 0; i < signals.length; i++) {
    const inputSignal = signals[i];

    IntCodeSoftware([...input], inputSignal);
  }

  storeOutput.push(arr[arr.length - 1]);
}
console.log(storeOutput.sort((a, b) => b - a)[0]);
