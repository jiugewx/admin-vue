# 这是一个后台框架
## 技术栈：vue2.0 + vue-router2.0 + webpack2.0

## version:1.0.0

## 一、目录
### src:编译的资源文件
```
assets: 资源文件（如图片）
components:组件库
style:样式库
utils:工具库
view-template:视图层的模板
```
### dist:代码发布库
### admin:
```
entry: 入口
views: 视图
```
### static: 静态资源引用库
### config: 脚手架配置
### test:   单元测试

## 二、组件：

### 高度抽象几个类

#### 1、列表类
```
searchbox                                搜索框
table：{                                 表格
    header:                                 表头
    cell:                                   表格
}
pagerNation                              页码条
```
### 2、提交信息类

#### 1、group 表单群
```
append(components,index)                    追加组件（组件的配置，组件的位置）
removeByName(name)                          删除组件（字段名称）
removeByIndex(index)                        删除组件（组件的位置）
showModule(name)                            显隐组件
hideModule(name)
replaceByIndex(index)                       替换组件
replaceByName(name)
getChildIndex(name)                         获取子组件的位置
getChild(name)                              获取某个子组件
```                  


### 1、所有的组件都需要有以下方法
```
getInstance                     获取组件实例 （）

getUuid,setUuid,                uuid设置 （uuid)

getValue,setValue,              value

getName,setName,                name

getMessage,setMessage,          message

getValidate                     validate

getData                         获取提交数据

getMessageData                  获取错误消息

reset                           重置
```
### 2、都必须包含以下属性：(组件必须要有唯一uuid)
```
initValue,                      初始值
uuid,                           组件uuid
value,                          字段值
name,                           字段名
message,                        错误消息
isValidate                      验证结果
template                        模板
```

### 3、特殊组件
```
select,radio,checkbox必须包含以下方法：
getOptions,setOptions
特殊属性
options
```

### 4、外挂属性
```
config作为Ueditor、laydate、baiduMap组件的属性
外挂组件的资源文件需要作为动态引入,使用script标签动态创建，采用Promise再进行链式调用
```
### 5、显示组件（只做显示的组件）
```
必须包含的方法：
replace(value,data,allData)

popover(data)
action[{text:"",page/event/pop}]

```
### 6、弹窗
```
screen-modal                    全屏弹窗        zindex == 1000
modal                           普通弹窗        zindex == 1100
confirm                         确认弹窗        zindex == 1200
alert                           警告弹窗        zindex == 1300
```
### 7、状态组件
```
loading                         加载条          zindex == 1400
message                         浮层            zindex == 1500
```
### 8、按钮
button                          按钮


## 三、必须要有一个全局方法库 utils
```
Ajax,               支持Promise
log,                日志
fn,                 工具
props,              属性
FormObject,         表单类
MessageObject,      消息类
Validator,          验证类
PromiseObject,         Promise
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
