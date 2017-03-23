/**
 * Created by wangxin on 2017/3/22.
 * 这里是多个detail组件的集群
 */

/**
 * var model = [model1, model2];
 */

export default {
    data: function () {
        return {
            type: "DETAIL_GROUP",       // 组件类型
            models: []                   // 模式容器
        }
    },
    methods: {
        /**
         * 获取本实例
         */
        getInstance: function () {
            return this
        },
        /**
         * append追加
         * @model
         */
        append: function (model) {
            this.model.push(model)
        },
        /**
         * 获取子组件
         * @param name
         */
        getChild: function (name) {

        },
        /**
         * 合并其他群组
         * @param models
         */
        merge: function (models) {

        },
        /**
         * 载入数据
         * @param data
         */
        load: function (data) {

        }
    }
}