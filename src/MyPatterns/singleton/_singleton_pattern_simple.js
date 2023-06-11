const { node_module_db } = require('abcd');
// for initializing db_connection

const db = (function () {
  // Instance stores a reference to the Singleton
  /** @type {string} */
  let instance;

  const get_instance = async () => {
    if (!instance) instance = await node_module_db.connect('mongo_string')
    return instance;
  };  

  return { get: get_instance };
})();

// Usage in use_simple.js
// module.exports = { db };
module.exports = db;

// Usage:

// const singleA = db.get_instance();
// const singleB = db.get_instance();
// console.log(singleA === singleB); // true