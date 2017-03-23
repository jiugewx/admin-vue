/**
 * Created by wangxin on 2017/3/22.
 */

/**
 * 模式定义
 * var model={
 *     text:@String,                                        // 本字段显示
 *     style:@Object,                                       // 样式
 *     action:@Object,                                      // 本字段的操作
 *     actions:[action1,action2]                            // 后续的操作字段
 * }
 */


export default {
    data:function () {
        return{
            type:"TITLE",
            text:"",
            style:{},
            action:{},
            actions:[]
        }
    },
    props:["model"],
    methods:{
        /**
         * 初始化模式
         */
        init:function () {

        }
    }
}