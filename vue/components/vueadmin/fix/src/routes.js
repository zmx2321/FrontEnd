//一级
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
//manage
import DeviceManage from './views/manage/device_manage.vue'
import DataManage from './views/manage/data_manage.vue'
import OperateManage from './views/manage/operate_manage.vue'
import AccountManage from './views/manage/account_manage.vue'

import Test from './views/test.vue'

import Main from './views/Main.vue'
// import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'


// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //设备管理(device manage)
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-setting',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/device_manage', component: DeviceManage, name: '设备管理' }
        ]
    },
    //数据管理(data manage)
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/data_manage', component: DataManage, name: '数据管理' }
        ]
    },
    //运营管理(operate manage)
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/operate_manage', component: OperateManage, name: '运营管理' }
        ]
    },
    //账号管理(account manage)
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/account_manage', component: AccountManage, name: '账号管理' }
        ]
    },

    //test
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/test', component: Test, name: 'test' }
        ]
    },

    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            // { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;