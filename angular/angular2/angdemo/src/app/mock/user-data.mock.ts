/**
 * 在需要的地方传入依赖
 * 数据文件（用户数据）
 */

// 使用User类
import { User } from '../classes/User';

// 按照User类，以数组的方式创建(对象数组)
// 创建变量var
// 创建一个获取用户数据的服务
export let Users: User[] = [
  new User('张三', 18, 'aa.qq.com'),
  new User('李四', 46, 'bb.qq.com'),
  new User('王五', 32, 'cc.qq.com')
];
