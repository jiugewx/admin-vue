/**
 * Created by wangxin on 2017/3/22.
 * 这里是最基本的detail小组件的
 */

/**
var model = {
    name: @String,                      // [必须]字段名 与 value同同时存在时，所得的值以value 为准
    label: @String,                     // [必须]写死的label
    label: @Object / {                  // 可配置的label
        replace: @Function,             // 只允许是一个方法,动态改变它的显示
        action: @Object / {             // 操作
            api: @String,               // 操作权限
            pop: @String / @Function,   // pop
            page: @Object,              // 跳转页面
            method: @Function           // 触发的方法
        },
    },
    value: @String,                     // 字段内容，写死的值
    value: @Object / {                  // 字段内容，可配置的value
        replace: @Function,             // 只允许是一个方法,动态改变它的显示
        action: @Object / {             // 操作
            api: @String,               // 操作权限
            pop: @String / @Function,   // pop
            page: @Object,              // 跳转页面
            method: @Function           // 触发的方法
        },
        type: @String                    // value的形式 text[默认],tags,image,
    },
    actions: @Array / [                 // 后续的操作 (跳转，pop,事件）
        {}, {},
    ],
};
*/

export default {
    data: function () {
        return {
            type: "DETAIL_SINGLE",       // 组件类型
            name: "",                    // 字段名
            label: "",                   // 字段前置  默认为空
            value: "",                   // 值        默认为空
            actions: "",                 // 字段本身的一些操作(跳转，pop,事件）
            data: {},                    // 数据
            valueObject: {},             // 把value相关的放到这个里面
            labelObject: {}              // 把label相关的放到这个里面
        }
    },
    props: ["model"],                    // 模式
    methods: {
        /**
         * 初始化 构造成对象
         * model =>
         * name:@string,
         * valueObject:@Object,
         * labelObject:@Object,
         * value:@String,
         * label:@String
         */
        init: function (modelData) {
            var model = modelData || this.model;

            this.name = model.name;
            this.valueObject = {
                type: this.getValueType(model.value),
                replace: this.transition(model.value),
                action: {}
            };
            this.labelObject = {
                replace: this.transition(model.label),
                action: {}
            }
        },
        getName: function () {
            return this.name;
        },
        /**
         * transition 中转器 所有的value和label将通过这个中转一下（）
         * @param ObjectKey
         * @returns {*}
         */
        transition: function (ObjectKey) {
            var name = this.getName();
            var replaceFunc = {
                // 字段不存在 => replace = 返回 data[name] || ""
                undefined: function () {
                    return function (value, data) {
                        return data[name] ? data[name] : "";
                    };
                },
                // 字段是写死的 => replace = 返回value
                String: function (value) {
                    return function () {
                        return value
                    };
                },
                // 字段提供了replace方法 => replace = replace
                Object: function (value) {
                    var valueObject = value;
                    return valueObject.replace ? valueObject.replace : this.undefined()
                }
            };

            var type = typeof ObjectKey;
            type = (type == "String" || type == "Object") ? type : "undefined";

            return replaceFunc[type](ObjectKey)
        },
        /**
         * 获取value的类型
         * @param value
         * @returns {*}
         */
        getValueType: function (value) {
            var typeSwitcher = {
                // 字段不存在 => type = "text"
                default: function () {
                    return "text"
                },
                // 字段提供了replace方法 => replace = replace
                Object: function (value) {
                    var valueObject = value;
                    return valueObject.type ? valueObject.type : this.undefined()
                }
            };

            var type = typeof value;
            type = type == "Object" ? type : "default";

            return typeSwitcher[type](value)
        },
        /**
         * 设置value
         */
        setValue: function (data) {
            var name = this.getName();
            var loadData = data || this.data;
            var replace = this.valueObject.replace;
            this.value = replace(loadData[name], loadData);
        },
        /**
         * 设置label
         */
        setLabel: function (data) {
            var name = this.getName();
            var loadData = data || this.data;
            var replace = this.labelObject.replace;
            this.label = replace(loadData[name], loadData);
        },
        /**
         * 获取value
         * @returns {*}
         */
        getValue: function () {
            return this.value;
        },
        /**
         * 获取label
         * @returns {*}
         */
        getLabel: function () {
            return this.label;
        },
        /**
         * 加载数据
         */
        load: function (data) {
            this.data = data;
            this.setValue(data);
            this.setLabel(data);
        }
    }
}