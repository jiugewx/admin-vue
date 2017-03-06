#这是一个后台框架  
技术栈：vue2.0 + vue-router2.0 + webpack2.0
version:1.0.0

一、目录
components:组件库
dist:代码发布库
entry:app 入口
images：图片
style:样式
test:测试
view:视图层
webpack:打包工具

一、组件：
1、所有的组件都需要有以下方法
getUuid,setUuid,                uuid设置
getValue,setValue,              value
getName,setName,                name
getMessage,setMessage,          message
getValidate                     validate


getData                         获取提交数据
getMessageData                  获取错误消息
reset                           重置


2、都必须包含以下属性：(组件必须要有唯一uuid)
initValue,                      初始值
uuid,                           组件uuid
value,                          字段值
name,                           字段名
message,                        错误消息
isValidate                      验证结果
template                        模板


3、特殊组件
select,radio,checkbox必须包含以下方法：
getOptions,setOptions
特殊属性
options

4、外挂属性
config作为Ueditor、laydate、baiduMap组件的属性

5、显示组件（只做显示的组件）
必须包含的方法：
replace(value,data,allData)

popover(data)
action[{text:"",page/event/pop}]

6、弹窗
screen-modal                    全屏弹窗        zindex == 1000
modal                           普通弹窗        zindex == 1100
confirm                         确认弹窗        zindex == 1200
alert                           警告弹窗        zindex == 1300

7、状态组件
loading                         加载条          zindex == 1400
message                         浮层            zindex == 1500

8、按钮
button                          按钮


二、必须要有一个全局方法库
Ajax,log,fn,props,Object(SubmitObject,MessageObject,Validator,TaskObject)

三、组装为Iframe技术框架
1、必须有父子frame通讯方法
2、必须有子组件之间的通讯方式
3、每个子组件要有一个独立的标识。

四、主题theme

采用js控制primary、secondary的颜色设置