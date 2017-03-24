# 这是一个后台框架
## 技术栈：vue2.0 + vue-router2.0 + webpack2.0

## version:1.0.0

## 一、目录

```
src:编译的资源文件
    assets: 资源文件（如图片）
    components:组件库
    style:样式库
    utils:工具库
    view-template:视图层的模板

dist: 代码发布库

admin: 业务代码
    entry: 入口
    views: 视图

static: 静态资源引用库
    libs:第三方库
    font:第三方文字

config:脚手架配置(配置有三个环境：production\developmeng\test\testing

test:单元测试
```

## 二、组件：

### 级别
```
                   视图层 view-components [search-view、detail-view、submit-view、dialog-view、screen-dialog-view]
                                                         ^
    组合层 group-components [header、search-box、search-table、search-tabs、title、submit-group(业务相关高)、detail-group(业务相关高)]
                                         ^                                       ^
   业务组件层 custom-components [因业务需要定制的组件 submit 、 detail] <= base-components [公用基础组件 submit、button、action、detail、modal]
```

高度抽象几个类

### 1、列表类         search
```
search-view：

model = {
    search:{                            [必须]
        url:"",                         // 请求地址
        orderby:"",                     // 默认排序的
        asc:"",                         // 排序方向
        p:"",                           // 默认页码
        pn:"",                          // 默认每页数
    },
    conditions:[                        [非必须]
        conditionModel1,
        conditionModel2,
        ...
    ]
    headers:[                           [非必须]
        headerModel1,
        headerModel2,
        ...
    ],
    pager:{
        options:[],                      // 每页条数选项卡
        actions:[                        // 涉及到一些操作

        ]
    }
}


```
### 2、提交信息类     submit(create、update)

#### 1、form_group 表单群
```
getInstance                                 // 获取本组件实例
append(components,index)                    追加组件（组件的配置，组件的位置）
getChild(name)                              获取某个子组件
getData()                                   // 获取所有提交组件的值
reset()                                     // 重置
load(data)                                  // 带入数据

```                  


#### 2、form_single 单个表单
```
方法：
getInstance                     获取组件实例 （）
getUuid,setUuid,                uuid设置 （uuid)
getValue,setValue,              value
getName,setName,                name
getMessage,setMessage,          message
getValidate                     validate
getData                         获取提交数据
getMessageData                  获取错误消息
reset                           重置

属性：
initValue,                      初始值
uuid,                           组件uuid
value,                          字段值
name,                           字段名
message,                        错误消息
isValidate                      验证结果
template                        模板
```

#### 3、特殊表单
```
select,radio,checkbox必须包含以下方法：

getOptions,setOptions

特殊属性
options
```

#### 4、第三方插件
```
config作为Ueditor、laydate、baiduMap组件的属性

外挂组件的资源文件需要作为动态引入,使用script标签动态创建，采用Promise再进行链式调用

必须包含方法
getData()
reset()
load(data)
```
### 3、详情类               detail
```
model={
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
}
```
### 4、操作类
```
 本model  本质是一个wrapper
 var model = {
    text: @String/@Html,                    // [必须]操作的文字
    api: @String || "",                     // [非必须，默认""]权限管理
    pop:{                                   // [非必须，无默认]浮层内容
            trigger:"mouseenter",           // 触发时机 [默认enter]
            placement:"",                   // 显示位置
            content:"",                     // 显示内容
        }
    response: @Function,                    // [非必须，无默认]执行方法 click
    route: @Object,                         // [非必须，无默认]跳转页面 click

    style: @Object/{                        // [非必须，有默认] 样式 （对象的配置）
            color:@String,                  // [非必须，有默认]
            size:@String                    // [非必须，有默认]
        }
    style: @Function                        // [非必须，有默认]
    disabled:@Boolean/@Function             // [非必须，默认false]是否可用 置灰不可用
};
```

### 5、弹窗
```
screen-modal                    全屏弹窗        zindex == 1000
modal                           普通弹窗        zindex == 1100
confirm                         确认弹窗        zindex == 1200
alert                           警告弹窗        zindex == 1300
```
### 6、状态组件
```
loading                         加载条          zindex == 1400
message                         浮层            zindex == 1500
```
### 7、按钮
button                          按钮
```
var button = {
    color:"blue",
    text:""
}

可以通过slot挂不同的text
color可以通过props定义
```

### 8、栏目title
title                           标题
```
var model={
      text:@String,                                        // 本字段显示
      style:@Object,                                       // 样式
      action:@Object,                                      // 本字段的操作
      actions:[action1,action2]                            // 后续的操作字段
  }
```

## 三、必须要有一个全局方法库 utils
```
Ajax,               支持Promise
log,                日志
fn,                 工具
props,              属性
FormObject,         表单类
MessageObject,      消息类
Validator,          验证类
PromiseObject,      Promise
EventObject,        事件对象
```
## 四、组装为Iframe技术框架  [满足产品需求，可能存在多个独立页面之间的联动显示]
```
1、必须有父子frame通讯方法
2、必须有子组件之间的通讯方式
3、每个子组件要有一个独立的标识。
```
## 五、主题theme
```
采用js控制primary、secondary的颜色设置
```
