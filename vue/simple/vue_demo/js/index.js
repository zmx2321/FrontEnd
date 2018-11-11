// 定义名为 todo-item 的新组件
Vue.component('todo-item', {

  template: '<p>这是个待办项组件</p>'
})


var app= new Vue({
		el:"#app",
		data:{
			m:"hello vue.js",
		},		 
});