/**
 *  创建一个可以和组件之间共享数据的服务
 *  1、从核心库引入Injectable
 *  2、创建一个Injectable装饰器
 *  3、创建一个类
 *  4、使用这个服务（要创建其他组件）
 *  父类组件parent,子类组件childs
 */

// 引入Injectable
import { Injectable } from '@angular/core';

// 创建一个Injectable装饰器
@Injectable()

// 创建一个类
export class SharedService{
  // 创建一个属性和一个方法
  list: string[] = [];

  // 通过这个方法，往数组中追加元素
  append(str: string) {
    this.list.push(str);
  }
}
