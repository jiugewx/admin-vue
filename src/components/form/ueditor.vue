<template>
    <!--这里是提交模版-->
    <div class="wrapper_edit" v-if="data.template == 'SUBMIT_DATA'" :id="uuid">
        <span class="wrapper_content_start" v-if="data.require">*</span>
        <span class="wrapper_content_title" v-if="data.label">{{data.label}}</span>
         <span class="ueditor_wrapper">
            <ueditor-base :data="data" ref="ueditor-base"></ueditor-base>
        </span>
        <span v-show="message" class="wrapper_errbox">{{ message }}</span>
    </div>
</template>
<script>
    import ueditorBase from '../base/ueditor-base.vue';
    import rootFormBase from '../base/root-form-base.mixin';

    export default{
        data () {
            return {
                uuid: wx.fn.createUuid("UE"),
                name: "",
                value: [],
                defaultValue: [],
                options: [],
                checkedAll: ""
            }
        },
        methods: {
            validate: function () {
                this.message = "";

                if (!this.$refs.ueditorBase.validate()) {
                    this.message = this.$refs.ueditorBase.getMessage();
                    return false;
                }

                return true;
            },

            getData: function () {
                var ueditorData = this.$refs.ueditorBase.getData();
                // 数据校验
                if (!this.validate()) {
                    return false;
                }

                // 必须返回wx.DataObject的对象,可以是一个条件,也可以是组合条件
                var condition = new wx.DataObject();
                condition.extends(ueditorData);

                return condition;
            },

            reset(data){
                for (var i = 0;i<this.$children.length;i++) {
                    this.$children[i].reset(data);
                }
            }
        },
        components: {
            ueditorBase
        },
        mixins:[rootFormBase]
    }
</script>
