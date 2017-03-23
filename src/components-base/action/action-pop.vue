<template>
    <span v-if='popover' @mouseover="_popoverShow($event)" @mouseout="_popoverHide($event)" class="popover_control" style="height:100%;">
        <!-- 泡泡内容 -->
        <span v-show="popoverStatus" class="popover_item">
            <div v-if="placeMent=='top'" style="margin-left:45%;display: flex">
                <div class="popover_top">
                    <!-- <span class="arrow_up"></span> -->
                    <span class="arrow_up_bg"></span>
                    <span class="popover_content">
                        <span>{{{html}}}</span>
                    </span>
                </div>
            </div>
            <div v-if="placeMent=='bottom'" style="margin-left:45%">
                <div class="popover_bottom ">
                    <!-- <span class="arrow_bottom"></span> -->
                    <span class="arrow_bottom_bg"></span>
                    <span class="popover_content">
                        <span>{{{html}}}</span>
                    </span>
                </div>
            </div>
            <div v-if="placeMent=='left'" style="margin-left:100%;right: 0px;">
                <div class="popover_left">
                    <!-- <span class="arrow_left"></span> -->
                    <span class="arrow_left_bg"></span>
                    <span class="popover_content">
                        <span>{{{html}}}</span>
                    </span>
                </div>
            </div>
            <div v-if="placeMent=='right'" style="margin-left:-50%;">
                <div class="popover_right ">
                    <!-- <span class="arrow_right"></span> -->
                    <span class="arrow_right_bg"></span>
                    <span class="popover_content">
                        <span>{{{html}}}</span>
                    </span>
                </div>
            </div>
        </span>
        <!-- 占位 -->
        <div style="visibility:hidden">
            <div class="popover_top">
                <!-- <span class="arrow_up"></span> -->
                <span class="arrow_up_bg"></span>
                <span class="popover_content">
                    <span id='{{uuid}}'>{{{html}}}</span>
                </span>
            </div>
        </div>
        <!-- 泡泡挂载点 -->
        <slot></slot>
    </span>
    <!-- 无泡泡 -->
    <span v-if='!popover'>
        <slot></slot>
    </span>
</template>
<script>
    export default{
        data(){
            return {
                uuid: Thu.fn.createUuid('POP'),
                placeMent: "top",
                popoverStatus: false
            }
        },
        props: {
            popover: null,//{{{html}}}
            data: {
                type: Object, default(){
                    return {}
                }
            },
        },
        computed: {
            html: function () {
                var html = this.popover;
                if ( typeof this.popover == "function" ) {
                    html = this.popover(this.data);
                } else {
                    var popover = this.data["" + this.popover];
                    html = (typeof popover == "undefined") ? html : popover;
                }
                return html;
            }
        },
        methods: {
            _setPosition(e){
                // HT.log('event',e)

                var positionX = e.clientX;
                var positionY = e.clientY;

                var windowHeight = window.innerHeight;
                var windowWidth = window.innerWidth;

                var popover = document.getElementById(this.uuid);

                if ( window.innerHeight - $(e)[0].clientY < 120 ) {
                    this.placeMent = "bottom"
                }
            },
            _popoverShow(e){
                if ( this.html != '' ) {
                    this.popoverStatus = true;
                    this._setPosition(e)
                }
            },
            _popoverHide(){
                this.popoverStatus = false
            }
        }
    }
</script>
<style>
    .popover_item {
        z-index: 9;
    }

    .popover_content {
        float: left;
        color: #ffffff;
    }

    .popover_top {
        position: absolute;
        background-color: rgba(91, 91, 91, 0.9);
        /*border: 2px solid rgba(91,91,91,0.7);*/
        padding: 10px;
        max-width: 15%;
        border-radius: 5px;
        margin-top: 30px;
        z-index: 1;
        margin-left: -15px;
    }

    .popover_bottom {
        position: absolute;
        background-color: rgba(91, 91, 91, 0.9);
        border: 2px solid rgba(91, 91, 91, 0.9);
        padding: 10px;
        max-width: 15%;
        border-radius: 5px;
        z-index: 1;
        transform: translateY(-120%);
        margin-left: -15px;
    }

    .popover_left {
        position: absolute;
        background-color: rgba(91, 91, 91, 0.9);
        border: 2px solid rgba(91, 91, 91, 0.9);
        padding: 10px;
        max-width: 19%;
        border-radius: 5px;
        z-index: 1;
    }

    .popover_right {
        position: absolute;
        background-color: rgba(91, 91, 91, 0.9);
        border: 2px solid rgba(91, 91, 91, 0.9);
        padding: 10px;
        max-width: 19%;
        border-radius: 5px;
        z-index: 1;
    }

    .arrow_up {
        position: absolute;
        left: 5px;
        top: -10px;
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
    }

    .arrow_up_bg {
        position: absolute;
        left: 8px;
        top: -6px;
        width: 0px;
        height: 0px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 6px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
    }

    .arrow_bottom {
        position: absolute;
        left: 5px;
        bottom: -10px;
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
    }

    .arrow_bottom_bg {
        position: absolute;
        left: 7px;
        bottom: -6px;
        width: 0px;
        height: 0px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 7px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
    }

    .arrow_left {
        position: absolute;
        left: -15px;
        top: 9px;
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
        -webkit-transform: rotate(-90deg);
    }

    .arrow_left_bg {
        position: absolute;
        left: -10px;
        top: 11px;
        width: 0px;
        height: 0px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 6px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
        -webkit-transform: rotate(-90deg);
    }

    .arrow_right {
        position: absolute;
        right: -15px;
        top: 8px;
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
        -webkit-transform: rotate(90deg);
    }

    .arrow_right_bg {
        position: absolute;
        right: -10px;
        top: 10px;
        width: 0px;
        height: 0px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 6px solid rgba(91, 91, 91, 0.9);
        font-size: 0px;
        line-height: 0px;
        -webkit-transform: rotate(90deg);
    }
</style>
