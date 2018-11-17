/**
 * 请求json文件数据，创建一个服务文件，主要操作数据
 * http请求
 */

//引入装饰器（服务）
import { Injectable } from '@angular/core';

//引入http
import { Http } from '@angular/http';

//展示数据到页面（rxjs--map(),对数据进行映射
//引入rxjs
import 'rxjs/add/operator/map';

@Injectable()
//创建一个类
export class DataService{
	//创建一个构造方法
	//请求本地的json数据（我们要在angular中引用json数据的话，就要使用http）
	//如果想要请求数据，那么就需要创建类的对象，然后通过这个类的对象，
	//去调用对应的方法，从而请求到数据
	constructor(private http:Http){
		//把DataService类放在提供器里面（app.module.ts）providers
		//并引入类
		//调用http属性对象所对应的方法

	}

	//请求数据
	fetchData(){
		/*//它可以把我们给定的地址当中的数据请求出来
		//通过subscribe方法处理数据
		this.http.get('./assets/arr.json')
		//请求到数据，对它进行映射
		//拿到当前response，并对其进行json解析
		//解析完，当前的结构就不再是response了
		//.map((res) => res.json());
		.subscribe(
			//处理请求过来的数据（使用箭头函数）
			//箭头左边就是请求出来的数据，箭头右边就是处理方式
			//此时还不能打印，还没有触发方法
			//到hi.component.ts触发
			//我们打算把拿到的数据放在hi组件中进行操作
			//我们需要将这个方法中请求到的数据放到hi组件中进行操作，
			//需要用return
			(data) => {
				console.log(data);
			}
		);*/

		return this.http.get('./assets/arr.json').
			map((res) => res.json());
	}
}
