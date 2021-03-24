/**
 * 类型检查 实现方式 typeof + instanceof
 * @param {*} entity
 * @param {*} protoObject
 */
function typeCheckingOld(entity, protoObject) {
  let type = typeof entity
  // 如果当前数据类型非引用类型 或 data不是null ，判断为基础类型，直接返回；
  // (因为typeof null 也为object, 这是一个历史悠久的bug)
  if (type !== 'object' || entity === null) {
    return type
  }

  let proto = Object.getPrototypeOf(entity)

  while (true) {
    if (proto === null) return false
    if (proto === protoObject.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }

  return proto
}

function Parents() {}
let P = new Parents()
let Child = new Parents()

console.log(typeCheckingOld(Child, Parents))

/**
 * 类型检查 type + Object.prototype.toString()
 * @param {*} data
 */
function typeCheckingNew(data) {
  let _type = typeof data
  if (typeof data !== 'object') {
    return _type
  }
  let a = Object.prototype.toString.call(data)
  console.log('a====', a)
}

let arr = ['1', '2']
let str = ''
function fn() {}
let sy = Symbol('list')
let rep = /^d+$/
console.log(typeCheckingNew(arr))
console.log(typeCheckingNew(str))
console.log(typeCheckingNew(fn))
console.log(typeCheckingNew(sy))
console.log(typeCheckingNew(rep))

const TABS_TYPE = {
  received: Symbol('received'),
  COMMENT: Symbol('comment'),
  COMPLETE: Symbol('complete')
}

console.log(TABS_TYPE.RECEIVED === 'received')
