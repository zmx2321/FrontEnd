/**
 * with语句,改变作用域
 * @author zmx2321
 */

var kitty = {
	age: 3,
	friend: {
		name: 'snoopy',
		age: 2
	}
}

document.write(kitty.friend.name + '\'s age is ' + kitty.friend.age);

document.write("<br />");

with(kitty.friend){
	document.write(name + '\'s age is ' + age);
}