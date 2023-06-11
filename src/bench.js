import { Bench } from "tinybench";

const bench = new Bench({ time: 100 });

// const array = [1, 2, 3, 4];
const array = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 6];
const set = new Set(array)

const F1 = () => {
  array.includes(4)
  array.includes(6)
}
const F2 = () => {
  // const array = [1, 2, 3, 4];
  // array.find(i => i === 4)
}
const F3 = () => {
  set.has(1)
  set.has(100)
}

bench
  .add('array.find first', F1)
  // .add('array.find last', F2)
  .add("has in set", F3)
// .todo('unimplemented bench')

await bench.run();

console.table(bench.table());