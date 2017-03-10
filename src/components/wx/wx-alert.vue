<template>
    <wx-modal :show.sync="showModal" :header='header' :cancel='false'>
        <div class="wx-alert-body">
            <slot>{{{msg}}}</slot>
        </div>
        <span slot="footer">
             <wx-button @click.stop="_ok" color="blue">{{button}}</wx-button>
        </span>
    </wx-modal>
</template>
<script>
    /**
     * 本组件对外暴露的方法为 show(msg)，调用例子如下
     *
     *      var msg = "删除时将会删除该课本下的章节信息，确定删除吗?";
     *      var self = this;
     *      this.$refs.alert.show(msg)
     *
     */
    import wxModal from "./wx-modal.vue";
    import wxButton from "./wx-button.vue";

    export default {
        components: {
            wxModal, wxButton
        },
        props: {
            button: {
                type: String,
                default: '确定'
            },
            header:{
                type: String,
                default: '提示'
            }
        },
        data(){
            return {
                showModal: false,
                msg:""
            }
        },
        created(){
            this._init();
        },
        methods: {
            show(msg){
                this.msg = msg;
                this.showModal = true;
            },

            _init(){
                this.msg = "";
            },

            _ok(){
                this.showModal = false;
                return true;
            }
        },
        events: {
            MODAL_CANCEL(){
                this._ok();
            }
        }
    }
</script>
