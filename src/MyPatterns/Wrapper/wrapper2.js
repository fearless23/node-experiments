const { trycatchWrapper, trycatchWrapper2, trycatchWrapper3 } = require('./wrapper')

const myFunction = async (x, y) => {
  const sum = x + y;
  if (sum > 10) throw new Error(`sum > 10 custom error`)
  return sum;
}

const myFunction2 = (x, y) => {
  const sum = x + y;
  if (sum > 10) throw new Error(`sum > 10 custom error`)
  return sum;
}

  ;
(async () => {
  try {
    const wrapperFunction = trycatchWrapper3(myFunction2);
    const output = await wrapperFunction(2, 93)
    console.log(output)
  } catch (error) {
    console.error(error)
  }
})()