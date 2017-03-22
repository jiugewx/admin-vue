<template>
    <div id='{{uuid}}' class="detail-label">
        <!--这里是主要的标题-->
        <span class="detail-label-main"><slot>{{{title}}}</slot></span>
        <!--这里是状态显示-->
        <span v-for="item in details" style="display:inline-block">
            <!--这里是追加的状态栏-->
            <title-text :data="item" :results="results" v-if='results && results[item.name]'></title-text>
        </span>
        <!--这里是title的action，可以使用actions（@Array）属性进行定制-->
        <span v-for="action in data.actions" class="detail-actions-item">
            <action-text :action="action" :data="results"></action-text>
        </span>
        <span class="detail-label-main pull-right"><slot name="detail-title-left"></slot></span>
    </div>
</template>
<script>
    import titleText from "./cell/title-cell.vue";
    import actionText from "../action/action-text.vue";

    export default{
        data(){
            return {
                uuid: Thu.fn.createUuid("DT"),
                title: '',
                details: []
            }
        },
        props: ["model"],
        created(){
            this.init();
        },
        methods: {
            init(){
                this.title = this.data.title || "";
                this.details = this.data.components;
            }
        },
        components: {
            actionText,
            titleText,
        }
    }
</script>
