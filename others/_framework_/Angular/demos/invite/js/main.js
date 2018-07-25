var app = angular.module('nl.list', []);

app.factory('DataService', function () {
    // data 是我们的服务对象，最后我们会把它返回出去。
    var data = {};
    // 存储了所有的受邀嘉宾
    data.list = [
        {'name': '张三', 'tel': '18699999999', 'state': '未确认'},
        {'name': '李四', 'tel': '18966666666', 'state': '已接受'},
        {'name': '王五', 'tel': '13333333333', 'state': '已拒绝'},
    ];
    // 和新嘉宾的信息做绑定的对象
    data.newGuest = {};
    // 是否进入确认模式的标记
    data.mode = true;
    data.currentGuest = {};
    return data;
});

app.run(function ($rootScope) {
    var data = $rootScope.data = {};
    // 这里是当前标签页
    data.currentTab = 'list';

    var actions = $rootScope.actions = {};
    // 设置页面状态的行为
    actions.setCurrentTab = function (tabName) {
        data.currentTab = tabName;
    }
});
// 这个控制器能够初始化列表的数据
app.controller('ListController', function ($scope, DataService, $rootScope) {
// 我们的程序，数据对象上通常分成两部分：数据和行为。
    var data = $scope.data = DataService;
    var actions = $scope.actions = {};
    // 邀请按钮的点击事件
    actions.invite = function () {
        // 如果用户没有输入嘉宾的名字或者电话，则放弃这次添加
        if ((!data.newGuest.name) || (!data.newGuest.tel)) {
            return;
        }
        data.list.push({
            name: data.newGuest.name,
            tel: data.newGuest.tel,
            state: '未确认'
        });
        data.newGuest = {};
    };
    // 从列表中移除指定的嘉宾
    actions.remove = function (guestInfo) {
        var index = data.list.indexOf(guestInfo);
        data.list.splice(index, 1);
    };
    // 设置嘉宾的状态
    actions.accept = function (guestInfo) {
        guestInfo.state = '已接受';
    };
    actions.reject = function (guestInfo) {
        guestInfo.state = '已拒绝';
    };
    // 跳转到详情页的行为
    actions.gotoDetail = function (guestInfo) {
        data.currentGuest = guestInfo;
        $rootScope.data.currentTab = 'detail';
    }
});
// 这个控制器能初始化个人信息的数据
app.controller('DetailController', function ($scope, DataService) {
    var data = $scope.data = {};
    data.guestInfo = DataService.currentGuest;

})