var options = {
        // 配置每个页面的来源与模块依赖
        pages: [
            /*page1*/
            {
                from: "./admin/entry/common-index",
                to: "home/page1.html",
                required: ['admin/page1']
            },
            /*page2*/
            {
                from: "./admin/entry/common-index",
                to: "home/page2.html",
                required: ['admin/page2']
            }
        ],
        entry: {
            // 这里主要是配置js/css
            'admin/page1': "./admin/views/page1/main.js",
            'admin/page2': "./admin/views/page2/main.js",
        }
    };

module.exports = options;
