function showContent() {
	var myDiv = document.getElementById('myDiv');
	var textName = document.getElementById('textName');
	var content = document.getElementById('content');

	console.log(
		myDiv.innerHTML + "\n" + 
		content.value + "\n" +
		textName.value
	);
}