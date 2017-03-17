/**
 * Created by xinye on 2016/12/29.
 * 本类是收集所有的form表单的状态，包括（value,message)
 */

import Utils from "../base";

function isFormObject(dataObject) {
    // 包含主要方法
    return dataObject && dataObject.isValidate && dataObject.getData && dataObject.getMessage
}

// 这是一个表单class
var FormObject = function (name, value, message) {
    this.data = new Object();
    this.message = new Object();
    this.appendValue(name, value);
    this.appendMessage(name, message);
    return this;
};

var FPO = FormObject.prototype;

FPO.merge = function (dataObject) {
    if ( isFormObject(dataObject) ) {
        var valid = dataObject.isValidate();
        var data = dataObject.getData();
        var message = dataObject.getMessage();
        this.data = valid ? Utils.fn.mergeObject(this.data, data) : this.data;
        this.message = valid ? Utils.fn.mergeObject(this.message, message) : this.message;
    }

    return this;
};

FPO.appendValue = function (name, value) {
    if ( Utils.fn.isUndefined(name) || Utils.fn.isUndefined(value) ) {
        return this;
    }
    this.data[name] = value;
    return this;
};

FPO.appendMessage = function (name, message) {
    if ( Utils.fn.isUndefined(message) || Utils.fn.isUndefined(message) ) {
        return this;
    }
    this.message[name] = message;
    return this;
};

FPO.getData = function () {
    var valid = this.isValidate();
    return valid ? this.data : false
};

FPO.toQuery = function () {
    var data = this.getData();

    if ( ! data ) {
        return ""
    }

    var query = [];
    for (var key in data) {
        var urlData = encodeURI(data[key]);
        // ;/?:@&=+$#
        urlData = urlData.replace(/\;/g, "%3B"); // 转义url中的;号
        urlData = urlData.replace(/\//g, "%2F"); // 转义url中的/号
        urlData = urlData.replace(/\?/g, "%3F"); // 转义url中的?号
        urlData = urlData.replace(/\:/g, "%3A"); // 转义url中的:号
        urlData = urlData.replace(/\@/g, "%40"); // 转义url中的@号
        urlData = urlData.replace(/\&/g, "%26"); // 转义url中的&号
        urlData = urlData.replace(/\=/g, "%3D"); // 转义url中的=号
        urlData = urlData.replace(/\+/g, "%2B"); // 转义url中的+号
        urlData = urlData.replace(/\$/g, "%24"); // 转义url中的$号
        urlData = urlData.replace(/\#/g, "%23"); // 转义url中的#号
        query.push(key + "=" + urlData);
    }

    return query.join('&');
};

FPO.toBody = function () {
    var data = this.getData();

    if ( ! data ) {
        return ""
    }

    return {
        body: JSON.stringify(data)
    };
};

FPO.getMessage = function () {
    return this.message
};

FPO.isValidate = function () {
    var messageData = this.getMessage();
    var valid = true;
    for (var name in messageData) {
        if ( messageData[name] != "" ) {
            valid = false;
            break;
        }
    }

    return valid
};


Utils["FormObject"] = FormObject;

export default Utils