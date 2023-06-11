const db = require('./_singleton_pattern_simple'); // default export
const db2 = require('./_jassi_patern_v2'); // clousure + iife
const db3 = require('./_single_pattern_v3'); // class
// jassi_pattern
const db4 = require('./_jassi_pattern'); // default export

const singleA = db.get();
const singleB = db.get();
// console.log(singleA === singleB); // true

const main2 = async () => {
  await db2.set(token);
  db2.get();
}

const main3 = async (token) => {
  await db3.set(token)
  db3.get()
}

const main4 = async () => {
  const conn = await db4()
}