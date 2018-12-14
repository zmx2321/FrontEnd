/* 子组件
	接收用户输入，并调用shared.service.js中的append方法
	来向list数组中添加数据
*/

// 从@angular/core引入Component装饰器
import { Component } from '@angular/core';
// 引入服务（shared.service.js）不用写后缀
import { SharedService } from '../shared/shared.service';

// 书写Component装饰器
@Component({
  selector: 'childs-component',
  template: ' ' +
    // 数据绑定(控制器)
    '<input type="text" [(ngModel)]="inputText" />' +
    '<button (click)="add()">添加</button>'
})
export class ChildsComponent {
  inputText = 'hi, 你好';

  constructor(private qq: SharedService){}

  add() {
    // 往服务中追加内容
    this.qq.append(this.inputText);
    // 清空输入框
    this.inputText = '';
  }
}
