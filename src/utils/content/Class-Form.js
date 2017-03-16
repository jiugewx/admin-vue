/**
 * Created by xinye on 2016/12/29.
 * 本类是收集所有的form表单的状态，包括（value,message,validate)
 */

import Utils from "../base";

function isFormObject(dataObject) {
    return dataObject && dataObject.toQuery
}

// 这是一个表单class
var FormObject = function (name, value, allowedEmpty) {
    this.data = new Object();
    this._Empty = allowedEmpty || false;
    this.append(name, value);
    return this;
};

var FPO = FormObject.prototype;

FPO.merge = function (dataObject) {
    if ( isFormObject(dataObject) ) {
        var query = dataObject.toQuery();
        this.data = Utils.fn.mergeObject(this.data, query);
    }

    return this;
};

FPO.append = function (name, value) {
    if ( Utils.fn.isUndefined(name) || Utils.fn.isUndefined(value) ) {
        return this;
    }

    var empty = ("" + value).trim().length ? false : true;
    if ( this._Empty || ! empty ) {
        var query = {};
        query[name] = value;
        this.data = Utils.fn.mergeObject(this.data, query);
    }

    return this;
};

FPO.toQuery = function (toString) {
    if ( toString ) {
        var query = [];
        for (var key in this.data) {
            var urlData = encodeURI(this.data[key]);
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
    }

    return this.data;
};

FPO.toBody = function () {
    var body = this.toQuery(false);
    return {
        body: JSON.stringify(body)
    };
};

FPO.toData = function () {
    return this.data;
};

Utils["FormObject"] = FormObject;

export default Utils