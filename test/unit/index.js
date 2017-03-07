// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind');

// 测试所有的用例，以.spec文件为标示
// const testsContext = require.context('./temp-specs', true, /\.spec$/);
// testsContext.keys().forEach(testsContext);

// 基础submit组件
// const dataComponents = require.context('../../admin/components_new/data', true, /\.spec$/);
// dataComponents.keys().forEach(dataComponents);

// 统计组件
// const countComponents = require.context('../../admin/components_new/count', true, /\.spec$/);
// countComponents.keys().forEach(countComponents);

// 面包屑组件
// const breadComponents = require.context('../../admin/components_new/breadcrumb', true, /\.spec$/);
// breadComponents.keys().forEach(breadComponents);

// activity-manage活动管理
// const activityManager = require.context('../../admin/views_new/o2o/marketing/activity', true, /\.spec$/);
// activityManager.keys().forEach(activityManager);


// incentive-manage奖惩管理
// const incentiveComponents = require.context('../../admin/views_new/o2o/incentive/manage', true, /\.spec$/);
// incentiveComponents.keys().forEach(incentiveComponents);

// 测试 所有的src中的文件 覆盖率，除了main.js
// const srcContext = require.context('../../help-center/help-teacher', true, /^\.\/(?!main(\.js)?$)/);
// srcContext.keys().forEach(srcContext);
