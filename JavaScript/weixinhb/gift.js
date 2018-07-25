function Lists() {
	function fRandomBy(under, over) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * under + 1);
			case 2:
				return parseInt(Math.random() * (over - under + 1) + under);
			default:
				return 0;
		}
	}
	this.calculate = function(money, num, multiple) {
		var item = new Array();
		var result = new Array();
		var count = 0;
		if (money == num) {
			for (var i = 0; i < num; i++) {
				result.push(money / num);
			}
		} else {
			for (var i = 1; i <= num; i++) {
				var a = 　fRandomBy(100, 100 * multiple);
				count += a;
				item.push(a)
			}
			var oneIt = money / count;
			for (var i = 0; i < item.length - 1; i++) {
				if (parseInt(item[i] * oneIt) == 0) {
					result.push(1);
					money -= 1;
				} else {
					result.push(parseInt(item[i] * oneIt));
					money -= parseInt(item[i] * oneIt);
				}
			}
			result.push(money);
		}
		this.endCal(result);
	}
	this.startCal = function(money, num, multiple) {
		money * 100 < num ? alert("穷逼,扣死你吧") : this.calculate(money * 100, num, multiple);
	}
	this.endCal = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			document.write("红包" + (i + 1) + "是" + arr[i] / 100 + "</br>")
		}
	}

}