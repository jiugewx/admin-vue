/**
 * Created by wangxin on 2017/3/10.
 * 这是form组件的base
 */

export default {
    data () {
        return {
            uuid: wx.fn.createUuid("DATA"),
            name: "",
            value: "",    // value
            defaultValue: "",
            message: ""
        }
    },
    props: {
        data: { // [必须] 用于初始化组件,外部传入,内部结构可自定义,参考input.vue组件
            type: Object,
            default: function () {
                return {
                    name: "", // [必须]查询条件的参数名符合条件组件(如多级联动)可自定义数据结构
                    value: "", //[必须]初始化的值
                    cookieName: "",
                    template: wx.Prop.Type.SEARCH_CONDITION  // [必须]查询条件或提交数据(新增,编辑)
                    // 其他默认值
                    //require:@Function(value) 或 message
                }
            }
        }
    },
    methods: {
        _init: function () {
            // 初始化默认值
            this.name = this.data.name || this.name;
            this.defaultValue = wx.fn.deepCopy(this.data.value);
            this.value = wx.fn.deepCopy(this.data.value);

            // 设置默认的validators
            this.data.validators = this.data.validators || [];

            if ( this.data.require ) {
                this.data.validators.unshift(new wx.Validator.Require(this.data.require));
            }

        },
        init: function (propData) {
            this.data = propData || this.data;
            // 初始化默认值
            this._init();
        },
        getMessage: function () {
            return this.message;
        },
        getMessageData: function () {
            return new wx.MessageObject(this.name, this.message)
        },
        getName: function () {
            return this.name;
        },
        getValue: function () {
            this.value = this._getValue();
            // wx.log("[getValue]name:"+this.name+"[value]:"+JSON.stringify(this.value));
            return this.value;
        },
        // 默认的子类getValue方法
        _getValue: function () {
            return this.value
        },
        // 强行设置Value
        setValue: function (value) {
            this.value = value;
        },
        validate: function () {
            this.message = "";
            var value = this.getValue();
            if ( ! this.data.validators ) {
                return true;
            }

            for (var i = 0; i < this.data.validators.length; i ++) {
                if ( ! this.data.validators[i].validate(value) ) {
                    this.message = this.data.validators[i].getMessage();
                    // 如果Validator对象存在newValue
                    var newValue = this.data.validators[i].newValue;
                    if ( ! wx.fn.isUndefined(newValue) ) {
                        this.reset(newValue);
                    }
                    return false;
                }
            }
            //chen定义INPUT校验方法
            if ( this.data.comValidate && this.data.comValidate.length ) {
                for (var j in this.data.comValidate) {
                    this.data.comValidate[j](value, this.reset, this._changeMessage)
                }
            }
            return true;
        },
        // [必须]获取组件查询条件的方法
        getData: function () {
            var value = this.getValue();
            // 数据校验
            if ( true !== this.validate() ) {
                return false;
            }

            if ( this.data.cookieName && this.data.cookieName != "" ) {
                wx.fn.setCookie(this.data.cookieName, value);
                this.defaultValue = value;
            }

            return this._getData()
        },
        // 子类重写
        _getData: function () {
            var value = this.getValue();
            return new wx.DataObject(this.name, value);
        },
        // 移动到可见区
        moveIntoView: function (name) {
            var Element = document.getElementById(this.uuid);
            if ( name == this.name && Element ) {
                Element.scrollIntoView(true);
            }
        },
        // [必须]重置组件状态操作
        reset: function (data) {
            var oldValue = wx.fn.deepCopy(this.value);

            // 恢复默认值
            if ( wx.fn.isObject(data) ) {
                // 默认,对象重置,一个组件可能包含多个key,value子组件,
                this.value = wx.fn.isUndefined(data[this.name]) ? this.defaultValue : data[this.name];
            } else {
                // 未定义,使用默认值
                this.value = wx.fn.isUndefined(data) ? this.defaultValue : data;
            }

            // wx.log("[base_data][" + this.name + "]reset: "+ oldValue + "=>" + this.value);
            this.message = "";
        }
    },
    created: function () {
        this.init();
    }
}