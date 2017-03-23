<template>
    <remote-action v-if="action" :url="action.url">
        <!-- 包裹浮层-->
        <popover :data="data" :popover="popoverText">
            <span class="action-text" :class="styleClass">
                <!-- 新页类-->
                <a v-if="action.page" href="javascript:;"  @click.prevent="openNewFrame(action.page, data)">
                    <slot>{{{ action.text }}}</slot>
                </a>
                <!-- 事件类-->
                <a v-if="action.event" href="javascript:;" @click.prevent="triggerEvent(action.event, data)">
                    <slot>{{{ action.text }}}</slot>
                </a>
                <!-- 只显示文字的-->
                <slot v-if="!action.event && !action.page">{{{ action.text }}}</slot>
            </span>
        </popover>
    </remote-action>
    <span v-if="!action">
        <slot>{{{ action.text }}}</slot>
    </span>
</template>
<script>
    import remoteAction from './remote-action.vue';
    import popover from "./action-pop.vue";
    export default{
        data(){
            return {
                uuid: Thu.fn.createUuid("_other_"),
                type: Thu.ComponentType.SEARCH_CELL_TEXT,
                popoverText: "",
            }
        },
        props: {
            data: {},          // 整条记录
            action: null,         // 动作的配置{page|event|router:"",only:"",text:"",url:'',style:''}
            fresh: {
                type: String, default(){
                    return "2"
                }
            } // 跳新页刷新方式  "1" 强刷;"2" 刷新数据;其他，选中
        },
        components: {
            remoteAction, popover
        },
        created(){
            this.setPop();
        },
        computed: {
            /**
             * 设置是否显隐
             */
            disabled(){
                if ( this.action && typeof this.action.only == "undefined" ) {
                    return false
                }
                if ( this.action && typeof this.action.only == "function" ) {
                    return ! this.action.only(this.data);
                }
            },
            /**
             * 设置样式
             * @returns {{}}
             */
            styleOption(){
                var styleOption = {};

                styleOption.color = '';
                styleOption.size = '';

                if ( this.action && typeof this.action.style == "function" ) {
                    styleOption = this.action.style(this.data);
                } else if ( this.action && typeof this.action.style == "object" && ! Thu.fn.isArray(this.action.style) ) {
                    styleOption = this.action.style;
                }

                return styleOption;
            },
            /**
             * 这是样式的输出
             * @returns
             */
            styleClass(){
                return {
                    'red': this.styleOption.color == 'red',
                    'yellow': this.styleOption.color == 'yellow',
                    'blue': this.styleOption.color == 'blue',
                    'deep-blue': this.styleOption.color == 'deep-blue',
                    'green': this.styleOption.color == 'green',
                    'mini': this.styleOption.size == 'mini',
                    'small': this.styleOption.size == 'small',
                    'middle': this.styleOption.size == 'middle',
                    'large': this.styleOption.size == 'large',
                    'disabled': this.disabled
                }
            }
        },
        methods: {
            setPop: function () {
                this.popoverText = (this.action && this.action.popover ) ? this.action.popover : this.popoverText;
            },
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
            openNewFrame(page, data){
                if ( this.disabled ) {
                    return
                }
                return Thu.fn.openNewFrame(page, data, this.fresh)
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../style-less/variables-mixins";

    .action-text {
        padding: 0 3px;
        display: inline-block;
        .default-style-mixin();
        .action-text-default {
            color: #000000;
        }
    }
</style>
