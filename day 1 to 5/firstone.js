let input = Deno.readTextFileSync("file1.txt");
input = input.split("\n");
const fuelRequired = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return (fuel > 0) ? fuel : 0;
};
let sum = 0;
for (let mass of input) {
  while (mass > 0) {
    sum += fuelRequired(mass);
    mass = Math.floor(mass / 3) - 2;
  }
}
console.log(sum);
