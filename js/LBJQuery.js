/**
 * Created by libo8 on 2018/8/11
 */

//防止变量全局污染 使用function  js中函数有作用域  没有块级作用域
(function(window,undefined){

    "use strict";

    //window : 作为参数参入 可以优化性能  方便代码压缩和混淆
    //undefined: 作为参数并且没有对应的实参 那么默认就是undefined
    //           并且在IE9-以下浏览器中 undefined是可以被修改的
    //           这样传值默认就是undefined 不会被修改 并且方便代码压缩和混淆

    //提供Jquery工厂函数
    var Jquery = function(option) {

        return new Jquery.fn.init(option);
    };
    //设置Jquery原型对象
    Jquery.fn=Jquery.prototype= {
        //修正构造器
        constructor:Jquery,

        //初始化方法
        init:function (option){
            // 1.option 参数为假 返回空Jquery对象
            if (!option){

                return this;
            }
            //2.option 参数为 字符串
            else if (Tools.isString(option)){
                //备份指针
                var self = this;
                //2.1-option 是html标签字符串
                if (Tools.isHTML(option)){
                    //创建临时标签
                    const temp = document.createElement('div');
                    temp.innerHTML = option;
                    //遍历
                    Tools.each(temp.children,function (index,item) {
                        self[index] = item;
                    });
                    //更新length属性值
                    this.length = temp.children.length;
                }
                //2.2-option 是选择器字符串
                else {
                    //获取所有满足条件的DOM
                    // const nodes = document.querySelectorAll(option);
                    // Tools.each(nodes,function (index,item) {
                    //     self[index] = item;
                    // });
                    // //更新length属性值
                    // this.length = nodes.length;

                    /*使用call或者apply 优化代码
                    *
                    *   call和apply 借用其它对象的方法,并且绑定函数中的this值
                    *   语法:
                    *       对象1.方法.call(对象2,参数1,参数2,...)
                    *       对象1.方法.apply(对象2,[参数1,参数2,参数3,..])
                    *
                    *   区别:
                    *       传递的参数不一样
                    *       length属性值不一样 所有的函数的length值是该函数形参个数
                    *   注意:
                    *       函数的length属性值是形参的个数
                    *       函数内部的arguments属性值是实参的个数
                    * */


                    /*
                    * push 方法说明
                    * push 是 Array.prototype上的方法 添加元素到数组的末尾
                    *
                    * 在此处:将数据添加到对象中(数据作为key为0,1,2,...对应的value值保存),并且更新length属性值
                    * */

                    [].push.apply(this,document.querySelectorAll(option));
                }
            }
            //3.option 参数是数组或者是伪数组
            else if(Tools.isArray(option)){

            }
            //4.option 参数是函数
            else if(option){

            }
            //5.option 参数是对象 非0数字 非false布尔值
            else {

            }
        }
    };
    //将init对象的原型对象修改为Jquery原型对象
    Jquery.fn.init.prototype = Jquery.prototype;
    //将Jquery绑定到全局对象window上
    window.Jquery = window.$ = Jquery;

    //提供工具方法
    var Tools = {

        /**
         * 判断是否是字符串
         * @param option
         * @returns {boolean}
         */
        isString:function (option) {
            return typeof option === 'string';
        },

        /**
         * 字符串是否含有html标签的检测
         * @param htmlStr
         * @returns {boolean}
         */
        isHTML:function(htmlStr){
            var reg = /<[^>]+>/g;
            return reg.test(htmlStr);
        },

        /**
         * 删除字符串开头和结尾的空格
         * @param option
         * @returns {*|void|string}
         */
        trim:function(option){
            if (option.trim){
                //ES5 String 默认的方法  去掉字符串前后的空格
                return option.trim();
            }
            //ES5-
            else {
                // \s : 匹配空格
                // \s+ : 匹配多个空格
                // ^\s+: 匹配开头多个空格
                // \s$: 匹配结尾多个空格
                // g : 匹配多次 直到结束

                //replace 替换(原字符,新字符)
                option.replace(/^\s+ | \s+$/g,"")
            }
        },

        isArray:function(option){

        },

        /**
         * 遍历对象或者数组
         * @param obj
         * @param callback
         */
        each:function(obj,callback){
            for (var i = 0; i<obj.length; i++){
                callback(i,obj[i]);
            }
        }


    }

})(window);