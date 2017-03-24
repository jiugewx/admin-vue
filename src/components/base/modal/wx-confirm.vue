<template>
    <div class="wx-modal confirm" transition="wx-modal-scale" v-show='status'>
        <div class="wx-modal-wrapper confirm">
            <div class="wx-modal-container" >
                <div id="wx-modal-header-confirm" class="wx-modal-header">
                    <span class="wx-modal-header-text">
                        <slot name="header">{{{header}}}</slot>
                    </span>
                    <span class="wx-modal-header-close" @click.stop="close">&times;</span>
                </div>
                <div id="wx-modal-body-confirm" class="wx-modal-body">
                    <slot>{{{body}}}</slot>
                </div>
                <div id="wx-modal-footer-confirm" class="wx-modal-footer">
                    <slot name="footer">
                        {{{footer}}}
                    </slot>
                    <wx-button @click.stop="close" v-if="cancel" color="red">取消</wx-button>
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
