
// 飞机对象
var myPlane = {

    // 属性：
    ele: null,
    fireInterval: 80, // 困难度

    // 方法
    // 初始化
    init: function() {

        this.ele = document.createElement('div');
        this.ele.className = 'myplane';

        gameEngine.ele.appendChild(this.ele); // 加到我们游戏区域中

        // 位置
        this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2 + 'px';
        this.ele.style.bottom = 0;

        return this;
    },

    // 发射子弹的方法
    fire: function() {

        this.fireTime = setInterval(function() {
            // 创建子弹-并让子弹往上走
            var bullet = new Bullet();
            bullet.fire();
        }, this.fireInterval);

    },

    // 爆炸的方法
    boom: function(callBack) {
        clearInterval(this.fireTime); // 清除发射子弹的定时器

        var self = this;
        var index = 0;
        var dieImgs = ['images/me_die1.png', 'images/me_die2.png', 'images/me_die3.png', 'images/me_die4.png']

        var dieTimer = setInterval(function() {

            if (index >= dieImgs.length) {
                clearInterval(dieTimer);

                gameEngine.ele.removeChild(self.ele);

                // 回调函数
                if (callBack) {
                    callBack();
                }

            } else {
                self.ele.style.background = 'url(' + dieImgs[index] + ') no-repeat';
                index++;
            }
        }, 30);
    }
}