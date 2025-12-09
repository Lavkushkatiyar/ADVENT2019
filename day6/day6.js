const map = {};
const data = Deno.readTextFileSync("day6.txt");
const parsed = data.split("\n");
console.log(parsed);
let count = 0;

for (let i = 0; i < parsed.length; i++) {
  const d = parsed[i];
  const [a, b] = d.split(")");
  console.log(a, b);
  if (!(a in map)) {
    map[a] = count;
    count++;
  }

  if (!(b in map)) {
    map[b] = map[a] + 1;
    count++;
  }
}

const value = Object.values(map);
let sum = 0;
for (let i = 0; i < value.length; i++) {
  sum += value[i];
}
console.log({ map, sum });
