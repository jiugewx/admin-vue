/**
 * Created by wangxin on 2017/3/7.
 */

import "../../../src/style/style.less";
import "../../../src/utils/index";
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from "../../entry/App.vue";

Vue.use(VueRouter);
var router = new VueRouter({
    routes: []
});
console.log(router);


Vue.config.productionTip = false;
console.log("page1.start!");
console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);

new Vue({
    el: '#admin_app',
    router,
    template: '<App/>',
    components: { App }
});


// router.start(Vue.extend(App), '#admin_app');