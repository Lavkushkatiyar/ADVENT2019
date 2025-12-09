const parser = (input) => {
  input = input.toString().padStart(5, "0");
  const op = input.slice(-2);
  return [op, input[2], input[1], input[0]];
};

const getTheFirst = (input) => {
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
      i = i + 4;
      continue;
    }

    if (opcode === "02") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir * sec;
      i = i + 4;
      continue;
    }

    if (opcode === "03") {
      const valIn = 0;
      input[firstNum] = valIn;
      i = i + 2;
      continue;
    }

    if (opcode === "04") {
      console.log(modeChecker(firstNum, modeFirst));
      i = i + 2;
      continue;
    }

    if (opcode === "05") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      if (fir !== 0) {
        i = sec;
        continue;
      }
      i = i + 3;
      continue;
    }

    if (opcode === "06") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      if (fir === 0) {
        i = sec;
        continue;
      }
      i = i + 3;
      continue;
    }

    if (opcode === "07") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir < sec ? 1 : 0;
      i = i + 4;
      continue;
    }

    if (opcode === "08") {
      const fir = modeChecker(firstNum, modeFirst);
      const sec = modeChecker(secondNum, modeSecond);
      input[location] = fir === sec ? 1 : 0;
      i = i + 4;
      continue;
    }
  }
  return input;
};

const output = getTheFirst(input);
console.log(output);
