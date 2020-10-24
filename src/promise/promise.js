/**
 * promise
 * @author wendy
 */

const PENDING = 'pending';
const FULFILLED = 'fulfulled';
const REJECTED = 'rejected';

function Promise(fn) {
  const _self = this;
  _self.state = PENDING;
  _self.onFulfilledFn = []; // success callbacks
  _self.onRejectedFn = []; // fail callbacks

  function resolve(value) {
    setTimeout(() => {
      if (_self.state === PENDING) {
        _self.state = FULFILLED;
        _self.value = value;
        _self.onFulfilledFn.forEach((f) => {
          f(_self.value);
        });
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (_self.state === PENDING) {
        _self.state = REJECTED;
        _self.reason = reason;
        _self.onRejectedFn.forEach((f) => {
          f(_self.reason);
        });
      }
    });
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function (x) {
          return x;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (x) {
          return x;
        };

  let promise;
  const _self = this;
  switch (_self.state) {
    case FULFILLED:
      promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let x = onFulfilled(_self.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      break;
    case REJECTED:
      promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let x = onRejected(_self.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      break;
    case PENDING:
      promise = new Promise(function (resolve, reject) {
        _self.onFulfilledFn.push(function () {
          try {
            let x = onFulfilled(_self.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        _self.onRejectedFn.push(function () {
          try {
            let x = onRejected(_self.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      break;
  }

  return promise;
};

function resolvePromise(promise, x, resolve, reject) {
  if (x === primise) {
    return reject(new TypeError('x 与 promise 不能相等'));
  }
  if (x instanceof Promise) {
    if (x.state === FULFILLED) {
      resolve(x.value);
    } else if (x.state === REJECTED) {
      reject(x.reason);
    } else {
      x.then(function (y) {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let excuted;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          function (y) {
            if (executed) return;
            executed = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function (e) {
            if (executed) return;
            executed = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (executed) return;
      executed = true;
      reject(e);
    }
  }
}

/**
 * 为了测试, 导出模块
 * 需要安装 promises-aplus-tests, 执行yarn testPromise 进行测试
 */
module.exports = {
  deferred() {
    let resolve, reject;
    let promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });
    return {
      promise,
      resolve,
      reject,
    };
  },
};
