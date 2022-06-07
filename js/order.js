window.onload = function () {

    var orderList = document.querySelectorAll('.order_list >div')
    var orderNav = document.querySelector('.order-l-title').children

    //订单导航
    for(var i = 0;i<orderNav.length;i++){
        orderNav[i].index = i;
        orderNav[i].addEventListener('click',function () {
            for(var i = 0;i<orderNav.length;i++){
                orderList[i].style.display = 'none';
                orderNav[i].className = ''
            }
            this.className = 'style_red'
            orderList[this.index].style.display = 'block';
        })
    }


    // 删除订单
    var orderDel = document.querySelectorAll('.order_manage img')
    var delLis = document.querySelectorAll('.all_order >ul li')
    for (var i = 0;i<orderDel.length;i++){
        orderDel[i].index = i;
        orderDel[i].addEventListener('click',function () {
            delLis[this.index].remove();
        })
    }
    console.log(delLis)
}