var game = new Array();//保存数据 游戏类别  游戏名称
game['纸牌游戏'] = ['斗地主','扎金花','拖拉机','三打哈'];
game['棋类游戏']=['五子棋','军棋','中国象棋','围棋'];
game['其他游戏']=['LOL','魔兽世界','阴阳师','王者荣耀'];
//game['纸牌游戏'][2] <<<===>>> 拖拉机
function changeGame(){
    //alert(123);
    var gameType = document.getElementById('gameType').value;
    //alert(gameType);
    var gameList = document.getElementById('gameList');
    gameList.options.length = 0;//清除select中的下拉菜单
    for(var i in game){
        if(i == gameType){
            for(var j in game[i]){
                gameList.add(new Option(game[i][j]),null);
            }
        }
    }
}
function allGame(){
    //var gameType = document.querySelector('#gameType');
    var gameType = document.getElementById('gameType');
    for(var i in game){
        gameType.add(new Option(i,i),null);
    }
}
window.onload=allGame();