/**
 * 创建组件三步骤
 * 1、从@angular/core引入Component装饰器
 * 2、建立一个普通的类，并用@Component修饰它
 * 3、在@Component中设置selector自定义标签和template模板
 */

// 从@angular/core(就是这里)引入Component装饰器
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  //自定义标签
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//根组件类
export class AppComponent {
  title = 'my first angdemo';
  //app.component.html第二个组件模板写完之后，
  //在这里设置值[values]="data"(data属性的值就是数组)
  //这里没有给他设置数据类型，可以直接赋值
  data = [1, 2, 3];
  //写第二个组件的方法(参数是一个下标，那边是$event，这里可以直接改成index)
  getChildEvent(index){
    console.log(index);
    //删除当前下标值(前面一个参数写下标，后面一个参数写删除多少个元素)
    //data数组，根据数组下标删除数组的值
    this.data.splice(index, 1);
  }  //之后在child.component.ts中写（先写模板）
}


/**
 * 组件的构成
 * 1、组件的装饰器
 * 	  @Component（每一个组件类必须使用Component来进行修饰
 * 	  才能形成一个angular组件）
 *    	Component：是TypeScript中的一个语法，任何一个angular组件类
 *    	都会使用这个装饰器来修饰，如果移除了这个装饰器，它将不再是
 *    	一个angular组件
 *
 * 2、组件的元数据[selector和template]
 * 		组件的元数据：我们这个组件的装饰器中使用了大量的组件所需要
 * 		的元数据
 * 			1、用于定义组件标签名的selector
 * 				主要用于定义组件在定义html代码当中提供的标签
 * 				它将成为组件的命名标记
 * 			2、用于定义组件数组元素模板的template
 * 			    用于指定组件当中的一个内联模板
 * 			4、templateUrl为组件指定一个外部模板的url地址
 * 			5、styleUrls为组件指定一系列用于该组件的外联样式表文件
 *
 * 3、每一个组件都会关联一个模板，这个模板最终会渲染到页面上
 * 4、组件类（组件其实就是一个普通的类）
 *    组件的逻辑都是在我们组件类当中定义并且实现的
 */

/*//新增了组件之后，根组件也要进行修改，
//
// 建立一个普通的类，并用@Component修饰它
// 建立类要用export关键字
@Component({
  // 在@Component中设置selector自定义标签和template模板
  selector: 'app-root',  //自定义标签
  //创建模板
  //这样就简单创建了一个组件
  //就是把下面这个模板放在了app-root自定义标签下面
  //内联模板
  //
  //新增了组件之后，根组件如果没有调用模板，就显示不了
  template: '' +
  '<div>' +
  '<p>张三</p>' +
  '<p>电话</p>' +
  '</div>',
  //内联样式
  //内联样式和styleUrls可以同时存在，
  //解析时先解析内联（内联会覆盖styleUrls）
  styles:[
    'p{color: #fad; font-size: 30px}'
  ]
})
export class AppComponent{}  //这里没有括号*/
