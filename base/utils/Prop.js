import wx from "./base";

wx.Prop = {};
wx.Prop.Type = {
    SEARCH_CONDITION: 'SEARCH_CONDITION',
    SEARCH_CONDITION_GROUP: 'SEARCH_CONDITION_GROUP', // 多同类元素的搜索模板
    SINGLE: "SINGLE",
    SINGLE_MESSAGE: "SINGLE_MESSAGE",  // 带消息提示的单一模板
    SUBMIT_DATA: 'SUBMIT_DATA',
    DETAIL_SUBMIT_DATA: 'DETAIL_SUBMIT_DATA'
};

wx.Prop.Option = {
    ALL: {
        "value": "",
        "text": "全部",
        "options": []
    },
    PRODUCTS: [
        {
            "value": "1",
            "text": "学生端"
        }, {
            "value": "2",
            "text": "老师端"
        }, {
            "value": "4",
            "text": "环球题库"
        }
    ],
    IDENTITY: [{
        "value": "1",
        "text": "在职教师"
    },
        {
            "value": "2",
            "text": "自由老师"
        },
        {
            "value": "3",
            "text": "在校学生"
        },
        // {
        //     "value": "4",
        //     "text": "自由老师"
        // }
    ],
    EDUCATION: [{
        "value": "5",
        "text": "博士"
    }, {
        "value": "4",
        "text": "硕士"
    }, {
        "value": "3",
        "text": "本科"
    }, {
        "value": "2",
        "text": "专科"
    }, {
        "value": "7",
        "text": "其他"
    },],
    GENDER: [{
        "value": "1",
        "text": "男"
    }, {
        "value": "2",
        "text": "女"
    }],
    STAGE: [{
        "value": "1",
        "text": "小学"
    }, {
        "value": "2",
        "text": "初中"
    }, {
        "value": "3",
        "text": "高中"
    }],
    STAGE_GRADE: [{
        "value": "1",
        "text": "小学",
        "options": [{
            "value": "1",
            "text": "一年级"
        }, {
            "value": "2",
            "text": "二年级"
        }, {
            "value": "3",
            "text": "三年级"
        }, {
            "value": "4",
            "text": "四年级"
        }, {
            "value": "5",
            "text": "五年级"
        }, {
            "value": "6",
            "text": "六年级"
        }]
    }, {
        "value": "2",
        "text": "初中",
        "options": [{
            "value": "6",
            "text": "六年级（五四制）"
        }, {
            "value": "7",
            "text": "七年级"
        }, {
            "value": "8",
            "text": "八年级"
        }, {
            "value": "9",
            "text": "九年级"
        }]
    }, {
        "value": "3",
        "text": "高中",
        "options": [{
            "value": "10",
            "text": "高一"
        }, {
            "value": "11",
            "text": "高二"
        }, {
            "value": "12",
            "text": "高三"
        }]
    }],
    APP_PLATFORM: [
        {
            "value": "android",
            "text": "android"
        }, {
            "value": "ios",
            "text": "ios"
        }],
    TEACHER_STAR: [
        {
            "value": "1",
            "text": "1星级"
        }, {
            "value": "2",
            "text": "2星级"
        }, {
            "value": "3",
            "text": "3星级"
        }, {
            "value": "4",
            "text": "4星级"
        }, {
            "value": "5",
            "text": "5星级"
        }, {
            "value": "6",
            "text": "6星级"
        }, {
            "value": "7",
            "text": "7星级"
        }, {
            "value": "8",
            "text": "8星级"
        }, {
            "value": "9",
            "text": "9星级"
        }, {
            "value": "10",
            "text": "10星级"
        },],
    TEACHER_STAR2: [
        {
            "value": "0",
            "text": "无星级"
        },
        {
            "value": "1",
            "text": "1星级"
        }, {
            "value": "2",
            "text": "2星级"
        }, {
            "value": "3",
            "text": "3星级"
        }, {
            "value": "4",
            "text": "4星级"
        }, {
            "value": "5",
            "text": "5星级"
        }, {
            "value": "6",
            "text": "6星级"
        }, {
            "value": "7",
            "text": "7星级"
        }, {
            "value": "8",
            "text": "8星级"
        }, {
            "value": "9",
            "text": "9星级"
        }, {
            "value": "10",
            "text": "10星级"
        },],
    KNOWLEDGE_WEIGHT: [{
        "value": "1",
        "text": "1"
    }, {
        "value": "2",
        "text": "2"
    }, {
        "value": "3",
        "text": "3"
    }, {
        "value": "4",
        "text": "4"
    }, {
        "value": "5",
        "text": "5"
    }],
    WRONGDOER2PRINCIPLE: [{
        value: "1",
        text: "学生",
        options: [{
            value: '1',
            text: '学生恶意投诉'
        }, {
            value: '2',
            text: '学生故意刁难'
        }, {
            value: '3',
            text: '学生逃避课酬'
        }, {
            value: '20',
            text: '其他'
        }]
    }, {
        value: "2",
        text: "老师",
        options: [{
            value: '11',
            text: '老师授课问题'
        }, {
            value: '12',
            text: '老师态度问题'
        }, {
            value: '13',
            text: '老师情绪问题'
        }, {
            value: '20',
            text: '其他'
        }],
    }],
    ERROR_WRONGDOER_PRINCIPLE: [{
        value: "1",
        text: "老师无责任",
        options: [{
            value: '1',
            text: '学生无理由不上课'
        }, {
            value: '2',
            text: '老师发起课程调课后学生未及时确认'
        }, {
            value: '3',
            text: '老师发起课次调课后学生未及时确认'
        }, {
            value: '20',
            text: '其他'
        }]
    }, {
        value: "2",
        text: "老师有责任",
        options: [{
            value: '11',
            text: '老师无理由不上课'
        }, {
            value: '12',
            text: '学生发起课程调课后老师未及时确认'
        }, {
            value: '13',
            text: '学生发起课次调课后老师未及时确认'
        }, {
            value: '20',
            text: '其他'
        }],
    }],
    ERROR_REASON_TYPE: [{
        value: '1',
        text: '未确认上课'
    }, {
        value: '2',
        text: '未上课'
    }],
    EXCEPTION_TIME_TYPE: [
        {
            text: "下单时间",
            value: "1"
        },
        {
            text: "支付时间",
            value: "2"
        },
        {
            text: "约课时间",
            value: "3"
        },
        {
            text: "拒绝时间",
            value: "4"
        },
        {
            text: "调课时间",
            value: "7"
        },
        {
            text: "调课时间",
            value: "8"
        },
    ],
    BANK: [
        {
            value: '',
            text: '请选择银行'
        },
        {
            value: '中国工商银行',
            text: '中国工商银行'
        },
        {
            value: '中国银行',
            text: '中国银行'
        },
        {
            value: '交通银行',
            text: '交通银行'
        },
        {
            value: '平安银行',
            text: '平安银行'
        },
        {
            value: '民生银行',
            text: '民生银行'
        },
        {
            value: '华夏银行',
            text: '华夏银行'
        },
        {
            value: '兴业银行',
            text: '兴业银行'
        },
        {
            value: '中国邮政储蓄银行',
            text: '中国邮政储蓄银行'
        },
        {
            value: '中国农业银行',
            text: '中国农业银行'
        },
        {
            value: '中国建设银行',
            text: '中国建设银行'
        },
        {
            value: '中信银行',
            text: '中信银行'
        },
        {
            value: '招商银行',
            text: '招商银行'
        },
        {
            value: '中国光大银行',
            text: '中国光大银行'
        },
        {
            value: '上海浦东发展银行',
            text: '上海浦东发展银行'
        },
        {
            value: '中国广发银行',
            text: '中国广发银行'
        },

    ]
};

// 查询条件组件数据定义
wx.Prop.Condition = {
    Input: {
        MOBILE: {
            "type": "input",
            "label": "手机号",
            "name": "mobile",
            "value": "",
            // "placeholder": "请输入手机号",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        NAME: {
            "type": "input",
            "label": "用户名",
            "name": "name",
            "value": "",
            // "placeholder": "请输入用户名",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        MATERIAL: {
            "type": "input",
            "label": "教材版本",
            "name": "name",
            "value": "",
            // "placeholder": "请输入教材版本",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        STUDENT_NAME: {
            "type": "input",
            "label": "学生",
            "name": "student_name",
            "value": "",
            // "placeholder": "",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        STUDENT_MOBILE: {
            "type": "input",
            "label": "学生手机号",
            "name": "student_mobile",
            "value": "",
            // "placeholder": "",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        TEACHER_NAME: {
            "type": "input",
            "label": "老师",
            "name": "teacher_name",
            "value": "",
            // "placeholder": "",
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        TEACHER_MOBILE: {
            "type": "input",
            "label": "老师手机号",
            "name": "teacher_mobile",
            "value": "",
            // "placeholder": "",
            "template": wx.Prop.Type.SEARCH_CONDITION
        }
    },
    Select: {
        APP_PLATFORM: {
            "type": "radio",
            "label": "平台",
            "name": "platform",
            "value": "",
            "options": wx.Prop.Option.APP_PLATFORM,
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        GENDER: {
            "type": "select_one",
            "label": "性别",
            "name": "gender",
            "value": "",
            "options": wx.Prop.Option.GENDER,
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        TEACHER_STAR: {
            "type": "select_one",
            "label": "星级",
            "enableAll": true,
            "name": "star",
            "value": "",
            "options": wx.Prop.Option.TEACHER_STAR,
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        PROVINCE_CITY: {
            "type": "select_two",
            "remote": "/common/ui/optionProvince2City",
            "options": [],
            //"enableAll" : true,
            "select1": {
                "label": "所在城市",
                "name": "province",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "select2": {
                "label": "",
                "name": "city",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        STAGE_SUBJECT: {
            "type": "select_two",
            "remote": "/common/ui/optionStage2Subject",
            "options": [],
            "enableAll": true,
            "select1": {
                "label": "学段",
                "name": "stage",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "select2": {
                "label": "学科",
                "name": "subject_id",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        STAGE_GRADE: {
            "type": "select_two",
            "options": wx.Prop.Option.STAGE_GRADE,
            "enableAll": true,
            "select1": {
                "label": "学段",
                "name": "stage",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "select2": {
                "label": "年级",
                "name": "grade",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION
            },
            "template": wx.Prop.Type.SEARCH_CONDITION
        },
        STAGE_SUBJECT_MATERIAL: {
            "type": "select_three",
            "remote1": "/common/ui/optionStage2Subject",
            "remote2": "/common/ui/optionSubject2Material",
            "options1": [],
            "options2": [],
            "enableAll": true,
            "select1": {
                "label": "学段",
                "name": "stage",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select2": {
                "label": "学科",
                "name": "subject_id",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select3": {
                "label": "教材版本",
                "name": "material_id",
                "value": "",
                "filterBySelect1": true, // 由第一个筛选
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            }
        },
        PROVINCE_CITY_DISTRICT: {
            "type": "select_three",
            "remote1": "/common/ui/optionProvince2City",
            "remote2": "/common/ui/optionCity2District",
            "options1": [],
            "options2": [],
            "enableAll": false,
            "select1": {
                "label": "地区",
                "name": "province",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select2": {
                "label": "",
                "name": "city",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select3": {
                "label": "",
                "name": "district",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            }
        },
        STAGE_GRADE_SUBJECT: {
            "type": "select_three",
            "remote1": "",
            "remote2": "/common/ui/optionGrade2TeachSubject",
            "options1": wx.Prop.Option.STAGE_GRADE,
            "options2": [],
            "enableAll": true,
            "select1": {
                "label": "学段",
                "name": "stage",
                "value": "",
                "options": wx.Prop.Option.STAGE,
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select2": {
                "label": "年级",
                "name": "grade",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            },
            "select3": {
                "label": "授课学科",
                "name": "teach_subject_id",
                "value": "",
                "options": [],
                "filterBySelect1": true, // 由第一个筛选
                "template": wx.Prop.Type.SEARCH_CONDITION_GROUP
            }
        }
    }
};

// 提交数据模板
wx.Prop.Data = {
    Input: {
        NAME: {
            "type": "input",
            "label": "用户名",
            "name": "name",
            "value": "",
            "placeholder": "请输入用户名",
            "template": wx.Prop.Type.SUBMIT_DATA
        }
    },
    Select: {
        PRODUCT: {
            "type": "select",
            "label": "产品",
            "name": "pid",
            "value": "1",
            "options": wx.Prop.Option.PRODUCTS,
            "template": wx.Prop.Type.SUBMIT_DATA,
            "require": "请选择产品"
        },
        PROVINCE_CITY: {
            "type": "select_two",
            "remote": "/common/ui/optionProvince2City",
            "options": [],
            //"enableAll" : true,
            "select1": {
                "label": "所在城市",
                "name": "province",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA
            },
            "select2": {
                "label": "",
                "name": "city",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA
            }
        },
        STAGE_SUBJECT: {
            "type": "select_two",
            "remote": "/common/ui/optionStage2Subject",
            "options": [],
            "enableAll": true,
            "select1": {
                "label": "学段",
                "name": "stage",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA
            },
            "select2": {
                "label": "学科",
                "name": "subject_id",
                "value": "",
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA
            },
            "template": wx.Prop.Type.SUBMIT_DATA
        },
        STAGE_SUBJECT_MATERIAL: {
            "type": "select_three",
            "remote1": "/common/ui/optionStage2Subject",
            "remote2": "/common/ui/optionSubject2Material",
            "options1": [],
            "options2": [],
            "enableAll": false,
            "select1": {
                "label": "学段",
                "name": "stage",
                "type": "radio",
                "value": "1",
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA,
                "require": "请输入学段"
            },
            "select2": {
                "label": "学科",
                "name": "subject_id",
                //"value" : "",  // 不指定默认为第一个值
                "options": [],
                "template": wx.Prop.Type.SUBMIT_DATA,
                "require": "请输入学科"
            },
            "select3": {
                "label": "教材版本",
                "name": "material_id",
                //"value" : "",
                "options": [],
                "filterBySelect1": true,
                "template": wx.Prop.Type.SUBMIT_DATA,
                "require": "请输入教材版本"
            },
            "template": wx.Prop.Type.SUBMIT_DATA
        },

    }
};

wx.Prop.Config = {
    // 日历config
    JADATE_CONFIG: {
        isclear: true, //是否显示清空
        istime: false, //是否开启时间选择
        format: 'YYYY-MM-DD', //日期格式
        isinitVal: true, //是否初始化时间，默认不初始化时间
        zIndex: 10, //弹出层的层级高度
        initAddVal: [0], //初始化时间，加减 天 时 分
        min: '1950-01-01', //最小日期
        max: '2050-12-31', //最大日期
    },
    // 不能早于当前日期
    LAYDATE_START_TODAY: {
        isclear: true, //是否显示清空
        istime: false, //是否开启时间选择
        format: 'YYYY-MM-DD', //日期格式
        isinitVal: true, //是否初始化时间，默认不初始化时间
        zIndex: 10, //弹出层的层级高度
        initAddVal: [0], //初始化时间，加减 天 时 分
        min: wx.Date.getDate(new Date().getTime(),{type:"YYYY-MM-DD"}), // 最小日期是当天
        max: '2050-12-31', //最大日期
    },
    // 日历config,弹出层
    JADATE_CONFIG_MODAL: {
        isclear: true, //是否显示清空
        istime: true, //是否开启时间选择
        format: 'YYYY-MM-DD hh:mm:ss', //日期格式
        isinitVal: true, //是否初始化时间，默认不初始化时间
        zIndex: 200, //弹出层的层级高度
        initAddVal: [0], //初始化时间，加减 天 时 分
        min: '1950-01-01', //最小日期
        max: '2050-12-31', //最大日期
    },
    VIEWVER:{
        scalable:false,
        fullscreen:false,
        tabable:false,
        navbar:false
    },
    BMAP_CONFIG: function () {
        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            // enableGeolocation: true
        });
        map.addControl(navigationControl);

        // 添加一个marker
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中


        map.enableDragging(); // 允许拖拽
        map.enableScrollWheelZoom(true); // 允许鼠标缩放
    }
};

module.exports = wx;
