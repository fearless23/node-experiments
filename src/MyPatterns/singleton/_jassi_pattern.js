const { node_module_db } = require('abcd');

// Instance stores a reference to the Singleton
/** @type {string} */
let instance;

const get_instance = async () => {
    if (!instance) instance = await node_module_db.connect('mongo_string')
    return instance;
};

module.exports = get_instance;