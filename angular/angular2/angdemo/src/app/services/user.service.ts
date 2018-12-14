/**
 * 创建一个获取用户数据的服务
 */

// 首先导入刚刚创建的数据
import { Users } from '../mock/user-data.mock';
// 导入Injectable[可注射的]（因为导入Injectable意味着
// 一个类可以被一个注入器实例化，通常来讲，在试图实例化一个
// 没有被标识为Injectable的类的时候，注入器将会报错）
import { Injectable } from '@angular/core';

@Injectable()
// 创建一个类（用来获取数据）
// 然后在组件中书写（app.component.ts）
export class UserService {
  getUsers() {
    return Users;
  }
}
