<template>
    <!--这个是所有frame页面的入口-->
    <div class="gray-bk hide-scroll auto-minWidth">
        <router-view></router-view><!--这是全局的路由-->
        <!--加载状态提示-->
        <!--<wx-loading v-ref:loading></wx-loading>-->
        <!--&lt;!&ndash; 消息浮层 &ndash;&gt;-->
        <!--<wx-message v-ref:msg></wx-message>-->
    </div>
</template>
<script>
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
n