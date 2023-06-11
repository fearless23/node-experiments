const singleton_variable = (function () {
    // Instance stores a reference to the Singleton
    let instance;

    const create_instance = () => {

      // Singleton

      // Private methods and variables
      const private_method = () => {
        console.log("I am private");
      }

      const privateVariable = "Im also private";

      return {

        // Public methods and variables
        publicMethod: function () {
          console.log("The public can see me!");
        },

        publicProperty: "I am also public"
      };

    };

    return {

      // Get the Singleton instance if one exists
      // or create one if it doesn't
      get: () => {
        if (!instance) instance = create_instance();
        return instance;
      }

    };
})();

// Usage in use.js
var singleA = singleton_variable.get();
var singleB = singleton_variable.get();
console.log(singleA === singleB); // true