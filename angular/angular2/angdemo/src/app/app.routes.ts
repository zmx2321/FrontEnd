/**
 * 配置路由
 * 	1、引入路由模块
 * 	2、配置路由常量
 * 	3、引入组件
 * 	4、在html中使用它（但此时app.routers.ts和app.component.ts还没有产生连接，无法使用）
 * 		如果要两个ts文件产生关联，需要在app.module.ts设置
 * 			用@Component组件装饰器给app.routers.ts一个常量
 * 	5、接下来可以在app.module.ts中引入了
 * 	6、引入完之后，到根模板（app.component.html）中去使用
 */
// 引入路由模块
import { Routes, RouterModule } from '@angular/router';
// 在核心库中引入moduleWithProviders
// 用它可以使用对应的路由模块来执行appRouters（路由常量）
import { ModuleWithProviders } from '@angular/core';

// 引入组件
import { EzComponent } from './ez/ez.component';
import { HiComponent } from './hi/hi.component';

// 配置路由常量(类型就是刚刚引入的类型Routers)
// 是一个数组的类型
// 刚开始会报错，是因为找不到这两个组件，需要引入
//
// 在定义一个配置项的path属性时，可以使用/字符来对path属性进行分段
// 如果一个分段以:字符开头，则url中与该分段进行匹配的部分将作为
// 参数传递到组件中
const appRouters: Routes = [
  {path: 'ez', component: EzComponent},
  // 如果path不写，就是在访问根路径的时候同时访问HiComponent组件
  /*{path: 'hi/id', component:HiComponent}*/
  // 在path中传参(/:再加所需要传递过来的参数)
  // 获取path传递过来的参数需要导入ActivatedRoute服务
  // 访问HiComponent这个组件的时候传递一个参数，
  // 如果不传递参数，则无法访问
  // 这里写完hi/:id之后，在hi组件中书写
  {path: 'hi/:id', component: HiComponent}
];

// 用@Component组件装饰器给app.routers.ts一个常量
// 为了关联app.routers.ts和app.component.ts
// 给这个常量一个对应的类型（这个类型是官方文档提供的）
// RouterModule在router（路由模块）中引入
// forRoot初始化，要root刚刚创建好的appRouters
// 这样就已经export（输出）了，routing就可以在app.routers.ts正常使用了
// 接下来可以在app.module.ts中引入了
// ModuleWithProviders要大写
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
