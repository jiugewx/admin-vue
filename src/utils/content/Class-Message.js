/**
 * Created by wangxin on 2017/3/7.
 */

import Utils from "../base";

// 这是一个表单class
var MessageObject = function (name, message, allowedEmpty) {
    this._list = new Array();
    this._Empty = allowedEmpty || false;
    this.append(name, message);
    return this;
};

var MPO = MessageObject.prototype;

MPO.merge = function (MessageObject) {
    if ( MessageObject && MessageObject._list && Utils.fn.isArray(MessageObject._list) ) {
        this._list = this._list.concat(MessageObject._list)
    }
    return this;
};

MPO.append = function (name, message) {
    if ( Utils.fn.isUndefined(name) || Utils.fn.isUndefined(message) ) {
        return this;
    }

    var empty = ("" + message).trim().length ? false : true;
    if ( this._Empty || ! empty ) {
        var query = {};
        query.name = name;
        query.message = message;
        this._list.push(query);
    }

    return this;
};
// 获取一行信息
MPO.getOneLineMessage = function () {
    var content = "";
    for (var i = 0; i < this._list.length; i ++) {
        content += "" + this._list[i].message + ";";
    }

    return content;
};

// 输出为多行显示
MPO.getLinesMessage = function (number) {
    var length = this._list.length;
    if ( typeof number == "number" && number >= 0 ) {
        if ( number < this._list.length ) {
            length = number;
        }
    }

    var content = "";
    for (var i = 0; i < length; i ++) {
        // 分行显示
        content += "<div>" + this._list[i].message + "</div>";
    }

    if ( number < this._list.length ) {
        // 最后显示点
        content += "...";
    }

    return content;
};

MPO.getNames = function () {
    var length = this._list.length;

    var list = [];
    for (var i = 0; i < length; i ++) {
        // 分行显示
        list.push(this._list[i].name)
    }

    return list;
};

Utils["MessageObject"] = MessageObject;

export default Utils