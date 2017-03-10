<template>
    <div>
        <ueditor :data="ue" ref="u1"></ueditor>
        <ueditor :data="ue" ref="u2"></ueditor>
        <ueditor :data="ue" ref="u3"></ueditor>
        <ueditor :data="ue" ref="u4"></ueditor>
        <ueditor :data="ue" ref="u1"></ueditor>
    </div>
</template>
<script>
    import ueditor from "../../src/components/form/ueditor.vue";
    export default{
        data(){
            return {
                ue:{
                    template:"SUBMIT_DATA",
                    name:"editor",
                    value:"123",
                }
            }
        },
        components: {
            ueditor
        }
    }
</script>
