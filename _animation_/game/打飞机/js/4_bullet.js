
// 子弹构造函数 类
function Bullet() {
    // ele
    this.ele = document.createElement('div');
    this.ele.className = 'bullet';

    // id
    this.id = parseInt(Math.random() * 1000000)

    // 添加到游戏区域中
    gameEngine.ele.appendChild(this.ele);
    gameEngine.bullets[this.id] = this; // 将当前子弹加到游戏引擎中的bullets对象中

    // 位置
    this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth / 2 - this.ele.offsetWidth / 2 + 'px';
    this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + 'px';
}


// 移动的方法
Bullet.prototype.fire = function() {

    var self = this;

    this.fireTime = setInterval(function() {

        var iSpeed = -10;
        var current = self.ele.offsetTop;
        var y = current + iSpeed;

        if (current < -self.ele.offsetHeight) {

            // 清除定时器
            clearInterval(self.fireTime);

            // 删除这个节点
            gameEngine.ele.removeChild(self.ele);

            // gameEngine.bullets 对象里面的相对应的那个子弹给删除
            delete gameEngine.bullets[self.id];

        } else {
            self.ele.style.top = y + 'px';
        }

    }, 30);
}


// 爆炸的方法
Bullet.prototype.boom = function() {
    clearInterval(this.fireTime); // 清除这课子弹的移动动画

    this.ele.className = 'bullet-die';

    // 爆炸动画
    var index = 0;
    var dieImgs = ['images/die1.png', 'images/die2.png'];
    var self = this;

    var dieTimer = setInterval(function() {
        index++;
        if (index >= dieImgs.length) {
            clearInterval(dieTimer); // 关闭了定时器。。爆炸动画

            gameEngine.ele.removeChild(self.ele);

        } else {
            self.ele.style.background = 'url(' + dieImgs[index] + ') no-repeat';
        }

    }, 30);
}
