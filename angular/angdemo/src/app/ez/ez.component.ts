/**
 * 把app.component.ts复制粘贴，修改
 */

// 从@angular/core(就是这里)引入Component装饰器
// 这里不变引入Component装饰器
import { Component } from '@angular/core';

@Component({
  //在哪里使用了这个标签，他就会执行这个组件类
  //修改自定义标签
  selector: 'ez-app',  //自定义标签
  //修改模板和样式路径
  //定义ez模板
  templateUrl: './ez.component.html',
  styleUrls: ['./ez.component.css']
})
//修改类名称
export class EzComponent {
  //在模板中添加了一个属性name([(ngModel)]="name")，这里添加
  name:string = "ddd";  //组件类操作模板
  //在类中书写aaa
  aaa:string = "123456";
  //在模板中写的事件，在这里实现
  //点击模板中绑定该事件的div的时候，弹出
  doClick(){
  	console.log(this.aaa);
  	alert("aaa");
  }
  //在这里添加模板上新增的doInput方法
  //模板调用组件类中的方法
  doInput(){
  	//this.name对应属性ng-reflect-model，默认双向绑定
    //如果给他赋值之后还需要双向绑定，需要定时器
    //（每隔3秒钟，重新赋值）
    //()=>表示function()
  	console.log(this)
    setInterval(()=>{
      this.name="hhh";
    }, 5000);
  }
}
