/**
 * 类型转换
 */

/**
 * 获取类型
 * @param {*} input 数据类型
 * @returns
 */
const getType = input => {
  return Object.prototype.toString.call(input).slice(8, -1)
}

/**
 * 判断是否是原始类型
 * @param {*} _type
 * @returns
 */
const isPrimitive = input => {
  const types = ['Undefined', 'Null', 'String', 'Number', 'Boolean']
  return types.indexOf(getType(input)) !== -1
}

/**
 * 类型转换
 * @param {*} input 转换的值
 * @param {String} preferedType 优选类型
 * @returns
 */
const toPrimitive = (input, preferedType) => {
  // 如果是原始类型 则返回
  if (isPrimitive(input)) {
    return input
  }

  let hint = '',
    exoticToPrim = null,
    methodNames = ''

  // 存在优选类型逻辑
  if (!preferedType) {
    hint = 'default'
  } else if (preferedType === 'string') {
    hint = 'string'
  } else if (preferedType === 'number') {
    hint = 'number'
  }

  exoticToPrim = input[Symbol.toPrimitive] // input.@@toPrimitive
  if (exoticToPrim) {
    if (typeof ((result = exoticToPrim.call(O, hint)) !== 'object')) {
      return result
    } else {
      throw new TypeError('TypeError Exception')
    }
  }

  if (hint === 'default') {
    hint = 'number'
  }

  // 转成原始类型
  return OrdinaryToPrimitive(input, hint)
}

const OrdinaryToPrimitive = (O, hint) => {
  let methodNames = null,
    result = null
  if (typeof O !== 'object') {
    return
  }
  // 这里决定了先调用toString还是valueOf
  if (hint === 'number') {
    methodNames = [input.valueOf, input.toString]
  }

  if (hint === 'string') {
    methodNames = [input.toString, input.valueOf]
  }

  for (const name in methodNames) {
    if (O[name]) {
      result = O[name]()
      if (typeof result !== 'object') {
        return result
      }
    }
  }

  throw new TypeError('TypeError exception')
}

console.log("toPrimitive('heihei')===", toPrimitive('1' + 2 + 4))
