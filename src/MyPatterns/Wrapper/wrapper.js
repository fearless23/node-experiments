const wrapper = async ({ method, context, payload, output = {} }, executable) => {
  const logger = context._logger({ method });
  context.tag_start(method);
  logger.info(payload, 'method_payload');
  try {
    await executable(context, payload, output, method);
  } catch (error) {
    logger.error(error, method);
    output.error = error.message;
  }
  return output;
};

const trycatchWrapper = function (executable) {
  return async function () {
    try {
      const result = await executable.apply(this, arguments);
      return result;
    } catch (error) {
      error.message = `[${executable.name}] - ${error.message}`
      throw error;
    }
  }
}

const trycatchWrapper2 = (executable) => {
  return async function () {
    try {
      const result = await executable.apply(this, arguments);
      return result;
    } catch (error) {
      error.message = `[${executable.name}] - ${error.message}`
      throw error;
    }
  }
}

const trycatchWrapper3 = (executable) => async (...args) => {
  try {
    const result = await executable(...args);
    return result;
  } catch (error) {
    error.message = `[${executable.name}] - ${error.message}`
    throw error;
  }
}

class Utils {
  constructor(){}
  /**
   * @overview Wraps func in try catch and add error.message
   * @template T
   * @param {T} func - The func without try/catch
   * @returns {T} - Same output as func
   */
  try_catch_wrapper (func) {
    return async function loved_try_catch_wrapper(...args) {
      try {
        const result = await func(...args);
        return result;
      } catch (error) {
        error.message = `[${func.name}] - ${error.message}`
        throw error;
      }
    }
  }
}

// RUNNING
const context = {
  tag_start(method) { console.log(`CHECK-START-${method}`) },
  tag_end(method) { console.log(`CHECK-END-${method}`) },
  _logger(opts) {
    return {
      info(data, message) { console.info(message, { ...opts, level: 'info' }, data) },
      error(data, message) { console.error(message, { ...opts, level: 'error' }, data) },
    }
  },

};

const payloadS = { a: 1, b: 2, c: 3 };
const payloadE = { ...payloadS, error: 'This is an custom error' };
const x = new Utils()

module.exports = {
  context, payloadE, payloadS, wrapper, 
  trycatchWrapper, trycatchWrapper2, trycatchWrapper3,
  x,
}