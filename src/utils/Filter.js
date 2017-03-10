/**
 * Created by xinye on 2016/12/29.
 */

import wx from "./base";

wx.Filter = {
    number: function (val) {
        return /^[1-9]\d*$/.test(val) ? val : "";
    },
    number2fix2(num) {
        return Number(num).toFixed(2) //结果会四舍五入
    },
    parseUrl: function (url, data) {
        // 处理url参数的过滤器,将 /detail/{id} {"id": "123"} 转换成 /detail/123
        // 最好放到全局的地方
        var newUrl = url;
        for (var k in data) {
            newUrl = newUrl.replace(new RegExp("{" + k + "}", "gm"), data[k])
        }

        return newUrl;
    },
    image2url: function (image_id) {
        // 方法弃用,使用服务器的url
        return image_id ? wx.Config.ImgHost + image_id : "";
    },
    image: function (image_id) {
        if ( image_id ) {
            return '<img style="height:50px;width:50px" src="' + wx.Filter.image2url(image_id) + '">';
        }

        return image_id;
    },
    imageurl: function (imageurl) {
        if ( imageurl ) {
            return '<img style="height:50px;width:50px" src="' + imageurl + '">';
        }

        return imageurl;
    },
    small_imageurl: function (imageurl) {
        if ( imageurl ) {
            return '<img style="height:25px;width:25px" src="' + imageurl + '">';
        }

        return imageurl;
    },
    gender2text: function (gender) {
        if ( gender == 1 ) {
            return "男";
        } else if ( gender == 2 ) {
            return "女";
        } else {

            return "保密";
        }
    },
    stage2text: function (stage) {
        if ( stage == 1 ) {
            return "小学";
        } else if ( stage == 2 ) {
            return "初中";
        } else if ( stage == 3 ) {
            return "高中";
        } else {
            return "";
        }
    },
    grade2text: function (grade) {
        if ( grade == 1 ) {
            return "一年级";
        } else if ( grade == 2 ) {
            return "二年级";
        } else if ( grade == 3 ) {
            return "三年级";
        } else if ( grade == 4 ) {
            return "四年级";
        } else if ( grade == 5 ) {
            return "五年级";
        } else if ( grade == 6 ) {
            return "六年级";
        } else if ( grade == 7 ) {
            return "七年级";
        } else if ( grade == 8 ) {
            return "八年级";
        } else if ( grade == 9 ) {
            return "九年级";
        } else if ( grade == 10 ) {
            return "高一";
        } else if ( grade == 11 ) {
            return "高二";
        } else if ( grade == 12 ) {
            return "高三";
        } else {
            return "";
        }
    },
    //薪酬类型
    filterSalaryType:function(val){
        if(val == '1'){
            return "A类"
        }else if(val == '2'){
            return "B类"
        }else {

        }
    },
    pid2text: function (pid) {
        pid = "" + pid;
        for (var i = 0; i < wx.Prop.Option.PRODUCTS.length; i ++) {
            if ( pid == wx.Prop.Option.PRODUCTS[i].value + "" ) {
                return wx.Prop.Option.PRODUCTS[i].text;
            }
        }

        return pid;
    },
    grade2extends(value, grade, stage) {
        if ( stage == 2 && grade == 6 ) {
            return "六年级（五四制）"
        } else {
            return wx.Filter.grade2text(grade)
        }
    },
    filterProvinceText: function (val) {
        var text = ("" + val).replace("省", "");
        text = text.replace("市", ""); // 避免出现'北京市'
        if ( text == "北京" || text == "上海" || text == "天津" || text == "重庆" || ! val ) {
            return " ";
        } else {
            return text + "省";
        }

    },
    filterCityText: function (val) {
        if ( ! val ) {
            return " "
        }
        var text = ("" + val).replace("市", "");
        return text + "市";
    },
    versionStatus: function (val) {
        if ( val == "N" ) {
            return "最新版本"
        } else if ( val == "O" ) {
            return "不提示升级"
        } else if ( val == "A" ) {
            return "提示升级"
        } else if ( val == "E" ) {
            return "强制升级"
        } else {
            return ""
        }
    },
    star2text(star) {
        if ( star ) {
            if ( star == '0' ) {
                return " "
            }
            return star + "星级"
        } else {
            return ""
        }
    },
    education2text(val) {
        if ( val == "1" ) {
            return "专科以下"
        } else if ( val == "2" ) {
            return "专科"
        } else if ( val == "3" ) {
            return "本科"
        } else if ( val == "4" ) {
            return "硕士"
        } else if ( val == "5" ) {
            return "博士"
        } else if ( val == "6" ) {
            return "博士以上"
        } else if ( val == "7" ) {
            return "其他"
        } else {
            return ""
        }
    },
    identity2text(val) {
        if ( val == "1" ) {
            return "在职教师"
        } else if ( val == "2" ) {
            return "自由老师"
        } else if ( val == "3" ) {
            return "在校学生"
        } else if ( val == "4" ) {
            return "机构教师"
        } else {
            return ""
        }
    },
    subIdentity2text(val) {
        if ( val == "1" ) {
            return "公办教师"
        } else if ( val == "2" ) {
            return "私立教师"
        } else if ( val == "3" ) {
            return "机构教师"
        } else if ( val == "20" ) {
            return "其他"
        } else {
            return ""
        }
    },
    hour2text(hour) {
        return hour + '小时'
    },

    fenToyuan(val) {
        return (Number(val) / 100).toFixed(2)
    },
    // 分 => 元 取整数
    fen2yuanNoDecimal(val) {
        return (Number(val) / 100).toFixed(0)
    },
    yuanTofen(val) {
        return Number(val) * 100
    },
    // 预计未来时间（add @Number,String)
    preHour(value, add) {
        var add = Number(add) || 120;
        var date = new Date(value).getTime();
        var newDate = date + add * 1000 * 60;
        var DATE = wx.Date.getDate(date, {
            type: "YYYY-MM-DD"
        });
        var HOUR = wx.Date.getDate(date, {
            type: "HH:MM"
        });
        var PRE_HOUR = wx.Date.getDate(newDate, {
            type: "HH:MM"
        });
        return DATE + " " + HOUR + "-" + PRE_HOUR;
    },

    // 输出全地址
    address2full(options){
        var province = options.province || "";
        var city = options.city || "";
        var district = options.district || "";
        var address = options.address || "";

        var pubProvince = wx.Filter.filterProvinceText(province);
        var pubCity = wx.Filter.filterCityText(city);
        wx.log('[address2full]province:' + province + "=>" + pubProvince);
        wx.log('[address2full]city:' + city + "=>" + pubCity);

        var fullAddress = [];
        if ( address.indexOf(pubProvince) === - 1 ) {
            fullAddress.push(pubProvince);
        }

        if ( address.indexOf(pubCity) === - 1 ) {
            fullAddress.push(pubCity);
        }

        if ( address.indexOf(district) === - 1 ) {
            fullAddress.push(district);
        }

        fullAddress.push(address);
        return fullAddress.join("");
    },
    // 过滤社区学堂名称
    filterClassroomName: function (options) {
        var name = options.name || "";
        var pubName = '';
        if ( name != "" ) {
            pubName = "<span style='margin-right:20px'>" + name + "</span>";
        }
        return pubName
    },
    // 输出偏移地址
    filterAddressOffset: function (options) {
        var longitude = options.longitude || "";
        var latitude = options.latitude || "";
        var offset = Number(options.offset || 0);

        var pubOffset = "";
        if ( offset > 1000 ) {
            offset = Number(offset / 1000).toFixed(1) + "km";
            pubOffset = "<span style='color:#ff9800'>偏差" + offset + "</span>";
        } else if ( offset > 0 && offset <= 1000 ) {
            offset = Number(offset).toFixed(0) + "m";
            pubOffset = "<span style='color:#ff9800'>偏差" + offset + "</span>";
        }

        var point = '';
        if ( longitude != "" || latitude != "" ) {
            point = " (" + longitude + "," + latitude + ") ";
        }

        return pubOffset + point;
    },

    date2week(string) {
        if ( "" + string != "" ) {
            var newString = string.split('|');
            var timer = "";
            for (var i = 0; i < newString.length; i ++) {
                var curTime = newString[i];
                var curHours = wx.Date.getDate(curTime, {
                    type: "HH:MM"
                });
                var date = new Date(curTime).getTime();
                var preTime = date + 120 * 1000 * 60;
                var addTime = wx.Date.getDate(preTime, {
                    type: "HH:MM"
                });
                var weekday = wx.Date.getWeek(date, {
                    type: "周"
                });

                wx.log('[date2week]time:' + curTime + "=>" + weekday);

                timer += "<span style='margin-right: 20px'>" + weekday + curHours + "-" + addTime + "</span>"
            }
            return timer
        } else {
            return ""
        }
    },
    time2Date(time) {
        if ( ! wx.fn.isValidTime(time) ) {
            return ""
        }
        return wx.Date.getDate(time, {
            type: "YYYY-MM-DD"
        })
    },
    time2DateHour(time) {
        if ( ! wx.fn.isValidTime(time) ) {
            return ""
        }
        return wx.Date.getDate(time, {
            type: "YYYY-MM-DD HH:MM"
        })
    },
    time2now(time) {
        // if(time == "9999-12"){
        //     return "至今"
        // }
        if ( ! wx.fn.isValidTime(time) ) {
            return time
        }
        var date = new Date(time);
        var year = date.getFullYear();
        if ( year == "9999" ) {
            return "至今"
        } else {
            return time
        }
    },
    warning2icon() {
        return "<span style='color:red;padding-right:5px;padding-left:5px;' class='fa fa-warning'></span>"
    },
    autoOrient(url) {
        if ( ("" + url).indexOf("oss") > 0 ) {
            return url + "?x-oss-process=image/auto-orient,1";
        }
        return url
    },
    formatJSON(jsonStr) {
        jsonStr = JSON.parse(jsonStr);
        return JSON.stringify(jsonStr, null, 4);
    },
    truncate(string, length, etc) {
        etc = etc || "...";
        return ("" + string).substr(0, length) + etc;
    },
    md5: function (text) {
        return wx.fn.md5(text);
    },
    filter0000Time: function (value) {
        value = "" + value;
        if ( value.indexOf("0000-00") != - 1 ) {
            return ""
        }
        return value
    },
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


export default wx
