/**
 * 这里封装一个form表单群组的方法
 */

export default {
    data: function () {
        return {
            type: "FORM_GROUP",  // 不可修改
            components: []       // 不可修改
        }
    },
    methods: {
        /**
         * 获取本实例
         */
        getInstance: function () {
            return this
        },
        /**
         * 追加一个子组件            [增加]
         * @param component         组件配置
         * @param index             组件位置[可选]
         */
        append: function (component, index) {
            var max = this.components.length - 1;
            index = Utils.fn.isUndefined(index) ? parseInt(index) : max;
            if ( max > index ) {
                this.components.splice(index, 0, component);
                return this.getInstance();
            }
            this.components.push(component);
            return this.getInstance();
        },
        /**
         * 按位置移除子组件         [删除]
         * @param index
         * @returns {*}
         */
        removeByIndex: function (index) {
            var components = this.components;
            var max = this.components.length - 1;
            index = Utils.fn.isUndefined(index) ? parseInt(index) : 0;
            if ( max > index ) {
                components.splice(index, 1);
                this.components = components;
                return this.getInstance();
            }
            this.components.pop();
            return this.getInstance();
        },
        /**
         * 按字段名删除子组件        [删除]
         * @param name
         */
        removeByName: function (name) {
            var components = this.components;
            var index = this.getChildIndex(name);
            components.splice(index, 1);
            this.components = components;
            return this.getInstance();
        },
        /**
         * 显示某个组件               display = block;
         * @param name
         */
        showModule: function (name) {
            this.getChild(name).setShow(true);
            return this.getInstance();
        },
        /**
         * 隐藏某个组件               display = none;
         * @param name
         */
        hideModule: function (name) {
            this.getChild(name).setShow(false);
            return this.getInstance();
        },
        /**
         * 替换某个子组件          [修改]
         * @param index
         * @param component
         */
        replaceByIndex: function (index, component) {
            this.removeByIndex(index);
            this.append(component, index);
            return this.getInstance();
        },
        /**
         * 替换某个子组件          [修改]
         * @param name
         * @param component
         */
        replaceByName: function (name, component) {
            var index = this.getChildIndex(name);
            this.removeByName(name);
            this.append(component, index);
            return this.getInstance();
        },
        /**
         * 获取某个子组件的位置         [获取]
         * @param name
         * @returns {*}
         */
        getChildIndex: function (name) {
            var index = - 1;
            for (var i = 0; i < this.$children.length; i ++) {
                if ( this.$children[i].getName() == name ) {
                    index = i;
                    break;
                }
            }
            return index
        },
        /**
         * 获取某个子组件实例         [获取]
         * @param name
         * @returns {*}
         */
        getChild: function (name) {
            var index = this.getChildIndex(name);
            return this.$children[index];
        },
        /**
         * 判断是否为一个form群组
         * @param FormGroup
         * @returns {boolean}
         */
        isFormGroup: function (FormGroup) {
            return (FormGroup.type && FormGroup.type == this.type && FormGroup.components && FormGroup.components.length > 0);
        },
        /**
         * 合并群组
         * @param formGroupInstance
         * @returns {*}
         */
        merge: function (formGroupInstance) {
            if ( this.isFormGroup(formGroupInstance) ) {
                this.components = this.components.concat(formGroupInstance.components);
                return this.getInstance()
            }
            throw "it should be a FORM_GROUP type!"
        },
        /**
         * 获取数据
         */
        getData: function () {

        },
        /**
         * 重置数据
         */
        reset: function () {

        }
    }
}
