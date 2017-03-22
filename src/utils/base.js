/**
 * Created by xinye on 2016/12/29.
 */

var Utils = {};

// 这里是整体的配置
Utils.Config = {
    Debug: process.env.NODE_ENV != 'production',
    // Host: process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? "" : "http://develop.admin.zquick.cn",
    ImgHost: process.env.NODE_ENV == 'production' ? "http://i0.hqyxjy.com/" : "http://hqyx-oss-test.oss-cn-beijing.aliyuncs.com/",
    OssBucket: process.env.NODE_ENV == 'production' ? "hqyx-oss-producer" : "hqyx-oss-test",
    PageHost: process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? "" : "/home",// 絕對地阯/home/edu/....
    PageBack: process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? "" : ".html",
    Header: {
        // MOCK : 1,
        AJAX: "json",
        RTP: 1
    },
    Timeout: 15000,
    errorReportUrl: process.env.NODE_ENV == 'production' ? "" : "http://localhost:9999",
};

// 日志系统
Utils.log = function (msg) {
    Utils.Config.Debug && console.log(msg);
};

Utils.fn = {
    createUuid: function (prefix) {
        prefix = prefix ? prefix + "_" : "";
        var len = 32;
        /*32长度*/
        var radix = 62;
        /*16进制*/
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        var id = prefix + uuid.join('');
        return id;
    },
    isArray: function (val) {
        return Object.prototype.toString.call(val) === '[object Array]';
    },
    isString: function (val) {
        return Object.prototype.toString.call(val) === '[object String]';
    },
    isUndefined: function (val) {
        return typeof val == "undefined";
    },
    isFunction: function (fun) {
        return typeof fun == "function";
    },
    isObject: function (val) {
        return !this.isArray(val) && (typeof val == "object");
    },
    isEmail: function (text) {
        return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9_])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(text);
    },
    // 有效的字段
    isValid: function (value) {
        if (Thu.fn.isUndefined(value) || value == null) {
            return false
        }

        // 对象数组的处理
        if (Thu.fn.isObject(value) || Thu.fn.isArray(value)) {
            return true
        }

        // 字符串与数字的判断
        if ("" + value) {
            return true
        }

        return false
    },
    // 正确的时间
    isValidTime: function (time) {
        if (Thu.fn.isUndefined(time) || ("" + time).indexOf("0000") != -1 || "" + time == "" || time == null) {
            return false
        }
        return true
    },
    // 深拷贝
    deepCopy: function (object) {
        var newObject = null;
        if (this.isArray(object)) {
            newObject = [];
            for (var i = 0; i < object.length; i++) {
                newObject.push(this.deepCopy(object[i]));
            }
        } else if (this.isObject(object)) {
            newObject = {};
            for (var k in object) {
                newObject[k] = this.deepCopy(object[k]);
            }
        } else {
            newObject = object;
        }

        return newObject;
    },
    inArray: function (val, array) {
        if (!this.isArray(array)) {
            return false;
        }

        for (var i = 0; i < array.length; i++) {
            if (val == array[i]) {
                return true;
            }
        }

        return false;
    },
    mergeArray: function (array1, array2) {
        if (!Thu.fn.isArray(array1) || !Thu.fn.isArray(array2)) {
            return array1;
        }

        for (var i = 0; i < array2.length; i++) {
            if (!Thu.fn.inArray(array2[i], array1)) {
                array1.push(array2[i]);
            }
        }

        return array1;
    },
    // 合并对象 这个没有去处引用。
    mergeObject: function (destination, source) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
            }
        }
        return destination;   // 返回扩展后的对象
    },
    setCookie: function (cName, cValue, cAge) {
        cAge = cAge || 60 * 60 * 24 * 365;
        cValue = encodeURI(cValue);
        document.cookie = cName + "=" + cValue +
            "; max-age=" + cAge +
            "; path=/";
    },
    getCookie: function (cName, defaultValue) {
        var cValue = "";
        var allCookie = document.cookie;
        var pos = allCookie.indexOf(cName + "=");
        if (pos !== -1) {
            var start = pos + cName.length + 1;
            var end = allCookie.indexOf(";", start);
            if (end === -1)  end = allCookie.length;

            return decodeURI(allCookie.substring(start, end));
        } else {
            return !Thu.fn.isUndefined(defaultValue) ? defaultValue : cValue;
        }
    },
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    md5: function (s) {
        var hexcase = 0;
        var chrsz = 8;

        /**
         * Convert an array of little-endian words to a hex string.
         */
        function binl2hex(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8  )) & 0xF);
            }
            return str;
        }

        /**
         * Calculate the MD5 of an array of little-endian words, and a bit length
         */
        function core_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);

        }

        /**
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }

        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /**
         * Convert a string to an array of little-endian words
         * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
         */
        function str2binl(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
            return bin;
        }

        /**
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /**
         * Bitwise rotate a 32-bit number to the left.
         */
        function bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    },
    // 动态插入script的资源文件
    getScriptResource: function (srcName, callback) {
        var name = srcName;
        var status = window[name];
        if (typeof status == "undefined") {
            window[name] = "create";
        }
        handleStatus(window[name]);

        function handleStatus(status) {
            var statusHandler = {
                // 开始创建
                create: function () {
                    var doc = window.document;
                    var scriptEl = doc.createElement("script");
                    scriptEl.setAttribute("type", "text/javascript");
                    scriptEl.setAttribute("charset", "utf-8");
                    scriptEl.setAttribute("src", name);
                    document.getElementsByTagName('head')[0].appendChild(scriptEl);
                    window[name] = "loading";
                    scriptEl.onload = scriptEl.onreadystatechange = function () {
                        if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                            scriptEl.onload = scriptEl.onreadystatechange = null;
                            window[name] = "ready";
                            handleStatus("ready");
                        }
                    };
                },
                // 设置等待
                loading: function () {
                    var timer = setInterval(function () {
                        if (window[name] == "ready") {
                            clearInterval(timer);
                            handleStatus("ready")
                        }
                    }, 100);
                },
                // 完成的标志
                ready: function () {
                    callback && callback();
                }
            };
            return statusHandler[status]();
        }
    }
};


window['Utils'] = Utils;

export default Utils
