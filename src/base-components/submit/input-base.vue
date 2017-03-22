<template>
</template>
<script>
    var data = {
        type: "input",
        name:"",
        value:"",
        validators:[],
        placeholder:"",
        event:{
            input:_callbacks,
            change:_callbacks,
            blur:_callbacks,
            enter:_callbacks,
        }
    };

    export default{
        data: function () {
            return {
                tempValidators: []
            }
        },
        methods: {
            init: function () {

            },
            // 输入事件
            _input: function () {

                if ( this.data.only ) {
                    return
                }

                var instance = this.getInstance();
                this.Event["input"] && this.Event["input"](instance)
            }
        }
    }
</script>
