<template>
    <slot v-if="show"></slot>
</template>
<script>
export default {
    data () {
        return {
            uuid : Thu.fn.createUuid("RA"),
            type : Thu.ComponentType.REMOTE_ACTION_BUTTON,
            show : false
        }
    },
    props: {
        url : ""          // 远程请求uri地址,eq: /captcha/image
    },
    created:function () {
        // 判断 this.uri是否在我的权限列表中
        this.show = Thu.fn.haveRight(this.url);
    }
}
</script>
