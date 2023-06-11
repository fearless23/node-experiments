/*
f: T -> Z  ( original function )
g: T -> Q  ( modified function G ) & Q is WrapperType of Z
m: (Q, g) -> Q

g and m are monadic functions
Q is monadic type

Monad (m) is a function that combines a function (f) and 
wraps its return type (Z) in a type (Q) with additional computation

monad with take in type Q which is a wrapper type of Z, i.e monad unwraps Q to original Z
monad 2nd arg is g, which is a function that takes Z and returns Q
*/

//  f:addOne, T:number, Z:number
const addOne = x => x + 1;
//  g:addOne, T:number, Q:{result:number,added:number}
const addOneWithLogs = x => {
  return { result: x + 1, timeTakenInMs: 1 };
}
// a:Q, func:g 
// monad: (Q,g) -> Q
// measureTime will work on any Q with result property
// and any function g which takes number and returns Q
// we can construct g from f

/**
 * @typedef Q
 * @property {number} result
 * @property {number} timeTakenInMs
 */

/**
 * 
 * @param {Q} Q 
 * @param {(i:number) => Q} g 
 */
const measureTime = (Q, g) => {
  // Q as input, we can extract T from here as Q is some type of T
  const result = Q.result;

  // Use T as input to g
  const result2 = g(result);

  // massage result2 to be type Q
  return result2;
}

const result = measureTime({ result: 1 }, getUserName);

// Q: object|null, g:object -> string
/**
 * 
 * @param {{}|null} Q 
 * @param {(i:object) => string} g 
 * @returns 
 */
const optionMonad = (Q, g) => {
  if (Q) return g(Q)
  return null;
}

/**
 * 
 * @param {{name:string}} user 
 * @returns 
 */
const getUserName = user => user.name;
const getCityData = userName => db.cityDataOf(userName);

const userName = optionMonad(user, getUserName)
const cityData = optionMonad(userName, getCityData)



/**
NULL, UNDEFINED pattern optimization with monad in JAVASCRIPT
*/

const myFunc = async (user_id) => {

  const user = await getUser(user_id);
  if (!user) return null;

  const userName = user.username;
  if (!userName) return null;

  const cityData = await getCityData(userName);
  if (!cityData) return null;

  return cityData;
}

const runIfNotNull = (x, f) => {
  if (x === null || x === undefined) return null;
  return f(x);
}

const myFuncCool = async (user_id) => {
  const user = await getUser(user_id);
  const userName = runIfNotNull(user, i => i.username);
  const cityData = runIfNotNull(userName, getCityData);
  return cityData;
}

class RunIfNotNull {
  constructor(value) {
    this.value = value;
  }

  run(f) {
    if (this.value === null || this.value === undefined) return this;
    return new RunIfNotNull(f(this.value));
  }
}

const myFuncCoolClass = async (user_id) => {
  const user = await getUser(user_id);
  const x = new RunIfNotNull(user)
  const userName = x.run(i => i.username);
  const cityData = userName.run(getCityData);
  return cityData.value;
}

const myFuncCoolClass2 = async (user_id) => {
  const user = await getUser(user_id);
  return new RunIfNotNull(user).run(i => i.username).run(getCityData).value;
}

// runIfNotNull is a MONAD

// Another Example
// timeMeasureMonad
const measureTimeMonad = async (Q, g) => {
  const a = performance.now()
  const result = await g(Q.result);
  const b = performance.now()
  return { result, time: b - a }
}

const getUserWithTime = user_id => measureTimeMonad({ result: user_id }, getUser)
const getCityDataWithTime = userName => measureTimeMonad({ result: userName }, getCityData)

const myFuncWithTimes = async (user_id) => {
  const { result: user, time } = await getUserWithTime(user_id);
  console.log(`time taken: ${time}`)
  const userName = runIfNotNull(user, i => i.username);
  const { result: cityData, time: timeForCityData } = runIfNotNull(userName, getCityDataWithTime);
  return cityData;
}