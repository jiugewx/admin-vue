/**
 * Created by wangxin on 2017/3/23.
 */


export default {
    data: function () {
        return {
            lastFocussedElement: null,
            show: false,
        }
    },
    props: {
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
        bgabled: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        // 打开
        open: function () {
            this.show = true;
            this.opened();
        },
        // 关闭
        close: function (e) {
            // 确保点击的是 modalMask，而不是事件冒泡
            if ( e.currentTarget === this.$refs.modalMask && e.target !== e.currentTarget ) {
                return;
            }

            // 如果事件不是由 modalMask 触发，或 bgabled == false 不关闭
            if ( e.currentTarget === this.$refs.modalMask && ! this.bgabled ) {
                return;
            }

            this.show = false;
            this.closed();
        },

        // 强制聚焦所有的事件
        restrictFocus: function (e) {
            if ( ! this.$refs.modalContainer.contains(e.target) ) {
                e.stopPropagation();
                this.$refs.modalContainer.focus();
            }
        },

        //当已经打开
        opened: function () {
            this.lastFocussedElement = document.activeElement;
            this.$refs.modalContainer.focus();

            classlist.add(document.body, 'wx-modal-open');
            document.addEventListener('focus', this.restrictFocus, true);
            this.$root.EventHub.$emit('MODAL_OPENED');
        },
        //当已经关闭
        closed: function () {
            classlist.remove(document.body, 'wx-modal-open');
            document.removeEventListener('focus', this.restrictFocus, true);
            if ( this.lastFocussedElement ) {
                this.lastFocussedElement.focus();
            }
            this.$root.EventHub.$emit('MODAL_CLOSED');
        }
    }
};