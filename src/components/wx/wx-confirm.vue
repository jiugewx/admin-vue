<template>
    <wx-modal :show.sync="show" :header='header'>
        <div class="wx-confirm-body">
            <slot>{{{message}}}</slot>
        </div>
        <span slot="footer">
             <wx-button @click.stop="_ok" color="blue">确定</wx-button>
        </span>
    </wx-modal>
</template>
<script>
    /**
     * 本组件对外暴露的方法为doConfirm(message,callback)，调用例子如下
     *
     *      var message = "删除时将会删除该课本下的章节信息，确定删除吗?";
     *      var self = this;
     *      this.$refs.confirm.doConfirm(message, function () {
     *              self._textbook_remove(data)
     *          })
     *
     */
    import wxModal from "./wx-modal.vue"
    import wxButton from "./wx-button.vue"
    export default {
        components: {
            wxModal, wxButton
        },
        data(){
            return {
                header:"提示",
                show: false,
                message: "",
                success: '',
                fail: ''
            }
        },
        created(){
            this._init();
        },
        methods: {
            doConfirm(options, success, fail){
                function isArray(val) {
                    return Object.prototype.toString.call(val) === '[object Array]';
                }

                function isObject(val) {
                    return !isArray(val) && (typeof val == "object");
                }

                this._init();
                this.show = true;
                this.success = success || '';
                this.fail = fail || '';
                if(isObject(options)){
                    this.message = options.massage || "";
                    this.header = options.header || this.header;
                }else{
                    this.message = options;
                }
            },

            _init(){
                this.message = "";
                this.success = '';
                this.fail = '';
            },

            _ok(){
                this.show = false;
                this.success && this.success();
                return true;
            },

            _cancel(){
                this.fail && this.fail();
            }
        },
        events: {
            MODAL_CANCEL(){
                this._cancel();
            }
        }
    }
</script>
