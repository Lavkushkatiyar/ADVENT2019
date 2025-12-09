const map = {};
let count = 0;
let part1 = [];
let part2 = [];
const valueGet = (key) => {
  if (map[key]) {
    part1.push(map[key]);
    valueGet(map[key]);
  }
};
const valueGet2 = (key) => {
  if (map[key]) {
    part2.push(map[key]);
    valueGet2(map[key]);
  }
};
const data = Deno.readTextFileSync("day6.txt");
const parsed = data.split("\n");
for (let i = 0; i < parsed.length; i++) {
  const d = parsed[i];
  const [a, b] = d.split(")");
  if (!(b in map)) {
    map[b] = [a];
  }
}
const keys = Object.keys(map);
let santa = 0;
let you = 0;
for (const i of keys) {
  if (i === "SAN") santa = map[i];
  if (i === "YOU") you = map[i];
}

valueGet(santa);
valueGet2(you);
part1 = part1.flat();
part2 = part2.flat();
const findCommon = () => {
  for (let i = 0; i < part1.length; i++) {
    for (let j = 0; j < part2.length; j++) {
      if (part1[i] === part2[j]) {
        return (i + 1 + j + 1);
      }
    }
  }
};
const common = findCommon();
console.log(common);
