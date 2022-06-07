window.onload = function () {
    //数量加减
    var drop = document.querySelectorAll(".sp_drop")
    var add = document.querySelectorAll(".sp_add")
    var spNum = document.querySelectorAll(".shop_content ul li i");
    var priceTotal = document.querySelectorAll(".price")

    // 获取商品的单价
    var danjia = document.querySelectorAll(".danjia")
    var onePrice = [];
    for(var i = 0;i<danjia.length;i++){
        onePrice[onePrice.length] = danjia[i].innerHTML.slice(2,4)-0;
    }

    // 实现加减商品数量 改变价格
    for(var i = 0;i<drop.length;i++){
        drop[i].index = i;
        add[i].index = i;
        drop[i].addEventListener('click',function () {
            if(spNum[this.index].innerHTML <= 1){
                spNum[this.index].innerHTML === 1;
            }else{
                spNum[this.index].innerHTML -= 1;
            }
            priceTotal[this.index].innerHTML = "¥"+spNum[this.index].innerHTML*onePrice[this.index] +".00";
        })
        add[i].addEventListener('click',function () {
            spNum[this.index].innerHTML = parseInt(spNum[this.index].innerHTML) + 1;
            priceTotal[this.index].innerHTML = "¥"+spNum[this.index].innerHTML*onePrice[this.index]+".00";
        })
    }

    // 实现移除商品
    var spList = document.querySelectorAll(".shop_content ul")
    var remove = document.querySelectorAll(".remove");
    var mySp = document.querySelector('.sp_num')
    for(var i=0;i<remove.length;i++){
        remove[i].index = i;
        remove[i].addEventListener('click',function () {
            spList[this.index].remove();
            mySp.innerHTML -= 1;
        })
    }

    //实现按钮全选
    var allChecked = document.querySelector('.all_check');
    var inputs = document.querySelectorAll(".shop_content input");
    console.log(inputs)

    allChecked.addEventListener('click',function () {
        for(var i=0;i<inputs.length;i++){
            if(this.checked){
                inputs[i].checked = true;
            }else{
                inputs[i].checked = false;
            }
        }
    })

}