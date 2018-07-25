// 游戏引擎 对象

var gameEngine = {

    // 属性
    ele: null, // 节点属性  游戏界面的区域

    bullets: {}, // 存储当前游戏中所有的子弹对象
    enemys: {}, // 存储当前游戏中所有的敌机对象

    scoreNode: null, // 分数节点属性


    // 方法
    // 初始化
    init: function() {
        this.ele = document.getElementById('main_body');


        return this;
    },

    // 开始游戏
    start: function() {
        // 加载游戏
        gameEngine.loading(function() {

            // 正式开始打飞机了
            // console.log('正式');

            // 1. 创建我们的飞机。并且发射子弹
            myPlane.init().fire();

            // 2. 监听键盘事件
            gameEngine.keyListening();

            // 3. 创建敌机，并且向下移动
            gameEngine.createEnemy();

            // 4. 碰撞检测
            gameEngine.crashListening();

            // 5. 显示分数
            gameEngine.showScore()

            // 6. 背景图片移动

            gameEngine.move();


        });
    },

    // 加载游戏
    loading: function(callBack) {

        // logo
        var logo = document.createElement('div');
        logo.className = 'logo';
        gameEngine.ele.appendChild(logo);

        // loading
        var load = document.createElement('div');
        load.className = 'loading';
        gameEngine.ele.appendChild(load);

        // loading动画
        var index = 0;
        var loadImg = ['images/loading1.png', 'images/loading2.png', 'images/loading3.png']; // 需要切换的背景图片的数组

        // 定时切换背景图片
        var loadTime = setInterval(function() {
            index++;
            if (index >= 3) {
                clearInterval(loadTime); // 清除定时器

                // 清除logo和load
                gameEngine.ele.removeChild(logo);
                gameEngine.ele.removeChild(load);

                // 回调
                if (callBack) {
                    callBack();
                }

            } else {
                load.style.background = 'url(' + loadImg[index%3] + ') no-repeat';
            }
        }, 500);
    },

    // 键盘监听
    keyListening: function() {

        // 速度
        var iSpeed = 0;

        // 按下
        window.onkeydown = function(e) {
            var oEvent = e || event;
            var code = oEvent.keyCode;

            if (code == 37) {
                iSpeed = -10;
            }
            if (code == 39) {
                iSpeed = 10;
            }
        }

        // 抬起
        window.onkeyup = function() {
            iSpeed = 0;
        }

        var keyTime = setInterval(function() {

            // 将要到达的位置
            var left =  myPlane.ele.offsetLeft + iSpeed;

            // 超出左边界
            if (left < 0) {
                left = 0;
            } else if (left > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth) {
                left = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
            }

            myPlane.ele.style.left = left + 'px';

        }, 30);
    },

    // createEnemy 创建敌机
    createEnemy: function() {

        // 创建大型敌机
        function createBig() {

            var flag = Math.random() > 0.7 ? true : false;

            if (flag) {
                // new出一个大型飞机
                var big = new Enemy(1);
                big.init().move();
            }
        }
        setInterval(createBig, 6000);

        // 创建中型飞机
        function createMiddle() {

            var flag = Math.random() > 0.5 ? true : false;

            if (flag) {
                // new 出一个中型飞机
                var middle = new Enemy(2);
                middle.init().move();
            }

        }
        setInterval(createMiddle, 3000);

         // 创建小型飞机
        function createSmall() {

            var flag = Math.random() > 0.3 ? true : false;
            if (flag) {
                // new 出小型飞机
                var small = new Enemy(3);
                small.init().move();
            }

        }
        setInterval(createSmall, 1000);
    },

    // 碰撞检测
    crashListening: function() {

        // 遍历所有敌机对象跟我们所有的子弹对象来做碰撞检测
        setInterval(function() {
            for (var i in gameEngine.enemys) {

                for (var j in gameEngine.bullets) {

                    // 碰撞到了 子弹和敌机
                    if (isCrash(gameEngine.enemys[i].ele, gameEngine.bullets[j].ele)) {

                        var id = gameEngine.bullets[j].id;
                        // 让我们的子弹爆炸
                        gameEngine.bullets[j].boom();

                        // 需要将我们引擎里面子弹对象给删除
                        delete gameEngine.bullets[id];


                        // 让我们的敌机掉血
                        gameEngine.enemys[i].hurt();
                    }

                }


                if (isCrash(gameEngine.enemys[i].ele, myPlane.ele)) {

                    // 游戏结束
                    myPlane.boom(function() {

                        alert('游戏结束');
                        location.reload();
                    })

                }
            }
        }, 30);
    },

    // 显示分数
    showScore: function() {

        this.scoreNode = document.createElement('div');
        this.scoreNode.className = 'score';
        this.scoreNode.innerHTML = 0;

        gameEngine.ele.appendChild(this.scoreNode);
    },

    // 背景图移动
    move: function() {
        var y = 0;

        setInterval(function() {
            gameEngine.ele.style.backgroundPositionY = y++ + 'px';
        }, 30);
    }
}