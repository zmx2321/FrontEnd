
// 地方战机的构造函数 （类）
function Enemy(type) {

    // 属性：
    this.ele = document.createElement('div');
    this.hp = 0;    // 血量
    this.ispeed = 0; // 飞机移动的速度
    this.score = 0; // 飞机的分数
    this.dieImgs = []; // 爆炸的图片数组

    this.id = parseInt(Math.random() * 1000000);

    gameEngine.enemys[this.id] = this; // 添加进游戏引擎中敌机对象中

    // 初始化
    this.init = function() {
        switch (type) {

            case this.Enemy_Type_Big:
                this.ele.className = 'enemy-big';
                this.hp = this.Enemy_HP_Big;
                this.ispeed = this.Enemy_Speed_Big;
                this.score = 30;
                this.dieImgs = ['images/plane3_die1.png', 'images/plane3_die2.png', 'images/plane3_die3.png', 'images/plane3_die4.png', 'images/plane3_die5.png', 'images/plane3_die6.png'];
                break;

            case this.Enemy_Type_Middle:
                this.ele.className = 'enemy-middle';
                this.hp = this.Enemy_HP_Middle;
                this.ispeed = this.Enemy_Speed_Middle;
                this.score = 20;
                this.dieImgs = ['images/plane2_die1.png', 'images/plane2_die2.png', 'images/plane2_die3.png', 'images/plane2_die4.png'];
                break;

            case this.Enemy_Type_Small:
                this.ele.className = 'enemy-small';
                this.hp = this.Enemy_HP_Small;
                this.ispeed = this.Enemy_Speed_Small;
                this.score = 10;
                this.dieImgs = ['images/plane1_die1.png', 'images/plane1_die2.png', 'images/plane1_die3.png'];
                break;
        }

        gameEngine.ele.appendChild(this.ele);
        this.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + 'px';
        this.ele.style.top = -this.ele.offsetHeight + 'px';

        return this;
    }

    // 移动向下移动
    this.move = function() {
        var self = this;
        this.timer = setInterval(function() {

            // 判断临界值，
            if (self.ele.offsetTop > gameEngine.ele.offsetHeight) {

                clearInterval(self.timer); // 关闭这个定时器

                gameEngine.ele.removeChild(self.ele); // 清除一个节点

                delete gameEngine.enemys[self.id]; // 在游戏引擎中删除这个敌机对象
            } else {
                self.ele.style.top = self.ele.offsetTop + self.ispeed + 'px';
            }

        }, 30);
    }

    // 掉一滴血
    this.hurt = function() {
        this.hp--;
        if (this.hp <=0) {
            // 敌机爆炸
            this.boom();

            var score = parseInt(gameEngine.scoreNode.innerHTML);

            gameEngine.scoreNode.innerHTML = score + this.score;
        }
    }

    // 爆炸
    this.boom = function() {
        clearInterval(this.timer); // 清除移动的哪一个定时器

        var index = 0;
        var self = this;

        var dieTimer = setInterval(function() {
            if (index >= self.dieImgs.length) {
                clearInterval(dieTimer);

                gameEngine.ele.removeChild(self.ele);

                delete gameEngine.enemys[self.id];
            } else {
                self.ele.style.background = 'url(' + self.dieImgs[index] + ') no-repeat';
                index++;
            }
        }, 30);
    }

}


// 原型上的一些属性
Enemy.prototype = {

    Enemy_Type_Big: 1, // 大型敌机
    Enemy_Type_Middle: 2, // 中型敌机
    Enemy_Type_Small: 3, // 小型敌机

    Enemy_HP_Big: 8, // 大型飞机的血量
    Enemy_HP_Middle: 4, // 中型飞机的血量
    Enemy_HP_Small: 1, // 小型飞机的血量

    Enemy_Speed_Big: 2, // 大型飞机的速度
    Enemy_Speed_Middle: 4, // 中型飞机的速度
    Enemy_Speed_Small: 8 // 小型飞机的速度


}