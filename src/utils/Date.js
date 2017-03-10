/**
 * Created by xinye on 2016/12/29.
 */

import wx from "./base";

// 日期操作方法
wx.Date = {
    // 添加0
    addZero: function (i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    },
    // 获取日期：2016-10-11 => YYYY-MM-DD  || timeStamp => YYYY-MM-DD
    getDate: function (timeStamp, options) {
        var date = new Date();
        var timeStamp = "" + timeStamp;

        if (timeStamp.indexOf('-') > -1 || timeStamp.indexOf('/') > -1 || timeStamp.indexOf(" ") > -1) {
            date = new Date(timeStamp.replace("-", "/").replace("-", "/"));
            // date = new Date(timeStamp);
        } else {
            date = new Date(Number(timeStamp));
        }

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();


        month = wx.Date.addZero(month);
        day = wx.Date.addZero(day);
        h = wx.Date.addZero(h);
        m = wx.Date.addZero(m);
        s = wx.Date.addZero(s);

        if (options.type == 'YYYY-MM-DD') {
            return year + "-" + month + "-" + day
        }

        if (options.type == 'YYYY-MM-DD HH:MM:SS') {
            return year + "-" + month + "-" + day + " " + h + ':' + m + ":" + s
        }

        if (options.type == 'YYYY-MM-DD HH:MM') {
            return year + "-" + month + "-" + day + " " + h + ':' + m
        }

        if (options.type == 'HH:MM') {
            return h + ':' + m
        }

        if (options.type == 'HH:MM:SS') {
            return h + ':' + m + ":" + s
        } else {
            return year + "-" + month + "-" + day
        }
    },
    getWeek: function (timeStamp, options) {
        function transWeekDay(weekday) {
            if (weekday == 1) {
                return "周一"
            }
            if (weekday == 2) {
                return "周二"
            }
            if (weekday == 3) {
                return "周三"
            }
            if (weekday == 4) {
                return "周四"
            }
            if (weekday == 5) {
                return "周五"
            }
            if (weekday == 6) {
                return "周六"
            }
            if (weekday == 0) {
                return "周日"
            }
        }

        var time = new Date();
        timeStamp = "" + timeStamp;
        if (timeStamp.indexOf('-') > -1 || timeStamp.indexOf('/') > -1 || timeStamp.indexOf(" ") > -1) {
            time = new Date(timeStamp);
        } else {
            time = new Date(Number(timeStamp));
        }
        var weekday = time.getDay();
        if (options.type.indexOf("周") != -1) {
            return transWeekDay(weekday);
        } else {
            return weekday
        }
    }
};

export default wx
