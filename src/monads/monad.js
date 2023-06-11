/**
 * Simple Monad Class
 */
 class Monad {

  /**
   * __The input item__
   * - string: user_id - `'2a34-5tgh'`
   * - number: num_of_users - `4`
   * - object: user - `{ name:'jassi',city:'delhi',age:32 }`
   * - array: cities - `[ { name: 'Agra', state: 'UP' }, { name: 'Gurgaon', state: 'Haryana'}]`
   * @template I
   * @param {I} item 
   */
  constructor(item) {
    this.item = item;
  }

  /**
   * __Returns the item itself
   * get value, look at value, stored value
   */
  peek() {
    return this.item
  }

  /**
   * __Return the item with func applied__
   * #### Possible Functions
   * - user_id: appends a string, check if valid uuid v4
   * - num_of_users: incr by 1, decr by 3, set value to 8
   * - user: user.city, user.email
   * - cities list: filter by state, map over list to add new property pincode
   * 
   * @template F - return type of func
   * @param {(item:I) => F} func 
   */
  transform(func) {
    return func(this.item)
  }

  /**
   * __Return Monad with new_item which is func(item)__
   * #### Possible Functions
   * - user_id: appends a string, check if valid uuid v4
   * - num_of_users: incr by 1, decr by 3, set value to 8
   * - user: user.city, user.email
   * - cities list: filter by state, map over list to add new property pincode
   * 
   * @template F - return type of func
   * @param {(item:I) => F} func 
   */
  convert(func) {
    const new_item = func(this.item)
    return new Monad(new_item)
  }

  /**
   * __Returns a new Monad with new_item which is func(item)__
   * func is a promise
   * #### Possible Functions
   * - user_id: appends a string, check if valid uuid v4
   * - num_of_users: incr by 1, decr by 3, set value to 8
   * - user: user.city, user.email
   * - cities list: filter by state, map over list to add new property pincode
   * 
   * @template F - return type of func
   * @param {(item:I) => Promise<F>} func 
   */
  async convert$(func) {
    const new_item = await func(this.item)
    return new Monad(new_item)
  }

  // another name for convert$
  async map(func) {
    const new_item = await func(this.item)
    return new Monad(new_item)
  }
}

const m = new Monad(3);

const a = m.peek();
console.log('peek', a)

const func = (i) => i + 10;
const b = m.transform(func);
console.log('transform', b)

const c = m.convert(func);
console.log('convert', c)

const main = () => {
  const func1 = (i) => i + 10;
  const func2 = (i) => i + 2;
  const func3 = (i) => i + 3;
  const m_start = new Monad(3);
  const m_end = m_start
    .convert(func1)
    .convert(func2)
    .convert(func3)
  console.log('END', m_end.peek())
}
// main()

const main$ = async () => {
  const func1$ = (i) => i + 10;
  const func2$ = (i) => i + 2;
  const func3$ = (i) => i + 3;
  const m_start = new Monad(3);
  m_start
    .convert$(func1$)
    .then(i => i.convert$(func2$))
    .then(i => i.convert$(func3$))
    .then(i => console.log('END$', i.peek()))
}

// main$().then()

const create = async (x) => {
  return new Monad(x)
}

const funcA = (i) => i + 10;
const funcB = async (i) => i + 2;
const funcC = (i) => i + 3;

const run = (x) => {
  const a = i => i.map(funcA)
  // input = i; output = i.map(func)
  // i.e input=Monad output Monad.convert(func)
  const b = i => i.map(funcB)
  const c = i => i.map(funcC)

  return create(x).then(a).then(b).then(c)
  // this is basically
  // return funcA(x).then(funcB).then(funcC)
}
run(3).then(i => console.log('END$', i.peek()))