// The answer given already works great, just wanted to add a new one using closures.

// #### Define wrapper

const tryCatchWrapper = (executable) => async (...args) => {
  try {
    const result = await executable(...args);
    return result;
  } catch (error) {
    // use any custom handler here
    error.message = `[${executable.name}] - ${error.message}`;
    error.data = { ...error.data, input_args: args }
    throw error;
  }
}

// #### Your function without a try-catch wrapper
const myFunction = async (x, y) => {
  const sum = x + y;
  if (sum > 10) throw new Error(`sum > 10 custom error`)
  return sum;
}

// #### How to use it
try {
  const wrapperFunction = trycatchWrapper3(myFunction2);
  const output = await wrapperFunction(2, 93)
  console.log(output)
} catch (error) {
  console.error(error)
}

// ## END
