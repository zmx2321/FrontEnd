var x = document.getElementsByTagName('div');
for (var i = 0; i < 11; i++) {
    document.body.innerHTML += '<div>' + i + '</div>';
}
for (var i = 0; i < 6; i++) {
    x[i].style.left = 10 + i * 60 + 'px';
    x[i].style.top = 10 + i * 60 + 'px'
}
for (var i = 6; i < 11; i++) {
    x[i].style.left = 10 + i * 60 + 'px';
    x[i].style.top = 10 + (10 - i) * 60 + 'px'
}
//x.style.cssText='whith:200px;height:200px';
function myfunction() {
    for (var i = 0; i < 6; i++) {
        x[i].style.left = 10 + i * 60 + 'px';
        x[i].style.top = 10 + (5 - i) * 60 + 'px'
    }
    for (var i = 6; i < 11; i++) {
        x[i].style.left = 10 + i * 60 + 'px';
        x[i].style.top = 10 + (i - 5) * 60 + 'px'
    }
}
function myfunction1() {

    for (var i = 0; i < 6; i++) {
        x[i].style.left = 10 + i * 60 + 'px';
        x[i].style.top = 10 + i * 60 + 'px'
    }
    for (var i = 6; i < 11; i++) {
        x[i].style.left = 10 + i * 60 + 'px';
        x[i].style.top = 10 + (10 - i) * 60 + 'px'
    }
}
