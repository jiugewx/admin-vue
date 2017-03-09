<template>
    <div id="{{uuid}}" class="ueditor"></div>
</template>
<script>
    export default{
        name: "ueditor-base",
        props: {
            data: {type: Object, default: {}}
        },
        data () {
            return {
                uuid: Thu.fn.createUuid("UE"),
                name: '',
                value: '',
                readyFlag: false,  //本组件ready的标志
                resetData: false,  //外部使用时的reset 传入的data
                config: {
                    initialFrameWidth: 850,
                    initialFrameHeight: 300,
                    autoHeightEnabled: false,
                    initialContent: "",
                    autoClearinitialContent: true,
                    focus: false
                }
            }
        },
        created(){
            this.init();
            var options = {};
            options.config = this.config;
            options.value = this.value;
            this._createUE(options);
        },
        methods: {
            // 动态插入这个组件的资源引用（包括js和css)
            _createScript: function (srcName) {
                var doc = window.document;
                var docEl = doc.documentElement;
                var scriptEl = doc.createElement("script");
                scriptEl.setAttribute("type", "text/javascript");
                scriptEl.setAttribute("src", srcName);
                if ( docEl.firstElementChild ) {
                    docEl.firstElementChild.appendChild(scriptEl);
                } else {
                    var wrap = doc.createElement('div');
                    wrap.appendChild(scriptEl);
                    doc.write(wrap.innerHTML);
                }
            },
            _createUE(options){
                var config = options.config;
                var defaultValue = options.value;
                var ue = UE.getEditor(this.uuid, config);
            },

            init(){
                if ( this.data.config ) {
                    this.config = {
                        initialFrameWidth: this.data.config.width || 850,           //初始化编辑器宽度,默认1000
                        initialFrameHeight: this.data.config.height || 300,         //初始化编辑器高度,默认320
                        initialContent: "",
                        autoHeightEnabled: false,
                        autoClearinitialContent: true,
                        focus: false
                    }
                }

                this.name = this.data.name || '';
                this.value = this.data.value || "";
            },
            validate: function () {
                this.message = "";

                var value = this.getValue();
                // if ( UE.getEditor(this.uuid).getContentTxt().trim() == "" && (""+value).toLowerCase().indexOf("<img") === -1){
                if ( UE.getEditor(this.uuid).getContentTxt().trim() == "" && ! this.useableHtml(value) ) {
                    value = "";
                }

                if ( ! this.data.validators ) {
                    return true;
                }

                for (var i = 0; i < this.data.validators.length; i ++) {
                    if ( ! this.data.validators[i].validate(value) ) {
                        this.message = this.data.validators[i].getMessage();
                        return false;
                    }
                }

                if ( value.indexOf("/libs/Ueditor/themes/default/images/spacer.gif") !== - 1 ) {
                    this.message = '图片正在上传，请稍后再试';
                    return false
                }

                return true;
            },
            useableHtml: function (html) {
                var string = ("" + html).toLowerCase();
                // 包含img
                if ( string.indexOf("<img") !== - 1 ) {
                    return true
                }

                // canvas
                if ( string.indexOf("<canvas") !== - 1 ) {
                    return true
                }

                // svg
                if ( string.indexOf("<svg") !== - 1 ) {
                    return true
                }

                return false

            },
            reset(data){
                var resetValue = '';
                var ue = UE.getEditor(this.uuid);
                if ( Thu.fn.isObject(data) ) {

                    // 设置一个等待,直到本组件ready后才进行reset(data)
                    this.resetData = data;
                    if ( this.readyFlag == false ) {
                        return
                    }
                    resetValue = data[this.name] || "";
                }

                ue.setContent(resetValue);
            },
            getValue(){
                this.value = UE.getEditor(this.uuid).getAllHtml();
                return this.value;
            },
            // [必须]获取组件查询条件的方法
            getData: function () {
                var value = this.getValue();
                // 数据校验
                if ( true !== this.validate() ) {
                    return false;
                }

                return new Thu.DataObject(this.name, value);
            },
            /*改变dom结构的挂载，避免ueditor的bug*/
            _setDom: function () {
                var ueditorArr = document.getElementsByClassName("ueditor");
                var edui = document.getElementsByClassName("edui-editor  edui-default");
                var ueditor = document.getElementById(this.uuid);
                if ( edui.length ) {
                    for (var i in ueditorArr) {
                        if ( edui[i] && ueditorArr[i] ) {
                            ueditorArr[i].appendChild && ueditorArr[i].appendChild(edui[i])
                        }
                    }
                }
            }
        },
        ready(){
            var self = this;
            this.$nextTick(function () {
                /*改变dom结构的挂载，避免ueditor的bug*/
                self._setDom();

            });

            var ue = UE.getEditor(this.uuid);
            ue.addListener("ready", function () {
                self.$dispatch("UEDITOR_READY", this.name);
                self.readyFlag = true;
                self.reset(self.resetData)
            });
        },
        beforeDestroy(){
            var ue = UE.getEditor(this.uuid);
            ue.destroy();// 销毁
        },
    }
</script>
<style>
    .ueditor {
        display: inline-block;
        border: 1px solid #dedede;
        border-radius: 5px;
        background-color: white;
    }
</style>
