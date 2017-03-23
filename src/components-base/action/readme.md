## 这里存放的是一些用于跳转，操作的字段。

`remote-action`         只用于权限管理，如果传进来的url在用户权限里，那就显示整个组件
`action-pop`            浮框提示信息（一般鼠标经过）
`action-text`           跳转类的文字     
`action-button`         跳转类的button

## 引用示例：

```
// data是传入的数据,通过组件的props传入
action:{
    text:"显示文字",
    popover:@Srting|@Function(data),    // 浮层显示文案
    page:{
        text:@Srting|@Function(data)    // tab标签的名称
        hash:""                         // 跳转的地址（建立跟Iframe关联）
    },
    event:"DISPATCH_EVENT"              // 派发的事件名称,
    only:@Boolen|@Function(data),       // 依据条件显示本组件
}
```

## 用处：
### 1、 列表页，每条信息的操作项
### 2、 详情里面的额外说明
