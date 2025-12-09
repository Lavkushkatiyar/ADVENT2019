const map = {};
let count = 0;
const valueGet = (key) => {
  count++;
  if (map[map[key]]) {
    valueGet(map[key]);
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
for (let i = 0; i < keys.length; i++) {
  valueGet(keys[i]);
}

console.log(count);
