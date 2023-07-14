// const memory1 = new ArrayBuffer(13);
// 13 bytes long continuous memory or 13 * 8 bits
// By default, ArrayBuffer contains u8 integers
// Thus, buf = array of size=6 filled with 0`s

/**
 * ArrayBuffer Represents a raw buffer of binary data, 
 * which is used to store data for the different typed arrays. 
 * ArrayBuffers cannot be read from or written to directly, 
 * but can be passed to a typed array or DataView Object to interpret the raw buffer as needed.
 */
const memory1 = new ArrayBuffer(13);
console.log("memory1\n", memory1);
// Uint8Array uses 1 byte for storing an single array item
// thus, array length = 13;
const array1 = new Uint8Array(memory1);
console.log("array1 length is ", array1.length);
// 1. if number not in u8 range => number%256 is used
// 2. if index > length => ignored
array1[11] = -2057;
array1[12] = 258;
array1[112] = 2034;
array1[10] = 20;
console.log({ memory1, array1 });
console.log(array1[11], array1[12], array1[112], array1[10]);

// bytes length of Unit16Array should be multiple of 2, else error
const memory2 = new ArrayBuffer(22);
// Uint16Array uses 2 bytes for storing an single array item
// Thus, array length = 11
const array2 = new Uint16Array(memory2);
console.log("array2 length is ", array2.length);

// byte length of Uint32Array should be a multiple of 4, else error
const memory3 = new ArrayBuffer(16);
// Uint32Array uses 4 bytes for storing an single array item
// Thus, array length = 4
const array3 = new Uint32Array(memory3);
console.log("array3 length is ", array3.length);

/*
Using above, we can create staticArrays for storing u8, u16,u32 numbers
*/