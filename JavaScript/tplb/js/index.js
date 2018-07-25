window.onload = function() {
    var arrUrl = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'];
    var arrText = ['图片一', '图片二', '图片三', '图片四'];
    var title = document.getElementById('title');
    var bottom = document.getElementById('bottom');
    var img = document.getElementsByTagName('img')[0];
    var ul = document.getElementsByTagName('ul')[0];
    for (var i = 0; i < arrUrl.length; i++) {
        ul.innerHTML += '<li></li>';
    }

    var num = 0;
    var timer = null;
    //定时器
    var lis = document.getElementsByTagName("li");
    var oldLi = lis[0];

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            num = this.index;
            update();
        }
    }
    function update() {
        img.src = arrUrl[num];
        title.innerHTML = num + 1 + '/' + arrUrl.length;
        bottom.innerHTML = arrText[num];
        oldLi.className = '';
        oldLi = lis[num];
        lis[num].className = 'active';
    }
    function autoPlay() {
        update();
        num++;
        num %= arrText.length;
    }
    timer = setInterval(autoPlay, 2000);
    img.onmouseover = function() {
        clearInterval(timer);
    }
    img.onmouseout = function() {
        timer = setInterval(autoPlay, 2000);
    }
}