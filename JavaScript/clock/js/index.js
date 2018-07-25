function inputId(element) {
    return document.getElementById(element);
}

var SMS = inputId('SMS');
var MUSIC = inputId('MUSIC');
var OPENMUSIC = inputId('OPENMUSIC');
var H = inputId('H');
var M = inputId('M');
var S = inputId('S');

var AlarmTimeSet = new Date();

MUSIC.value = "source/fm.mp3";

function AlarmClock() {
    var AlarmMessage = SMS.value;
    var TimeNowSet = new Date();
    var AlarmTime = new Date(AlarmTimeSet.getFullYear(),AlarmTimeSet.getMonth()+1,AlarmTimeSet.getDate(),H.value,M.value,S.value);
    var TimeNow = new Date(TimeNowSet.getFullYear(),TimeNowSet.getMonth()+1,TimeNowSet.getDate(),TimeNowSet.getHours(),TimeNowSet.getMinutes(),TimeNowSet.getSeconds());

    if(TimeNow.getTime() == AlarmTime.getTime()) {
        if (OPENMUSIC.checked) {
            document.write("<embed autostart='true' src=" + MUSIC.value + ">");
        }

        if (AlarmMessage == '') {
            alert("时间到了");
        } else {
            alert(AlarmMessage);
        }

        return;

     }else if(AlarmTime.getTime() < TimeNow.getTime()){
        alert("时间已过期");
        return;
    }

    setTimeout("AlarmClock()", 500);
}