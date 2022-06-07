window.onload = function () {
    var normal = document.querySelector(".lo_normal")
    var fast = document.querySelector(".lo_fast")

    var login_btn = document.querySelector(".lo_button").children;

    login_btn[0].addEventListener('click',function () {
        normal.style.display = 'block';
        fast.style.display = 'none';
        login_btn[0].className = 'login_border'
        login_btn[1].className = ''
    })
    login_btn[1].addEventListener('click',function () {
        normal.style.display = 'none';
        fast.style.display = 'block';
        login_btn[0].className = ''
        login_btn[1].className = 'login_border'
    })

    //登录验证
    addBlur(myfun('user'));//检测id为user的元素失去焦点后，value值是否为空
    addBlur(myfun('pass'));//检测id为pass的元素失去焦点后，value值是否为空
    // var login=document.getElementById('login');
    myfun('denglu').onclick = function () {
        if (myfun('user').value === 'wt12138' && myfun('pass').value === '123456') {
            location.replace('./index.html');
        } else {
            alert('用户名或密码错误！！！')
        }
    }
}

function myfun(obj) {//根据id获取指定元素
    return document.getElementById(obj);
}

function addBlur(obj) {//为指定元素添加失去焦点事件
    obj.onblur = function () {
        isEmpty(this);
    };
}

function isEmpty(obj) {//检测表单是否为空
    if (obj.value === '') {
        myfun('tips').style.display = 'block';
        myfun('tips').innerHTML = '注意：输入内容不能为空！';
    } else {
        myfun('tips').style.display = 'none';
    }
}

