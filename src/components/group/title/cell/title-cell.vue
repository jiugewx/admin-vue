<template>
    <span v-if='data.type != "danger"' class="detail-label-items" :class="styleClass">
        {{{replaceText}}}
    </span>
     <span v-if='data.type == "danger" && replaceText != "0" ' class="detail-label-items" :class="{
            'danger':    data.type == 'danger',
     }"></span>
</template>
<script>
    import mixins from "../../mixins/style-class-mixins";
    export default{
        props: {
            results: {type: Object},
            data: {type: Object,default(){
                return {
                    name:'' //涉及到Computed,所以要预先设置这个属性
                }
            }}
        },
        computed: {
            replaceText: function () {
                if(this.results && this.results[this.data.name]){
                    var value =  this.results[this.data.name];
                    var replaceText = value;
                    if ( typeof this.data.replace == "function" ) {
                        replaceText = this.data.replace(value, this.results);
                    } else {
                        var replace = this.results["" + this.data.replace];
                        replaceText = (typeof replace == "undefined") ? value : replace;
                    }

                    return replaceText;
                }
            }
        },
        mixins:[mixins]
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../../style-less/variables-mixins";
    .detail-label-items{
        display: inline-block;
        padding-right: 10px;
        font-size: 14px;
        .default-style-mixin();
        &.danger {
            color:red;
        }
    }
</style>
