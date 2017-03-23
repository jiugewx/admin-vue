/**
 * Created by wangxin on 2017/3/21.
 */

/**
 * 这是一个纯search-view，不包含search-tabs。search-tabs的功能在其他地方。
 */
export default {
    data(){
        return {
            url: "",
            p: 1,
            pn: 20,
            orderby: "",
            asc: "",
            defaultP: "",
            defaultPn: "",
            defaultOrderby: "",
            defaultAsc: "",
        }
    },
    methods: {
        init: function () {
            this.searchView = this.search;
            this.headersView = this.headers;
            this.url = this.search.url;
            this.defaultP = this.p = this.search.p || this.p; // 初始化页码
            this.defaultPn = this.pn = this.search.pn || this.pn; // 初始化页码
            this.defaultOrderby = this.orderby = this.search.orderby || this.orderby;
            this.defaultAsc = this.asc = this.search.asc || this.asc;
        },

        // 解析url => {api:接口，DataObject:DataObject()}
        parseUrl: function (_url) {
            var api = _url;
            var conditions = new Thu.DataObject();

            function getQuery(array) {
                var dataObject = new Thu.DataObject();
                for (var i = 0; i < array.length; i ++) {
                    if ( array[i].split("=") != - 1 ) {
                        var name = array[i].split("=")[0];
                        var value = array[i].split("=")[1];
                        dataObject.append(name, value);
                    }
                }
                return dataObject
            }

            if ( _url.indexOf("?") != - 1 ) {
                api = _url.split("?")[0];
                var queryString = _url.split("?")[1];
                var array = [];
                if ( queryString.indexOf("&") != - 1 ) {
                    array = queryString.split("&");
                } else {
                    array.push(queryString);
                }
                conditions.extends(getQuery(array))
            }

            return {
                api: api,
                data: conditions
            }
        },
        // 对外的一致接口，可改写
        getData: function () {
            return this.getBaseData();
        },

        // 获取基础组件的条件
        getBaseData: function () {
            var condition = new Thu.DataObject();
            var conditionBox = this.$refs.searchBox.getData();
            var conditionFilter = this.$refs.resultTable.getData();
            condition.extends(conditionBox);
            condition.extends(conditionFilter);

            condition.append('sort', this.orderby);
            condition.append('asc', this.asc);
            condition.append('p', this.p);
            condition.append('pn', this.pn);

            return condition
        },
        searchAction: function () {
            var condition = this.getData();
            var parseData = this.parseUrl(this.url);
            var url = parseData.api;
            condition.extends(parseData.data);

            var query = condition.toQuery(true);

            if ( query.length ) {
                url += "?" + query;
            }

            Thu.log("[search-base]search:" + url);
            var that = this;
            Thu.Ajax.post(parseData.api, condition.toBody(), function (data) {
                that.$dispatch(Thu.Event.SEARCH_SUCCESS, data);
                that.$refs.resultTable.refresh(data);
            }, function (errcode, errmsg) {
                that.$dispatch(Thu.Event.SEARCH_FAILED, errcode, errmsg);
                that.$dispatch(Thu.Event.SHOW_TIPMESSAGE, errmsg);
            });
        },
        // 以现有条件刷新（p恢复默认、pn保留）
        refresh: function () {
            this.resetPager();
            this.searchAction();
        },
        // 点击刷新
        clickSearch: function () {
            this.resetPager();//重置掉pager
            this.searchAction();
        },
        // 排序刷新
        sortSearch: function (orderby, asc) {
            this.orderby = orderby;
            this.asc = asc;
            this.p = 1;
            this.searchAction();
        },
        // 过滤刷新
        filterSearch: function () {
            this.filterCondition = this.getTableCondition();
            this.p = 1;
            this.searchAction();
        },
        // 页码搜索
        pageSearch: function (p, pn) {
            this.p = p;
            this.pn = pn;
            this.searchAction();
        },
        // 获取表格的条件
        getTableCondition: function () {
            return this.$refs.resultTable.getData();
        },
        // 清空所有的条件
        clear: function () {
            this.resetBox();
            this.resetPager();
            this.resetFilter();
            this.resetOrder();
        },
        // 重置筛选
        resetFilter: function () {
            this.$refs.resultTable.reset();
        },
        // 重置页码
        resetPager: function () {
            this.p = this.defaultP;
            this.pn = this.defaultPn;
            Thu.log("resetPager:p =" + this.p + " pn" + this.pn);
            this.$refs.resultTable.resetPager(this.p, this.pn);
        },
        // 重置条件框
        resetBox: function (data) {
            this.$refs.searchBox.reset(data);
        },
        // 重置排序
        resetOrder: function () {
            this.orderby = this.defaultOrderby;
            this.asc = this.defaultAsc;
        },
        resetSearch: function (data) {
            this.$refs.searchBox.reset(data);
        }
    }
}