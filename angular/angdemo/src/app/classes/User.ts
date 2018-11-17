/**
 * 依赖注入
 * 第一种方式，创建依赖
 *    需要实例化，所以需要创建一个类
 */
//创建一个User类
export class User{
	//通过构造方法构造对象
	constructor(private name:string, 
		private age:number, 
		private email:string){
		//在组件中显示数据（app.component.ts）
	}
}