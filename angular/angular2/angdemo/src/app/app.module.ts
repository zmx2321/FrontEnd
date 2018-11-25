import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//路由组件routing(引入app.routers.ts中的routing)
//routing是提供器
import { Routing } from './app.routes';
//服务
import { SharedService } from './shared/shared.service';
//http请求
import { DataService } from './data.service';

/**
 * 从 @angular/forms 库中导入 FormsModule 符号
 */
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// 新建了组件，要从这里面导入(新建了ez文件夹，并在里面新增了ez组件)
import { EzComponent } from './ez/ez.component';
//child组件(Input/Output)
import { ChildComponent } from './child/child.component';
//hi组件(路由)
import { HiComponent } from './hi/hi.component';
//服务组件
//父组件
import { ParentComponent } from './parent/parent.component';
//子组件
import { ChildsComponent } from './childs/childs.component';


@NgModule({
  declarations: [
    AppComponent,
    // 新建了组件，要从这里面加入新引入的类名
    EzComponent,
    //child组件(Input/Output)
    ChildComponent,
    //hi组件(路由)
    HiComponent,
    //服务组件
    //父组件
    ParentComponent,
    //子组件
    ChildsComponent
  ],
  imports: [
    //路由组件
    Routing,
    //然后把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，
    //这里是该应用所需外部模块的列表
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  //在父组件中使用的时候就需要去调用它，否组
  //父组件和子组件两个不能共用一个服务
  providers: [SharedService, DataService],  //服务
  bootstrap: [AppComponent]
})
export class AppModule { }
