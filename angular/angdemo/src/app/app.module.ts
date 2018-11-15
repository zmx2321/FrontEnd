import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//路由组件routing(引入app.routers.ts中的routing)
//routing是提供器
import { Routing } from './app.routes';

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

@NgModule({
  declarations: [
    AppComponent,
    // 新建了组件，要从这里面加入新引入的类名
    EzComponent,
    //child组件(Input/Output)
    ChildComponent,
    //hi组件(路由)
    HiComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
