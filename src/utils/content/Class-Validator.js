/**
 * Created by xinye on 2016/12/29.
 */

import Utils from "../base";

var Validator = function (message,fnValidate,fail,success) {
    this.validate = fnValidate;             // 校验方法[必須]
    this.message = message || "";           // 校验消息[必須]
    this.fail = fail || null;               // 校验成功的回调
    this.success = success || null;         // 校验失败的回调
    return this
};

var VPO = Validator.prototype;

VPO.initialize = function () {
    this.value = null;      // 恢复为null
    this.message = "";      // 恢复为空
};

VPO.getMessage = function () {
    return this.message;
};

VPO.setMessage = function (message) {
    this.message = message;
    return this;
};

// 静态方法
Validator.Require = function (message) {
    var validate = function (val) {
        if ( Utils.fn.isUndefined(val) ) {
            return false;
        }

        val = ("" + val).trim();
        return val !== "";
    };

    return new Validator(message, validate);
};

Utils["Validator"] = Validator;

export default Utils
