<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <button type="button" v-el:button @click.stop="_click"
            class="wx-button" :class="styleClasses" :type="buttonType || info.buttonType"
            :disabled="disabled || loading || info.disabled"
    >
        <div class="wx-button-content" :class="{ 'invisible': loading }">
            <div class="wx-button-text">
                <slot>
                    <span v-text="label || info.label"></span>
                </slot>
            </div>
        </div>
    </button>
</template>
<script>
    export default{
        name: "wx-button",
        props: {
            info: {
                type: [Object, Array], default(){
                    return {}
                }
            },
            color: {
                type: String,
                default: 'default', // 'white','default', 'primary', 'accent', 'success', 'warning', or 'danger'
                coerce(color) {
                    return 'color-' + color;
                }
            },
            EVENT: {
                type: String,
                default: "BUTTON_SUBMIT"
            },
            type: {
                type: String,
                default: 'normal', // 'normal' or 'flat'
                coerce(type) {
                    return 'wx-button-' + type;
                }
            },
            shadow: {
                type: Boolean,
                default: false
            },
            buttonType: {
                type: [String, Number],
                default: 'submit' // HTML default
            },
            label: String,
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            styleClasses() {
                var classes = [this.type || this.info.type, this.color || this.info.color];
                if ( this.shadow || this.info.shadow ) {
                    classes.push('wx-shadow')
                }
                return classes;
            }
        },
        methods: {
            _click: function () {
                if ( this.EVENT ) {
                    this.$dispatch(this.EVENT || this.info.EVENT);
                }
                this.$dispatch("BUTTON_SUBMIT");
            }
        }
    }
</script>