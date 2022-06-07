function animate(obj, target, callback) {
    // 先清除以前的定时器，再保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画
            clearInterval(obj.timer);
            // 回调函数写的位置：定时器结束里面
            if (callback) {
                // 调用函数
                callback();
            }

        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}