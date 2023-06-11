const { node_module_db } = require('abcd');
// for initializing db_connection

class Singleton {
  constructor() {
    singleton = null;
  }

  set(token) {
    // set method called multiple times wont change anything
    if (!this.singleton) this.singleton = await node_module_db.connect('mongo_string',token)
    return this.singleton;
  }

  get() {
    if(!this.singleton) throw new Error(`no instance detected use set_instance first`);
    return this.singleton;
  }
}

// single Instance of singleton Class
const singletonInstance = new Singleton();
Object.freeze(singletonInstance);

module.exports = singletonInstance;

//   singletonInstance.method1()

let read_db;