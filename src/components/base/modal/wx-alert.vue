<template>
    <div class="wx-modal alert" transition="wx-modal-scale" v-show='status'>
        <div class="wx-modal-wrapper alert">
            <div class="wx-modal-container" >
                <div id="wx-modal-header-alert" class="wx-modal-header">
                    <span class="wx-modal-header-text">
                        <slot name="header">{{{header}}}</slot>
                    </span>
                    <span class="wx-modal-header-close" @click.stop="close">&times;</span>
                </div>
                <div id="wx-modal-body-alert" class="wx-modal-body">
                    <slot>{{{body}}}</slot>
                </div>
                <div id="wx-modal-footer-alert" class="wx-modal-footer">
                    <slot name="footer">
                        {{{footer}}}
                        <wx-button @click.stop="close" v-if="cancel" color="red">确定</wx-button>
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
