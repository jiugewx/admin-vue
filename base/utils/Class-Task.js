/**
 * 本方法本质是一个 promise 只是简易了
 */

import wx from "./base";

var PENDING = undefined,
    FULFILLED = 1,
    REJECTED = 2;

var isFunction = function(obj) {
    return 'function' === typeof obj;
};

var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

var isThenable = function(obj) {
    return obj && typeof obj['then'] == 'function';
};

// 中转器（不同的status,value 选择对应 resolve or reject)
var transition = function(status, value) {
    var self = this;

    if (self._status !== PENDING) {
        return;
    }
    // 所有的执行都是异步调用，保证then是先执行的
    setTimeout(function() {
        self._status = status;
        executeAll.call(self, value);
    });
};

// 遍历所有的callbacks
var executeAll = function(val) {
    var self = this,
        fn,
        successStatus = self._status === FULFILLED,
        callbacks = self[successStatus ? '_resolves' : '_rejects']; //选择好回调

    // 从callbacks的第一个开始取，循环运行所有的callbacks。
    while (fn = callbacks.shift()) {
        val = fn.call(self, val) || val;
    }

    self[successStatus ? '_value' : '_reason'] = val;
    self['_resolves'] = self['_rejects'] = undefined;
};

var Task = function(resolver) {
    if (!isFunction(resolver))
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    if (!(this instanceof Task)) {
        return new Task(resolver);
    }

    var self = this;
    this._value = null;
    this._reason = null;
    this._status = PENDING;
    this._resolves = [];
    this._rejects = [];

    var resolve = function(value) {

        // argument 类数组 [params1,parmas2];
        transition.apply(self, [FULFILLED].concat([value]));
    };
    var reject = function(reason) {
        transition.apply(self, [REJECTED].concat([reason]));
    };

    resolver(resolve, reject);
};

var proto = Task.prototype;

proto.then = proto['then'] = function(onFulfilled, onRejected) {
    var self = this;
    // 每次返回一个Task，保证是可thenable的
    return Task(function(resolve, reject) {

        function callback(value) {
            var result = isFunction(onFulfilled) && onFulfilled(value) || value;
            if (isThenable(result)) {
                result.then(function(value) {
                    resolve(value);
                }, function(reason) {
                    reject(reason);
                });
            } else {
                resolve(result);
            }
        }

        function error(reason) {
            reason = isFunction(onRejected) && onRejected(reason) || reason;
            reject(reason);
        }

        // 状态改变后的then操作，立刻执行

        if (self._status === PENDING) {
            self._resolves.push(callback);
            self._rejects.push(error);
        } else if (self._status === FULFILLED) {
            callback(self._value);
        } else if (self._status === REJECTED) {
            error(self._reason);
        }
    });
};

proto.fail = proto['fail'] = function(onRejected) {
    return this.then(undefined, onRejected)
};

// 用于快速启动一个Task链
Task.start = function(arg) {
    return Task(function(resolve, reject) {
        resolve(arg)
    })
};

// 开启多个task的同时运行（最终的结果是resolved还是rejected)
Task.race = function(tasks) {
    if (!isArray(tasks)) {
        throw new TypeError('You must pass an array to race.');
    }
    return Task(function(resolve, reject) {
        var i = 0,
            len = tasks.length;

        function resolver(value) {
            resolve(value);
        }

        function rejecter(reason) {
            reject(reason);
        }

        for (; i < len; i++) {
            tasks[i].then(resolver, rejecter);
        }
    });
};

wx["Task"] = Task;

module.exports = wx;