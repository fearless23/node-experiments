const { x, wrapper, payloadE, payloadS, context } = require('./wrapper')

const myFunctionWithoutWrapper = async (context, payload) => {
  // TYPICAL LAMBDA HANDLER
  const method = myFunctionWithoutWrapper.name;
  const logger = context._logger({ method });
  const output = {};
  try {
    context.tag_start(method);
    logger.info(payload, 'payload');
    output.beforeError = 'add something to output before error';
    if (payload.error) throw new Error(payload.error);
    output.message = 'success';
    context.tag_end(method);
  } catch (error) {
    logger.error(error, method);
    output.error = error.message;
  }
  return output;
};

const myFunctionWrapable = async (context, payload, output, method) => {
  output.beforeError = 'add something to output before error'
  if (payload.error) throw new Error(payload.error);
  output.message = 'success';
  context.tag_end(method);
  return output;
};

const myFunction = (context, payload) => wrapper(
  { context, payload, method: myFunctionWrapable.name },
  myFunctionWrapable
);

// ; (async () => {
//   const output = await myFunction(context, payloadS);
//   console.log(output)
// })()

// ; (async () => {
//   const output = await myFunction(context, payloadE);
//   console.log(output)
// })()


/**
 * Sums two numbers
 * @param {number} a 
 * @param {number} b 
 */
const m = async (a = 0, b = 0) => {
  if (a + b > 10) throw new Error(`what is the error here from m`)
  return a + b;
}
const n = async (a = 0, b = 0) => {
  if (a + b > 20) throw new Error(`what is the error here from n`)
  return a + b;
}
/**
 * Sums two numbers
 * @param {number} a 
 * @param {number} b 
 */
const mw = x.try_catch_wrapper(m);
const nw = x.try_catch_wrapper(n);

const mn = async(a,b)=> {
  const x = await mw(a,b)
  const y = await nw(a,b)
  return x + y;
}

const mnw = x.try_catch_wrapper(mn)

; (async () => {
  try {
    const output = await mnw(12, 3);
    console.log('output', output)
  } catch (error) {
    console.error('ERROR', error)
  }
})()
