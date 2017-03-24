<template>
    <div class="wx-modal wx-modal-message" transition="wx-modal-scale" :class="{
                'wx-modal-hide': !status }">
        <div class="wx-message-wrapper">
            <div class="wx-message-container" v-show='status' :class="{
                'large':    size == 'large',
                'normal':   size == 'normal',
                'middle':   size == 'middle',
                'small':    size == 'small',
            }">
                <div class="wx-message-body" :class="{
                    'grey':    color == 'grey',
                    'red':    color == 'red',
                    'blue':    color == 'blue',
                    'yellow':    color == 'yellow',
                    'white':    color == 'white',
                    }">
                    <slot>{{{message}}}</slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                status: false,
                message: ""
            }
        },
        props: {
            size: {
                type: String,
                default: 'normal'  // 'large', 'normal' ,'middle','small'
            },
            color: {
                type: String,
                default: 'grey'    // 'grey', 'red' ,'blue','yellow','greens'
            }
        },
        methods: {
            show(msg, time){
                this.status = true;
                this.message = msg;
                this._changeStatus(time);
            },
            hide(){
                this.status = false;
                this.message = '';
            },
            _changeStatus(time) {
                var timer = 2000;
                if ( time ) {
                    timer = time;
                }
                var self = this;
                setTimeout(function () {
                    self.hide();
                }, timer)
            }
        },
        ready(){
            this._changeStatus();
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @transition-duration: 0.2s;
    @bk-base: rgba(255, 255, 255, 0.5);
    @grey: rgba(76, 76, 76, 0.7);
    @white: #fff;
    @black: #000;
    @red: #f44336;
    @blue: #29c3f6;
    @yellow: #ff9800;
</style>
