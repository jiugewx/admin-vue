/**
 * Created by wangxin on 2017/3/23.
 */

export default{
    data: function () {
        return {

        }
    },
    props: {
        color: {
            type: String,
            default: 'default', // 'white','default', 'primary', 'accent', 'success', 'warning', or 'danger'
            coerce(color) {
                return 'color-' + color;
            }
        },
        text: {
            type: String,
            default: function () {
                return ""
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        styleClasses() {
            var classes = [this.color];
            if ( this.shadow ) {
                classes.push('wx-shadow')
            }
            return classes;
        }
    },
    methods: {
        /**
         * ajax的请求方法
         * @param url
         * @param success
         * @param fail
         */
        ajaxGet: function (url, success, fail) {

        },
        /**
         * ajax的请求方法
         * @param url
         * @param data
         * @param success
         * @param fail
         */
        ajaxPost: function (url, data, success, fail) {

        }
    }
}