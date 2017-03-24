<template>
    <remote-action :url="api">
        <!-- 包裹浮层-->
        <popover :data="data" :popover="pop">
            <span class="action-text" :class="styleClass">
                <!-- 新页类-->
                <a v-if="click.type =='route' " href="javascript:;"  @click.prevent="response(data)">
                    <slot>{{{ text }}}</slot>
                </a>
                <!-- 事件类-->
                <a v-if="click.type =='event' " href="javascript:;"  @click.prevent="response(data)">
                    <slot>{{{ text }}}</slot>
                </a>
                <a v-if="click.type =='method' " href="javascript:;" @click.prevent="response(data)">
                    <slot>{{{ text }}}</slot>
                </a>
                <!-- 只显示文字的-->
                <slot v-else>{{{ text }}}</slot>
            </span>
        </popover>
    </remote-action>
</template>
<script>
    import remoteAction from './remote-action.vue';
    import popover from "./action-pop.vue";

    import actionSingle from "./action-single";
    export default{
       mixins:[actionSingle]
    }
</script>
