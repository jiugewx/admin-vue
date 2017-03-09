/**
 * Created by wangxin on 2017/2/15.
 */
;(function () {
    function checkVersion(newPage) {
        var isValidate = true;
        var ES5Object = ["create", "getOwnPropertyNames", "getPrototypeOf", "getOwnPropertyDescriptor", "defineProperty", "defineProperties", "keys"];
        var ES6Object = ["assign"];

        for (var i = 0; i < ES5Object.length; i ++) {
            if ( typeof Object[ES5Object[i]] != "function" ) {
                isValidate = false;
                break;
            }
        }

        if ( isValidate ) {
            for (var k = 0; k < ES6Object.length; k ++) {
                if ( typeof Object[ES6Object[k]] != "function" ) {
                    isValidate = false;
                    break;
                }
            }
        }

        if ( ! isValidate ) {
            window.location.href = newPage;
        }
    }

    window['CHECKVERSION'] = checkVersion
})();