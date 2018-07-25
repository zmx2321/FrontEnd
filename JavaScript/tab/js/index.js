window.onload = function(){
	var oTab = document.getElementById('tab');
	var oLis = oTab.getElementsByTagName('li');
	var oDivs = oTab.getElementsByTagName('div');

	for(var i=0; i<oLis.length; i++){
		var oLi = oLis[i];
		oLi.tabnam = i;
		oLi.onmouseover = function(){
			for(var j=0; j<oLis.length; j++){
				oLis[j].className = '';
				oDivs[j].className = '';
			}
			this.className = 'select';
			oDivs[this.tabnam].className = 'select';
		}
	}
/*
	//nIndex是我们定义的形参，代表当前被选中的索引
	function tabChange(nIndex){
		for(var i=0; i<oLis.length; i++){
			oLis[i].className = '';
			oDivs[i].className = '';
		}
		oLis[nIndex].className = 'select';
		oDivs[nIndex].className = 'select';
	}

	for(var i=0; i<oLis.length; i++){
		//在每次循环的时候，把每一个li的索引定义在自己的自定义属性tabnam上
		oLis[i].tabnam = i;
		oLis[i].onmouseover = function(){
			//tabChange(i);	//函数定义的时候将里面的内容当做字符串存储起来	其中i=3
			//tabChange(this.tabnam);
			console.log(this.tabnam);
			tabChange(this.tabnam);
		}
	}
*/
}