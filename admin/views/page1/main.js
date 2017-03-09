/**
 * Created by wangxin on 2017/3/7.
 */

import "../../../src/style/style.less";
import "../../../base/utils/index";

console.log("page1.start!");
console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);

function loadElement(element) {

}


function addScript(srcName) {
    console.log(window[srcName]);
    if ( typeof window[srcName] == "undefined" ) {
        var doc = window.document;
        var scriptEl = doc.createElement("script");
        scriptEl.setAttribute("type", "text/javascript");
        scriptEl.setAttribute("charset", "utf-8");
        scriptEl.setAttribute("src", srcName);
        window[srcName] = scriptEl;
        document.getElementsByTagName('head')[0].appendChild(scriptEl);
        scriptEl.onload = scriptEl.onreadystatechange = function () {
            if ( ! this.readyState || /loaded|complete/.test(this.readyState) ) {
                scriptEl.onload = scriptEl.onreadystatechange = null;
            }
        }
    }
    return loadElement(window[srcName])
}

var scriptResource = function (srcName, callback) {
    this.name = srcName;
    this.$el = null;
    this.$callback = callback;
    var self = this;
    var status = {
        create: function () {
            self.create2loading();
        },
        loading:function () {
            self.loading2ready()
        },
        ready:function () {
            self.$callback && self.$callback();
        }
    };
    if ( typeof window[this.name] == "undefined" ) {
        window[this.name] = "create";
        this.create2loading();
    } else {
        var _status = window[this.name];
        status[_status]();
    }
};

scriptResource.prototype.create2loading = function () {
    var doc = window.document;
    var scriptEl = doc.createElement("script");
    scriptEl.setAttribute("type", "text/javascript");
    scriptEl.setAttribute("charset", "utf-8");
    scriptEl.setAttribute("src", this.name);
    document.getElementsByTagName('head')[0].appendChild(scriptEl);
    window[this.name] = "loading";
    this.$el = scriptEl;
    this.loading2ready();
};


scriptResource.prototype.loading2ready = function () {
    var self = this;
    var scriptEl = this.$el;
    scriptEl.onload = scriptEl.onreadystatechange = function () {
        if ( ! this.readyState || /loaded|complete/.test(this.readyState) ) {
            scriptEl.onload = scriptEl.onreadystatechange = null;
            window[self.name] = "ready";
            self.$callback && self.$callback();
        }
    }
};

var config = {
    initialFrameWidth: 850,
    initialFrameHeight: 300,
    autoHeightEnabled: false,
    initialContent: "",
    autoClearinitialContent: true,
    focus: false
};

// 设置好ueditor的默认地址
window["UEDITOR_HOME_URL"] = "/libs/Ueditor/";

function createUe(id) {
    return new wx.Task(function () {
        UE.getEditor(id, config)
    })
}

var isReady = false;
function loadUeditor(success) {
    if ( ! isReady ) {
        var config = addScript("/libs/Ueditor/ueditor.config.js");
        var all = addScript("/libs/Ueditor/ueditor.all.js");
        var zh = addScript("/libs/Ueditor/lang/zh-cn/zh-cn.js");
        var dialog = addScript("/libs/Ueditor/kityformula-plugin/addKityFormulaDialog.js");
        var content = addScript("/libs/Ueditor/kityformula-plugin/getKfContent.js");
        var filter = addScript("/libs/Ueditor/kityformula-plugin/defaultFilterFix.js");
        window.onload = function () {
            isReady = true;
            success && success();
        }
    } else {
        success && success();
    }
}


loadUeditor(function () {
    UE.getEditor("uuid1", config)
});

loadUeditor(function () {
    UE.getEditor("uuid2", config)
});