window.addEventListener('load', function() {
    //轮播图代码
    // 获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 鼠标经过
    focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            clearInterval(timer);
            timer = null;
        })
        // 鼠标离开
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);

    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');

    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);

        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 右箭头
    arrow_r.addEventListener('click', function() {
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth);

            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        })
        // 左箭头
    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth);

        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = this.setInterval(function() {
        arrow_r.click();
    }, 2000);






    //楼层滚动效果元素获取
    var first_floor = document.querySelector(".f_first");
    var floorNav = document.querySelector('.floor_nav');
    var firstTop = first_floor.offsetTop;

    // 返回顶部效果
    var turnTop = document.querySelector('.turn_top');
    var banner = document.querySelector('.focus');
    var bannerTop = banner.offsetTop;

    //返回顶部的缓动效果
    var sp=0;
    function scrollup(){
        if(sp>0){
            sp-=200;
            window.scrollTo(0,sp);
            setTimeout(scrollup,20);//用setTimeout模拟setInterval的效果
        }else{
            window.scrollTo(0,0);
        }
    }
    turnTop.addEventListener('click',function () {
        sp=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容浏览器，获得到顶部的距离
        setTimeout(scrollup,20);
    })

    //控制按钮显示隐藏
    document.addEventListener('scroll',function(){
        // 后去页面被卷去的头部用 window.pageYOffset
        var scr = window.pageYOffset;
        if(scr >= firstTop-20){
            floorNav.style.display = 'block';
            floorNav.style.position = 'fixed';
        }else{
            floorNav.style.display = 'none';
        }
        if(scr >= bannerTop){
            turnTop.style.display = 'block';
            turnTop.style.position = 'fixed';
        }else{
            turnTop.style.display = 'none';
        }
    })

    // 1. 获取标签
    var floorOl = myTool.$('f_nav'), floorUl = myTool.$('floor');   //获取楼层内容和楼层导航
    var ulLis = floorUl.children;   //内容
    var olLis = floorOl.children;   //导航
    // 是否是点击产生的滚动
    var isClick = false;

    // 3. 监听导航点击
    for (var j = 0; j < olLis.length; j++) {
        var olLi = olLis[j];
        (function (index) {
            olLi.addEventListener('click', function () {
                isClick = true;
                for (var i = 0; i < olLis.length; i++) {
                    olLis[i].className = '';
                }
                this.className = 'current';
                // document.documentElement.scrollTop = index * myTool.client().height;

                // myTool.slowMoving(document.documentElement, {'scrollTop': index * myTool.client().height}, function () {
                //     isClick = false;
                // });
                function stepHeight(floorNum){
                    let stepH = 0;
                    switch (floorNum) {
                        case 5: stepH += ulLis[4].offsetHeight;
                        case 4: stepH += ulLis[3].offsetHeight;
                        case 3: stepH += ulLis[2].offsetHeight;
                        case 2: stepH += ulLis[1].offsetHeight;
                        case 1: stepH += ulLis[0].offsetHeight;
                        case 0: stepH += firstTop; break;
                    }
                    return stepH;
                }
                myTool.slowMoving(document.documentElement, {
                    'scrollTop': stepHeight(index)

                }, function () {
                    isClick = false;
                });
            });
        })(j)
    }

    // 4. 监听滚动
    var roll = 0;
    window.addEventListener('scroll', function (ev1) {
        if(!isClick){
            // 4.1 获取头部滚动偏移的高度
            roll = Math.ceil(Number(myTool.scroll().top));

            // 4.2 遍历
            for (var i = 0; i < ulLis.length; i++) {
                // 4.3 判断
                if(roll >= ulLis[i].offsetTop){
                    for (var j = 0; j < olLis.length; j++) {
                        olLis[j].className = '';
                    }
                    olLis[i].className = 'current';
                }
            }
        }
    })




})