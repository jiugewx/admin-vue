<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <button type="button" class="wx-button" :class="styleClasses" :disabled="disabled || loading" v-el:button>
        <div class="wx-button-content" :class="{ 'loading': loading }">
            <div class="wx-button-text">
                <slot>{{{text}}}</slot>
            </div>
        </div>
    </button>
</template>
<script>
    import button from "./button";
    export default{
        mixins: [button]
    }
</script>