<template>
    <div class="wx-modal screen" transition="wx-modal-scale" v-show='status'>
        <div class="wx-modal-wrapper screen">
            <div class="wx-modal-container" >
                <slot name="header">{{{header}}}</slot>
                <div id="wx-modal-body-screen" class="wx-modal-body">
                    <slot>{{{body}}}</slot>
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
