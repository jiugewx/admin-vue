/**
 * Created by xinye on 2016/12/29.
 */

import wx from "./base";

// 构建Ajax
function Ajax(options) {

    var url = options.url || "", //请求的链接
        type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
        data = options.params || null, //请求的数据
        headers = options.headers || "", //请求头
        dataType = options.dataType || "", //请求的类型
        async = options.async === undefined ? true : options.async, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。
        before = options.before || function () {
            }, //发送之前执行的函数
        progress = options.progress || function () {
            };

    var timeout_bool = false, //是否请求超时
        timeout_flag = null, //超时标识
        xhr = null; //xhr对角

    return new wx.Task(function (resolve, reject) {

        //编码数据
        function setData() {

            //设置对象object的转码
            function setObjData(data, parentName) {

                function encodeData(name, value, parentName) {
                    var items = [];
                    name = parentName === undefined ? name : parentName + "[" + name + "]";
                    if ( typeof value === "object" && value !== null ) {
                        items = items.concat(setObjData(value, name));
                    } else {
                        name = encodeURIComponent(name);
                        value = encodeURIComponent(value);
                        items.push(name + "=" + value);
                    }
                    return items;
                }

                var arr = [],
                    value;
                if ( Object.prototype.toString.call(data) == '[object Array]' ) {
                    for (var i = 0, len = data.length; i < len; i ++) {
                        value = data[i];
                        arr = arr.concat(encodeData(typeof value == "object" ? i : "", value, parentName));
                    }
                } else if ( Object.prototype.toString.call(data) == '[object Object]' ) {
                    for (var key in data) {
                        value = data[key];
                        arr = arr.concat(encodeData(key, value, parentName));
                    }
                }
                return arr;

            }

            //设置字符串的转码，字符串的格式为：a=1&b=2;
            function setStrData(data) {
                var arr = data.split("&");
                for (var i = 0, len = arr.length; i < len; i ++) {
                    var name = encodeURIComponent(arr[i].split("=")[0]);
                    var value = encodeURIComponent(arr[i].split("=")[1]);
                    arr[i] = name + "=" + value;
                }
                return arr;
            }

            // 最终转码
            if ( data ) {
                if ( typeof data === "string" ) {
                    data = setStrData(data);
                } else if ( typeof data === "object" ) {
                    data = setObjData(data);
                }
                data = data.join("&").replace("/%20/g", "+");

                //若是使用get方法或JSONP，则手动添加到URL中
                if ( type === "get" || dataType === "jsonp" ) {
                    url += url.indexOf("?") > - 1 ? (url.indexOf("=") > - 1 ? "&" + data : data) : "?" + data;
                }
            }
        }

        //设置请求超时
        function setTime(callback, script) {
            if ( timeOut !== undefined ) {
                timeout_flag = setTimeout(function () {
                    if ( dataType === "jsonp" ) {
                        delete window[callback];
                        document.body.removeChild(script);

                    } else {
                        timeout_bool = true;
                        xhr && xhr.abort();
                    }
                    reject("连接超时");
                }, timeOut);
            }
        }

        // JSONP
        function createJsonp() {
            var script = document.createElement("script"),
                timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                callback = "JSONP_" + timeName;

            window[callback] = function (data) {
                clearTimeout(timeout_flag);
                document.body.removeChild(script);
                resolve(data)
            };

            script.src = url + (url.indexOf("?") > - 1 ? "&" : "?") + "callback=" + callback;
            script.type = "text/javascript";
            document.body.appendChild(script);

            setTime(callback, script);
        }

        // XHR
        function createXHR() {
            function getXHR() {
                // code for IE7, Firefox, Opera, etc.
                if ( window.XMLHttpRequest ) {
                    return new XMLHttpRequest();
                } else if ( window.ActiveXObject ) { // code for IE6, IE5
                    return new ActiveXObject('Microsoft.XMLHTTP');
                } else {
                    throw new TypeError("Your browser does not support XMLHTTP.");
                }
            }

            //设置请求头
            function setHeaders(xhr, headers) {
                headers = headers || {};
                if ( ! hasContentType(headers) ) {
                    headers['Content-Type'] = 'application/x-www-form-urlencoded'
                }

                for (var name in headers) {
                    if ( headers.hasOwnProperty(name) ) {
                        headers[name] && xhr.setRequestHeader(name, headers[name])
                    }
                }
            }

            // 是否有 Content-Type
            function hasContentType(headers) {
                for (var name in headers) {
                    if ( headers.hasOwnProperty(name) && name.toLowerCase() === 'content-type' ) {
                        return true
                    }
                }
                return false;
            }

            // 解析请求的数据
            function parseResponse(xhr) {
                var result;
                try {
                    result = JSON.parse(xhr.responseText)
                } catch (e) {
                    result = xhr.responseText
                }

                var rqData = {
                    readyState: xhr.readyState, // 请求状态（ “0”：表示未初始化， “1”：表示正在加载，   “2”：表示请求已发送，  “3”：表示请求处理中； “4”：表示请求已完成，即数据接收完毕。）
                    data: result, // 响应返回的主体内容，为字符串类型；
                    responseURL: xhr.responseURL,
                    responseXML: xhr.responseXML, // 如果响应的内容类型是 "text/xml" 或 "application/xml"，这个属性中将保存着相应的xml 数据，是 XML 对应的 document 类型；
                    status: xhr.status, // 响应的HTTP状态码；
                    statusText: xhr.statusText // HTTP状态的说明；
                };

                return resolve(rqData);
            }

            function updataProgress(event) {
                // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0。
                if ( event.lengthComputable ) {
                    var percentComplete = event.loaded / event.total;
                    progress && progress(percentComplete, event);
                }
            }


            var xhr = getXHR();
            // 进度事件,在open之前
            xhr.onprogress = updataProgress;
            xhr.upload.onprogress = updataProgress;

            xhr.open(type, url, async);
            setHeaders(xhr, headers);

            xhr.onreadystatechange = function () {
                if ( xhr.readyState === xhr.DONE ) {
                    var json = parseResponse(xhr);
                    if ( timeOut !== undefined ) {
                        //由于执行abort()方法后，有可能触发onreadystatechange事件，
                        //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                        if ( timeout_bool ) {
                            reject();
                        }
                        clearTimeout(timeout_flag);
                    }
                    if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
                        resolve(json)
                    } else {
                        reject(json.status, json)
                    }
                }
            };

            //发送请求
            xhr.send(type === "get" ? null : data);

            //请求超时
            setTime();

        }

        setData();

        before();

        if ( dataType.toLowerCase() === "jsonp" ) {
            createJsonp();
        } else {
            createXHR();
        }
    })
}
wx["Ajax"] = Ajax;

// ajax请求
wx.Ajax = {
    BeforeSend: function () {

    },

    _caches: {},

    Get: function (url, params, success, error) {
        var urlx = wx.Config.Host + url;

        if ( wx.Ajax._caches[urlx] ) {
            success && success(wx.Ajax._caches[urlx]);
            return wx.Ajax._caches[urlx];
        }

        wx.log('请求参数:', params || '空');

        return wx.Ajax({
            type: "get",
            url: urlx,
            timeOut: wx.Config.timeout,
            headers: wx.Config.headers,
            params: params,
            before: wx.Ajax.BeforeSend,
        }).then(
            function (RqData) {
                success && success(RqData.data.data);
                return wx.Task.resolve(RqData.data.data);
            }
        ).fail(function (status, RqData) {
            wx.log('get异常', status, RqData);
            error && error(status, RqData);
        })
    },

    Post: function (url, params, success, error) {
        var urlx = wx.Config.Host + url;

        if ( wx.Ajax._caches[urlx] ) {
            success && success(wx.Ajax._caches[urlx]);
            return wx.Ajax._caches[urlx];
        }

        wx.log('请求参数:', params || '空');

        return Ajax({
            type: "post",
            url: urlx,
            timeOut: wx.Config.timeout,
            headers: wx.Config.headers,
            params: {
                'body': JSON.stringify(params)
            },
            before: wx.Ajax.BeforeSend,
        }).then(
            function (RqData) {
                success && success(RqData.data.data);
                return wx.Task.resolve(RqData.data.data);
            }
        ).fail(function (status, RqData) {
            wx.log('post异常', status, RqData);
            error && error(status, RqData);
        })
    },

    GetLocalJson: function (url, success, error) {
        if ( wx.Ajax._caches[url] ) {
            success && success(wx.Ajax._caches[url]);
            return wx.Ajax._caches[url];
        }
        return Ajax({
            type: "get",
            url: url,
            timeOut: wx.Config.timeout,
            headers: wx.Config.headers,
            before: wx.Ajax.BeforeSend,
        }).then(
            function (RqData) {
                success && success(RqData.data);
                return wx.Task.resolve(RqData.data);
            }
        ).fail(function (status, RqData) {
            wx.log('getLocalJson异常', status, RqData);
            error && error(status, RqData);
        })
    },

    GetJsonp: function (url, success, error) {

        if ( wx.Ajax._caches[url] ) {
            success && success(wx.Ajax._caches[url]);
            return wx.Ajax._caches[url];
        }

        return Ajax({
            dataType: "jsonp",
            url: url,
            timeOut: wx.Config.timeout,
            before: wx.Ajax.BeforeSend,
        }).then(
            function (RqData) {
                success && success(RqData);
                return wx.Task.resolve(RqData);
            }
        ).fail(function (status, RqData) {
            wx.log('getJsonp异常', status, RqData);
            error && error(status, RqData);
        })
    }
};

module.exports = wx;