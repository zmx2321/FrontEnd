// JS操作部分
localStorage.JSa="JSA";
document.write(localStorage.JSa);
localStorage.setItem('JSb','&nbsp;JSB');
document.write(localStorage.getItem('JSb'));

// JQuery操作部分
$(function(){
    window.localStorage.JQa="JQA";
    $("#a").text(window.localStorage.JQa);
    window.localStorage.setItem('JQb','JQB');
    $("#b").text(window.localStorage.getItem('JQb'));
});