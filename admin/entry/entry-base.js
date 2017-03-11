/**
 * Created by xinye on 2017/3/11.
 */

// 处理资源文件的加载，以及基础组件的加载；（这是一个面向切面的过程）
import "../../src/style/style.less";
import "../../src/utils/index";
import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
// import wx from ""  实例化基础组件

Vue.use(VueRouter);

Vue.config.productionTip = false;

function start(routerMap) {
    var router = new VueRouter({
        routes: routerMap
    });


    new Vue({
        el: '#admin_app',
        router: router,
        template: '<App/>',
        components: {App}
    });
}

export default {
    start : start,
}