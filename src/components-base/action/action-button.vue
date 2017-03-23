<template>
    <remote-action v-if="action" :url="action.url">
         <span v-if="!disabled" class="action-button">
                <wx-button v-if="action.page"  :color="action.color || 'green'"
                        @click.stop="openNewFrame(action.page,data)"><slot>{{{ action.text }}}</slot></wx-button>
                <wx-button v-if="action.event"  :color="action.color || 'blue'"
                        @click.stop="triggerEvent(action.event,data)"><slot>{{{ action.text }}}</slot></wx-button>
        </span>
    </remote-action>
    <!-- 正常显示-->
     <wx-button v-if="!action" :color="action.color || 'blue'"><slot>{{{ action.text }}}</slot></wx-button>
</template>
<script>
    import remoteAction from './remote-action.vue';
    export default{
        data(){
            return {
                uuid: Thu.fn.createUuid("_other_"),
                type: Thu.ComponentType.SEARCH_CELL_TEXT
            }
        },
        props: {
            data: {},          // 整条记录
            action: null         // 动作
        },
        components: {
            remoteAction
        },
        computed: {
            disabled(){
                if ( typeof this.action.only == "undefined" ) {
                    return false
                }
                if ( typeof this.action.only == "function" ) {
                    return ! this.action.only(this.data);
                }
            }
        },
        methods: {
            routerTo: function (router, data) {
                if ( this.disabled ) {
                    return
                }

                var myHash = router;
                if ( data ) {
                    myHash = Thu.Filter.parseUrl(router, data);                                     // 解析Hash
                }
                return window.location.hash = myHash;
            },
            triggerEvent: function (event, data) {
                if ( this.disabled ) {
                    return
                }
                return this.$dispatch(event, data);
            },
            openNewFrame: function (page, data) {
                if ( this.disabled ) {
                    return
                }
                return Thu.fn.openNewFrame(page, data)
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .action-button {
        display: inline-block;
        margin: 5px 10px;
        margin-right: 10px;
        .wx-button {
            height: 30px;
            line-height: 16px;
            min-width: 80px;
        }
    }
</style>
