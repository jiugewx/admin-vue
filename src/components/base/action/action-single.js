/**
 * Created by wangxin on 2017/3/22.
 */

/**
 * 本model  本质是一个wrapper
 var model = {
    text: @String/@Html,                    // [必须]操作的文字
    api: @String || "",                     // [非必须，默认""]权限管理
    pop:{                                   // [非必须，无默认]浮层内容
            trigger:"mouseenter",           // 触发时机 [默认enter]
            placement:"",                   // 显示位置
            content:"",                     // 显示内容
        }
    response: @Function,                    // [非必须，无默认]执行方法 click
    route: @Object,                         // [非必须，无默认]跳转页面 click

    style: @Object/{                        // [非必须，有默认] 样式 （对象的配置）
            color:@String,                  // [非必须，有默认]
            size:@String                    // [非必须，有默认]
        }
    style: @Function                        // [非必须，有默认]
    disabled:@Boolean/@Function             // [非必须，默认false]是否可用 置灰不可用
};
 */

export default{
    data(){
        return {
            type: "ACTION_SINGLE",

            text: "",
            api: null,
            pop: "",
            click:{},
            style: {},
            disabled: false
        }
    },
    props: ["model"],
    computed: {
        /**
         * 设置是否显隐
         */
        disabled: function () {
            if ( this.action && typeof this.action.only == "undefined" ) {
                return false
            }
            if ( this.action && typeof this.action.only == "function" ) {
                return ! this.action.only(this.data);
            }
        },
        /**
         * 设置样式
         * @returns {{}}
         */
        styleOption: function () {
            var styleOption = {};

            styleOption.color = '';
            styleOption.size = '';

            if ( this.action && typeof this.action.style == "function" ) {
                styleOption = this.action.style(this.data);
            } else if ( this.action && typeof this.action.style == "object" && ! Thu.fn.isArray(this.action.style) ) {
                styleOption = this.action.style;
            }

            return styleOption;
        },
        /**
         * 这是样式的输出
         * @returns
         */
        styleClass: function () {
            return {
                'red': this.styleOption.color == 'red',
                'yellow': this.styleOption.color == 'yellow',
                'blue': this.styleOption.color == 'blue',
                'deep-blue': this.styleOption.color == 'deep-blue',
                'green': this.styleOption.color == 'green',
                'mini': this.styleOption.size == 'mini',
                'small': this.styleOption.size == 'small',
                'middle': this.styleOption.size == 'middle',
                'large': this.styleOption.size == 'large',
                'disabled': this.disabled
            }
        }
    },
    methods: {
        /**
         * 初始化model各参数
         */
        init: function () {

        },
        initApi: function () {

        },
        /**
         * executeMethod 执行传入的方法
         * @param fn
         */
        executeMethod: function (fn) {
            if ( this.disabled ) {
                return
            }
            var data = this.data || "";
            fn && fn(data)
        },
        /**
         * 触发事件
         * @param event
         */
        triggerEvent: function (event) {
            if ( this.disabled ) {
                return
            }
            var data = this.data;
            this.$root.EventHub.$emit(event, data);
        },
        /**
         * 打开新的页面
         * @param page
         */
        openNewFrame: function (page) {
            if ( this.disabled ) {
                return
            }
            var data = this.data || "";
            Utils.Frame.openNewFrame(page, data)
        }
    }
}