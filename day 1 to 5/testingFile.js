const input1 = "R705,D30,R83,U83";

const parseInput = (input) => {
  const parse = [];
  for (const a of input) {
    let [b, ...c] = a.split("");
    c = c.join("");
    console.log(b, c);
    parse.push(b.repeat(c));
  }
  return parse;
};
console.log(parseInput(input1.split(",")));
