/* 父组件 
	把shared.service.js数组中的数据展示到模板中

	首先在父组件中写

	把父组件的标签拿到app.component.html中显示
*/

// 从@angular/core引入Component装饰器
import { Component } from '@angular/core';
//引入服务（shared.service.js）不用写后缀
//要用绝对路径
import { SharedService } from '../shared/shared.service';
//引入子组件
import { ChildsComponent } from '../childs/childs.component';

//书写Component装饰器
@Component({
	//组件匹配的标签
	selector: "parent-component",
	//模板(获取到服务数组中的数据)
	//传的是数组，数组是下面类创建出来的
	//template: '<childs-component></childs-component>',
	template: ' ' + 
	'<ul>' + 
		//引入数组
		'<li *ngFor="let item of arr">' +
			'{{ item }}' +
		'</li>' +
	'<ul>' + 
	//调用子组件
	'<childs-component></childs-component>',
	//为了能让父组件和子组件获取到同一个shared.service服务，
	//需要在父组件中添加
	providers: [SharedService]
})
//创建组件类
export class ParentComponent{
	//创建一个属性
	arr:string[] = [];
	//构造方法，绑定一个私有参数,并给他指定类型
	constructor(private str:SharedService){}

	//生命周期函数(任何类型)
	ngOnInit():any{
		//获取值(通过str获取服务中的list数组，并把这个数组赋值给当前
		//arr，通过模板渲染到页面)
		this.arr = this.str.list;
	}
}