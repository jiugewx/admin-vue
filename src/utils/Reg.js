/**
 * Created by wangxin on 2017/2/7.
 */

import wx from "./base";

function validateFunction(Reg, value, FailCallback) {
    if ( Thu.fn.isUndefined(value) ) {
        return false;
    }

    value = ("" + value).trim();
    if ( ! Reg.test(value) ) {
        FailCallback && FailCallback(value);
        return false
    }

    return true
}

// 正则库
wx.Reg = {
    // 大于0的整数
    wholeNumber: function (value, FailCallback) {
        return validateFunction(/^[1-9]\d*$/, value, FailCallback);
    },
    // 整数(包括0)
    wholeNumberHas0: function (value, FailCallback) {
        return validateFunction(/^([1-9]\d*|0)*$/, value, FailCallback);
    },
    // 两位小数
    decimalNumber2: function (value, FailCallback) {
        return validateFunction(/^((0\.\d{1,2})|([1-9]\d*\.\d{1,2})|[1-9]\d*)$/, value, FailCallback);
    },
    // 一位小数
    decimalNumber1: function (value, FailCallback) {
        return validateFunction(/^((0\.\d{1})|([1-9]\d*\.\d{1})|[1-9]\d*)$/, value, FailCallback);
    },
    // 不包括0的小数,但是包括0.0000之类
    decimalNumber: function (value, FailCallback) {
        return validateFunction(/^((0\.\d*)|([1-9]\d*\.\d*)|[1-9]\d*)$/, value, FailCallback);
    },
    // 包括0的所有正数
    number:function (value, FailCallback) {
        return validateFunction(/^(0|(0\.\d*)|([1-9]\d*\.\d*)|[1-9]\d*)$/, value, FailCallback);
    },
    // 手机号
    phone: function (value, FailCallback) {
        return validateFunction(/^1[3-9]\d{9}$/, value, FailCallback);
    },
    // 电话号码(手机与座机)
    telNumber: function (value, FailCallback) {
        return validateFunction(/^((1[3-9]\d{9})|(0\d{2,3}-\d{7,8})|([1-9]\d{2,3}-\d{3,4}-\d{3,4}))$/, value, FailCallback);
    },
    // 大写字母
    upLetter:function (value,FailCallback) {
        return validateFunction(/^[A-Z]+$/, value, FailCallback);
    }
};

export default wx
