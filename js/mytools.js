(function (w) {
    w.myTool = {
        /**
         * 根据id获取元素节点
         * @param {string}id 节点id
         * @returns {any} id为id的节点
         */
        $: function (id) {
            return typeof id === 'string' ? document.getElementById(id) : null;
        },

        /**
         * 返回网页被卷去的高、网页被卷去的左
         * @returns {{top: *, left: *}} top：被卷去的高 left：被卷去的左
         */
        scroll: function() {
            if(window.pageYOffset !== null){ // 最新的浏览器
                return {
                    "top": window.pageYOffset,
                    "left": window.pageXOffset
                }
            }else if(document.compatMode === 'CSS1Compat'){ // W3C
                return {
                    "top": document.documentElement.scrollTop,
                    "left": document.documentElement.scrollLeft
                }
            }
            return {
                "top": document.body.scrollTop,
                "left": document.body.scrollLeft
            }
        },

        /**
         * 返
         * @returns {{width: *, height: *}} width：当前界面宽度 height：当前界面高度
         */
        client: function() {
            if(window.innerWidth !== null){ // 最新的浏览器
                return {
                    "width": window.innerWidth,
                    "height": window.innerHeight
                }
            }else if(document.compatMode === 'CSS1Compat'){ // W3C
                return {
                    "width": document.documentElement.clientWidth,
                    "height": document.documentElement.clientHeight
                }
            }
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }
        },

        /**
         * 检查obj元素是否的类名中是否有cs
         * @param {Element}obj
         * @param {string}cs
         * @returns {boolean} true有 false无
         */
        hasClassName: function (obj, cs) {
            var reg = new RegExp('\\b' + cs + '\\b');
            return reg.test(obj.className);
        },

        /**
         * 为obj添加类名csf
         * @param {Element}obj
         * @param {string}cs
         */
        addClassName: function (obj, cs) {
            if(!this.hasClassName(obj,cs)){
                obj.className += ' ' + cs;
            }
        },

        /**
         * 移除所有 obj的cs类：
         * @param {Element}obj
         * @param {string}cs
         */
        removeClassName: function (obj, cs) {
            var reg = new RegExp('\\b' + cs + '\\b');
            // 删除class
            obj.className = obj.className.replace(reg, '');
        },

        /**
         * 对设置和移除obj元素的cs类进行切换：
         * @param {Element}obj
         * @param {string}cs
         */
        toggleClassName: function (obj, cs) {
            if(this.hasClassName(obj,cs)){
                // 有， 删除
                this.removeClassName(obj,cs);
            }else {
                // 没有，则添加
                this.addClassName(obj,cs);
            }
        },

        /**
         * 控制元素是否显示
         * @param {Element}ele 元素节点
         */
        hide: function (ele) {
            ele.style.display = 'none'
        },
        show: function (ele) {
            ele.style.display = 'block'
        },

        /**
         * 获得某个元素的某个CSS属性
         * @param {Element}obj
         * @param {string}attr
         * @returns {string}
         */
        getCSSAttr: function (obj, attr) {
            if (obj.currentStyle) { // IE 和 opera
                return obj.currentStyle[attr];
            } else {
                return window.getComputedStyle(obj, null)[attr];
            }
        },

        /**
         * 更改某个元素的某个CSS属性
         * @param {Element}eleObj
         * @param {string}attr
         * @param {string | number}value
         */
        setCssAttr: function (eleObj, attr, value) {
            eleObj.style[attr] = value;
        },

        /**
         * *  缓动动画函数
         * @param eleObj 要执行缓动动画的元素对象
         * @param json 以JSON格式传入需要改的属性
         * @param fn 回调函数
         * @param slowTime 延时时间
         */
        slowMoving: function (eleObj, json, fn,slowTime) {
            clearInterval(eleObj.timer);
            var speed = 0, begin = 0, target = 0, flag = false;
            eleObj.timer = setInterval(function () {
                flag = true;
                for(var key in json){
                    if (json.hasOwnProperty(key)){
                        if (key === 'opacity') {
                            begin = parseInt(parseFloat(myTool.getCSSAttr(eleObj, key)) * 100);
                            target = parseInt(json[key] * 100);
                        } else if ('scrollTop' === key) {
                            begin = Math.ceil(Number(eleObj.scrollTop));
                            target = parseInt(json[key]);
                        } else {
                            begin = parseInt(myTool.getCSSAttr(eleObj, key)) || 0;
                            target = parseInt(json[key]);
                        }
                        speed = (target - begin) * 0.2;
                        speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
                        if (key === 'opacity') {
                            eleObj.style.opacity = (begin + speed) / 100;
                        } else if ('scrollTop' === key) {
                            eleObj.scrollTop = begin + speed;
                        } else if ("zIndex" === key) {
                            eleObj.style[key] = json[key];
                        }else {
                            eleObj.style[key] = begin + speed + 'px';
                        }
                        if (begin !== target) {
                            flag = false;
                        }
                    }
                }
                if(flag){
                    clearInterval(eleObj.timer);
                    fn && fn();
                }
            }, slowTime);
        },

        /**
         * 传入总秒数返回对应小时、分钟以及秒数
         * @param second 总秒数
         * @returns {{min: number , hour: number, second: number}}
         */
        secondToHourMinSecond: function (second) {
            return{
                "hour" : Math.floor(second / (60*60)),
                "min" : Math.floor(second % (60*60) / 60),
                "second" : Math.floor(second %60)
            }
        },

        /**
         * 传入一个数字，如果是一位数字，前面补0.如果是两位，返回原值。
         * @param {number}num
         * @returns {number}
         */
        addZero: function (num) {
            return num < 10 ? '0' + num : num;
        },

        /**
         * 获取字符串真实长度，目前仅针对中文和英文字符串
         * @param {string}str
         * @returns {number}
         */
        getStrLength: function (str){
            var len = 0, code = 0;
            for (var i = 0; i < str.length; i++) {
                code = str.charCodeAt(i);
                if (code>=0 && code <= 127){
                    len += 1;
                }else{
                    len += 2;
                }
            }
            return len;
        },

        /**
         * 返回年月日周几时分秒
         * @returns {{week: *, month: *, hour: *, year: *, day: *, minute: *, second: *}}
         */
        getTime: function () {
            var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = weeks[date.getDay()];
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return {
                'year':year,'month':month,'day':day,'week':week,'hour':hour,'minute':minute,'second':second
            }
        },

        /**
         * 格式化日期对象，返回YYYY-MM-dd hh:mm:ss的形式
         * @param {Date}date
         */
        formatDate: function (date){
            // 1. 验证
            if(!date instanceof Date){
                return;
            }

            // 2. 转化
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getMinutes();

            // 3. 转化格式 YYYY-MM-dd hh:mm:ss

            // 过滤小于10的情况
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        },

        /**
         * 节流操作：经常触发的操作需要节流
         * 比如： window.onresize = throttle(function () {····}, 400);
         * @param fn    要做的事情
         * @param delay 延时时间
         * @returns {Function}  定时器函数
         */
        throttle:function (fn, delay) {
            var timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(fn, delay);
            }
        },

        /**
         * 瀑布流
         * @param parent 父盒子
         * @param child 子盒子
         */
        waterFull:function (parent, child) {
            // 1. 父盒子居中
            // 1.1 获取所有的盒子
            var allBox = myTool.$(parent).getElementsByClassName(child);
            // 1.2 获取子盒子的宽度
            var boxWidth = allBox[0].offsetWidth;
            // 1.3 获取屏幕的宽度
            var screenW = document.documentElement.clientWidth;
            // 1.4 求出列数
            var cols = parseInt(screenW / boxWidth);
            var xyMargin = 16;
            // 2. 子盒子的定位
            // 2.1 定义高度数组
            var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
            // 2.2 遍历子盒子
            for (var i = 0; i < allBox.length; i++) {
                // 2.2.1 求出每一个子盒子的高度
                boxHeight = allBox[i].offsetHeight + xyMargin;
                // 2.2.2 取出第一行盒子的高度放入高度数组
                if (i < cols) { // 第一行
                    heightArr.push(boxHeight);
                    allBox[i].style.position = "absolute";
                    allBox[i].style.left = i * (boxWidth + xyMargin)+ 'px';
                    allBox[i].style.top =  xyMargin + 'px';
                } else { // 剩余行
                    // 1. 取出最矮的盒子高度
                    minBoxHeight = _.min(heightArr);
                    // 2. 求出最矮盒子对应的索引
                    minBoxIndex = myTool.getMinBoxIndex(heightArr, minBoxHeight);
                    // 3. 子盒子定位
                    allBox[i].style.position = "absolute";
                    allBox[i].style.left = minBoxIndex * (boxWidth + xyMargin)+ 'px';
                    allBox[i].style.top = minBoxHeight +  xyMargin + 'px';
                    // 4. 更新数组中的高度
                    heightArr[minBoxIndex] += boxHeight;
                }
            }

            // 5. 更新父盒子的高度
            myTool.$(parent).style.height = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
        },

        /**
         * 获取数组中最矮盒子高度的索引
         * @param arr
         * @param val
         * @returns {number}
         */
        getMinBoxIndex:function (arr, val) {
            for(var i=0; i<arr.length; i++){
                if(arr[i] === val){
                    return i;
                }
            }
        },

        /**
         * 判断是否具备加载图片的条件
         */
        checkWillLoadImage:function () {
            // 1. 获取最后一个盒子
            var allBox = document.getElementsByClassName("box");
            var lastBox = allBox[allBox.length - 1];
            // 2. 求出最后一个盒子自身高度的一半 + offsetTop
            var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
            // 3. 求出屏幕的高度
            var screenW = document.body.clientHeight || document.documentElement.clientHeight;
            // 4. 求出页面偏离浏览器的高度
            var scrollTop = myTool.scroll().top;
            return lastBoxDis <= screenW + scrollTop;
        },
        /**
         * 对一个对象进行深拷贝
         * @param fromObj 待拷贝对象
         * @param toObj 拷贝至对象
         */
        deepCopyObj2NewObj:function (fromObj, toObj) {
            for(var key in fromObj){
                var fromValue = fromObj[key];
                if(!isObj(fromValue)){
                    toObj[key] = fromValue;
                }else {
                    var temObj = new fromValue.constructor;
                    deepCopyObj2NewObj(fromValue, temObj);
                    toObj[key] = temObj
                }
            }
        },
        /**
         * 判断一个对象是否为对象
         * @param obj 判断对象
         * @returns {boolean}
         */
        isObj:function (obj) {
            return obj instanceof Object;
        }
    };
})(window);
