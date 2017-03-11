<template>
    <div>
        这是编辑页
        <uedtior :data="ue"></uedtior>
        <uedtior :data="ue"></uedtior>
        <uedtior :data="ue"></uedtior>
        <uedtior :data="ue"></uedtior>
    </div>
</template>
<script>
    import uedtior from "../../../src/components/form/ueditor.vue";
    export default{
        data(){
            return {
                ue: {
                    template: "SUBMIT_DATA",
                    name: "uuid",
                    value: "123"
                }
            }
        },
        components: {
            uedtior
        }
    }
</script>
