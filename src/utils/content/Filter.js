/**
 * Created by xinye on 2016/12/29.
 */

import Utils from "../base";

Utils.Filter = {
    // 过滤换行符 "\r\n" 或 "/n" => targetString
    filterLinefeed: function (str, targetString) {
        var aStr = str;
        var re = /(\n)|(\r)/g;
        if ( re.test(str) ) {
            return aStr.replace(re, targetString);
        }
        return str
    }
};


export default Utils
