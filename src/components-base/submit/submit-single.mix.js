/**
 * 这里是单个form表单组件的定义
 */

/**
 var model = {
    name:@String,                       // 字段名
    value:@String,                      // 字段的value
    message:@String,                    // 字段的消息
    validators:@Array,                  // 字段的校验方法
};
 */

export default {
    data: function () {
        return {
            type: "FORM_SINGLE",  // 不可修改
            name: "",              // 字段名
            value: "",              // 字段值
            message: "",            // 组件的消息
            show: true,              // 组件的显隐
            validators: [],           // 校验方法
            needValidate: false        // 需要校验
        }
    },
    methods: {
        /**
         * 初始化各个属性
         */
        initialize: function (PropsData) {
            this.name = PropsData.name || this.name;
            this.value = PropsData.value || this.value;
            this.meesage = PropsData.meesage || this.message;
            this.validators = PropsData.validators || this.validators;
            this.needValidate = this.validators.length ? true : false;
        },
        /**
         * 获取本实例
         */
        getInstance: function () {
            return this
        },
        /**
         * 显隐相关
         * @returns {*}
         */
        showInstance: function () {
            this.show = true;
            return this.getInstance();
        },
        /**
         * 隐藏组件
         * @returns {*}
         */
        hideInstance: function () {
            this.show = false;
            return this.getInstance();
        },
        /**
         * 判断是单个的form组件
         * @param FormGroup
         * @returns {*|boolean}
         */
        isFormSingle: function (FormGroup) {
            return (FormGroup.type && FormGroup.type == this.type && FormGroup.components && FormGroup.components.length > 0);
        },
        /**
         * 设置value
         * @param value
         * @returns {*}
         */
        setValue: function (value) {
            this.value = value || "";
            return this.getInstance();
        },
        /**
         * 获得value
         * @returns {*}
         */
        getValue: function () {
            return this.value;
        },
        /**
         * 设置mesage
         * @param message
         * @returns {*}
         */
        setMessage: function (message) {
            this.message = message || "";
            return this.getInstance();
        },
        /**
         * 获取message
         * @returns {*|string|string}
         */
        getMessage: function () {
            return this.message;
        },
        getName: function () {
            return this.name
        },
        /**
         * 校验方法
         */
        validate: function () {
            // 恢复默认
            this.setMessage();
            this.valid = true;


            var validators = this.validators;
            var value = this.getValue();
            var instance = this.getInstance();
            for (var i = 0; i < validators.length; i ++) {
                if ( ! validators[i].validate(value) ) {
                    this.valid = false;
                    this.message = validators[i].getMessage();
                    validators[i].fail && validators[i].fail(instance);                       //失败的回调
                    return false
                } else {
                    validators[i].success && validators[i].success(instance);                //成功的回调
                }
            }

            return true
        },
        /**
         * 输入框的校验方法
         */
        input_validate: function () {

        },
        /**
         * 获取数据 包括 message,value,name,valid
         */
        getData: function () {

        },
        /**
         * 重置数据
         */
        reset: function () {

        }
    }
}
