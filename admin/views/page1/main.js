/**
 * Created by wangxin on 2017/3/7.
 */

import "../../../src/style/style.less";
import "../../../base/utils/index";

console.log("page1.start!");
console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);


var ScriptResource = function (srcName, callback) {
    this.name = srcName;
    this.$el = null;
    this.$callback = callback;
    var status = window[this.name];
    if ( typeof status == "undefined" ) {
        window[this.name] = "create";
    }
    this.handleStatus(window[this.name]);
};

ScriptResource.prototype.load = function () {
    var doc = window.document;
    var scriptEl = doc.createElement("script");
    scriptEl.setAttribute("type", "text/javascript");
    scriptEl.setAttribute("charset", "utf-8");
    scriptEl.setAttribute("src", this.name);
    document.getElementsByTagName('head')[0].appendChild(scriptEl);
    this.$el = scriptEl;
    window[this.name] = "loading";
    var self = this;
    scriptEl.onload = scriptEl.onreadystatechange = function () {
        if ( ! this.readyState || /loaded|complete/.test(this.readyState) ) {
            scriptEl.onload = scriptEl.onreadystatechange = null;
            window[self.name] = "ready";
            self.handleStatus("ready");
        }
    }
};

ScriptResource.prototype.handleStatus = function (status) {
    var self = this;
    var statusHandler = {
        // 开始创建
        create: function () {
            self.load();
            return self;
        },
        // 设置等待
        loading: function () {
            var timer = setInterval(function () {
                if ( window[self.name] == "ready" ) {
                    clearInterval(timer);
                    self.handleStatus("ready")
                }
            }, 100);
            return self;
        },
        // 完成的标志
        ready: function () {
            self.$callback && self.$callback();
            return self;
        }
    };

    return statusHandler[status]();
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

function create(callback) {
    new ScriptResource("/libs/Ueditor/ueditor.config.js", script2);

    function script2() {
        new ScriptResource("/libs/Ueditor/ueditor.all.js", script3);
    }

    function script3() {
        new ScriptResource("/libs/Ueditor/lang/zh-cn/zh-cn.js", script4);
    }

    function script4() {
        new ScriptResource("/libs/Ueditor/kityformula-plugin/addKityFormulaDialog.js", script5);
    }

    function script5() {
        new ScriptResource("/libs/Ueditor/kityformula-plugin/getKfContent.js", script6);
    }

    function script6() {
        new ScriptResource("/libs/Ueditor/kityformula-plugin/defaultFilterFix.js", callback)
    }
}

create(function () {
    UE.getEditor("uuid1", config)
});

create(function () {
    UE.getEditor("uuid2", config)
});
