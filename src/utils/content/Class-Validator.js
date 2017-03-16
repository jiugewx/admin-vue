/**
 * Created by xinye on 2016/12/29.
 */

import wx from "../base";

var Validator = function (fnValidate, message) {
    this.validate = fnValidate;  // 校验方法
    this.value = null;
    this.message = message || "validate fail!";
    return this
};

var VPO = Validator.prototype;

VPO.getMessage = function () {
    return this.message;
};

VPO.setMessage = function (message) {
    this.message = message;
    return this;
};

VPO.setValue = function (value) {
    this.value = value;
    return this;
};

VPO.getValue = function () {
    return this.value;
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

Validator.Phone = function (message) {
    var validate = function (val) {
        if ( Utils.fn.isUndefined(val) ) {
            return false;
        }

        val = ("" + value).trim();
        return /^1[3-9]\d{9}$/.test(val);
    };

    return new Validator(message, validate);
};

Validator.Name = function (message) {
    var validate = function (val) {
        if ( Utils.fn.isUndefined(val) ) {
            return false;
        }

        val = ("" + val).trim();
        return /^[\w]{4,20}$/.test(val);
    };

    return new Validator(message, validate);
};

Validator.Password = function (message) {
    var validate = function (val) {
        if ( Utils.fn.isUndefined(val) ) {
            return false;
        }

        val = ("" + val).trim();
        return /^[\w\-]{6,20}$/.test(val);
    };

    return new Validator(message, validate);
};

Validator.Length = function (min, max, message) {
    var validate = function (val) {
        if ( Utils.fn.isUndefined(val) ) {
            return false;
        }

        var length = ("" + val).length;
        return (length >= min && length <= max) ? true : false;
    };

    return new Validator(message, validate);
};

Utils["Validator"] = Validator;

export default Utils
