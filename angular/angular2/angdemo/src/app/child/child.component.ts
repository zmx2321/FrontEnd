// 从@angular/core(就是这里)引入Component装饰器
// 导入库类 ... 事件触发类
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',  // 自定义标签
  templateUrl: './child.component.html'  // 模板
})
// 建一个组件类
// 我们这个组件类要继承一个父类，就是上面导入过来的OnInit类
// 实现一个接口？
export class ChildComponent implements OnInit {
  // Input来获取我们传递过来的参数（需要上面导入）
  // 子组件定义了一个values值（app.component.html）
  // 用它来接收父组件的输入（data）
  @Input() values;
  // 使用OutPut输出对象（这个对象是通过EventEmitter实例化出来的）
  // <any>表示任意数据类型
  // 在这个类当中实例化出来有一个emit方法
  // Output一般都是事件触发的指令
  @Output() childEvent = new EventEmitter<any>();

  // 属性
  title = 'my second Component';

  // 实现父类（接口？）中的方法
  // 一个初始化方法，不管有没有内容都要写
  // 这里写完，我们要到父类模板当中（app.component.html）<app-child></app-child>
  ngOnInit() {

  }

  // 处理fchildevent事件
  fchildevent(index){
    // 当前childEvent对象中有一个emit方法，是用来发送的
    // 然后通过这个方法，把这个下标发送出去
    // 参数发送到父组件app.component.ts，触发父组件的getChildEvent方法
    this.childEvent.emit(index);
  }
}
