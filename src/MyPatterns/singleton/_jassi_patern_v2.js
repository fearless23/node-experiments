const { node_module_db } = require('abcd');
// for initializing db_connection

const db = (function () {
  // Instance stores a reference to the Singleton
  /** @type {string} */
  let instance;

  // call once
  const set_instance = async (token) => {
    // set_instance call multiple times wont change anything
    if (!instance) instance = await node_module_db.connect('mongo_string',token)
    return instance;
  };

  const get_instance = () => {
    if(!instance) set_instance()
    return instance;
  }

  return { set: set_instance, get: get_instance };
})();

module.exports = db;

// Usage:
function token(){
  await db.set(token); // cALL ONCE in server.js or some entry file -> main function
}

const singleB = db.get();


// console.log(singleA === singleB); // true