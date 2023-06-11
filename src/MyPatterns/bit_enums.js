const make_bit_operations = (num) => {

  /**
   * @param {number} k - kth bit 
   */
  const _mask = (k) => 1 << k;

  const _toBinary = () => (num >>> 0).toString(2);

  /**
   * @param {number} k - kth bit 
   */
  const _getKthBit = (k) => (num >> k) % 2;

  /**
   * @param {number} k - kth bit 
   */
  const _setKthBit = (k) => num | _mask(k);

  /**
   * @param {number} k - kth bit 
   */
  const _unsetKthBit = (k) => num & ~_mask(k);

  /**
   * @param {number} k - kth bit 
   */
  const _toggleKthBit = (k) => num ^ _mask(k);


  return {
    get: _getKthBit,
    set: _setKthBit,
    unset: _unsetKthBit,
    toggle: _toggleKthBit,
    binary: _toBinary,
  }
}

const make_bit_operations_v2 = (num, k) => {

  /**
   * @param {number} k - kth bit 
   */
  const _mask = () => 1 << k;

  /**
   * @param {number} k - kth bit 
   */
  const _getKthBit = () => (num >> k) % 2;

  /**
   * @param {number} k - kth bit 
   */
  const _setKthBit = () => num | _mask(k);

  /**
   * @param {number} k - kth bit 
   */
  const _unsetKthBit = () => num & ~_mask(k);

  /**
   * @param {number} k - kth bit 
   */
  const _toggleKthBit = () => num ^ _mask(k);


  return {
    get: _getKthBit,
    set: _setKthBit,
    unset: _unsetKthBit,
    toggle: _toggleKthBit,
  }
}

const toggleTypeNameFunction = {
  0: bit => bit,
  1: bit => !!bit ? 'ON' : 'OFF',
  2: bit => !!bit,
  3: bit => !!bit ? 'YES' : 'NO',
  4: bit => bit.toString(),
}


class Jnum {

  /**
   * pass an array of string
   * @param {string[]} _enum 
   * @param {1|2|3|4} toggleType - "0=> 0/1 (default)| 1 = on/off  | 2 = true/false | 3 = yes/no | 4 = '0'/'1'
   */
  constructor(_enum, toggleType = 1) {
    this._enum = _enum;
    this.maxBit = _enum.length;
    this.toggleType = toggleType;
    this._getBitInfo = toggleTypeNameFunction[toggleType]
    this._init();
  }

  _init() {
    const enumObject = {}
    const SymbolBasedEnum = {}
    for (let i = 0; i < this._enum.length; i++) {
      const flag_name = this._enum[i].toUpperCase();
      SymbolBasedEnum[flag_name] = Symbol(flag_name);
      enumObject[flag_name] = i;
    }
    this._symbolEnum = SymbolBasedEnum;
    this._enumObject = enumObject;
  }

  _binaryToDecimal(binaryString) {
    return parseInt(binaryString, 2);
  }

  info(num, debug = false) {
    const info = {};
    let number_in_binary = '';
    const bit_ops = make_bit_operations(num);
    for (let i = 0; i < this.maxBit; i++) {
      const ith_bit = bit_ops.get(i);
      if (debug) {
        console.log(`bit:${i} - ${ith_bit}`, this._enum[i])
        number_in_binary = String(ith_bit) + number_in_binary;
      }
      const bit_info = this._getBitInfo(ith_bit); // one of YES/NO, true/false etc
      const bit_name = this._enum[i];
      info[bit_name] = bit_info;
    }
    if (debug) console.log('num', num, number_in_binary)

    return info;
  }

  create(fields, debug = false) {
    // {city: 'YES', address: 'NO'}
    // fields not provided are not set

    let num = 0;
    const entries = Object.entries(fields);
    if (debug) {
      console.log("entries", entries)
      console.log("_enumObject", this._enumObject)
    }
    for (const [key, value] of entries) {
      const to_set = value === true || value === 1 || value === '1' || value === 'YES' || value === 'ON';
      const idx = this._enumObject[key.trim().toUpperCase()];
      if (debug) {
        console.log(`key:${key}`, `bit:${idx}`, `to_set:${!!to_set}`);
      }
      if (to_set && idx >= 0) num = make_bit_operations(num).set(idx);
    }
    if (debug) {
      console.log('num:decial', num)
      console.log('num:binary', make_bit_operations(num).binary())
    }
    return num;
  }

  field_ops(num, field) {
    const bit_idx = this._enumObject[field.trim().toUpperCase()];
    if (bit_idx < 0) throw new Error(`unknown field name`);
    return make_bit_operations_v2(num, bit_idx)
  }

  getIdx(field) {
    const bit_idx = this._enumObject[field.trim().toUpperCase()];
    console.log(field, bit_idx)
    if (!bit_idx || bit_idx < 0) throw new Error(`unknown field name`);
    return bit_idx;
  }

  fields(num) {
    const result = {}
    for (let i = 0; i < this._enum.length; i++) {
      const flag_name = this._enum[i].trim().toUpperCase();
      result[flag_name] = make_bit_operations_v2(num, i)
    }

    return result;
  }

  /**
   * 
   * @param {number} num 
   */
  play(num) {
    const ops = make_bit_operations(num);
    return {
      val() {
        console.log(`finally: ${num}`)
        return num;
      },
      get: (field) => {
        const idx = this.getIdx(field);
        const updated_num = ops.get(idx)
        return this.play(updated_num);
      },
      set: (field) => {
        const idx = this.getIdx(field);
        console.log(`setting ${field}: ${num}`)
        const updated_num = ops.set(idx);
        console.log(`set ${field}: ${updated_num}`)
        return this.play(updated_num);
      },
      clear: (field) => {
        const updated_num = ops.clear(this.getIdx(field))
        return this.play(updated_num);
      },
      toggle: (field) => {
        console.log(`toggling ${field}: ${num}`)
        const updated_num = ops.toggle(this.getIdx(field))
        console.log(`toggled ${field}: ${updated_num}`)
        return this.play(updated_num);
      },
    }
  }

}

// should be an array, as idx = bit number
// Ex: userInfo, has user entered 
// city (0th bit), name(1st bit), pin, bank number, pan number, address etc
const userInfoEnum = [
  'city',
  'name',
  'pin',
  'address',
  'bank_number',
  'phone',
  'pan',
];


const myUserEnum = new Jnum(userInfoEnum, 1);
// const num1 = myUserEnum.objectToNumber({
//   city: 'YES', 'pan': true, name: 'NO'
// });

// console.log(myUserEnum.getInfo(num1).city);

// // const num2 = myUserEnum.field_ops(num1, 'city').get();
// const num2 = myUserEnum.fields(num1).CITY.get();

// // const num3 = myUserEnum.field_ops(num1, 'city').unset();
// const num3 = myUserEnum.fields(num1).CITY.unset();

// console.log(myUserEnum.getInfo(num3).city);

// // const num4 = myUserEnum.field_ops(num3, 'city').toggle();
// const num4 = myUserEnum.fields(num3).CITY.toggle();

// console.log(myUserEnum.getInfo(num4).city);


const yy = myUserEnum.play(0).set('CITiiiY').set('PANmmmm').toggle('ADDRESS').val();
console.log(myUserEnum.info(yy));