<template>
    <div class="wx-modal wx-modal-dialog" v-show="show" :transition="transition" :class="{}">
        <div class="wx-dialog-mask" @click="close" ref="modal-mask">
            <div class="wx-dialog-container" tabindex="-1" ref="modal-container">
                <div id="wx-dialog-header" class="wx-dialog-header">
                    <span class="wx-dialog-header-text">
                        <slot name="header">{{{header}}}</slot>
                    </span>
                    <span class="wx-dialog-header-close" @click.stop="close">&times;</span>
                </div>
                <div id="wx-dialog-body" class="wx-dialog-body">
                    <slot>{{{body}}}</slot>
                </div>
                <div id="wx-dialog-footer" class="wx-dialog-footer">
                    <slot name="footer">
                        {{{<wx-button @click.stop="close" v-if="cancel" color="white">取消</wx-button>}}}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../style-less/style.less";
    import classlist from './helpers/classlist';
    import wxButton from '../button/wx-button.vue';

    export  default{
        components: {
            wxButton
        },
        beforeDestroy() {
            if ( this.show ) {
                this.close();
            }
        },
    }
</script>
