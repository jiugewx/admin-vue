/**
 * Created by wangxin on 2017/3/7.
 */

import App from "../../entry/App.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);


var router = new VueRouter({
    routes: []
});


new Vue({
    el: '#admin_app',
    router: router,
    template: '<App/>',
    components: {App}
});
