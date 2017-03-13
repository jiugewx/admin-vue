/**
 * Created by wangxin on 2017/3/7.
 */

import App from "../../entry/entry-base";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.config.productionTip = false;
Vue.use(VueRouter);


var router = new VueRouter({
    routes: [
        // 这里仅限于链接page1下的组件
        // {
        //     path:"/first",
        //     components:""
        // }
    ]
});

new Vue({
    el: '#admin_app',
    router: router,
    template: '<App/>',
    components: {App}
});
