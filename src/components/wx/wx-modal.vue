<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <div class="wx-modal" v-show="show" :transition="transition" :class="[size]"
            @transitionend="transitionEnd | debounce 100">
        <div class="wx-modal-wrapper" @click="close" v-el:modal-mask>
            <div class="wx-modal-container center" tabindex="-1" v-el:modal-container>
                <!-- 非全屏弹窗 有头部 -->
                <div id="wx-modal-header" class="wx-modal-header">
                    <span class="wx-modal-header-text">
                        <slot name="header">{{{header}}}</slot>
                    </span>
                    <span class="wx-modal-header-close" @click.stop="close">&times;</span>
                </div>
                <div id="wx-modal-body" class="wx-modal-body">
                    <slot>
                        <div v-text="body"></div>
                    </slot>
                </div>
                <!-- 全屏时隐藏这个按钮 -->
                <div id="wx-modal-footer" class="wx-modal-footer">
                    <slot name="footer">
                        <wx-button @click.stop="close" v-if="dismissible && cancel" :color="white">取消</wx-button>
                    </slot>
                </div>
                <div class="focus-redirector" @focus="redirectFocus" tabindex="0"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../style-less/style.less";
    import classlist from './helpers/classlist';
    import wxButton from './wx-button.vue';

    export default {
        name: 'wx-modal',
        props: {
            show: {
                type: Boolean,
                required: true,
                twoWay: true
            },
            size: {
                type: String,
                default: 'normal', // 'small', 'normal','middle', or 'large'
                coerce(type) {
                    return 'wx-modal-' + type;
                }
            },
            header: {
                type: String,
                default: ''
            },
            body: {
                type: String,
                default: ''
            },
            transition: {
                type: String,
                default: 'wx-modal-scale', // 'wx-modal-scale', or 'wx-modal-fade'
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            dismissible: {
                type: Boolean,
                default: true
            },
            cancel: {
                type: Boolean,
                default: true
            },
            bgabled: {
                type: Boolean,
                default: false
            },
            scale: {
                type: Boolean,
                default: false
            },
            full: {
                type: Boolean,
                twoWay: true,
                default: false
            }
        },
        data() {
            return {
                lastFocussedElement: null,
            };
        },
        watch: {
            show() {
                var self = this;
                this.$nextTick(function () {
                    return self.show ? self.opened() : self.closed();
                });
            }
        },
        beforeDestroy() {
            if ( this.show ) {
                this.tearDown();
            }
        },
        methods: {
            // 缩放
            doScale(){
                this.full = ! this.full;
            },
            // 关闭
            close(e) {
                if ( ! this.dismissible ) {
                    return;
                }
                // 确保点击的是 modalMask，而不是事件冒泡
                if ( e.currentTarget === this.$els.modalMask && e.target !== e.currentTarget ) {
                    return;
                }
                // 如果事件不是由 modalMask 触发，或 bgabled == false 不关闭
                if ( e.currentTarget === this.$els.modalMask && ! this.bgabled ) {
                    return;
                }
                this.show = false;
                this.$dispatch("MODAL_CANCEL")
            },
            //当已经打开
            opened() {
                this.lastFocussedElement = document.activeElement;
                this.$els.modalContainer.focus();
                if ( this.full == true ) {
                    classlist.add(document.body, 'wx-modal-open-full');
                } else {
                    classlist.add(document.body, 'wx-modal-open');
                }
                document.addEventListener('focus', this.restrictFocus, true);
                this.$dispatch('MODAL_OPENED');
            },
            //当已经关闭
            closed() {
                this.tearDown();
                this.$dispatch('MODAL_CLOSED');
            },

            redirectFocus(e) {
                e.stopPropagation();
                this.$els.modalContainer.focus();
            },

            restrictFocus(e) {
                if ( ! this.$els.modalContainer.contains(e.target) ) {
                    e.stopPropagation();
                    this.$els.modalContainer.focus();
                }
            },

            tearDown() {
                if ( this.full == true ) {
                    classlist.remove(document.body, 'wx-modal-open-full');
                } else {
                    classlist.remove(document.body, 'wx-modal-open');
                }

                document.removeEventListener('focus', this.restrictFocus, true);
                if ( this.lastFocussedElement ) {
                    this.lastFocussedElement.focus();
                }
            },

            transitionEnd() {
                if ( this.show ) {
                    this.$dispatch('MODAL_REVEALED');
                } else {
                    this.$dispatch('MODAL_HIDDEN');
                }
            }
        },
        components: {
            wxButton
        }
    };
</script>
