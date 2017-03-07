/**
 * Created by wangxin on 2017/2/13.
 * 这里是为了test(单元测试)，而构建的一些测试对象
 */

// 构造table的头部内容
wx.Header = function(text) {
    var Header = function(text) {
        this.text = text; // 头部的内容
        this.type = "text"; // 字段类型，"text","sort","filter","handle";
        this.value = "";    // 该字段呈现的内容(有多少列，就显示多少个Value);
        this.options = []; // 操作字段的内容，@Array
    };

    Header.prototype.setAttribute = function(name, value) {
        this[name] = value;
    };

    Header.prototype.getAttribute = function(name) {
        return this[name]
    };

    return new Header(text)
};
