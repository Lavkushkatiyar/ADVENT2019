import { chunk } from "jsr:@std/collections";
const data = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 4]];
const something = chunk(data, 2);

console.log(something);
for (let i = 0; i < something.length; i++) {
  console.log(something[i].flat());
}
