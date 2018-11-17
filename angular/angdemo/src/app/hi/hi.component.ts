// 从@angular/core(就是这里)引入Component装饰器
// 导入OnInit接口（生命周期函数）
import { Component, OnInit } from '@angular/core';

// 要接收app.routes.ts传过来的参数，先从路由库
// 中导入ActivatedRoute服务
import { ActivatedRoute } from '@angular/router';

//如果要触发data.service中的fetchData方法，要先引入文件
import { DataService } from '../data.service';

/**
 * 实现路由第一步，创建路由的文件app.routers.ts,用来配置路由
 */
@Component({
  selector: 'hi-app',  //自定义标签
  templateUrl: './hi.component.html'  //模板
})

//创建HiComponent组件实例
//HiComponent组件类实现OnInit接口
export class HiComponent implements OnInit{
  //属性指令（ngClass）添加样式，定义一个属性
  class1 = { 'blue': false, 'red': true, 'underline': true };

  //结构指令(*ngIf) 这里是等号
  //true文本*ngIf显示，false文本*ngIf隐藏
  bool = true;

  //结构指令(*ngFor),创建一个数组
  arr = [
    {name: "张三", age: 25},
    {name: "李四", age: 30},
    {name: "王五", age: 22}
  ];

  //请求json（data.service.ts）
  //如果要触发data.service中的fetchData方法，要先引入文件
  arrJson = [];

  //属性
  title = 'my third Component';
  //传一个属性
  hello = "hello";

  //创建一个变量
  hi_id: string;

  //构造方法(加一个私有的参数,ActivatedRoute类)
  //
  //引入DataService之后，在构造方法中创建DataService对象,然后就能调用对象中的方法了
  constructor(private hiRoute:ActivatedRoute, private dataService:DataService){
  	console.log("创建HiComponent组件实例");
  }

  //获取path传递过来的参数
  //给当前类属性的hi_id赋值，为app.routes.ts中path参数的id
  //在路径后面无法直接添加 /hi,必须添加参数 例：/hi/123
  ngOnInit(){
  	/*this.hi_id = this.hiRoute.snapshot.params['id'];
  	console.log("参数是" + this.hi_id);*/

  	//获取的参数、然后是我们的订阅
  	this.hiRoute.params.subscribe(params=>{
      this.hi_id = params['id'];
      console.log(this.hi_id);
    });

    //调用fetchData方法请求json
    //return方法之后，这句话就拿到了请求的数据
    //所以要调用subscribe方法
    this.dataService.fetchData()/*.subscribe(
      (data) => {
        //把请求到的值赋值给arr
        this.arrJson[] = data;
      }
    )*/;
  }

  //一个下一页累加的事件
  //
  //只能累加一次，因为angular在处理同一个页面类跳转的时候
  //不会重新创建组件的实例，所以组件的构造函数和ngOnInit
  //方法都没有被调用
  //点击下一页，地址栏的参数会加1，但并没有将这个参数更新到组件当中
  //所以我们组件中的参数依旧不变
  //
  //解决这个问题：ActivatedRoute服务提供了一个对象，
  //这个对象允许对参数的更新进行订阅（修改ngOnInit方法）
  nxt(){
  	//把参数hi_id拿过来，转成整型，并累加一
  	//return parseInt(this.hi_id) + 1;
  	let hi_id = parseInt(this.hi_id);
  	return isNaN(hi_id) ? (hi_id = 1) : (hi_id + 1);
  }

  //上一页
  bef(){
  	let hi_id = parseInt(this.hi_id);
  	return hi_id > 1 ? (hi_id - 1) : (hi_id = 1);
  }
  
}
