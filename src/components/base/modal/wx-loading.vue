<template>
    <div class="wx-loading" v-show="showLoading">
        <div class="wx-loading-container">
            <div class="wx-loading-content">
                <div class="wx-loading-image"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                showLoading: false
            }
        },
        methods: {
            show() {
                Thu.log("SHOW_LOADING");
                this.showLoading = true;
                var self = this;
                setTimeout(function () {
                    self.showLoading = false;
                }, 15000);
            },
            hide() {
                Thu.log('HIDE_LOADING');
                this.showLoading = false;
            }
        },
        events:{
            SHOW_LOADING(){
                this.show()
            },
            HIDE_LOADING(){
                this.hide();
            }
        }
    }
</script>