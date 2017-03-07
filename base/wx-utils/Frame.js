/**
 * Created by wangxin on 2017/3/7.
 */

wx.Frame = {
    openNewFrame: function (page, data, refreshType) {
        var myHash = page.hash;           // 本页面的hash值,如"!#/user/user-student-index/detail/{id}";

        if ( typeof myHash == 'undefined' ) {
            return
        }

        if ( data ) {
            myHash = Thu.Filter.parseUrl(myHash, data);                                     // 解析Hash
        }

        var parentHash = myHash;                                   // 父级页面的hash，默认与myHash相同

        var parentHashArray = parentHash != "" ? parentHash.split("/") : [];
        var name = page.name || (parentHashArray[2] ? parentHashArray[2] : '');      // 确定打开的html文件名字(默认就是二级的名字)

        var titleText = '新窗口';                                          // 新打开页面的窗口标签内容
        var title = page.title;
        if ( typeof title == 'function' && data ) {
            titleText = title(data);
        } else if ( typeof title == 'string' || typeof title == 'number' ) {
            titleText = title;
        }


        if ( window.parent && window.parent.OPEN_FRAME ) {
            return window.parent.OPEN_FRAME(myHash, titleText, name, refreshType);
        }
        return window.location.hash = myHash;
    },
    closeByHash: function (page) {
        if ( window.parent && window.parent.CLOSE_FRAME_HASH ) {
            window.parent.CLOSE_FRAME_HASH(page);
        }
    },
    openLogin: function () {
        if ( window.parent && window.parent.OPEN_LOGIN ) {
            window.parent.OPEN_LOGIN();
        } else if ( window.parent ) {
            window.parent.location.href = "/";
        } else {
            window.location.href = "/";
        }
    },
    getActiveIFrame: function () {
        if ( window.parent && window.parent.GET_ACTIVEIFRAME ) {
            return window.parent.GET_ACTIVEIFRAME();
        }

        return null;
    }
};